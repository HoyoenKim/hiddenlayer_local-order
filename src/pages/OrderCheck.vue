<template>
  <q-page class="flex-center">
    <div class="q-pt-lg text-h5 text-center">주문 확인</div>
    <div v-if="isForm" class="q-pa-md">
      <form
        @submit.prevent.stop="onSubmit"
        @reset.prevent.stop="onReset"
        class="q-gutter-sm"
      >
        <q-input
          outlined
          ref="nameRef"
          v-model="name"
          label="주문자 정보 *"
          :rules="nameRules"
        />

        <q-input
          outlined
          ref="phoneRef"
          v-model="phone"
          label="휴대폰 번호 *"
          mask="(###) #### - ####"
          :rules="phoneRules"
        />

        <q-input
          outlined
          ref="passwordRef"
          v-model="password"
          label="비밀번호 *"
          :type="isPwd ? 'password' : 'text'"
          :rules="passwordRules"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <div>
          <q-btn label="확인" type="submit" color="primary" />
          <q-btn
            label="취소"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </form>
    </div>
    <div v-else class="q-pa-md">
      <div>{{ orders }}</div>
      <div>{{ allStores }}</div>
      <div>{{ allMenus }}</div>
      <div v-for="order in orders" :key="order">
        {{ order }}
      </div>
      <div class="column wrap fit q-pt-md q-gutter-md">
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
                  orders[0].user_name
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
                  orders[0].user_phone
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
                  >{{ orders[0].user_location }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
        <q-card v-for="(order, index) in orders" :key="order" flat bordered>
          <q-card-section horizontal class="text-subtitle1 text-bold">
            <q-item class="fit">
              <q-item-section>
                주문 {{ index + 1 }} ( {{ order.order_time }} )
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-separator />
          <div v-for="(menu_id, index) in ds(order.menu_ids)" :key="menu_id">
            <q-card-section class="q-px-xs">
              <q-item dense class="fit">
                <q-item-section class="text-subtitle1">
                  <q-item-label>{{ menu_id }} {{ index }}</q-item-label>
                  <q-item-label class="q-pl-sm" caption></q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
            <q-separator />
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { storeToRefs } from "pinia";
import { useStoreInfo } from "src/stores/storeInfo";
import { useOrderCheckStore } from "stores/orderCheck";

export default defineComponent({
  name: "OrderCheck",
  setup() {
    // store information
    const storeInfo = useStoreInfo();
    const { allStores, allMenus } = storeToRefs(storeInfo);

    // order information
    const orderCheckStore = useOrderCheckStore();
    const { orders } = storeToRefs(orderCheckStore);
    const { checkOrder } = orderCheckStore;

    var isForm = ref(true);

    // to fill forms
    var name = ref("김호연");
    var nameRef = ref(null);
    var phone = ref("(010) 2128 - 7164");
    var phoneRef = ref(null);
    var password = ref("1234");
    var passwordRef = ref(null);

    function onSubmit() {
      nameRef.value.validate();
      phoneRef.value.validate();
      passwordRef.value.validate();

      if (
        nameRef.value.hasError ||
        phoneRef.value.hasError ||
        passwordRef.value.hasError
      ) {
        // form has error
      } else {
        checkOrder(name.value, phone.value, password.value);
        isForm.value = false;
      }
    }

    function onReset() {
      name.value = null;
      phone.value = null;
      password.value = null;

      nameRef.value.resetValidation();
      phoneRef.value.resetValidation();
      passwordRef.value.resetValidation();
    }

    // to deserialize the json string
    function ds(string) {
      return JSON.parse(string);
    }

    return {
      isForm,

      name,
      nameRef,
      nameRules: [(val) => (val && val.length > 0) || "이름을 입력해 주세요."],
      phone,
      phoneRef,
      phoneRules: [
        (val) => (val !== null && val !== "") || "전화번호를 입력해 주세요.",
      ],
      password,
      passwordRef,
      passwordRules: [
        (val) => (val !== null && val !== "") || "비밀번호를 입력해 주세요.",
      ],
      isPwd: true,
      checkOrder,
      onSubmit,
      onReset,

      orders,
      allStores,
      allMenus,
      ds,
    };
  },
});
</script>
