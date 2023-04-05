<template>
  <q-page
    class="flex-center">
    <div
      v-if="Object.keys(currentStore).length != 0"
      class="q-pb-md">
      
      <div
        class="q-pa-md text-h5 text-bold">
        <q-item
          class="q-pa-none">
          <q-item-section>
            <q-item-label>
              {{ currentStore.store_title }}
            </q-item-label>
            <q-item-label
              class="q-pt-xs"
              style="font-size: 14px" caption>
              {{ currentStore.store_subtitle }}: {{ currentStore.store_description }}
            </q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-item-label caption>
              <q-btn
                class="bg-blue text-white"
                no-caps
                flat
                :rippe="false"
                style="border-radius: 10px">
                팔로우
              </q-btn>
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>

      <div
        class="q-pt-sm q-pb-md q-px-md">
        <q-input
          v-model="searchStory"  
          dense outlined label-slot
          color="black"
          type="search">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
          <template v-slot:label>
            <div
              class="text-grey-5">
              {{ currentStore.store_title }}에서 검색하기
            </div>
          </template>
        </q-input>
      </div>
      <div
        class="q-py-md row justify-center">
        <q-scroll-area
          style="height: 200px; width: 100vw;">
          <div
            class="q-pl-md fit row no-wrap q-gutter-md">
            <div
              v-for="storeImageNum in parseInt(currentStore.store_images_nums)"
              :key="storeImageNum"
              class="bg-grey-4"
              style="height: 180px; width: 180px; border-radius: 16px">
              <q-img
                class="fit"
                :src="baseURL + '/static/images/store/' + currentStore.store_id + '/' + storeImageNum + '.jpg'"
                style="border-radius: 16px"/>
            </div>
          </div>
        </q-scroll-area>
      </div>

      <div>
        <q-tabs
          v-model="storeInfoTab"
          no-caps
          align="center"
          active-class="bg-white text-black"
          content-class="bg-white text-grey-5"
          style="width: 100vw">
        <q-tab name="story" icon="grid_view" :ripple="false"/>
        <q-tab name="brand" icon="view_timeline" :ripple="false"/>
        <q-tab name="info" icon="info" :ripple="false"/>
      </q-tabs>
      </div>

      <div
        class="q-pt-xs row justify-center">
        <div
          v-if="storeInfoTab == 'story'"
          class="fit row q-gutter-xs"
          style="width: 100wv; max-width: 405px">
          <div
            v-for="storyId in ds(currentStore.story_ids)"
            :key="storyId"
            style="height: 130px; width: 130px"
            @click="openStory(storyId)">
            <q-img
              class="fit"
              no-transition no-spinner
              :src="baseURL + '/static/images/story/' + storyId + '/0.jpg'"/>
          </div>
        </div>
        
        <div
          v-else-if="storeInfoTab == 'brand'"
          class="fit row justify-center q-gutter-md"
          style="width: 95vw; max-width: 400px">
          <div
            v-for="storyId in ds(currentStore.story_ids)"
            :key="storyId">
            <SelectedStory :storyId="storyId">
            </SelectedStory>
          </div>
        </div>
        
        <div
          :class="{ 'invisible' : storeInfoTab != 'info', 'visible' : storeInfoTab == 'info' }"> 
          <q-list
            class="bg-white"
            bordered>
            <q-item-label
              class="text-subtitle1 text-bold q-pa-md">
              가게 위치 및 영업 시간
            </q-item-label> 
            <q-card flat>
              <q-card-section
                class="q-px-md q-pt-none q-pb-sm q-gutter-sm">
                <div>
                  <q-icon name="place" size="xs" color="grey-6" /> 위치
                </div>
                <div>
                  {{ ds(currentStore.store_official_information)[1] }}
                </div>
                <div
                  id="staticMap"
                  class="bg-grey"
                  style="width: 87vw; max-width: 400px; height: 200px">
                </div>
              </q-card-section>
              <q-card-section
                class="q-px-md q-py-sm q-gutter-sm">
                <div>
                  <q-icon name="alarm" size="xs" color="grey-6" /> 영업 시간
                </div>
                <div
                  v-for="(open_time, index) in ds(currentStore.store_open_time)"
                  :key="open_time">
                  {{ dateString[index] }}
                  {{ open_time[0] }}:00 - {{ open_time[1] }}:00
                </div>
              </q-card-section>
            </q-card>
            <q-separator />
            <q-item-label
              class="text-subtitle1 text-bold q-pa-md">
              사업자등록 정보
            </q-item-label>
            <q-card flat>
              <q-card-section
                class="q-px-md q-pt-none q-pb-sm q-gutter-sm">
                <div
                  v-for="(info, index) in ds(currentStore.store_official_information)" :key="info"
                  class="col row">
                  {{ infoString[index] }}
                  {{ info }}                
                </div>
              </q-card-section>
            </q-card>
          </q-list>
        </div>

      </div>
    </div>
  </q-page>
  <q-dialog
    v-model="isOpenStory"
    position="bottom">
    <q-card
      style="width: 100vw; max-width: 400px">
      <q-card-section
        class="q-pa-none bg-grey-4 row justify-end">
        <q-btn
          size="sm"
          icon="close"
          :ripple="false"
          round flat v-close-popup/>
      </q-card-section>
      <q-card-section
        class="q-pa-none">
        <div class="fit">
        <SelectedStory :storyId="selectedStoryId">
        </SelectedStory>
      </div>
      </q-card-section>
    </q-card>

  </q-dialog>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { api, baseURL } from "boot/axios";
