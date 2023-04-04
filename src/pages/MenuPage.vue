<template>
  <q-page class="flex-center">
    <!--<div>
      {{ menuTables }}
      {{ menus }}
    </div>-->
    <div v-if="Object.keys(currentStore).length != 0">
      <div class="q-pa-md q-gutter-sm">
        <q-btn
          v-for="(menuTableIndex, tableIndex) in ds(currentStore.menu_table_ids)"
          :key="tableIndex"
          :class="{ 'bg-grey-4' : selectedPage != tableIndex, 'bg-grey-10 text-white' : selectedPage == tableIndex }"
          :ripple="false"
          flat
          @click="selectedPage = tableIndex">
          {{ parseInt(tableIndex) + 1 }} p
        </q-btn>
      </div>
      <div
        v-for="(menuTableIndex, tableIndex) in ds(currentStore.menu_table_ids)"
        :key="tableIndex"
        class="row wrap justify-center">
        <div
          v-if="tableIndex == selectedPage"
          class="q-px-xs"
          style="width: 100vw; max-width: 400px">
          <div class="text-center text-h5 text-orange q-pt-md">
            {{ allMenuTables[menuTableIndex].menu_table_title }}
          </div>
          <div class="q-py-lg">
            <q-separator size="4px" color="orange" inset />
          </div>
          <div v-if="allMenuTables[menuTableIndex].menu_table_subtitle.length > 0"
            class="text-grey-8">
            * {{ allMenuTables[menuTableIndex].menu_table_subtitle }}
          </div>
          <q-list>
            <q-item 
              v-for="menuIndex in ds(allMenuTables[menuTableIndex].menu_ids)"
              :key="menuIndex"
              @click="openMenuDialog(menuIndex)"
              clickable v-ripple>
              <q-item-section>
                <q-item-label class="text-h6">
                  {{ allMenus[menuIndex].menu_title }}
                </q-item-label> 
                <q-item-label class="text-subtitle2 text-grey-6">
                  {{ allMenus[menuIndex].menu_subtitle }}
                </q-item-label>
                <q-item-label class="text-subtitle2 text-grey-6">
                  {{ allMenus[menuIndex].menu_price }} 원
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-img
                  no-transition
                  no-spinner
                  fit="fill"
                  :src="baseURL + '/static/images/menu/' + menuIndex + '.jpg'"
                  style="height: 100px; width: 100px">
                  <template v-slot:error>
                    <div class="absolute-full flex flex-center bg-grey-4 text-white">
                    </div>
                  </template>
                </q-img>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
      <!--<div
        v-for="(menuTable, tableIndex) in menuTables"
        :key="tableIndex"
        class="row wrap justify-center">
        <div
          v-if="tableIndex == selectedPage"
          class="q-px-xs"
          style="width: 100vw; max-width: 400px">
          <div class="text-center text-h5 text-orange q-pt-md">
            {{ menuTable.menu_table_title }}
          </div>
          <div class="q-py-lg">
            <q-separator size="4px" color="orange" inset />
          </div>
          <div v-if="menuTable.menu_table_subtitle.length > 0">
            * {{ menuTable.menu_table_subtitle }}
          </div>
          <div>
            <q-list>
              <q-item 
              v-for="menuInfo in menuTable.menu_info"
              :key="menuInfo"
              @click="openMenuDialog(menuInfo.menu_id)"
                clickable v-ripple>
                <q-item-section>
                  <q-item-label class="text-h6">
                    {{ menuInfo.menu_title }}
                  </q-item-label> 
                  <q-item-label class="text-subtitle2 text-grey-6">
                    {{ menuInfo.menu_price }} 원
                  </q-item-label>
                </q-item-section>
                <q-item-section thumbnail>
                  <img
                    :src="baseURL + '/static/images/menu/' + menuInfo.menu_id + '.jpg'"
                    style="height: 100px"/>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>-->
      
      <!--<q-expansion-item
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
      </q-expansion-item>-->
    </div>
    <q-dialog v-model="menuDetailDialog" position="bottom">
      <q-card style="width: 100vw; max-width: 450px">
        <q-card-section class="q-pa-none bg-grey-4 row justify-end">
          <q-btn
            size="sm"
            icon="close"
            :ripple="false"
            round flat v-close-popup/>
        </q-card-section>
        <q-card-section class="q-pa-none q-pt-md row justify-center">
          <q-img
            no-transition
            no-spinner
            fit="fill"
            :src="baseURL + '/static/images/menu/' + currentMenuId + '.jpg'"
            style="width: 200px; height: 200px">
            <template v-slot:error>
              <div class="absolute-full flex flex-center bg-grey-4 text-white"> 
              </div>
            </template>
          </q-img>
        </q-card-section>
        <q-card-section>
          <q-card flat bordered class="q-pa-md text-center">
            <q-card-section class="q-pt-sm text-h5">
              {{ allMenus[currentMenuId].menu_title }}
            </q-card-section>
            <q-separator />
            <q-card-section class="text-caption text-grey q-pb-none">
              {{ allMenus[currentMenuId].menu_description }}
            </q-card-section>
          </q-card>
        </q-card-section>
        <q-card-section class="q-px-sm">
          <div class="q-px-md q-pb-sm text-h6 text-bold">
            가격
          </div>
          <q-option-group
            v-model="currentMenuOption.price_option_value"
            :options="ds(allMenus[currentMenuId].menu_price_options).options"
            color="teal-5">
            <template v-slot:label="opt">
              <div class="row justify-between"
                style="width: 85vw; max-width: 380px">
                <div class="text-subtitle1">{{ opt.label }}</div>
                <div class="text-subtitle1">{{ opt.price }}원</div>
              </div>
            </template>
          </q-option-group>
        </q-card-section>
        <q-separator />
        <div
          v-for="(menuAddOption, addOptionIndex) in ds(allMenus[currentMenuId].menu_additional_options)"
          :key="addOptionIndex">
          <q-card-section class="q-px-sm">
            <div class="q-px-md q-pb-sm  text-h6 text-bold">
              {{ menuAddOption.name }}
            </div>
            <q-option-group
              v-if="menuAddOption.type == 0"
              v-model="currentMenuOption.add_option_values[addOptionIndex]"
              :options="menuAddOption.options"
              color="teal-5">
              <template v-slot:label="opt">
                <div class="row justify-between"
                  style="width: 85vw; max-width: 380px">
                  <div class="text-subtitle1">{{ opt.label }}</div>
                  <div class="text-subtitle1">+{{ opt.price }}원</div>
                </div>
              </template>
            </q-option-group>
            <q-option-group
              v-else-if="menuAddOption.type == 1"
              v-model="currentMenuOption.add_option_values[addOptionIndex]"
              :options="menuAddOption.options"
              type="checkbox"
              color="teal-5">
              <template v-slot:label="opt">
                <div class="row justify-between"
                  style="width: 85vw; max-width: 380px">
                  <div class="text-subtitle1">{{ opt.label }}</div>
                  <div class="text-subtitle1">+{{ opt.price }}원</div>
                </div>
              </template>
            </q-option-group>
          </q-card-section>
          <q-separator />
        </div>
        <q-card-section class="q-px-sm row justify-between">
          <div class="q-px-md q-pb-sm  text-h6 text-bold">
            수량
          </div>
          <div class="">
            <q-btn
              size="md"
              icon="arrow_downward"
              :ripple="false"
              round outline
              @click="if (currentMenuOption.number > 1) currentMenuOption.number--;"/>
            <span class="text-subtitle1 text-bold q-px-lg">{{ currentMenuOption.number }}</span>
            <q-btn
              size="md"
              icon="arrow_upward"
              :ripple="false"
              round outline
              @click="icurrentMenuOption.number++"/>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions class="q-pa-md" vertical>
          <q-btn
            class="text-white text-h6 bg-orange"
            flat v-close-popup
            style="border-radius: 32px"
            @click="addToCart()">
            장바구니 담기
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
import { useRouteInfo } from "src/stores/routeInfo";
import { useStoreInfo } from "src/stores/storeInfo";
import { useCartStore } from "src/stores/cartInfo";

