<template>
  <q-page class="flex-center">
    <div class="q-pt-lg text-h5 text-center">주문 확인</div>
    <div class="q-pa-md">
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
        <!--<q-toggle v-model="accept" label="개인정보 제공에 동의합니다" />-->

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useCartStore } from "src/stores/cartInfo";
import { useOrderCheckStore } from "stores/orderCheck";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "OrderCheck",
  setup() {
    const $q = useQuasar();

    const name = ref(null);
    const nameRef = ref(null);

    const phone = ref(null);
    const phoneRef = ref(null);

    const password = ref(null);
    const passwordRef = ref(null);

    const accept = ref(false);

    const orderStore = useOrderCheckStore();
    // use destructuring to use the store in the template
    const { checkOrder } = orderStore; // actions can be destructured directly

    return {
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

      onSubmit() {
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
        }
      },

      onReset() {
        name.value = null;
        phone.value = null;
        password.value = null;

        nameRef.value.resetValidation();
        phoneRef.value.resetValidation();
        passwordRef.value.resetValidation();
      },
    };
  },
});
</script>
