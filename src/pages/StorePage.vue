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
        v-for="n in 5"
        :key="n"
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
      router.push({ path: "/brand" });
    }
    return {
      toMenuPage,
      search: ref(""),
      slide: ref("first"),
      autoplay: ref(true),
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
