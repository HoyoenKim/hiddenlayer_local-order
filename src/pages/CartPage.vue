<template>
  <q-page class="flex-center">
    <q-toolbar>
      <q-btn flat dense>
        <q-icon name="arrow_back" @click="toMenuPage()" />
      </q-btn>
      <q-toolbar-title class="q-pt-xs"> 장바구니 </q-toolbar-title>
      <q-btn flat dense @click="toHomePage()">
        <q-icon name="home" />
      </q-btn>
    </q-toolbar>
    <q-expansion-item
      default-opened
      v-model="expanded1"
      header-class="bg-grey-4"
      class="q-pb-md"
    >
      <template v-slot:header>
        <q-item-section class="text-h6 q-pa-sm">
          <q-item-label>주문 내역</q-item-label>
        </q-item-section>
      </template>
      <div
        class="fit column wrap justify-center items-center content-center q-gutter-md q-pt-md"
      >
        <q-card
          v-for="value in cart"
          :key="value"
          class="my-card"
          flat
          bordered
        >
          <q-card-section horizontal class="text-h6 text-bold">
            <q-item class="fit">
              <q-item-section>
                {{ value.storeName }}
              </q-item-section>
              <q-item-section avatar="">
                <q-btn
                  flat
                  size="md"
                  icon="delete"
                  @click="deleteCart(value.title)"
                ></q-btn> </q-item-section
            ></q-item>
          </q-card-section>
          <q-separator />
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
                  <q-btn
                    round
                    size="sm"
                    :ripple="false"
                    outline
                    icon="arrow_downward"
                    @click="
                      if (value.number > 1) {
                        value.number--;
                      }
                    "
                  ></q-btn>
                  <span class="q-px-lg">{{ value.number }}</span>
                  <q-btn
                    round
                    size="sm"
                    :ripple="false"
                    outline
                    icon="arrow_upward"
                    @click="value.number++"
                  ></q-btn>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
    </q-expansion-item>
    <q-expansion-item
      default-opened
      v-model="expanded1"
      header-class="bg-grey-4"
      class="q-pb-md"
    >
      <template v-slot:header>
        <q-item-section class="text-h6 q-pa-sm">
          <q-item-label>주문자 정보</q-item-label>
        </q-item-section>
      </template>
      <div
        class="fit column wrap justify-center items-center content-center q-gutter-md q-pt-md"
      >
        <q-form>
          <q-card flat bordered class="my-card">
            <q-card-section class="q-px-xs q-pb-none">
              <q-item dense class="fit">
                <q-item-section class="text-subtitle1">
                  <q-item-label>닉네임 *</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
            <q-card-section class="q-py-xs">
              <q-input
                dense
                outlined
                v-model="name"
                label="주문자 정보"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || '주문자 정보를 입력해 주세요.',
                ]"
              />
            </q-card-section>
            <q-card-section class="q-px-xs q-py-none">
              <q-item dense class="fit">
                <q-item-section class="text-subtitle1">
                  <q-item-label>전화번호 *</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
            <q-card-section class="q-py-xs">
              <q-input
                dense
                outlined
                v-model="phone"
                label="휴대폰 번호"
                hint="주문 확인 시 사용됩니다."
                mask="(###) #### - ####"
              />
            </q-card-section>
            <q-card-section class="q-px-xs q-pb-none">
              <q-item dense class="fit">
                <q-item-section class="text-subtitle1">
                  <q-item-label>주문 비밀번호 *</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
            <q-card-section class="q-py-xs">
              <q-input
                dense
                outlined
                v-model="password"
                label="비밀번호 *"
                hint="주문 확인 시 사용됩니다."
                :type="isPwd ? 'password' : 'text'"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </q-card-section>
            <q-card-section class="q-px-xs q-pb-none">
              <q-item dense class="fit">
                <q-item-section class="text-subtitle1">
                  <q-item-label>배송지 (기숙사 사물함 호수) *</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
            <q-card-section class="q-py-xs">
              <q-input
                dense
                outlined
                v-model="roomNumber"
                label="배송지"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0 && val.length < 5) ||
                    '배송지를 정확하게 입력해주세요.',
                ]"
              />
            </q-card-section>
            <q-separator />
          </q-card>
        </q-form>
      </div>
    </q-expansion-item>
    <q-expansion-item
      default-opened
      v-model="expanded1"
      header-class="bg-grey-4"
      class="q-pb-md"
    >
      <template v-slot:header>
        <q-item-section class="text-h6 q-pa-sm">
          <q-item-label>주문 정보</q-item-label>
        </q-item-section>
      </template>
      <div
        class="fit column wrap justify-center items-center content-center q-gutter-md q-pt-md"
      >
        <q-card flat bordered class="my-card">
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
    </q-expansion-item>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useStoreInfo } from "src/stores/storeInfo";
import { useCartStore } from "src/stores/cartInfo";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import CoffeeCard from "components/CoffeeCard.vue";

export default defineComponent({
  name: "CartPage",
  components: {
    //CoffeeCard,
  },
  setup() {
    const store = useStoreInfo();
    // use destructuring to use the store in the template
    const { storeName } = storeToRefs(store); // state and getters need "storeToRefs"
    const { increment } = store; // actions can be destructured directly

    const router = useRouter();

    function toMenuPage() {
      router.push({ path: "/Menu" });
    }

    function toHomePage() {
      router.push({ path: "/" });
    }

    const cartStore = useCartStore();
    // use destructuring to use the store in the template
    const { cart, name, phone, password, roomNumber } = storeToRefs(cartStore); // state and getters need "storeToRefs"
    const { insertCart, deleteCart } = cartStore; // actions can be destructured directly

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

    return {
      toMenuPage,
      toHomePage,
      cartLength,
      existCart,
      totalPrice,
      cart,
      deleteCart,
      name,
      phone,
      password,
      isPwd: ref(true),
      roomNumber,
      expanded1: ref(true),
      expanded2: ref(true),
      payment: "account",
      paymentOptions: [{ label: "계좌 이체", value: "account" }],
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
