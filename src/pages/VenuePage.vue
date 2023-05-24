<template>
  <q-page>

    <div
      class="column items-center">
      <div
        class="q-px-xs q-py-md text-center text-h4"
        style="width:100vw; max-width:500px">
        부스 소개
      </div>
      <div
        class="q-px-xs q-pb-md text-center"
        style="width:100vw; max-width:500px">
        <q-separator size="4px" color="grey-4" inset />
      </div>
      <div
        class="q-px-xs q-pb-md text-center"
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
        class=""
        style="width:100vw; max-width:500px">
        <div
          class="q-px-xs q-pb-md text-center"
          style="width:100vw; max-width:500px; font-size: 20px; color: #02BA8E">
          {{ currentBooth.booth_title }}
        </div>
        <div
          class="q-px-xs q-pb-md text-center text-h4"
          style="width:100vw; max-width:500px;">
          <div v-for="t in currentBooth.booth_description.split('\n')" :key="t">
            {{ t }}
          </div>
        </div>
        <div
          class="q-px-xl q-pb-md"
          style="width:100vw; max-width:500px;">
          <q-separator size="4px" color="grey-4" inset />
        </div>
        <div>
          <q-card flat bordered>
            <q-card-section class="q-pa-none">
              <div v-if="parseInt(currentBooth.booth_images_nums) == 0"
                class="bg-grey-4 flex flex-center"
                style="height: 400px;">
                <div>
                  이미지 준비중입니다.
                </div>
              </div>
              <q-carousel
                v-else
                v-model="boothSlide"
                class="q-pa-none"
                swipeable infinite
                style="height: 400px;">
                <q-carousel-slide
                  v-for="boothImageNum in parseInt(currentBooth.booth_images_nums)" :key="boothImageNum" :name="boothImageNum"
                  class=" q-pa-none bg-grey-4">
                  <q-img
                    no-transition
                    no-spinner
                    class="fit"
                    fit="contain"
                    :src="baseURL + '/static/images/booth/' + currentBooth.booth_id + '/' + boothImageNum + '.jpg'"
                    style="max-height: 400px;"/>
                </q-carousel-slide>
              </q-carousel>
            </q-card-section>
            <q-card-section
              class="q-pa-none row justify-center bg-grey-4">
              <div
                v-for="boothImageNum in parseInt(currentBooth.booth_images_nums)" :key="boothImageNum"
                class="q-px-xs"
                @click="boothSlide = boothImageNum">
                <q-icon
                  v-if="boothImageNum == boothSlide"
                  class="text-blue-9" name="circle"
                  style="font-size: 0.5em;" />
                <q-icon
                  v-else
                  class="text-white" name="circle"
                  style="font-size: 0.5em;"/>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div
          v-for="keywordId in ds(currentBooth.booth_keyword_ids).slice(0, -4)" :key="keywordId"
          class="q-px-md q-pt-lg q-pb-md bg-purple-3"
          style="width:100vw; max-width:500px; font-size: 14px">
          <div class="text-bold">
            #{{ allKeywords[keywordId].keyword_title }}
          </div>
          <div v-for="t in allKeywords[keywordId].keyword_description.split('\n')" :key="t">
            {{ t }}
          </div>
        </div>
        <div
          v-for="keywordId in ds(currentBooth.booth_keyword_ids).slice(-4)" :key="keywordId"
          class="q-px-md q-pt-lg q-pb-sm bg-yellow"
          style="width:100vw; max-width:500px; font-size: 14px">
          <div class="text-bold">
            #{{ allKeywords[keywordId].keyword_title }}
          </div>
          <div v-for="t in allKeywords[keywordId].keyword_description.split('\n')" :key="t">
            {{ t }}
          </div>
        </div>
        <div class="bg-yellow">
          <div class="q-pa-md q-pb-lg">
            <q-btn v-if="parseInt(currentBooth.booth_images_nums) > 0"
              class="fit" color="white" style="background-color: #0AD3FF; font-size: 20px" flat
              @click="openBookDialog = true">
              예약하러 가기
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </q-page>
  <q-dialog
    v-model="openBookDialog"
    full-width>
    <q-card>
      <q-card-section>
        <div class="text-h6">예약</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        부스 현장 예약만 가능합니다.
      </q-card-section>
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="OK" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref, onMounted, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { api, baseURL } from "boot/axios";
import { useRouteInfo } from "src/stores/routeInfo";
import { useStoreInfo } from "src/stores/storeInfo";

export default defineComponent({
  name: "VenuePage",
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
      setBottomTab('brand');
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
      allKeywords,
      openBookDialog: ref(false)
    };
  },
});
</script>
<style lang="sass" scoped>
</style>
