<template>
  <q-page>
    <!--div class="q-py-lg">
      {{ allStories }}
    </div>
    <div>
      {{ allStores }}
    </div>-->
    <div
      class="flex-center column q-gutter-md q-pb-sm">
      <div
        v-for="(store, storeIndex) in allStores"
        :key="storeIndex"
        class="store-card"
        @click="toMenuPage(store)">
        <SelectedStore :currentStore="store"/>
      </div>
    </div>
  </q-page>
</template>

<!--
<q-card
  v-for="store in allStores"
  :key="store"
  v-ripple
  class="store-card row cursor-pointer q-hoverable"
  @click="toMenuPage(store)">
  <span class="q-focus-helper"></span>
  <q-card-section horizontal class="rounded-borders col-8 column">
    <div class="col">
      <q-img
        :src="
          baseURL + '/static/images/store/' + store.store_id + '/1.jpg'
        "
        class="rounded-borders"/>
    </div>
  </q-card-section>
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
-->
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
import { useRouteInfo } from "src/stores/routeInfo";
import { useStoreInfo } from "src/stores/storeInfo";

import SelectedStore from "components/SelectedStore.vue";

export default defineComponent({
  name: "StorePage",
  components: { SelectedStore },
  setup() {
    // routing
    const router = useRouter();

    // route, utils
    const routeInfoStore = useRouteInfo();
    const { headerTab, bottomTab } = storeToRefs(routeInfoStore);
    const { setHeaderTab, setBottomTab, ds } = routeInfoStore;

    // store information
    const storeInfo = useStoreInfo();
    const { allStores, allStories } = storeToRefs(storeInfo);
    const { setAllStores, setAllMenus, setCurrentStore } = storeInfo;

    // to menu page
    function toMenuPage(store_Info) {
      setCurrentStore(store_Info);
      router.push({ path: "/menu" });
    }

    onMounted(() => {
      setHeaderTab("list");
      setBottomTab("home");
    })

    return {
      allStores,
      allStories,
      toMenuPage,
    };
  },
});
</script>
<style lang="sass" scoped>
.store-card
  width: 95vw
  max-width: 400px
</style>
