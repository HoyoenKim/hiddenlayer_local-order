<template>
  <q-page class="flex-center">
    <q-expansion-item
      default-opened
      label="주문 내역"
      class="q-pb-md"
      header-class="bg-grey-4">
      <div
        class="q-pt-md fit row justify-center">
        <div
          class="column q-gutter-md"
          style="width: 95vw; max-width: 400px">
          <q-card
            v-for="(currentMenuOption, currentMenuId) in cart"
            :key="currentMenuId"
            flat bordered>
            <q-card-section
              class="q-pa-none q-pt-sm">
              <q-item class="fit q-pr-none">
                <q-item-section>
                  <q-item-label
                    class="text-h6 text-bold">
                    {{ allMenus[currentMenuId].menu_title }}
                  </q-item-label>
                  <q-item-label
                    class="text-subtitle-1 q-pl-sm">
                    {{ allStores[allMenus[currentMenuId].store_id].store_title }}
                  </q-item-label>
                </q-item-section>
                <q-item-section class="text-black" side>
                  <q-btn
                    flat
                    size="md"
                    icon="delete"
                    @click="deleteCart(currentMenuId)"/>
                </q-item-section>
              </q-item>
            </q-card-section>
            
            <q-separator />
           
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
                    style="width: 80vw; max-width: 320px">
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
                      style="width: 80vw; max-width: 320px">
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
                      style="width: 80vw; max-width: 320px">
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
                  size="sm"
                  icon="arrow_downward"
                  :ripple="false"
                  round outline
                  @click="if (currentMenuOption.number > 1) currentMenuOption.number--;"/>
                <span class="text-subtitle1 text-bold q-px-lg">{{ currentMenuOption.number }}</span>
                <q-btn
                  size="sm"
                  icon="arrow_upward"
                  :ripple="false"
                  round outline
                  @click="currentMenuOption.number++"/>
              </div>
            </q-card-section>
            
            <q-separator />
            
            <q-card-section class="q-px-sm q-pb-sm row justify-between">
              <div class="q-px-md q-pb-sm  text-h6 text-bold">
                총 가격
              </div>
              <div class="">
                <span class="text-subtitle1 text-bold q-px-lg">
                  {{ convertPrice(calTotalPrice(currentMenuId)) }}
                </span>
              </div>
            </q-card-section>

          </q-card>
        </div>
      </div>
    </q-expansion-item>
        
    <q-expansion-item
      default-opened
      label="주문자 정보"
      class="q-pb-md"
      header-class="bg-grey-4">
      <div
        class="q-pt-md fit row justify-center">
        <div
          class="column q-gutter-md"
          style="width: 95vw; max-width: 400px">
          <q-card flat bordered>
            
            <q-card-section class="q-px-sm q-pb-none">
              <div class="q-px-md q-pb-md text-h6 text-bold">
                닉네임 *
              </div>
              <q-input
                v-model="name"
                label="주문자 정보"
                dense outlined lazy-rules
                :rules="[ (val) => (val && val.length > 0) || '주문자 정보를 입력해 주세요.',]"/>
            </q-card-section>
            <q-separator />
            <q-card-section class="q-px-sm">
              <div class="q-px-md q-pb-md text-h6 text-bold">
                전화번호 *
              </div>
              <q-input
                v-model="phone"
                label="휴대폰 번호"
                hint="주문 확인 시 사용됩니다."
                mask="(###) #### - ####"
                dense outlined/>
            </q-card-section>
            <q-separator />
            <q-card-section class="q-px-sm">
              <div class="q-px-md q-pb-md text-h6 text-bold">
                주문 비밀번호 *
              </div>
              <q-input
                v-model="password"
                label="비밀번호 *"
                hint="주문 확인 시 사용됩니다."
                :type="isPwd ? 'password' : 'text'"
                dense outlined>
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </q-card-section>
            <q-separator />
            <q-card-section class="q-px-sm">
              <div class="q-px-md q-pb-md text-h6 text-bold">
                배송지 *
              </div>
              <q-input
                v-model="roomNumber"
                label="배송지"
                hint="기숙사 사물함 호수"
                dense outlined lazy-rules
                :rules="[ (val) => (val && val.length > 0 && val.length < 5) || '배송지를 정확하게 입력해주세요.', ]"/>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-expansion-item>

    <q-expansion-item
      default-opened
      label="주문 정보"
      class="q-pb-md"
      header-class="bg-grey-4">
      <div
        class="q-pt-md fit row justify-center">
        <div
          class="column q-gutter-md"
          style="width: 95vw; max-width: 400px">
          <q-card flat bordered>
            <q-card-section class="q-px-sm">
              <div class="q-px-md q-pb-md text-h6 text-bold">
                배송 시간
              </div>
              <div class="q-px-lg text-subtitle1">
                {{ getOrderDate() }} 13:00
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section class="q-px-sm">
              <div class="q-px-md q-pb-md text-h6 text-bold">
                총 결제 금액
              </div>
              <div class="q-px-lg text-subtitle1">
                {{ convertPrice(totalPrice) }}
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section class="q-px-sm">
              <div class="q-px-md q-pb-md text-h6 text-bold">
                결제 방법
              </div>
              <q-option-group
                v-model="payment"
                class="text-subtitle1"
                :options="paymentOptions"
                color="primary"/>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-expansion-item>
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
  name: "CartPage",
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
    const { allStores, allMenus } = storeToRefs(storeInfo);

    // cart information
    const cartStore = useCartStore();
    const { cart, name, phone, password, roomNumber } = storeToRefs(cartStore);
    const { deleteCart, convertPrice } = cartStore;
    // getter error why?
    const totalPrice = computed(() => {
      var price = 0;
      for (const [menuId, menu] of Object.entries(cart.value)) {
        // TODO 추가 옵션으로 추가 비용 생기면 어떻게 계산?
        price += calTotalPrice(menuId);
      }
      return price;
    });

    function getOrderDate() {
      let today = new Date(Date.now());
      let date = today.getHours();
      if(date > 12) {
        today.setDate(today.getDate() + 1);
      }

      let year = today.getFullYear(); // 년도
      let month = today.getMonth() + 1;  // 월
      date = today.getDate();  // 날짜

      return year + '-' + month.toString().padStart(2, '0') + '-' + date.toString().padStart(2, '0');
    }

    function calTotalPrice(currentMenuId) {
      var currentMenuOption = cart.value[currentMenuId]

      // menu price, menu add price 계산
      var menuId = currentMenuOption.menu_id;
      var menuInfo = allMenus.value[menuId];

      var menuPriceInfo = ds(menuInfo.menu_price_options);
      var menuAddInfo = ds(menuInfo.menu_additional_options);

      var selectedPriceOption = currentMenuOption.price_option_value;
      var selectedAddOption = currentMenuOption.add_option_values;

      // cal price
      var price = menuPriceInfo.options[selectedPriceOption].price;
      currentMenuOption.menu_price = price;

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
      currentMenuOption.menu_add_price = addPrice;

      return (price + addPrice) * currentMenuOption.number;
    }

    return {
      allMenus,
      allStores,

      cart,
      deleteCart,
      convertPrice,
      ds,
      calTotalPrice,
      getOrderDate,

      name,
      phone,
      password,
      roomNumber,
      isPwd: ref(true),

      payment: "account",
      paymentOptions: [
        {
          label: "계좌 이체 (우리은행 류현석 1002-657-201417)",
          value: "account",
        },
      ],
      totalPrice,
    };
  },
});
</script>
<style lang="sass" scoped>
.cart-card
  width: 95vw
  max-width: 400px
</style>
