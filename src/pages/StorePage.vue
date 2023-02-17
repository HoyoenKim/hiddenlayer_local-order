<template>
  <q-page class="flex-center bg-grey-4">
    <div class="q-px-md q-pt-md q-pb-sm bg-white">
      <q-input dense v-model="search" filled type="search" hint="Search Store">
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
        <span class="q-focus-helper"></span>
        <q-card-section horizontal class="rounded-borders col-8 column"
          ><div class="col">
            <q-img
              src="https://cdn.quasar.dev/img/parallax2.jpg"
              class="rounded-borders"
            /></div
        ></q-card-section>
        <q-card-section horizontal class="col column">
          <div class="col">
            <q-img
              src="https://cdn.quasar.dev/img/parallax2.jpg"
              class="rounded-borders"
            />
          </div>
          <div class="col">
            <q-img
              src="https://cdn.quasar.dev/img/parallax2.jpg"
              class="rounded-borders"
            /></div
        ></q-card-section>
        <q-card-section class="col-12 q-pb-xs">
          <q-btn
            fab
            color="secondary"
            icon="place"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%)"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">재야의 커피</div>
            <div
              class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
            >
              <q-icon name="place" />
              250 ft
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none q-pb-xs col-12">
          <div class="text-subtitle1">$・Italian, Cafe</div>
          <div class="text-caption text-grey">
            Small plates, salads & sandwiches in an intimate setting.
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions class="col-12 q-pb-md q-gutter-sm">
          <q-badge rounded class="bg-grey-4 text-black"
            ><div class="q-pa-xs">테이블 주문 가능</div></q-badge
          >
          <q-badge rounded class="bg-grey-4 text-black"
            ><div class="q-pa-xs">포장 가능</div></q-badge
          >
          <q-badge rounded class="bg-grey-4 text-black"
            ><div class="q-pa-xs">배달 가능</div></q-badge
          >
        </q-card-actions>
      </q-card>

      <q-card
        v-ripple
        class="my-card row cursor-pointer q-hoverable"
        @click="toMenuPage('재야의 커피')"
      >
        <span class="q-focus-helper"></span>
        <q-card-section horizontal class="rounded-borders col-8 column"
          ><div class="col">
            <q-img
              src="https://cdn.quasar.dev/img/parallax2.jpg"
              class="rounded-borders"
            /></div
        ></q-card-section>
        <q-card-section horizontal class="col column">
          <div class="col">
            <q-img
              src="https://cdn.quasar.dev/img/parallax2.jpg"
              class="rounded-borders"
            />
          </div>
          <div class="col">
            <q-img
              src="https://cdn.quasar.dev/img/parallax2.jpg"
              class="rounded-borders"
            /></div
        ></q-card-section>
        <q-card-section class="col-12 q-pb-xs">
          <q-btn
            fab
            color="secondary"
            icon="place"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%)"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">재야의 커피</div>
            <div
              class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
            >
              <q-icon name="place" />
              250 ft
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none q-pb-xs col-12">
          <div class="text-subtitle1">$・Italian, Cafe</div>
          <div class="text-caption text-grey">
            Small plates, salads & sandwiches in an intimate setting.
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions class="col-12 q-pb-md q-gutter-sm">
          <q-badge rounded class="bg-grey-4 text-black"
            ><div class="q-pa-xs">테이블 주문 가능</div></q-badge
          >
          <q-badge rounded class="bg-grey-4 text-black"
            ><div class="q-pa-xs">포장 가능</div></q-badge
          >
          <q-badge rounded class="bg-grey-4 text-black"
            ><div class="q-pa-xs">배달 가능</div></q-badge
          >
        </q-card-actions>
      </q-card>

      <q-card
        v-ripple
        class="my-card row cursor-pointer q-hoverable"
        @click="toMenuPage('재야의 커피')"
      >
        <span class="q-focus-helper"></span>
        <q-card-section horizontal class="rounded-borders col-8 column"
          ><div class="col">
            <q-img
              src="https://cdn.quasar.dev/img/parallax2.jpg"
              class="rounded-borders"
            /></div
        ></q-card-section>
        <q-card-section horizontal class="col column">
          <div class="col">
            <q-img
              src="https://cdn.quasar.dev/img/parallax2.jpg"
              class="rounded-borders"
            />
          </div>
          <div class="col">
            <q-img
              src="https://cdn.quasar.dev/img/parallax2.jpg"
              class="rounded-borders"
            /></div
        ></q-card-section>
        <q-card-section class="col-12 q-pb-xs">
          <q-btn
            fab
            color="secondary"
            icon="place"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%)"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">재야의 커피</div>
            <div
              class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
            >
              <q-icon name="place" />
              250 ft
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none q-pb-xs col-12">
          <div class="text-subtitle1">$・Italian, Cafe</div>
          <div class="text-caption text-grey">
            Small plates, salads & sandwiches in an intimate setting.
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions class="col-12 q-pb-md q-gutter-sm">
          <q-badge rounded class="bg-grey-4 text-black"
            ><div class="q-pa-xs">테이블 주문 가능</div></q-badge
          >
          <q-badge rounded class="bg-grey-4 text-black"
            ><div class="q-pa-xs">포장 가능</div></q-badge
          >
          <q-badge rounded class="bg-grey-4 text-black"
            ><div class="q-pa-xs">배달 가능</div></q-badge
          >
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<!--
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
      search: ref(""),
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
