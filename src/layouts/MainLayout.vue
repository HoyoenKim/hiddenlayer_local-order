<template>
  <q-layout view="hHh lpR fFr">
    <q-header
      class="bg-white" 
      height-hint="98">
      <q-toolbar
        v-if="currentPath == '/brand' || currentPath == '/menu' || currentPath == '/event' || currentPath == '/nfc'"
        class="q-px-sm bg-white text-black justify-between">
        <q-btn
          flat dense
          @click="toHomePage()">
          <q-icon name="arrow_back" />
        </q-btn>
        <q-toolbar-title
          class="q-pt-xs">
          {{ currentStore.store_title }}
        </q-toolbar-title>
        <q-btn
          flat
          @click="toPage('/cart')">
          <q-icon name="shopping_cart" />
          <q-badge
            v-if="existCart"
            color="red" floating>
            {{ cartLength }}
          </q-badge>
        </q-btn>
      </q-toolbar>
      
      <q-toolbar
        v-else-if="currentPath == '/cart'"
        class="bg-white text-black q-px-none">
        <q-btn
          flat dense
          @click="cartRoute()">
          <q-icon name="arrow_back" />
        </q-btn>
        <q-toolbar-title
          class="q-pt-xs">
            장바구니
        </q-toolbar-title>
        <q-btn
          flat dense
          @click="toHomePage()">
          <q-icon name="home" />
        </q-btn>
      </q-toolbar>
      
      <q-toolbar
        v-else-if="currentPath == '/check'"
        class="bg-white text-black q-px-none">
        <q-btn
          flat dense
          @click="toHomePage()">
          <q-icon name="arrow_back" />
        </q-btn>
      </q-toolbar>
      

        <q-toolbar v-else class="column q-pb-md">
          <div class="fit">
            <q-tabs
              v-model="headerTab"
              class="q-pb-sm text-subtitle1 text-bold"
              :breakpoint="100"
              :outside-arrows="true"
              :mobile-arrows="true"
              align="left"
              active-class="bg-white text-black"
              content-class="bg-white text-grey-5"
              indicator-color="transparent"
              @click="headerTabRoute()">
              <q-tab name="near" :ripple="false">
                근처로
              </q-tab>
              <q-tab name="event" :ripple="false">
                이벤트
              </q-tab>
              <q-tab name="list" :ripple="false">
                리스트
              </q-tab>
            </q-tabs>
          </div>
          <div class="fit">
            <q-input
              class="q-px-sm"
              v-model="searchStore"
              dense
              outlined
              label-slot
              color="black"
              type="search">
              <template v-slot:label>
                <div class="text-grey-5">검색어를 입력하세요.</div>
              </template>
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      overlay
      behavior="mobile"
      bordered
      no-swipe-open>
      <q-list>
        <EventNotifications></EventNotifications>
      </q-list>
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" overlay behavior="mobile" bordered no-swipe-open>
      <q-list>
        <q-item-label header> 로그인 / 회원가입 ( 준비중 )</q-item-label>
        <q-item>
          <q-img
            class="absolute-top"
            src="https://cdn.quasar.dev/img/material.png"
            style="height: 150px"
          >
            <div class="absolute-bottom bg-transparent">
              <q-avatar size="56px" class="q-mb-sm">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
              <div class="text-weight-bold">developer - thfdk0101</div>
              <div>@jtys0316</div>
            </div>
          </q-img>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer elevated class="bg-white">
      <q-list
        v-if="currentPath == '/cart'"
        bordered separator>
        <q-item
          class="text-center bg-blue text-white"
          :ripple="false">
          <q-item-section>
            <q-btn
              flat
              :label="convertPrice(totalPrice) + '원 주문하기'"
              class="text-h6 bold fit"
              :disable="!orderValidation"
              @click="orderCheck = true">
            </q-btn>
          </q-item-section>
        </q-item>
      </q-list>

      <div v-else
        class="q-pt-xs q-pb-sm">
        <q-tabs
          v-model="bottomTab"
          align="center"
          active-class="bg-white text-black"
          content-class="bg-white text-grey-5"
          indicator-color="transparent"
          @click="bottomTabRoute()">
          <q-tab name="home" :ripple="false">
            <q-icon class="q-pb-xs" size="sm" name="explore"/>
            둘러보기
          </q-tab>
          <q-tab name="menu" :ripple="false">
            <q-icon class="q-pb-xs" size="sm" name="menu_book"/>
            메뉴판
          </q-tab>
          <q-tab name="event" :ripple="false">
            <q-icon class="q-pb-xs" size="sm" name="event"/>
            이벤트들
          </q-tab>
          <q-tab name="brand" :ripple="false">
            <q-icon class="q-pb-xs" size="sm" name="store"/>
            가게 소개
          </q-tab>
          <q-tab name="check" :ripple="false"> 
            <q-icon class="q-pb-xs" size="sm" name="favorite"/>
            찜목록
          </q-tab>
        </q-tabs>
      </div>
    </q-footer>
  </q-layout>

  <q-dialog
    v-model="orderCheck"
    position="bottom">
    <q-card
      style="width: 100vw; max-width: 400px">
      
      <q-card-section
        class="q-pa-none bg-grey-4 row justify-end">
        <q-btn
          size="sm"
          icon="close"
          :ripple="false"
          round flat v-close-popup/>
      </q-card-section>
      
      <q-card-section>
        <div class="text-h5 text-bold text-center">주문 최종 확인</div>
      </q-card-section>
     
      <q-separator />

      <!--<q-card-section class="q-px-sm">
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
              </q-item>
            </q-card-section>
            
            <q-separator />
           
            <q-card-section class="q-px-sm">
              <div class="q-px-md q-pb-sm text-h6 text-bold">
                가격
              </div>
              <q-option-group
                disable
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
                  disable
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
                  disable
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
      </q-card-section>
      <q-card-section class="q-pa-sm">
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
      </q-card-section>-->

      <q-card-section class="q-px-sm">
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

          <q-separator />

          <q-card-section class="q-px-sm">
            <div class="q-px-md q-pb-md text-h6 text-bold text-center text-red">
              * 주의 사항 *
            </div>
            <div class="text-center q-pb-sm text-bold">
              배송 시간까지 송금하지 않으면 주문은 취소됩니다.
            </div>
            <div class="text-center text-bold">
              주문자와 송금자가 일치해야 합니다.
            </div>
          </q-card-section>
        </q-card>
      </q-card-section>

      <q-card-actions align="center" class="text-white bg-blue">
        <q-btn
          flat
          :label="convertPrice(totalPrice) + '원 주문하기'"
          class="text-h6 bold fit"
          @click="sendToServer()"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="finishOrder">
    <q-card style="width: 100vw; max-width: 500px">
      <q-card-section class="text-h6 text-bold text-center q-pb-none">
        주문이 완료되었습니다.
      </q-card-section>
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="확인" v-close-popup @click="toPage('/check')" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<!--
<q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
  <q-list>
    <q-item-label header> Related Links </q-item-label>
    <EssentialLink
      v-for="link in essentialLinks"
      :key="link.title"
      v-bind="link"
    />
  </q-list>
