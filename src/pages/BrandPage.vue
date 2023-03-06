<template>
  <q-page class="flex-center bg-grey-4">
    <div>
      <q-carousel
        animated
        swipeable
        infinite
        navigation
        navigation-position="bottom"
        :autoplay="autoplay"
        transition-prev="slide-right"
        transition-next="slide-left"
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true"
        v-model="slide"
        height="250px"
      >
        <q-carousel-slide
          name="first"
          img-src="https://cdn.quasar.dev/img/mountains.jpg"
        >
        </q-carousel-slide>
        <q-carousel-slide
          name="second"
          img-src="https://cdn.quasar.dev/img/parallax1.jpg"
        >
        </q-carousel-slide>
        <q-carousel-slide
          name="third"
          img-src="https://cdn.quasar.dev/img/parallax2.jpg"
        >
        </q-carousel-slide>
      </q-carousel>
    </div>
    <div>
      <q-card flat class="row">
        <q-card-section horizontal class="col-12 q-pt-sm text-center">
          <q-toolbar>
            <q-btn flat dense>
              <q-icon name="arrow_back" @click="toHomePage()" />
            </q-btn>
            <q-toolbar-title class="text-h5 text-bold">
              {{ storeName }}
            </q-toolbar-title>
            <q-btn flat @click="toCartPage()">
              <q-icon name="shopping_cart" />
              <q-badge v-if="existCart" color="red" floating>{{
                cartLength
              }}</q-badge>
            </q-btn>
          </q-toolbar>
        </q-card-section>

        <q-card-actions
          align="center"
          class="col-12 no-wrap items-center q-pa-none"
        >
          <q-btn flat color="red" icon="favorite">
            <div class="q-pa-sm text-black">좋아요</div></q-btn
          >
          <q-btn flat color="accent" icon="bookmark">
            <div class="q-pa-sm text-black">정기 구독</div></q-btn
          >
          <q-btn flat color="primary" icon="share">
            <div class="q-pa-sm text-black">공유</div></q-btn
          >
        </q-card-actions>

        <q-card-section
          v-ripple
          class="col-12 no-wrap row justify-center q-py-none text-h6 text-center cursor-pointer q-hoverable q-gutter-xs"
        >
          <q-card
            flat
            bordered
            class="bg-grey-4 text-orange-7 text-bold col-6 q-pr-sm"
            @click="toMenuPage()"
          >
            <q-card-section> 테이블 주문</q-card-section>
          </q-card>
          <q-card
            flat
            bordered
            class="bg-grey-4 text-orange-7 text-bold col-6"
            @click="toMenuPage()"
          >
            <q-card-section> 픽업 주문</q-card-section>
          </q-card>
        </q-card-section>
        <q-card-section class="col-12 q-pa-none q-pb-none items-center">
          <q-tabs
            v-model="tab"
            no-caps
            class="bg-white text-black"
            style="width: 100vw"
          >
            <q-tab name="mails" :label="storeName + ' 브랜드'" />
            <q-tab name="alarms" :label="storeName + ' 정보'" />
          </q-tabs>
        </q-card-section>
      </q-card>
      <div v-if="tab == 'mails'" class="q-pt-md items-center">
        <q-list bordered class="bg-white">
          <q-expansion-item
            icon="explore"
            label="사장님의 식부심"
            default-opened
            header-class="text-primary"
          >
            <div class="scroll bg-grey-4 q-pa-md">
              <div class="row no-wrap q-gutter-md">
                <q-card
                  v-for="n in 5"
                  :key="n"
                  class="col-4 my-card"
                  @click="medium = true"
                >
                  <q-card-section horizontal>
                    <div class="bg-white fit">
                      <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" />
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-expansion-item>

          <q-separator />

          <q-expansion-item
            icon="perm_identity"
            label="가게 스토리"
            default-opened
            header-class="text-teal"
          >
            <div class="scroll bg-grey-4 q-pa-md">
              <div class="row no-wrap q-gutter-md">
                <q-card v-for="n in 5" :key="n" class="col-10 my-card">
                  <q-item>
                    <q-item-section avatar>
                      <q-avatar>
                        <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>{{ storeName }}</q-item-label>
                      <q-item-label caption> Cafe </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-btn
                        dense
                        flat
                        icon="edit"
                        @click="prompt = true"
                      ></q-btn>
                    </q-item-section>
                  </q-item>

                  <q-separator />

                  <q-card-section horizontal class="col-12 column"
                    ><div class="col">
                      <q-img src="https://cdn.quasar.dev/img/mountains.jpg" />
                    </div>
                  </q-card-section>
                  <q-card-section class="q-pa-sm col-12">
                    <div>
                      <q-chip v-if="isCuration" outline color="green">
                        <div class="text-overline text-green">Curation</div>
                      </q-chip>
                      <q-chip v-if="isDiscount" outline color="orange">
                        <div class="text-overline text-orange">Discount</div>
                      </q-chip>
                      <q-chip v-if="isPromotion" outline color="blue">
                        <div class="text-overline text-blue">Promotion</div>
                      </q-chip>
                      <q-chip v-if="isNewMenu" outline color="red">
                        <div class="text-overline text-red">New Menu</div>
                      </q-chip>
                    </div>
                  </q-card-section>
                  <q-card-section class="q-py-none col-12">
                    <div class="text-h5">{{ storyTitle1 }}</div>
                  </q-card-section>
                  <q-card-actions class="q-pt-none q-pl-md col-12 row">
                    <div class="col-11 text-caption text-grey">
                      {{ storySubTitle1 }}
                    </div>
                    <div class="col-1">
                      <q-btn
                        color="grey"
                        round
                        flat
                        dense
                        :icon="
                          expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
                        "
                        @click="expanded = !expanded"
                      />
                    </div>
                  </q-card-actions>
                  <q-slide-transition class="col-12">
                    <div v-show="expanded">
                      <q-separator />
                      <q-card-section class="text-subitle2">
                        {{ story1 }}
                      </q-card-section>
                    </div>
                  </q-slide-transition>
                </q-card>
              </div>
            </div>
          </q-expansion-item>

          <q-separator />

          <q-expansion-item
            icon="shopping_cart"
            label="미션 EAT"
            default-opened
            header-class="text-purple"
          >
            <div class="scroll bg-grey-4 q-pa-md">
              <div class="row no-wrap q-gutter-md">
                <q-card
                  v-for="n in 5"
                  :key="n"
                  class="col-4 my-card"
                  @click="medium = true"
                >
                  <q-card-section horizontal>
                    <div class="bg-white fit">
                      <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" />
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-expansion-item>

          <q-separator />

          <q-expansion-item
            icon="bluetooth"
            label="신메뉴 소개"
            default-opened
            expand-icon-class="text-white"
          >
            <div class="scroll bg-grey-4 q-pa-md">
              <div class="row no-wrap q-gutter-md">
                <q-card
                  v-for="n in 5"
                  :key="n"
                  class="col-4 my-card"
                  @click="medium = true"
                >
                  <q-card-section horizontal>
                    <div class="bg-white fit">
                      <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" />
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-expansion-item>
        </q-list>
      </div>
      <div v-else class="q-pt-md items-center">
        <q-list bordered class="bg-white">
          <q-expansion-item
            icon="explore"
            label="가게 위치"
            default-opened
            header-class="text-primary"
          >
            <div class="scroll bg-grey-4 q-pa-md"></div>
          </q-expansion-item>

          <q-separator />
          <q-expansion-item
            icon="perm_identity"
            label="영업 시간"
            default-opened
            header-class="text-teal"
          >
            <div class="scroll bg-grey-4 q-pa-md"></div>
          </q-expansion-item>

          <q-expansion-item
            icon="shopping_cart"
            label="사업자등록 정보"
            default-opened
            header-class="text-purple"
          >
            <div class="scroll bg-grey-4 q-pa-md"></div>
          </q-expansion-item>
        </q-list>
      </div>
    </div>
  </q-page>
  <q-dialog v-model="prompt" persistent>
    <q-card style="min-width: 90vw; min-height: 50vh">
      <q-card-section>
        <div class="text-h6">Image</div>
      </q-card-section>

      <q-card-section class="q-pt-none"
        ><q-uploader
          flat
          bordered
          label="Image Uploader"
          auto-upload
          accept=".jpg, image/*"
          url="http://localhost:4444/upload"
        />
      </q-card-section>

      <q-card-section>
        <div class="text-h6">Story Type</div>
      </q-card-section>
      <q-card-actions>
        <q-checkbox v-model="isCuration" label="Curation" />
        <q-checkbox v-model="isDiscount" label="Discount" />
        <q-checkbox v-model="isPromotion" label="Promotion" />
        <q-checkbox v-model="isNewMenu" label="New Menu" />
      </q-card-actions>

      <q-card-section>
        <div class="text-h6">Title</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="storyTitle1" autofocus />
      </q-card-section>

      <q-card-section>
        <div class="text-h6">Subtitle</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="storySubTitle1" />
      </q-card-section>

      <q-card-section>
        <div class="text-h6">Story</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-editor v-model="story1" min-height="50vh" />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Save" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="medium">
    <q-card style="width: 700px; max-width: 80vw">
      <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" />
    </q-card>
  </q-dialog>
