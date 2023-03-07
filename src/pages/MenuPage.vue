<template>
  <q-page class="flex-center">
    <q-toolbar>
      <q-btn flat dense @click="toBrandPage()">
        <q-icon name="arrow_back" />
      </q-btn>
      <q-toolbar-title class="q-pt-xs"> {{ storeName }} 메뉴 </q-toolbar-title>
      <q-btn flat dense @click="toHomePage()">
        <q-icon name="home" />
      </q-btn>
      <q-btn flat @click="toCartPage()">
        <q-icon name="shopping_cart" />
        <q-badge v-if="existCart" color="red" floating>{{
          cartLength
        }}</q-badge>
      </q-btn>
    </q-toolbar>
    <q-expansion-item
      default-opened
      v-model="expanded1"
      header-class="bg-grey-4"
    >
      <template v-slot:header>
        <q-item-section avatar>
          <q-avatar icon="star" color="grey-4" text-color="red" />
        </q-item-section>

        <q-item-section>
          <q-item-label>사장님 추천</q-item-label>
          <q-item-label caption>이번주 커피</q-item-label></q-item-section
        >
      </template>
      <template v-slot:default>
        <div
          class="fit column wrap justify-center items-center content-center q-gutter-sm q-py-sm"
        >
          <q-card
            v-for="i in [0, 1]"
            :key="i"
            class="my-card"
            flat
            bordered
            @click="openMenuDialog(i)"
          >
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-overline">
                  {{ menuList[i].price }}{{ menuList[i].priceUnit }}
                </div>
                <div class="text-h5 q-mt-sm q-mb-xs q-pb-sm">
                  {{ menuList[i].title }}
                </div>
                <div class="text-caption text-grey">
                  {{ menuList[i].explainDetail }}
                </div>
              </q-card-section>

              <q-card-section class="col-5 flex flex-center">
                <q-img
                  class="rounded-borders"
                  src="https://cdn.quasar.dev/img/parallax2.jpg"
                />
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-expansion-item>
    <q-expansion-item
      default-opened
      v-model="expanded2"
      header-class="bg-grey-4"
    >
      <template v-slot:header>
        <q-item-section>
          <q-item-label>블랜디드 원두</q-item-label>
          <q-item-label caption></q-item-label
        ></q-item-section>
      </template>
      <template v-slot:default>
        <div
          class="fit column wrap justify-center items-center content-center q-gutter-sm q-py-sm"
        >
          <q-card class="my-card" flat bordered @click="openMenuDialog(0)">
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-overline">
                  {{ menuList[0].price }}{{ menuList[0].priceUnit }}
                </div>
                <div class="text-h5 q-mt-sm q-mb-xs q-pb-sm">
                  {{ menuList[0].title }}
                </div>
                <div class="text-caption text-grey">
                  {{ menuList[0].explainDetail }}
                </div>
              </q-card-section>

              <q-card-section class="col-5 flex flex-center">
                <q-img
                  class="rounded-borders"
                  src="https://cdn.quasar.dev/img/parallax2.jpg"
                />
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-expansion-item>
    <q-expansion-item
      default-opened
      v-model="expanded3"
      header-class="bg-grey-4"
    >
      <template v-slot:header>
        <q-item-section>
          <q-item-label>고급 원두</q-item-label>
          <q-item-label caption>1일 10잔 한정판매</q-item-label></q-item-section
        >
      </template>
      <template v-slot:default>
        <div
          class="fit column wrap justify-center items-center content-center q-gutter-sm q-py-sm"
        >
          <q-card class="my-card" flat bordered @click="openMenuDialog(1)">
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-overline">
                  {{ menuList[1].price }}{{ menuList[1].priceUnit }}
                </div>
                <div class="text-h5 q-mt-sm q-mb-xs q-pb-sm">
                  {{ menuList[1].title }}
                </div>
                <div class="text-caption text-grey">
                  {{ menuList[1].explainDetail }}
                </div>
              </q-card-section>

              <q-card-section class="col-5 flex flex-center">
                <q-img
                  class="rounded-borders"
                  src="https://cdn.quasar.dev/img/parallax2.jpg"
                />
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-expansion-item>
    <q-dialog v-model="dialog" position="bottom">
      <q-card style="width: 60vw; max-width: 500px">
        <q-card-section horizontal>
          <q-img
            class="rounded-borders"
            src="https://cdn.quasar.dev/img/parallax2.jpg"
          />
        </q-card-section>
        <q-card-section class="q-pb-none">
          <q-card flat bordered class="q-pa-md text-center">
            <q-card-section class="text-h6">
              {{ showMenu.title }}
            </q-card-section>
            <q-separator />

            <q-card-section class="text-caption text-grey q-pb-none">
              {{ showMenu.explainDetail }}
            </q-card-section>
          </q-card>
        </q-card-section>
        <q-card-section class="q-pb-xs">
          <div class="text-bold q-pb-xs">가격</div>
          <q-option-group
            v-model="showMenu.priceOption"
            :options="showMenu.priceOptions"
            color="primary"
        /></q-card-section>
        <q-separator />
        <q-card-section class="q-pb-xs">
          <div class="text-bold q-pb-xs">HOT / ICE</div>
          <q-option-group
            v-model="showMenu.tempOption"
            :options="showMenu.tempOptions"
            color="primary"
        /></q-card-section>
        <q-separator />
        <q-card-section class="q-pb-xs">
          <div class="text-bold q-pb-xs">커피 농도</div>
          <q-option-group
            v-model="showMenu.denseOption"
            :options="showMenu.denseOptions"
            color="primary"
        /></q-card-section>
        <q-separator />
        <q-card-section class="q-pb-md">
          <div class="text-bold q-pb-sm">수량</div>
          <q-btn
            round
            size="sm"
            :ripple="false"
            outline
            icon="arrow_downward"
            @click="
              if (showMenu.number > 1) {
                showMenu.number--;
              }
            "
          ></q-btn>
          <span class="q-px-lg">{{ showMenu.number }}</span>
          <q-btn
            round
            size="sm"
            :ripple="false"
            outline
            icon="arrow_upward"
            @click="showMenu.number++"
          ></q-btn>
        </q-card-section>
        <q-separator />

        <q-card-actions vertical>
          <q-btn
            flat
            v-close-popup
            class="text-white bg-blue"
            @click="addToCart"
          >
            카트에 담기
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
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
  name: "MenuPage",
  components: {
    //CoffeeCard,
  },
  setup() {
    const store = useStoreInfo();
    // use destructuring to use the store in the template
    const { storeName } = storeToRefs(store); // state and getters need "storeToRefs"
    const { increment } = store; // actions can be destructured directly

    const router = useRouter();

    function toBrandPage() {
      router.push({ path: "/brand" });
    }

    function toHomePage() {
      router.push({ path: "/" });
    }

    function toCartPage() {
      router.push({ path: "/cart" });
    }

    const balance = {
      overline: "Option One",
      title: "밸런스 블랜딩",
      price: "3500",
      priceUnit: "원",
      explainLink: "https://typer.notion.site/e22619aaa3244bef811a0eb97529a7e3",
      explainDetail:
        "국내 정상급 바리스타가 만든 최고급 품종의 게이샤 원두 그리고 게이샤 원두와 최적의 조화를 이루는 헤리움 품종의 원두를 섞어 내린 고급 블랜디드 커피입니다.",
      priceOptions: [
        {
          label: "3500 원",
          value: "default",
        },
      ],
      priceOption: "default",
      tempOptions: [
        {
          label: "Hot",
          value: "hot",
        },
        {
          label: "Ice",
          value: "ice",
        },
      ],
      tempOption: "hot",
      denseOptions: [
        {
          label: "진하게",
          value: "high",
        },
        {
          label: "연하게",
          value: "low",
        },
      ],
      denseOption: "high",
      number: 1,
    };

    const single = {
      overline: "Option Two",
      title: "싱글 오리진",
      price: "4000",
      priceUnit: "원",
      explainLink: "https://typer.notion.site/cd9823651223426e80d146d16f37d133",
      explainDetail:
        "국내 정상급 로스터가 최고급 생두를 선점하고 로스팅하여 만든 원두 입니다. 단 한 종류의 원두만을 최고급 원두를 골라내 원두의 맛을 극한까지 끌어내기 위한 노력을 기울였습니다.",
      priceOptions: [
        {
          label: "4000 원",
          value: "default",
        },
      ],
      priceOption: "default",
      tempOptions: [
        {
          label: "Hot",
          value: "hot",
        },
        {
          label: "Ice",
          value: "ice",
        },
      ],
      tempOption: "hot",
      denseOptions: [
        {
          label: "진하게",
          value: "high",
        },
        {
          label: "연하게",
          value: "low",
        },
      ],
      denseOption: "high",
      number: 1,
    };

    const menuList = ref([balance, single]);
    var dialog = ref(false);
    var showMenu = ref({});

    const cartStore = useCartStore();
    // use destructuring to use the store in the template
    const { cart } = storeToRefs(cartStore); // state and getters need "storeToRefs"
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

    return {
      toBrandPage,
      toHomePage,
      toCartPage,
      storeName,
      menuList,
      expanded1: ref(true),
      expanded2: ref(true),
      expanded3: ref(true),
      dialog,
      showMenu,
      cartLength,
      existCart,
      openMenuDialog(menuId) {
        dialog.value = true;
        showMenu.value = JSON.parse(JSON.stringify(this.menuList[menuId]));
      },
      addToCart() {
        showMenu.value["storeName"] = storeName;
        insertCart(showMenu.value.title, showMenu.value);
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
