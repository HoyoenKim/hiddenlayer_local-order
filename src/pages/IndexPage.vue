<template>
  <q-page class="flex flex-center">
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
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import CoffeeCard from "components/CoffeeCard.vue";

export default defineComponent({
  name: "IndexPage",
  components: {
    CoffeeCard,
  },
  setup() {
    return {
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