import { useRouteInfo } from "src/stores/routeInfo";
import { useStoreInfo } from "src/stores/storeInfo";
import { useCartStore } from "src/stores/cartInfo";

import SelectedStory from "src/components/SelectedStory.vue"

export default defineComponent({
  name: "BrandPage",
  components: { SelectedStory },
  setup() {
    // routing
    const router = useRouter();

    // route, utils
    const routeInfoStore = useRouteInfo();
    const { headerTab, bottomTab } = storeToRefs(routeInfoStore);
    const { setHeaderTab, setBottomTab, ds } = routeInfoStore;

    // store information
    const storeInfo = useStoreInfo();
    const { allStories, currentStore } = storeToRefs(storeInfo);

    function initMap() {
      var store_location = ds(currentStore.value.store_location);
      //이미지 지도에서 마커가 표시될 위치입니다 
      var markerPosition  = new kakao.maps.LatLng(store_location[0], store_location[1]); 
          
      // 이미지 지도에 표시할 마커입니다
      // 이미지 지도에 표시할 마커는 Object 형태입니다
      var marker = {
          position: markerPosition
      };

      var staticMapContainer  = document.getElementById('staticMap'), // 이미지 지도를 표시할 div  
          staticMapOption = { 
              center: new kakao.maps.LatLng(store_location[0], store_location[1]), // 이미지 지도의 중심좌표
              level: 3, // 이미지 지도의 확대 레벨
              marker: marker // 이미지 지도에 표시할 마커 
          };    
        
      // 이미지 지도를 생성합니다
      var staticMap = new kakao.maps.StaticMap(staticMapContainer, staticMapOption);
    }

    onMounted(() => {
      setBottomTab('brand');
      if (window.kakao && window.kakao.maps) {
        initMap();
      }
      else {
        const script = document.createElement("script");
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=cc41afe829f5357f1b44183ca6956c7c&autoload=false"
        script.onload = () => window.kakao.maps.load(initMap);
        
        document.head.appendChild(script);
      }
    });

    var isOpenStory = ref(false);
    var selectedStoryId = ref(0);
    function openStory(storyId) {
      isOpenStory.value = true;
      selectedStoryId.value = storyId;
    }

    return {
      searchStory: ref(''),

      currentStore,
      allStories,
      baseURL,
      ds,

      isOpenStory,
      selectedStoryId,
      openStory,

      storeInfoTab: ref("story"),
      dateString: ref([
        "월요일 : ",
        "화요일 : ",
        "수요일 : ",
        "목요일 : ",
        "금요일 : ",
        "토요일 : ",
        "일요일 : ",
        "공휴일 : ",
      ]),
      infoString: ref(["대표자명 : ", "대표주소 : ", "대표번호 : "]),
    };
  },
});
</script>

<style lang="sass" scoped>
.visible
  width: 95vw
  max-width: 400px
.invisible
  width: 0px
  height: 0px
  overflow: hidden
</style>
