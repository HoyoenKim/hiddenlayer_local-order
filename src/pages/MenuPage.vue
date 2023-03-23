<template>
  <q-page class="flex-center">
    <!--<div>
      {{ menuTables }}
      {{ menus }}
    </div>-->
    <q-expansion-item
      default-opened
      header-class="bg-grey-4"
      v-for="menuTable in menuTables"
      :key="menuTable"
      :label="menuTable.menu_table_title"
      :caption="menuTable.menu_table_subtitle"
    >
      <template v-slot:default>
        <div
          class="fit column wrap justify-center items-center content-center q-gutter-md q-py-md"
        >
          <q-card
            v-for="menuInfo in menuTable.menu_info"
            :key="menuInfo"
            @click="openMenuDialog(menuInfo.menu_id)"
            class="menu-card"
            flat
            bordered
          >
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-overline">{{ menuInfo.menu_price }} 원</div>
                <div class="text-h5 q-mt-sm q-mb-xs q-pb-sm">
                  {{ menuInfo.menu_title }}
                </div>
                <div class="text-caption text-grey">
                  {{ menuInfo.menu_description }}
                </div>
              </q-card-section>
              <q-card-section class="col-5 flex flex-center">
                <q-img
                  class="rounded-borders"
                  :src="
                    baseURL + '/static/images/menu/' + menuInfo.menu_id + '.jpg'
                  "
                  style="max-height: 300px"
                />
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-expansion-item>
    <q-dialog v-model="menuDetailDialog" position="bottom">
      <q-card style="width: 60vw; max-width: 500px">
        <q-card-section horizontal class="justify-end bg-grey-4">
          <q-btn
            size="sm"
            icon="close"
            :ripple="false"
            round
            flat
            v-close-popup
          ></q-btn>
        </q-card-section>
        <q-card-section horizontal class="q-pt-md">
          <q-img
            class="rounded-borders"
            :src="baseURL + '/static/images/menu/' + currentMenuId + '.jpg'"
            style="max-height: 300px"
            fit="scale-down"
          />
        </q-card-section>

        <q-card-section class="q-pb-none">
          <q-card flat bordered class="q-pa-md text-center">
            <q-card-section class="text-h6">
              {{ menus[currentMenuId].menu_title }}
            </q-card-section>
            <q-separator />

            <q-card-section class="text-caption text-grey q-pb-none">
              {{ menus[currentMenuId].menu_description }}
            </q-card-section>
          </q-card>
        </q-card-section>
        <div
          v-for="(menuOption, index) in ds(menus[currentMenuId].menu_options)"
          :key="index"
        >
          <q-card-section class="q-pb-xs">
            <div class="text-bold q-pb-xs">{{ menuOption[0] }}</div>
            <q-option-group
              v-model="currentMenuOption.menu_option_values[index]"
              :options="menuOption.slice(1)"
              color="primary"
            />
          </q-card-section>
          <q-separator />
        </div>
        <q-card-section class="q-pb-md row wrap justify-between">
          <div class="text-bold q-pt-xs">수량</div>
          <div class="">
            <q-btn
              round
              size="sm"
              :ripple="false"
              outline
              icon="arrow_downward"
              @click="
                if (currentMenuOption.number > 1) {
                  currentMenuOption.number--;
                }
              "
            ></q-btn>
            <span class="q-px-lg">{{ currentMenuOption.number }}</span>
            <q-btn
              round
              size="sm"
              :ripple="false"
              outline
              icon="arrow_upward"
              @click="currentMenuOption.number++"
            ></q-btn>
          </div>
        </q-card-section>
        <q-separator />

        <q-card-actions vertical>
          <q-btn
            flat
            v-close-popup
            class="text-white bg-blue"
            @click="addToCart()"
          >
            카트에 담기
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { api, baseURL } from "boot/axios";
import { useStoreInfo } from "src/stores/storeInfo";
import { useCartStore } from "src/stores/cartInfo";

