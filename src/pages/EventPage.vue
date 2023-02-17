<template>
  <q-page class="flex-center bg-grey-4"
    ><div>
      <q-carousel
        arrows
        animated
        swipeable
        infinite
        navigation
        navigation-position="top"
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
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">Promotion 1</div>
            <div class="text-subtitle1">Mountains</div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide
          name="second"
          img-src="https://cdn.quasar.dev/img/parallax1.jpg"
        >
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">Promotion 2</div>
            <div class="text-subtitle1">Famous City</div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide
          name="third"
          img-src="https://cdn.quasar.dev/img/parallax2.jpg"
        >
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">Promotion 3</div>
            <div class="text-subtitle1">Famous Bridge</div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>

    <div class="q-pa-md bg-white">
      <q-input dense v-model="search" filled type="search" hint="Search Event">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

    <div class="q-py-md flex-center column q-gutter-md">
      <q-card
        v-ripple
        class="my-card row cursor-pointer q-hoverable"
        @click="toMenuPage('재야의 커피')"
      >
        <q-item class="col-12">
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>재야의 커피</q-item-label>
            <q-item-label caption> Cafe </q-item-label>
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
            <q-chip outline color="green">
              <div class="text-overline text-green">Curation</div>
            </q-chip>
          </div>
        </q-card-section>
        <q-card-section class="q-py-none col-12">
          <div class="text-h5">특별 Event - 원두 큐레이션</div>
        </q-card-section>
        <q-card-actions class="q-pt-none q-pl-md col-12 row">
          <div class="col-11 text-caption text-grey">
            사용자 맞춤 원두 큐레이션
          </div>
          <div class="col-1">
            <q-btn
              color="grey"
              round
              flat
              dense
              :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              @click="expanded = !expanded"
            />
          </div>
        </q-card-actions>
        <q-slide-transition class="col-12">
          <div v-show="expanded">
            <q-separator />
            <q-card-section class="text-subitle2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </q-card-section>
          </div>
        </q-slide-transition>
      </q-card>
      <q-card
        v-ripple
        class="my-card row cursor-pointer q-hoverable"
        @click="toMenuPage('재야의 커피')"
      >
        <q-item class="col-12">
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>재야의 커피</q-item-label>
            <q-item-label caption> Cafe </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-card-section horizontal class="col-12 column"
          ><div class="col">
            <q-img src="https://cdn.quasar.dev/img/parallax1.jpg" />
          </div>
        </q-card-section>
        <q-card-section class="q-pa-sm col-12">
          <div>
            <q-chip outline color="orange">
              <div class="text-overline text-orange">Discount</div>
            </q-chip>
            <q-chip outline color="blue">
              <div class="text-overline text-blue">Promotion</div>
            </q-chip>
          </div>
        </q-card-section>
        <q-card-section class="q-py-none col-12">
          <div class="text-h5">할인 / 증정 - 커피 구매</div>
        </q-card-section>
        <q-card-actions class="q-pt-none q-pl-md col-12 row">
          <div class="col-11 text-caption text-grey">
            커피 할인 / 증정 서비스
          </div>
          <div class="col-1">
            <q-btn
              color="grey"
              round
              flat
              dense
              :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              @click="expanded = !expanded"
            />
          </div>
        </q-card-actions>
        <q-slide-transition class="col-12">
          <div v-show="expanded">
            <q-separator />
            <q-card-section class="text-subitle2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </q-card-section>
          </div>
        </q-slide-transition>
      </q-card>
      <q-card
        v-ripple
        class="my-card row cursor-pointer q-hoverable"
        @click="toMenuPage('재야의 커피')"
      >
        <q-item class="col-12">
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>재야의 커피</q-item-label>
            <q-item-label caption> Cafe </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-card-section horizontal class="col-12 column"
          ><div class="col">
            <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" />
          </div>
        </q-card-section>
        <q-card-section class="q-pa-sm col-12">
          <div>
            <q-chip outline color="red">
              <div class="text-overline text-red">New Menu</div>
            </q-chip>
          </div>
        </q-card-section>
        <q-card-section class="q-py-none col-12">
          <div class="text-h5">신메뉴 - 싱글 오리진</div>
        </q-card-section>
        <q-card-actions class="q-pt-none q-pl-md col-12 row">
          <div class="col-11 text-caption text-grey">싱글 오리진</div>
          <div class="col-1">
            <q-btn
              color="grey"
              round
              flat
              dense
              :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              @click="expanded = !expanded"
            />
          </div>
        </q-card-actions>
        <q-slide-transition class="col-12">
          <div v-show="expanded">
            <q-separator />
            <q-card-section class="text-subitle2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </q-card-section>
          </div>
        </q-slide-transition>
      </q-card>
    </div>
  </q-page>
</template>

<!--
            <q-card-section horizontal>
            <q-img src="https://cdn.quasar.dev/img/mountains.jpg" />

            <q-card-actions vertical class="justify-around q-px-md">
              <q-btn flat round color="red" icon="favorite" />
              <q-btn flat round color="accent" icon="bookmark" />
              <q-btn flat round color="primary" icon="share" />
            </q-card-actions>
          </q-card-section>
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </q-card-section>

          <q-separator vertical />

          <q-card-section class="col-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </q-card-section>
  <div>
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
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useCurrentStore } from "stores/currentStore";
import CoffeeCard from "components/CoffeeCard.vue";

export default defineComponent({
  name: "StorePage",
  components: {},
  setup() {
    const router = useRouter();
    const store = useCurrentStore();

    function toMenuPage(storeName) {
      store.setStoreName(storeName);
      router.push({ path: "/menu" });
    }
    return {
      toMenuPage,
      expanded: ref(false),
      search: ref(""),
      slide: ref("first"),
      autoplay: ref(2000),
      blanceOption: "Option One",
      blanceTitle: "밸런스 블랜딩",
      blancePrice: "3500 won",
      blanceExplainLink:
        "https://typer.notion.site/e22619aaa3244bef811a0eb97529a7e3",
      blanceLorem:
        "국내 정상급 바리스타가 만든 최고급 품종의 게이샤 원두, &nbsp; 그리고 게이샤 원두와 최적의 조화를 이루는 헤리움 품종의 원두를 섞어 내린 고급 블랜디드 커피입니다.",
      singleOption: "Option Two",
      singleTitle: "싱글 오리진",
      singlePrice: "4000 won",
      singleExplainLink:
        "https://typer.notion.site/cd9823651223426e80d146d16f37d133",
      signleLorem:
        "국내 정상급 로스터가 최고급 생두를 선점하고 로스팅하여 만든 원두 입니다. 단 한 종류의 원두만을 최고급 원두를 골라내 원두의 맛을 극한까지 끌어내기 위한 노력을 기울였습니다.",
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
  width: 100%
  max-width: 95vw
</style>
