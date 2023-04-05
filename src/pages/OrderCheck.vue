<template>
  <q-page class="flex-center">
    <div class="q-pt-lg text-h5 text-center">주문 확인</div>
    <div v-if="isForm" class="q-pa-md">
      <form
        class="q-gutter-sm"
        @submit.prevent.stop="onSubmit"
        @reset.prevent.stop="onReset"
      >
        <q-input
          outlined
          ref="nameRef"
          v-model="Name"
          label="주문자 정보 *"
          :rules="nameRules"
        />
        <q-input
          outlined
          ref="phoneRef"
          v-model="Phone"
          label="휴대폰 번호 *"
          mask="(###) #### - ####"
          :rules="phoneRules"
        />
        <q-input
          outlined
          ref="passwordRef"
          v-model="Password"
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
    <div v-else class="q-pl-md q-pb-lg">
      <div class="column wrap fit q-pt-md q-gutter-md">
        <q-card flat bordered>
          <q-card-section horizontal class="text-subtitle1 text-bold">
            <q-item class="fit">
              <q-item-section> 주문자 정보 </q-item-section>
              <q-item-section side>
                <q-btn
                  icon="close"
                  size="sm"
                  flat
                  round
                  :ripple="false"
                  @click="isForm = true"
                ></q-btn>
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-separator />
          <q-card-section class="q-px-xs">
            <q-item dense class="fit">
              <q-item-section class="text-subtitle1">
                <q-item-label>닉네임</q-item-label>
                <q-item-label class="q-pl-sm" caption>{{ Name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-separator />
          <q-card-section class="q-px-xs">
            <q-item dense class="fit">
              <q-item-section class="text-subtitle1">
                <q-item-label>전화번호</q-item-label>
                <q-item-label class="q-pl-sm" caption>{{ Phone }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
        <div v-if="orders === undefined || orders.length == 0">
          <q-card flat bordered>
            <q-card-section horizontal class="text-center">
              <q-item class="fit">
                <q-item-section>
                  <div class="text-h6 q-pb-sm">주문 내역이 없습니다</div>
                  <div>
                    주문 시 사용한 사용자 닉네임, 전화번호, 비밀번호가 맞는지
                    다시 확인해 주세요.
                  </div>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>
        </div>
        <q-card
          v-else
          v-for="(order, orderIndex) in orders"
          :key="orderIndex"
          flat
          bordered
        >
          <q-card-section horizontal class="text-center">
            <q-item class="fit">
              <q-item-section>
                <span class="text-h6">주문 {{ orderIndex + 1 }}</span>
                {{ getDateTimeString(order.order_time) }}
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-separator />
          <div
            v-for="(menu_id, menuIndex) in ds(order.menu_ids)"
            :key="menuIndex"
          >
            <q-card-section class="q-px-xs">
              <q-item dense class="fit column q-col-gutter-md">
                <q-item-section
                  class="text-subtitle1 q-pl-lg q-pt-md q-pb-none"
                >
                  <q-item-label
                    >{{ getMenuInfo(menu_id).menu_title }}
                  </q-item-label>
                  <q-item-label class="q-pl-sm" caption>{{
                    getStoreInfo(getMenuInfo(menu_id).store_id).store_title
                  }}</q-item-label>
                </q-item-section>
                <q-item-section class="text-subtitle1">
                  <q-item-label>배송지</q-item-label>
                  <q-item-label class="q-pl-sm" caption>{{
                    order.user_location
                  }}</q-item-label>
                </q-item-section>
                <!--<q-item-section
                  v-for="(menu_option, menu_option_index) in ds(
                    getMenuInfo(menu_id).menu_options
                  )"
                  :key="menu_option_index"
                  class="text-subtitle1"
                >
                  <q-item-label>{{ menu_option[0] }}</q-item-label>
                  <div
                    v-for="menu_option_detail in menu_option.slice(1)"
                    :key="menu_option_detail"
                  >
                    <q-item-label
                      v-if="
                        menu_option_detail.value ==
                        ds(order.menu_options)[menuIndex][
                          menu_option_index
                        ].toString()
                      "
                      class="q-pl-sm"
                      caption
                      >{{ menu_option_detail.label }}
                    </q-item-label>
                  </div>
                </q-item-section>
                <q-item-section class="text-subtitle1">
                  <q-item-label>수량 </q-item-label>
                  <q-item-label class="q-pl-sm" caption>{{
                    ds(order.menu_options)[menuIndex].slice(-1)[0]
                  }}</q-item-label>
                </q-item-section>-->
              </q-item>
            </q-card-section>
            <q-separator />
          </div>
          <q-card-actions align="around">
            <q-btn
              :ripple="false"
              v-if="order.is_payed == 0"
              flat
              color="red"
              @click="alert = true"
              >송금 하기 (미송금)</q-btn
            >
            <q-btn :ripple="false" v-else flat>송금 하기 (송금 완료)</q-btn>
            <q-btn
              :ripple="false"
              color="blue"
              flat
              @click="deleteOrderSet(order.order_id, orderIndex)"
              >취소하기</q-btn
            >
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="alert">
      <q-card style="width: 60vw; max-width: 500px">
        <q-card-section>
          <div class="text-h6">송금 계좌</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          우리은행 류현석 1002-657-201417
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="확인" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="cancle">
      <q-card style="width: 60vw; max-width: 500px">
        <q-card-section>
          <div class="text-h6">주문 취소</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div>정말로 주문을 취소하겠습니까?</div>
          <div>(송금 이후 주문 취소 시 환불에 시간이 걸립니다.)</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="주문 취소"
            color="primary"
            v-close-popup
            @click="deleteOrder(currentOrderId, currentOrderIndex)"
          />
          <q-btn flat label="돌아가기" color="black" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useRouteInfo } from "src/stores/routeInfo";
import { useStoreInfo } from "src/stores/storeInfo";
import { useOrderCheckStore } from "src/stores/orderCheck";

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
    const { checkOrder, setIsForm, deleteOrder } = orderCheckStore;

    onMounted(() => {
      setBottomTab('check');
    });    

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
        checkOrder();
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
    };
  },
});
</script>
