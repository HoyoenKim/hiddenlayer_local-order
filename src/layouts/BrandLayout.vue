<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer v-if="existCart" class="bg-white">
      <div>
        <q-list bordered separator>
          <q-item
            v-if="currentPath == '/menu'"
            clickable
            to="/cart"
            class="text-center text-h6 bg-blue text-white"
          >
            <q-item-section>장바구니 보기</q-item-section>
          </q-item>
          <q-item
            v-if="currentPath == '/cart'"
            ripple="false"
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
      <div class="q-pl-sm">
        <q-card-section>
          <div class="text-h6 text-center">주문 최종 확인</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pt-none">
          <div class="column wrap fit q-gutter-md q-pt-md">
            <q-card v-for="value in cart" :key="value" flat bordered>
              <q-card-section horizontal class="text-h6 text-bold">
                <q-item class="fit">
                  <q-item-section>
                    {{ value.storeName }}
                  </q-item-section>
                </q-item>
              </q-card-section>
              <q-card-section class="q-px-xs">
                <q-item dense class="fit">
                  <q-item-section class="text-subtitle1">
                    <q-item-label>{{ value.title }}</q-item-label>
                    <q-item-label class="q-pl-sm" caption
                      >{{ value.price }} {{ value.priceUnit }}</q-item-label
                    >
                  </q-item-section>
                </q-item>
              </q-card-section>
              <q-card-section class="q-pt-none q-px-xs">
                <q-item dense class="fit">
                  <q-item-section class="text-subtitle1">
                    <q-item-label>HOT / ICE</q-item-label>
                    <q-item-label class="q-pl-sm" caption>{{
                      value.tempOption
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-card-section>
              <q-card-section class="q-pt-none q-px-xs">
                <q-item dense class="fit">
                  <q-item-section class="text-subtitle1">
                    <q-item-label>커피 농도</q-item-label>
                    <q-item-label class="q-pl-sm" caption>{{
                      value.denseOption
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-card-section>
              <q-card-section class="q-pt-none q-px-xs">
                <q-item dense class="fit">
                  <q-item-section class="text-subtitle1">
                    <q-item-label>총 가격</q-item-label>
                    <q-item-label class="q-pl-sm" caption
                      >{{ value.price * value.number }}
                      {{ value.priceUnit }}</q-item-label
                    >
                  </q-item-section>
                  <q-item-section side class="text-black">
                    <q-item-label>
                      <span class="q-px-lg">{{ value.number }} 개</span>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-card-section>
            </q-card>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pt-none">
          <div class="column wrap fit q-gutter-md q-pt-md">
            <q-card flat bordered>
              <q-card-section horizontal class="text-h6 text-bold">
                <q-item class="fit">
                  <q-item-section> 주문자 정보 </q-item-section>
                </q-item>
              </q-card-section>
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
              <q-card-section class="q-pt-none q-px-xs">
                <q-item dense class="fit">
                  <q-item-section class="text-subtitle1">
                    <q-item-label>전화번호</q-item-label>
                    <q-item-label class="q-pl-sm" caption>{{
                      phone
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-card-section>
              <q-card-section class="q-pt-none q-px-xs">
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
          <div class="column wrap fit q-gutter-md q-pt-md">
            <q-card flat bordered>
              <q-card-section horizontal class="text-h6 text-bold">
                <q-item class="fit">
                  <q-item-section> 주문 정보 </q-item-section>
                </q-item>
              </q-card-section>
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
              <q-card-section class="q-pt-none">
                <q-option-group
                  v-model="payment"
                  :options="paymentOptions"
                  color="primary"
                />
              </q-card-section>
            </q-card>
          </div>
        </q-card-section>
        <q-separator />
      </div>
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
</template>

<script>
import { defineComponent, ref, computed, onMounted } from "vue";
import { useCartStore } from "src/stores/cartInfo";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import EventNotifications from "src/components/EventNotifications.vue";

const linksList = [
  {
    title: "Notion",
    caption: "재야의 커피",
    icon: "school",
    link: "https://nice-kumquat-8b2.notion.site/6a97c7144099478db97251e8143c2bb3",
  },
  {
    title: "Kakao Channel",
    caption: "커피 주문 카카오 챗봇",
    icon: "record_voice_over",
    link: "https://pf.kakao.com/_bBWJxj",
  },
  {
    title: "Instagram",
    caption: "@gistcoffeebean",
    icon: "public",
    link: "https://www.instagram.com/gistcoffeebean/",
  },
];

export default defineComponent({
  name: "BrandLayout",

  components: {
    //EventNotifications,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    const router = useRouter();

    const cartStore = useCartStore();
    // use destructuring to use the store in the template
    const { cart, name, phone, roomNumber, orderValidation } =
      storeToRefs(cartStore); // state and getters need "storeToRefs"
    const { insertCart, deleteCart, sendCartToServer, resetCart } = cartStore; // actions can be destructured directly

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
      for (const [key, value] of Object.entries(cart.value)) {
        price += value.price * value.number;
      }
      return price;
    });

    var currentPath = computed(() => {
      return router.currentRoute.value.path;
    });

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
      tab: ref("search"),
      existCart,
      currentPath,
      orderValidation,
      orderCheck: ref(false),
      cart,
      totalPrice,
      payment: "account",
      paymentOptions: [{ label: "계좌 이체", value: "account" }],
      name,
      phone,
      roomNumber,
      sendToServer() {
        sendCartToServer();
        resetCart();
        router.push({ path: "/" });
      },
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
