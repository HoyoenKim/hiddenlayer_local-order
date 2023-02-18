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
      <q-card flat class="q-pt-md my-card row">
        <q-card-section class="col-12 q-pa-xs text-h5 text-bold text-center">
          {{ storeName }}
        </q-card-section>

        <q-card-action align="center" class="col-12 no-wrap items-center">
          <q-btn flat color="red" icon="favorite">
            <div class="q-pa-sm text-black">좋아요</div></q-btn
          >
          <q-btn flat color="accent" icon="bookmark">
            <div class="q-pa-sm text-black">정기 구독</div></q-btn
          >
          <q-btn flat color="primary" icon="share">
            <div class="q-pa-sm text-black">공유</div></q-btn
          >
        </q-card-action>

        <q-card-section class="col-12 q-py-none text-h6 text-center">
          <q-card
            flat
            bordered
            class="my-card bg-grey-4 text-orange-7 text-bold"
          >
            <q-card-section> 이벤트 확인하기 </q-card-section>
          </q-card>
        </q-card-section>
        <q-card-section class="col-12 q-pa-none q-pb-none">
          <q-tabs
            v-model="tab"
            no-caps
            class="bg-white text-black"
            style="width: 100vw"
          >
            <q-tab name="mails" label="메뉴" />
            <q-tab name="alarms" label="정보" />
            <q-tab name="movies" label="리뷰" />
          </q-tabs>
        </q-card-section>
      </q-card>
    </div>
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
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useCurrentStore } from "stores/currentStore";
import { storeToRefs } from "pinia";
import CoffeeCard from "components/CoffeeCard.vue";

export default defineComponent({
  name: "MenuPage",
  components: {
    CoffeeCard,
  },
  setup() {
    const store = useCurrentStore();
    // use destructuring to use the store in the template
    const { storeName } = storeToRefs(store); // state and getters need "storeToRefs"
    const { increment } = store; // actions can be destructured directly

    return {
      tab: ref("mails"),
      storeName,
      increment,
      slide: ref("first"),
      autoplay: ref(true),
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