export default defineComponent({
  name: "MenuPage",
  components: {},
  setup() {
    // routing
    const router = useRouter();

    // store Information
    const storeInfo = useStoreInfo();
    const { currentStore } = storeToRefs(storeInfo);

    // cart infromation
    const cartStore = useCartStore();
    const { cart } = storeToRefs(cartStore);
    const { insertCart, resetCart } = cartStore;

    const cartLength = computed(() => {
      return Object.keys(cart.value).length;
    });
    const existCart = computed(() => {
      if (Object.keys(cart.value).length == 0) {
        return false;
      }
      return true;
    });

    // Request menu table and its menus from server.
    var menuTables = ref({});
    var menus = ref({});
    onMounted(async () => {
      const menuTableIds = ds(currentStore.value.menu_ids);

      // Request all menu tables' infromation from server.
      for (const menuTableId of menuTableIds) {
        var query = "menu/readMenuTable/" + menuTableId;
        await api.get(query).then(async (response) => {
          var menu_table_info = response.data.menuTable[0];
          var menu_table_id = menu_table_info.menu_table_id;
          menuTables.value[menu_table_id] = menu_table_info;
          menuTables.value[menu_table_id]["menu_info"] = {};
        });
      }

      // Requst all menus' information from server.
      for (const [menuTableId, menuTableInfo] of Object.entries(
        menuTables.value
      )) {
        const menuIds = ds(menuTableInfo.menu_ids);
        var uniqueCheck = {};
        for (const menuId in menuIds) {
          // need to TODO unique check!
          var query = "menu/readMenu/" + menuId;
          if (!(menuId in uniqueCheck)) {
            await api.get(query).then((response) => {
              var menu_info = response.data.menu[0];
              var menu_id = menu_info.menu_id;
              var menu_table_ids = ds(menu_info.menu_table_ids);

              for (const menu_table_id of menu_table_ids) {
                menuTables.value[menu_table_id]["menu_info"][menu_id] =
                  menu_info;
              }
              menus.value[menu_id] = menu_info;
            });
            uniqueCheck[menuId] = 1;
          }
        }
      }
    });

    // to deserialize the json string
    function ds(string) {
      return JSON.parse(string);
    }

    // select menu to cart
    var menuDetailDialog = ref(false);
    var currentMenuId = ref(0);
    var currentMenuOption = ref({
      number: 1,
      menu_option_values: [],
      menu_price: 0,
    });
    function openMenuDialog(menuId) {
      // initial object
      menuDetailDialog.value = true;
      currentMenuId.value = menuId;
      currentMenuOption.value = {
        number: 1,
        menu_option_values: [],
        menu_price: 0,
      };

      // add initial options
      var menu_option_info = ds(menus.value[currentMenuId.value].menu_options);
      for (const menu_option of menu_option_info) {
        currentMenuOption.value.menu_option_values.push(menu_option[1].value);
      }
    }

    // add menu to cart
    function addToCart() {
      // calculate menu total price
      // TODO 옵션에 따라서 가격이 바뀌는 경우 수정 필요.
      currentMenuOption.value.menu_price =
        menus.value[currentMenuId.value].menu_price;

      // find menu label
      var menu_options = ds(menus.value[currentMenuId.value].menu_options);
      var menu_option_select_label = [];

      for (var i = 0; i < menu_options.length; i++) {
        var menu_option = menu_options[i];
        var menu_option_key = menu_option[0];

        for (var j = 1; j < menu_option.length; j++) {
          if (
            menu_option[j].value ==
            currentMenuOption.value.menu_option_values[i]
          ) {
            var inputObejct = {};
            inputObejct[menu_option_key] = menu_option[j].label;
            menu_option_select_label.push(inputObejct);
          }
        }
      }

      // set order information
      var menu_info = {
        store_title: currentStore.value.store_title,
        menu_info: menus.value[currentMenuId.value],
        menu_option_label: menu_option_select_label,
        menu_option_select: currentMenuOption.value,
      };

      insertCart(currentMenuId.value, menu_info);
    }

    return {
      currentStore,
      cartLength,
      existCart,

      menuTables,
      baseURL,
      ds,
      openMenuDialog,

      menuDetailDialog,
      currentMenuId,
      menus,
      currentMenuOption,
      addToCart,
    };
  },
});
</script>
<style lang="sass" scoped>
.menu-card
  width: 95vw
  max-width: 500px
.my-card
  width: 95vw
  max-width: 500px
</style>

<!--
const balance = {
  overline: "Option One",
  title: "밸런스 블랜딩",
  price: "3500",
  priceUnit: "원",
  explainLink: "https://typer.notion.site/e22619aaa3244bef811a0eb97529a7e3",
  explainDetail:
    "국내 정상급 바리스타가 만든 최고급 품종의 게이샤 원두 그리고 게이샤 원두와 최적의 조화를 이루는 헤리움 품종의 원두를 섞어 내린 고급 블랜디드 커피입니다.",
  priceOptions: [
    {
      label: "3500 원",
      value: "default",
    },
  ],
  priceOption: "default",
  tempOptions: [
    {
      label: "Hot",
      value: "hot",
    },
    {
      label: "Ice",
      value: "ice",
    },
  ],
  tempOption: "hot",
  denseOptions: [
    {
      label: "진하게",
      value: "high",
    },
    {
      label: "연하게",
      value: "low",
    },
  ],
  denseOption: "high",
  number: 1,
};
const single = {
  overline: "Option Two",
  title: "싱글 오리진",
  price: "4000",
  priceUnit: "원",
  explainLink: "https://typer.notion.site/cd9823651223426e80d146d16f37d133",
  explainDetail:
    "국내 정상급 로스터가 최고급 생두를 선점하고 로스팅하여 만든 원두 입니다. 단 한 종류의 원두만을 최고급 원두를 골라내 원두의 맛을 극한까지 끌어내기 위한 노력을 기울였습니다.",
  priceOptions: [
    {
      label: "4000 원",
      value: "default",
    },
  ],
  priceOption: "default",
  tempOptions: [
    {
      label: "Hot",
      value: "hot",
    },
    {
      label: "Ice",
      value: "ice",
    },
  ],
  tempOption: "hot",
  denseOptions: [
    {
      label: "진하게",
      value: "high",
    },
    {
      label: "연하게",
      value: "low",
    },
  ],
  denseOption: "high",
  number: 1,
};
const menuList = ref([balance, single]);
-->