export default defineComponent({
  name: "MenuPage",
  components: {},
  setup() {
    // routing
    const router = useRouter();

    // route, utils
    const routeInfoStore = useRouteInfo();
    const { headerTab, bottomTab } = storeToRefs(routeInfoStore);
    const { setHeaderTab, setBottomTab, ds } = routeInfoStore;

    // store Information
    const storeInfo = useStoreInfo();
    const { currentStore, allMenuTables, allMenus } = storeToRefs(storeInfo);

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
    //var menuTables = ref({});
    //var menus = ref({});
    //async function initMenu() {
    //  if(Object.keys(currentStore.value).length != 0) {
    //    const menuTableIds = ds(currentStore.value.menu_table_ids);
    //
    //    // Request all menu tables' infromation from server.
    //    for (const menuTableId of menuTableIds) {
    //      var query = "menu/readMenuTable/" + menuTableId;
    //      await api.get(query).then(async (response) => {
    //        var menu_table_info = response.data.menuTable[0];
    //        var menu_table_id = menu_table_info.menu_table_id;
    //        menuTables.value[menu_table_id] = menu_table_info;
    //        menuTables.value[menu_table_id]["menu_info"] = {};
    //      });
    //    }
    //
    //    // Requst all menus' information from server.
    //    for (const [menuTableId, menuTableInfo] of Object.entries(
    //      menuTables.value
    //    )) {
    //      const menuIds = ds(menuTableInfo.menu_ids);
    //      var uniqueCheck = {};
    //      for (const menuId in menuIds) {
    //        // need to TODO unique check!
    //        var query = "menu/readMenu/" + menuId;
    //        if (!(menuId in uniqueCheck)) {
    //          await api.get(query).then((response) => {
    //            var menu_info = response.data.menu[0];
    //            var menu_id = menu_info.menu_id;
    //            var menu_table_ids = ds(menu_info.menu_table_ids);
    //
    //            for (const menu_table_id of menu_table_ids) {
    //              menuTables.value[menu_table_id]["menu_info"][menu_id] =
    //                menu_info;
    //            }
    //            menus.value[menu_id] = menu_info;
    //          });
    //          uniqueCheck[menuId] = 1;
    //        }
    //      }
    //    }
    //  }
    //}

    onMounted(() => {
      setBottomTab("menu");
    });

    // select menu to cart
    var menuDetailDialog = ref(false);
    var currentMenuId = ref(0);
    var currentMenuOption = ref({
        menu_id: 0,
        price_option_value: 0,
        add_option_values: [],
        menu_price: 0,
        menu_add_price: 0,
        number: 1,
    });
    function openMenuDialog(menuId) {
      // initial object
      menuDetailDialog.value = true;
      currentMenuId.value = menuId;
      currentMenuOption.value = {
        menu_id: menuId,
        price_option_value: 0,
        add_option_values: [],
        menu_price: 0,
        menu_add_price: 0,
        number: 1,
      };

      // add initial options
      var price_options = ds(allMenus.value[currentMenuId.value].menu_price_options);
      currentMenuOption.value.price_option_value = price_options.options[0].value
      var add_options = ds(allMenus.value[currentMenuId.value].menu_additional_options);
      for(const add_option of add_options) {
        if(add_option.type == 0) {
          currentMenuOption.value.add_option_values.push(add_option.options[0].value)
        }
        else if(add_option.type == 1) {
          currentMenuOption.value.add_option_values.push([]);
        }
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
      selectedPage: ref('0'),
      currentStore,
      cartLength,
      existCart,

      allMenus,
      allMenuTables,
      baseURL,
      ds,
      openMenuDialog,

      menuDetailDialog,
      currentMenuId,
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
