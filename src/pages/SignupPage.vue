<template>
  <q-page class="flex-center">
    <div class="q-pt-lg text-h5 text-center">주문 확인</div>
      <form
        class="q-gutter-sm"
        @submit.prevent.stop="onSubmit"
        @reset.prevent.stop="onReset"
      >
        <q-input
          outlined
          ref="nameRef"
          v-model="userEmail"
          label="이메일 *"
          :rules="nameRules"
        />
        <q-input
          outlined
          ref="phoneRef"
          v-model="userName"
          label="이름 *"
          :rules="phoneRules"
        />
        <q-input
          outlined
          ref="passwordRef"
          v-model="userPassword"
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
          <q-btn label="확인" type="submit" color="primary"/>
          <q-btn
            label="취소"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </form>
      <div>
          <q-img
            src="/imgs/kakao_login_large_narrow.png"
            style="max-width:200px"
            @click="kakaoLogin()">

          </q-img>
      </div>
      <p id="token-result"></p>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { api, baseURL } from "boot/axios";
import { storeToRefs } from "pinia";
import { useRouteInfo } from "src/stores/routeInfo";
import { useStoreInfo } from "src/stores/storeInfo";
import { useOrderCheckStore } from "src/stores/orderCheck";
import { LocalStorage, SessionStorage } from "quasar";

export default defineComponent({
  name: "OrderCheck",
  setup() {
    // routing
    const router = useRouter();

    // route, utils
    const routeInfoStore = useRouteInfo();
    const { headerTab, bottomTab } = storeToRefs(routeInfoStore);
    const { setHeaderTab, setBottomTab, ds } = routeInfoStore;

    // store information
    const storeInfo = useStoreInfo();
    const { allStores, allMenus } = storeToRefs(storeInfo);

    // order information
    const orderCheckStore = useOrderCheckStore();
    const { orders, isForm, Name, Phone, Password } =
      storeToRefs(orderCheckStore);
    const { checkOrder, setIsForm, deleteOrder, setAllInfo } = orderCheckStore;

    onMounted(() => {
      setBottomTab('check');
      const script = document.createElement("script");
      script.crossOrigin="anonymous"
      script.integrity="sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx"
      script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
      console.log(script);
      //script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=cc41afe829f5357f1b44183ca6956c7c&autoload=false";
      document.head.appendChild(script);
    });

    var userName = ref('김호연');
    var userEmail = ref('cabinkhy@naver.com');
    var userPassword = ref('1234');

    function singIn() {
      console.log("Hello")
      var query = '/api/auth/signin'
      api
        .post(query, {
          username: userName.value,
          email: userEmail.value,
          password: userPassword.value,
          roles: ['user'],
          createdAt: Date.now(),
          updatedAt: Date.now()
        })
        .then((response) => {console.log(response)})
        .catch((error) => { console.log(error)});
    }

    // to fill forms
    var nameRef = ref(null);
    var phoneRef = ref(null);
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
        singIn();
        setIsForm(false);
      }
    }

    function onReset() {
      Name.value = "";
      Phone.value = "";
      Password.value = "";
      nameRef.value.resetValidation();
      phoneRef.value.resetValidation();
      passwordRef.value.resetValidation();
    }

    function getStoreInfo(storeId) {
      return allStores.value[parseInt(storeId)];
    }

    function getMenuInfo(menuId) {
      return allMenus.value[parseInt(menuId)];
    }

    function getDateTimeString(dateString) {
      var dayString = ["일", "월", "화", "수", "목", "금", "토"];

      var dateObject = new Date(dateString);
      var year = dateObject.getFullYear().toString();
      var month = (dateObject.getMonth() + 1).toString();
      var date = dateObject.getDate().toString();
      var day = dayString[dateObject.getDay()];
      var hour = dateObject.getHours().toString();
      var minute = dateObject.getMinutes().toString();
      //var second = dateObject.getSeconds();

      var ret =
        year +
        "년 " +
        month +
        "월 " +
        date +
        "일 (" +
        day +
        ") " +
        hour.padStart(2, "0") +
        ":" +
        minute.padStart(2, "0");
      return ret;
    }

    var cancle = ref(false);
    var currentOrderId = ref(0);
    var currentOrderIndex = ref(0);
    function deleteOrderSet(orderId, orderIndex) {
      cancle.value = true;
      currentOrderId.value = orderId;
      currentOrderIndex.value = orderIndex;
    }

    function kakaoLogin() {
      console.log('Hello')
      console.log(window.Kakao);
      window.Kakao.init("cc41afe829f5357f1b44183ca6956c7c")
      window.Kakao.Auth.authorize({
        redirectUri: 'http://localhost:8080/',
      });
      displayToken()
    };


  function displayToken() {
    var token = getCookie('authorize-access-token');

    if(token) {
      Kakao.Auth.setAccessToken(token);
      document.querySelector('#token-result').innerText = 'login success, ready to request API';
      document.querySelector('button.api-btn').style.visibility = 'visible';
    }
  }

  function getCookie(name) {
    var parts = document.cookie.split(name + '=');
    if (parts.length === 2) { return parts[1].split(';')[0]; }
  }

    return {
      isForm,

      Name,
      nameRef,
      nameRules: [(val) => (val && val.length > 0) || "이름을 입력해 주세요."],
      Phone,
      phoneRef,
      phoneRules: [
        (val) => (val !== null && val !== "") || "전화번호를 입력해 주세요.",
      ],
      Password,
      passwordRef,
      passwordRules: [
        (val) => (val !== null && val !== "") || "비밀번호를 입력해 주세요.",
      ],
      isPwd: true,

      onSubmit,
      onReset,

      orders,
      allStores,
      allMenus,
      ds,
      getDateTimeString,
      getMenuInfo,
      getStoreInfo,
      setIsForm,

      alert: ref(false),
      cancle,
      currentOrderId,
      currentOrderIndex,
      deleteOrderSet,
      deleteOrder,
      setAllInfo,
      singIn,
      userEmail,
      userName,
      userPassword,
      kakaoLogin
    };
  },
});
</script>