</q-drawer>
-->

<script>
import { defineComponent, ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useRouteInfo } from "src/stores/routeInfo";
import { useStoreInfo } from "src/stores/storeInfo";
import { useCartStore } from "src/stores/cartInfo";
import { useOrderCheckStore } from "src/stores/orderCheck";
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
  name: "MainLayout",
  components: {
    EventNotifications,
  },
  setup() {
    // routing
    const router = useRouter();
    var currentPath = computed(() => {
      return router.currentRoute.value.path;
    });

    // route, utils
    const routeInfoStore = useRouteInfo();
    const { headerTab, bottomTab } = storeToRefs(routeInfoStore);
    const { setHeaderTab, setBottomTab, ds } = routeInfoStore;

    // store information
    const storeInfo = useStoreInfo();
    const { currentStore, allStores, allMenus } = storeToRefs(storeInfo);
    const { setAllStores, setAllStories, setAllMenuTables, setAllMenus, setAllEvents, setCurrentStore } = storeInfo;

    // cart information
    const cartStore = useCartStore();
    const { cart, name, phone, roomNumber, password, orderValidation } =
      storeToRefs(cartStore);
    const { sendCartToServer, resetCart, resetUser, convertPrice } = cartStore;
    
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
        price += calTotalPrice(menuId);
      }
      return price;
    });

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

    // order information
    const orderCheckStore = useOrderCheckStore();
    const { setIsForm, setName, setPhone, setPassword, checkOrder } = orderCheckStore;

    function headerTabRoute() {
      if(headerTab.value == "near") {
        setBottomTab("home");
        router.push({ path: "/" });
      }
      else if(headerTab.value == "event") {
        router.push({ path: "/" });
      }
      else if(headerTab.value == "list") {
        setBottomTab("home");
        router.push({ path: "/store" });
      }
    }

    function bottomTabRoute() {
      if(bottomTab.value == "home") {
        if(headerTab.value == "list") {
          router.push({ path: "/store" });
        }
        else {
          setHeaderTab("near");
          router.push({ path: "/" });
        }
      }
      else if(bottomTab.value == "check") {
        router.push({ path: "/check" })
      }
      else {
        if(Object.keys(currentStore.value).length == 0) {
          router.push({ path: "/nfc" })
        }
        else {
          if(bottomTab.value == "menu") {
            router.push({ path: "/menu" })
          }
          else if(bottomTab.value == "event") {
            setHeaderTab("event");
            router.push({ path: "/event" })
          }
          else if(bottomTab.value == "brand") {
            router.push({ path: "/brand" })
          }
        }
        
      }
    }

    function cartRoute() {
      if(Object.keys(currentStore.value).length == 0) {
        router.push({ path: "/nfc" })
      }
      else {
        if(bottomTab.value == "brand") {
          setBottomTab("brand");
          router.push({ path: "/brand" });
        }
        else if(bottomTab.value == "event") {
          setBottomTab("event");
          router.push({ path: "/event" });
        }
        else {
          setBottomTab("menu");
          router.push({ path: "/menu" });
        }
      }
    }

    // to home page
    function toHomePage() {
      setCurrentStore({});
      if(headerTab.value == "list") {
        setBottomTab("home")
        router.push({ path: "/store" });
      }
      else {
        setHeaderTab("near");
        setBottomTab("home");
        router.push({ path: "/" });
      }
    }

    // to route page
    function toPage(path) {
      router.push({ path: path });
    }

    var finishOrder = ref(false);
    // create order to server
    function sendToServer() {
      finishOrder.value = true;
      sendCartToServer();
      setName(name.value);
      setPhone(phone.value);
      setPassword(password.value);
      setIsForm(true);
      //checkOrder();
      resetCart();
      resetUser();
    }

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

    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    onMounted(() => {
      setAllStores();
      setAllStories();
      setAllMenuTables();
      setAllMenus();
      setAllEvents();
    })

    return {
      searchStore: ref(""),

      currentPath,

      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },

      headerTab,
      headerTabRoute,
      bottomTab,
      bottomTabRoute,
      cartRoute,
      setHeaderTab,
      setBottomTab,

      currentStore,
      cartLength,
      toHomePage,
      toPage,
      ds,

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
          label: "계좌 이체 (우리은행 류현석 1002-657-201417)",
          value: "account",
        },
      ],
      totalPrice,
      allStores,
      allMenus,
      convertPrice,
      calTotalPrice,
      getOrderDate,

      sendToServer,

      finishOrder,
    };
  },
});
</script>
