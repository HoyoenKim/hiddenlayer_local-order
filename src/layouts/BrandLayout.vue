<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="bg-white">
      <div>
        <q-list bordered separator>
          <q-item
            v-if="currentPath == '/menu' && existCart"
            clickable
            to="/cart"
            class="text-center text-h6 bg-blue text-white"
          >
            <q-item-section>장바구니 보기</q-item-section>
          </q-item>
          <q-item
            v-if="currentPath == '/cart'"
            :ripple="false"
            class="text-center bg-blue text-white"
          >
            <q-item-section
              ><q-btn
                flat
                :disable="!orderValidation"
                class="text-subtitle1 text-bold"
                @click="orderCheck = true"
                >주문하기</q-btn
              ></q-item-section
            >
          </q-item>
        </q-list>
      </div>
    </q-footer>
  </q-layout>
  <q-dialog v-model="orderCheck" position="bottom">
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
      <q-card-section>
        <div class="text-h5 text-bold text-center">주문 최종 확인</div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pt-none">
        <div class="column wrap q-gutter-md fit q-pt-md">
          <q-card v-for="(menu, menuId) in cart" :key="menuId" flat bordered>
            <q-card-section horizontal class="q-pt-sm">
              <q-item class="fit">
                <q-item-section>
                  <q-item-label class="text-subtitle1 text-bold">{{
                    menu.menu_info.menu_title
                  }}</q-item-label>
                  <q-item-label class="q-pl-sm" caption>{{
                    menu.store_title
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
            <q-separator />
            <q-card-section
              v-for="label in menu.menu_option_label"
              :key="label"
              class="q-px-xs q-pb-none"
            >
              <q-item dense class="fit">
                <q-item-section class="text-subtitle1">
                  <q-item-label>{{ Object.keys(label)[0] }}</q-item-label>
                  <q-item-label class="q-pl-sm" caption>{{
                    Object.values(label)[0]
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
            <q-card-section class="q-px-xs">
              <q-item dense class="fit">
                <q-item-section class="text-subtitle1">
                  <q-item-label>총 가격</q-item-label>
                  <q-item-label class="q-pl-sm" caption
                    >{{
                      menu.menu_option_select.menu_price *
                      menu.menu_option_select.number
                    }}
                    원
                  </q-item-label>
                </q-item-section>
                <q-item-section side class="text-black">
                  <q-item-label>
                    <span class="q-px-lg"
                      >{{ menu.menu_option_select.number }} 개</span
                    >
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pt-none">
        <div class="column wrap fit q-pt-md">
          <q-card flat bordered>
            <q-card-section horizontal class="text-subtitle1 text-bold">
              <q-item class="fit">
                <q-item-section> 주문자 정보 </q-item-section>
              </q-item>
            </q-card-section>
            <q-separator />
            <q-card-section class="q-px-xs">
              <q-item dense class="fit">
                <q-item-section class="text-subtitle1">
                  <q-item-label>닉네임</q-item-label>
                  <q-item-label class="q-pl-sm" caption>{{
                    name
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
            <q-separator />
            <q-card-section class="q-px-xs">
              <q-item dense class="fit">
                <q-item-section class="text-subtitle1">
                  <q-item-label>전화번호</q-item-label>
                  <q-item-label class="q-pl-sm" caption>{{
                    phone
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
            <q-separator />
            <q-card-section class="q-px-xs">
              <q-item dense class="fit">
                <q-item-section class="text-subtitle1">
                  <q-item-label>배송지</q-item-label>
                  <q-item-label class="q-pl-sm" caption
                    >{{ roomNumber }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pt-none">
        <div class="column wrap fit q-pt-md">
          <q-card flat bordered>
            <q-card-section horizontal class="text-subtitle1 text-bold">
              <q-item class="fit">
                <q-item-section> 주문 정보 </q-item-section>
              </q-item>
            </q-card-section>
            <q-separator />
            <q-card-section class="q-px-xs">
              <q-item dense class="fit">
                <q-item-section class="text-subtitle1">
                  <q-item-label>배송 시간</q-item-label>
                  <q-item-label class="q-pl-sm" caption> 13:00</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
            <q-separator />
            <q-card-section class="q-px-xs">
              <q-item dense class="fit">
                <q-item-section class="text-subtitle1">
                  <q-item-label>총 결제 금액</q-item-label>
                  <q-item-label class="q-pl-sm" caption>
                    {{ totalPrice }}</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-card-section>
            <q-separator />
            <q-card-section class="q-px-xs q-pb-none">
              <q-item dense class="fit">
                <q-item-section class="text-subtitle1">
                  <q-item-label>결제 방법</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
            <q-card-section class="q-pt-none q-pb-sm">
              <q-option-group
                v-model="payment"
                :options="paymentOptions"
                color="primary"
              />
            </q-card-section>
          </q-card>
        </div>
      </q-card-section>
      <q-card-actions align="center" class="text-white bg-blue">
        <q-btn
          flat
          :label="totalPrice + '원 주문하기'"
          class="text-h6 bold fit"
          @click="sendToServer()"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="finishOrder">
    <q-card style="width: 300px">
      <q-card-section class="text-center q-pb-none">
        주문이 완료되었습니다.
      </q-card-section>
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="확인" v-close-popup @click="toCheckPage" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useCartStore } from "src/stores/cartInfo";
import { useOrderCheckStore } from "src/stores/orderCheck";

export default defineComponent({
  name: "BrandLayout",
  components: {},
  setup() {
    // routing
    const router = useRouter();
    var currentPath = computed(() => {
      return router.currentRoute.value.path;
    });

    // cart information
    const cartStore = useCartStore();
    const { cart, name, phone, roomNumber, password, orderValidation } =
      storeToRefs(cartStore);
    const { sendCartToServer, resetCart, resetUser } = cartStore;
    // getter error why?
    const cartLength = computed(() => {
      return Object.keys(cart.value).length;
    });
    const existCart = computed(() => {
      if (Object.keys(cart.value).length == 0) {
        return false;
      }
      return true;
    });
    const totalPrice = computed(() => {
      var price = 0;
      for (const [menuId, menu] of Object.entries(cart.value)) {
        // TODO 추가 옵션으로 추가 비용 생기면 어떻게 계산?
        price +=
          menu.menu_option_select.menu_price * menu.menu_option_select.number;
      }
      return price;
    });

    // order information
    const orderCheckStore = useOrderCheckStore();
    const { setIsForm, setName, setPhone, setPassword, checkOrder } =
      orderCheckStore;

    // to brand page
    function toCheckPage() {
      router.push({ path: "/check" });
    }

    var finishOrder = ref(false);
    // create order to server
    function sendToServer() {
      sendCartToServer();
      resetCart();
      setName(name);
      setPhone(phone);
      setPassword(password);
      checkOrder();
      setIsForm(false);
      resetUser();
      finishOrder.value = true;
    }

    return {
      currentPath,
      existCart,
      orderValidation,

      orderCheck: ref(false),

      cart,
      name,
      phone,
      roomNumber,

      payment: "account",
      paymentOptions: [
        {
          label: "계좌 이체",
          value: "account",
        },
      ],
      totalPrice,

      sendToServer,

      finishOrder,
      toCheckPage,
    };
  },
});
</script>
<style lang="sass" scoped>
.my-item
  width: 95vw
  max-width: 500px

.my-card
  width: 95vw
  max-width: 500px
</style>