</template>

<!--
  @keyup.enter="prompt = false"
  <div class="q-py-md flex-center column q-gutter-md">
      <div class="col">
        <CoffeeCard
          :title="blanceTitle"
          :option="blanceOption"
          :price="blancePrice"
          :explain="blanceLorem"
          :explainLink="blanceExplainLink"
        ></CoffeeCard>
      </div>
      <div class="col">
        <CoffeeCard
          :title="singleTitle"
          :option="singleOption"
          :price="singlePrice"
          :explain="signleLorem"
          :explainLink="singleExplainLink"
        ></CoffeeCard>
      </div>
    </div>
-->

<script>
import { defineComponent, ref, computed } from "vue";
import { useCurrentStore } from "stores/currentStore";
import { useCartStore } from "stores/shoppingCart";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import CoffeeCard from "components/CoffeeCard.vue";

export default defineComponent({
  name: "MenuPage",
  components: {
    //CoffeeCard,
  },
  setup() {
    const store = useCurrentStore();
    // use destructuring to use the store in the template
    const { storeName } = storeToRefs(store); // state and getters need "storeToRefs"
    const { increment } = store; // actions can be destructured directly

    const router = useRouter();

    function toMenuPage() {
      router.push({ path: "/menu" });
    }

    function toHomePage() {
      router.push({ path: "/" });
    }

    function toCartPage() {
      router.push({ path: "/cart" });
    }

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
      medium: ref(false),
      toMenuPage,
      toHomePage,
      toCartPage,
      prompt: ref(false),
      isCuration: ref(false),
      isPromotion: ref(false),
      isDiscount: ref(false),
      isNewMenu: ref(false),
      storyTitle1: ref("특별 Event - 원두 큐레이션"),
      storySubTitle1: ref("사용자 맞춤 원두 큐레이션"),
      story1: ref("주문 내역을 바탕을 원두를 추천해 드립니다."),
      tab: ref("mails"),
      storeName,
      increment,
      expanded: ref(false),
      slide: ref("first"),
      autoplay: ref(true),
      cartLength,
      existCart,
    };
  },
});
</script>
<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)
.my-card
  width: 95vw
  max-width: 500px
</style>
