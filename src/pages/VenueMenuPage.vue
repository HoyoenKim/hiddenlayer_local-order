<template>
  <q-page>

    <div
      class="column items-center">
      <div
        class="q-px-xs q-py-md text-center text-h4"
        style="width:100vw; max-width:500px">
        부스 메뉴판
      </div>
      <div
        class="q-px-xs q-pb-md text-center"
        style="width:100vw; max-width:500px">
        <q-separator size="4px" color="grey-4" inset />
      </div>
      <div
        class="q-px-xs text-center"
        style="width:100vw; max-width:500px">
        <q-img
          no-transition
          no-spinner
          class="fit"
          fit="fill"
          :src="baseURL + '/static/images/venue/' + currentVenue.venue_id + '/0.jpg'">
          <div
            v-ripple
            v-for="boothId in ds(currentVenue.booth_ids)" :key=boothId
            @click="selectedBooth(boothId)"
            :style="'opacity:1; absolute; top: ' + ds(allBooths[boothId].booth_location)[1] + '%; left: ' + ds(allBooths[boothId].booth_location)[0] + '%; width: ' + ds(allBooths[boothId].booth_location)[2] + '%; height: ' + ds(allBooths[boothId].booth_location)[3] + '%;'">
            <q-icon v-if="selectedBoothId == boothId" size="sm" name="person_pin_circle" ></q-icon>
          </div>
        </q-img>
      </div>
      <div
        v-if="selectedBoothId == -1"
        class="q-px-xs q-pb-md text-center"
        style="width:100vw; max-width:500px">
        선택된 부스가 없습니다. 지도에서 부스를 선택해 주세요.
      </div>
      <div
        v-else
        class="q-pa-sm"
        style="width:100vw; max-width:500px">
        <div
          class="q-px-xs q-pb-md text-center"
          style="width:100vw; max-width:500px; font-size: 20px; color: #02BA8E">
          {{ currentBooth.booth_title }}
        </div>
        <div
          class="q-px-xl q-pb-md"
          style="width:100vw; max-width:500px;">
          <q-separator size="4px" color="grey-4" inset />
        </div>
        <div class="q-pa-sm q-pt-md q-gutter-sm">
          <q-btn
            class="bg-grey-10 text-white"
            :ripple="false">
            메뉴판
          </q-btn>
        </div>
        <div>
          <q-img
            class="fit"
            fit="fill"
            :src="baseURL + '/static/images/menuTable/' + ds(currentBooth.booth_menutable_ids)[0] + '.jpg'">
            <template v-slot:error>
              <div class="absolute-full flex flex-center bg-grey-4 text-black">
                이미지 준비중입니다.
              </div>
            </template>
          </q-img>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { api, baseURL } from "boot/axios";
import { useRouteInfo } from "src/stores/routeInfo";
import { useStoreInfo } from "src/stores/storeInfo";

export default defineComponent({
  name: "VenuMenuPage",
  components: {  },
  setup() {
    // routing
    const router = useRouter();

    // route, utils
    const routeInfoStore = useRouteInfo();
    const { headerTab, bottomTab } = storeToRefs(routeInfoStore);
    const { setHeaderTab, setBottomTab, ds } = routeInfoStore;

    // store information
    const storeInfo = useStoreInfo();
    const { currentVenue, allBooths, selectedBoothId, currentBooth, allKeywords } = storeToRefs(storeInfo);
    const { setAllStores, setAllMenus, setCurrentStore, setSelectedBoothId } = storeInfo;

    onBeforeMount(() => {
      setBottomTab('menu');
      setSelectedBoothId(selectedBoothId.value);
    })

    function selectedBooth(boothId) {
      setSelectedBoothId(boothId)
    }

    return {
      currentVenue,
      baseURL,
      ds,
      allBooths,
      selectedBooth,
      selectedBoothId,
      currentBooth,
      boothSlide: ref(1),
      allKeywords
    };
  },
});
</script>
<style lang="sass" scoped>
</style>
