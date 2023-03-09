<template>
  <q-page class="flex-center">
    <!--<div>
      {{ cart }}
    </div>-->
    <q-toolbar>
      <q-btn flat dense @click="toMenuPage()">
        <q-icon name="arrow_back" />
      </q-btn>
      <q-toolbar-title class="q-pt-xs"> 장바구니 </q-toolbar-title>
      <q-btn flat dense @click="toHomePage()">
        <q-icon name="home" />
      </q-btn>
    </q-toolbar>

    <q-expansion-item
      default-opened
      label="주문 내역"
      class="q-pb-md"
      header-class="bg-grey-4"
    >
      <div
        class="fit column wrap justify-center items-center content-center q-gutter-md q-pt-md"
      >
        <q-card
          v-for="(menu, menuId) in cart"
          :key="menuId"
          class="cart-card"
          flat
          bordered
        >
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
              <q-item-section avatar="">
                <q-btn
                  flat
                  size="md"
                  icon="delete"
                  @click="deleteCart(menuId)"
                ></q-btn> </q-item-section
            ></q-item>
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
                  <q-btn
                    round
                    size="sm"
                    :ripple="false"
                    outline
                    icon="arrow_downward"
                    @click="
                      if (menu.menu_option_select.number > 1) {
                        menu.menu_option_select.number--;
                      }
                    "
                  ></q-btn>
                  <span class="q-px-lg">{{
                    menu.menu_option_select.number
                  }}</span>
                  <q-btn
                    round
                    size="sm"
                    :ripple="false"
                    outline
                    icon="arrow_upward"
                    @click="menu.menu_option_select.number++"
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
      label="주문자 정보"
      class="q-pb-md"
      header-class="bg-grey-4"
    >
      <div
        class="fit column wrap justify-center items-center content-center q-gutter-md q-pt-md"
      >
        <q-form>
          <q-card flat bordered class="cart-card">
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
          </q-card>
        </q-form>
      </div>
    </q-expansion-item>

    <q-expansion-item
      default-opened
      label="주문 정보"
      class="q-pb-md"
      header-class="bg-grey-4"
    >
      <div
        class="fit column wrap justify-center items-center content-center q-gutter-md q-pt-md"
      >
        <q-card flat bordered class="cart-card">
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
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useStoreInfo } from "src/stores/storeInfo";
import { useCartStore } from "src/stores/cartInfo";

export default defineComponent({
  name: "CartPage",
  components: {},
  setup() {
    // routing
    const router = useRouter();

    // cart information
    const cartStore = useCartStore();
    const { cart, name, phone, password, roomNumber } = storeToRefs(cartStore);
    const { deleteCart } = cartStore;
    // getter error why?
    const totalPrice = computed(() => {
      var price = 0;
      for (const [menuId, menu] of Object.entries(cart.value)) {
        // TODO 추가 옵션으로 추가 비용 생기면 어떻게 계산?
        price +=
          menu.menu_option_select.menu_price * menu.menu_option_select.number;
      }
      return price;
    });

    // to home page
    function toHomePage() {
      router.push({ path: "/" });
    }

    // to menu page
    function toMenuPage() {
      router.push({ path: "/menu" });
    }

    // to deserialize the json string
    function ds(string) {
      return JSON.parse(string);
    }

    return {
      toHomePage,
      toMenuPage,

      cart,
      deleteCart,
      ds,

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
  max-width: 500px
</style>
