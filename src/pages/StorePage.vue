<template>
  <q-page class="flex-center bg-grey-4">
    <div class="q-px-md q-pt-md q-pb-sm bg-white">
      <q-input
        dense
        v-model="searchStore"
        filled
        type="search"
        hint="상점 검색"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <div class="q-py-md flex-center column q-gutter-md">
      <q-card
        v-for="store in allStores"
        :key="store"
        v-ripple
        class="store-card row cursor-pointer q-hoverable"
        @click="toBrandPage(store)"
      >
        <span class="q-focus-helper"></span>
        <q-card-section horizontal class="rounded-borders col-8 column"
          ><div class="col">
            <q-img
              :src="
                baseURL + '/static/images/store/' + store.store_id + '/1.jpg'
              "
              class="rounded-borders"
            /></div
        ></q-card-section>
        <q-card-section horizontal class="col column">
          <div class="col">
            <q-img
              :src="
                baseURL + '/static/images/store/' + store.store_id + '/2.jpg'
              "
              class="rounded-borders"
            />
          </div>
          <div class="col">
            <q-img
              :src="
                baseURL + '/static/images/store/' + store.store_id + '/3.jpg'
              "
              class="rounded-borders"
            /></div
        ></q-card-section>
        <q-card-section class="col-12 q-pb-xs">
          <q-btn
            fab
            color="blue"
            icon="place"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%)"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">{{ store.store_title }}</div>
            <div
              class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
            >
              <q-icon name="place" />
              500m
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none q-pb-xs col-12">
          <div class="text-subtitle1">{{ store.store_subtitle }}</div>
          <div class="text-caption text-grey">
            {{ store.store_description }}
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions class="col-12 q-pb-md q-gutter-sm">
          <span
            v-for="(value, index) in JSON.parse(store.store_order_type)"
            :key="value"
          >
            <q-badge v-if="value == '1'" class="bg-grey-4 text-black"
              ><div class="q-pa-xs">
                {{ orderType[index] }}
              </div></q-badge
            >
          </span>
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
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { api, baseURL } from "boot/axios";
import { useStoreInfo } from "src/stores/storeInfo";

export default defineComponent({
  name: "StorePage",
  components: {},
  setup() {
    // routing
    const router = useRouter();

    // store information
    const storeInfo = useStoreInfo();
    const { allStores } = storeToRefs(storeInfo);
    const { setCurrentStore } = storeInfo;

    // to brand page
    function toBrandPage(store_Info) {
      setCurrentStore(store_Info);
      router.push({ path: "/brand" });
    }
    return {
      searchStore: ref(""),

      allStores,
      baseURL,
      orderType: ref(["테이블 주문 가능", "포장 가능", "배달 가능"]),
      toBrandPage,
    };
  },
});
</script>
<style lang="sass" scoped>
.store-card
  width: 95vw
  max-width: 500px
</style>
