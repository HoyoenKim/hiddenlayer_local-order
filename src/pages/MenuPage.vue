<template>
  <q-page class="flex-center">
    <div v-if="Object.keys(currentStore).length != 0">
      <!--<q-toggle
        v-model="menuOption"
        color="primary"
        keep-color/>-->

      <div v-if="menuOption">
        <div class="q-pa-md q-gutter-sm">
          <q-btn
            :class="{ 'bg-grey-4' : selectedPage != ds(currentStore.menu_table_ids).length, 'bg-grey-10 text-white' : selectedPage == ds(currentStore.menu_table_ids).length }"
            :ripple="false"
            flat
            @click="selectedPage = ds(currentStore.menu_table_ids).length">
            메뉴판
          </q-btn>
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

        <div>
          <q-carousel
            v-model="selectedPage"
            swipeable
            infinite
            style="height: 90vh">
            <q-carousel-slide
              v-for="(menuTableIndex, tableIndex) in ds(currentStore.menu_table_ids)"
              :key="tableIndex"
              :name="tableIndex"
              class="row wrap justify-center">
              <div
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
                        {{ convertPrice(allMenus[menuIndex].menu_price) }}원
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-img
                        fit="fill"
                        no-transition no-spinner
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
            </q-carousel-slide>
            <q-carousel-slide
            class="row wrap justify-center"
            :name="ds(currentStore.menu_table_ids).length">
            <div
            class=""
            style="width: 100vw; max-width: 400px">
            <q-img
              fit="fill"
              no-transition no-spinner
              :src="baseURL + '/static/images/menuTable/Sample_data_1.png'">
              <template v-slot:error>
                <div class="absolute-full flex flex-center bg-grey-4 text-white">
                </div>
              </template>
            </q-img>
          </div>
            </q-carousel-slide>
          </q-carousel>
        </div>
      </div>
      <div v-else>
        <div class="q-pa-md q-gutter-sm">
          <q-btn
            v-for="tableIndex in 10"
            :key="tableIndex"
            :class="{ 'bg-grey-4' : selectedPage2 != tableIndex, 'bg-grey-10 text-white' : selectedPage2 == tableIndex }"
            :ripple="false"
            flat
            @click="selectedPage2 = tableIndex">
            {{ parseInt(tableIndex)}} p
          </q-btn>
        </div>

        <div>
          <q-carousel
            v-model="selectedPage2"
            swipeable
            infinite
            style="height: 90vh">
            <q-carousel-slide
              v-for="(tableIndex) in 10"
              :key="tableIndex"
              :name="tableIndex"
              class="row wrap justify-center">
              <div
                class=""
                style="width: 100vw; max-width: 400px">
                <q-img
                  fit="fill"
                  no-transition
                  :src="baseURL + '/static/images/menuTable/Sample_data_' + tableIndex + '.png'">
                  <template v-slot:error>
                    <div class="absolute-full flex flex-center bg-grey-4 text-white">
                    </div>
                  </template>
                </q-img>
              </div>
            </q-carousel-slide>
          </q-carousel>
        </div>
      </div>
    </div>


    <q-dialog
      v-model="isOpenMenuDialog"
      position="bottom">
      <q-card
        style="width: 100vw; max-width: 450px">

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
                <div class="text-subtitle1">{{ convertPrice(opt.price) }}원</div>
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
                  <div class="text-subtitle1">+{{ convertPrice(opt.price) }}원</div>
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
                  <div class="text-subtitle1">+{{ convertPrice(opt.price) }}원</div>
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
              @click="currentMenuOption.number++"/>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section class="q-px-sm row justify-between">
          <div class="q-px-md q-pb-sm  text-h6 text-bold">
            총 가격
          </div>
          <div class="">
            <span class="text-subtitle1 text-bold q-px-lg">
              {{ convertPrice(calTotalPrice(currentMenuId)) }}
            </span>
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
    const { insertCart, resetCart, convertPrice } = cartStore;

    const cartLength = computed(() => {
      return Object.keys(cart.value).length;
    });
    const existCart = computed(() => {
      if (Object.keys(cart.value).length == 0) {
        return false;
      }
      return true;
    });

    onMounted(() => {
      setBottomTab("menu");
    });

    // select menu to cart
    var isOpenMenuDialog = ref(false);
    var currentMenuId = ref(0);
    var currentMenuOption = ref({
        menu_id: 0,
        price_option_value: 0, // price option
        add_option_values: [], // add option
        menu_price: 0,
        menu_add_price: 0,
        number: 1,
    });
    function openMenuDialog(menuId) {
      // initial object
      isOpenMenuDialog.value = true;

      // selected menu id
      currentMenuId.value = menuId;

      // selected menu option
      currentMenuOption.value = {
        menu_id: menuId,
        price_option_value: 0,
        add_option_values: [],
        menu_price: 0,
        menu_add_price: 0,
        number: 1,
      };

      // initial options
      // init price option
      var price_options = ds(allMenus.value[currentMenuId.value].menu_price_options);
      currentMenuOption.value.price_option_value = price_options.options[0].value

      // init add option
      var add_options = ds(allMenus.value[currentMenuId.value].menu_additional_options);
      for(const add_option of add_options) {
        // if button
        if(add_option.type == 0) {
          currentMenuOption.value.add_option_values.push(add_option.options[0].value)
        }
        // if checkbox
        else if(add_option.type == 1) {
          currentMenuOption.value.add_option_values.push([]);
        }
      }
    }

    function calTotalPrice() {
      //console.log(currentMenuOption.value)
      // menu price, menu add price 계산
      var menuId = currentMenuOption.value.menu_id;
      var menuInfo = allMenus.value[menuId];

      var menuPriceInfo = ds(menuInfo.menu_price_options);
      var menuAddInfo = ds(menuInfo.menu_additional_options);

      var selectedPriceOption = currentMenuOption.value.price_option_value;
      var selectedAddOption = currentMenuOption.value.add_option_values;

      // cal price
      var price = menuPriceInfo.options[selectedPriceOption].price;
      currentMenuOption.value.menu_price = price;

      // cal add price
      var addPrice = 0;
      menuAddInfo.forEach((addInfo, index) => {
        var type = addInfo.type;
        if(type == 0) {
          // option
          addPrice += addInfo.options[selectedAddOption[index]].price;
        }
        else if(type == 1) {
          // checkbox
          selectedAddOption[index].forEach((addIndex) => {
            addPrice += addInfo.options[addIndex].price;
          })
        }
      })
      currentMenuOption.value.menu_add_price = addPrice;
      //console.log(price, addPrice);

      return (price + addPrice) * currentMenuOption.value.number;
    }

    // add menu to cart
    function addToCart() {
      // menu price, menu add price 계산
      calTotalPrice();

      //insert cart menuId, selectedInfo
      var menuId = currentMenuOption.value.menu_id;
      insertCart(menuId, currentMenuOption.value);

      //TODO duplicated menuId
      //TODO to server
    }

    return {
      selectedPage: ref(0),

      currentStore,
      allMenus,
      allMenuTables,
      baseURL,
      ds,
      convertPrice,

      isOpenMenuDialog,
      currentMenuId,
      currentMenuOption,
      openMenuDialog,
      calTotalPrice,

      addToCart,
      menuOption: ref(true),
      selectedPage2: ref(1),
    };
  },
});
</script>
<style lang="sass" scoped>
</style>
