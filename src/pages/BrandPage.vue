<template>
  <q-page>
    <div
      v-if="Object.keys(currentStore).length != 0"
      class="column content-center">
      <div
        class="q-px-xs q-pb-md"
        style="width:100vw; max-width:500px">
        <q-card flat bordered>
          <q-card-section class="q-pa-none">
            <div v-if="parseInt(currentStore.store_images_nums) == 0"
              class="bg-grey-4 flex flex-center"
              style="height: 350px;">
              <div>
                이미지 준비중입니다.
              </div>
            </div>
            <q-carousel
              v-else
              v-model="storeSlide"
              class="q-pa-none"
              swipeable infinite
              style="height: 350px;">
              <q-carousel-slide
                v-for="storeImageNum in parseInt(currentStore.store_images_nums)" :key="storeImageNum" :name="storeImageNum"
                class=" q-pa-none bg-grey-4">
                <q-img
                  no-transition
                  no-spinner
                  class="fit"
                  fit="contain"
                  :src="baseURL + '/static/images/store/' + currentStore.store_id + '/' + storeImageNum + '.jpg'"
                  style="max-height: 350px;"/>
              </q-carousel-slide>
            </q-carousel>
          </q-card-section>
          <q-card-section
            class="q-pa-none row justify-center bg-grey-4">
            <div
              v-for="storeImageNum in parseInt(currentStore.store_images_nums)" :key="storeImageNum"
              class="q-px-xs"
              @click="storeSlide = storeImageNum">
              <q-icon
                v-if="storeImageNum == storeSlide"
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
        class="q-px-xs q-pb-md text-center"
        style="width:100vw; max-width:500px; font-size: 20px; color: #02BA8E">
        {{ currentStore.store_title }}
      </div>
      <div
        class="q-px-xs q-pb-md text-center text-h4"
        style="width:100vw; max-width:500px;">
        <div v-for="t in currentStore.store_description.split('\n')" :key="t">
          {{ t }}
        </div>
      </div>
      <div
        class="q-px-xl q-pb-md"
        style="width:100vw; max-width:500px;">
        <q-separator size="4px" color="grey-4" inset />
      </div>
      <div
        v-for="keywordId in ds(currentStore.store_keyword_ids).slice(0, -4)" :key="keywordId"
        class="q-px-md q-pt-lg q-pb-md"
        style="width:100vw; max-width:500px; font-size: 14px">
        <div class="text-bold">
          #{{ allKeywords[keywordId].keyword_title }}
        </div>
        <div v-for="t in allKeywords[keywordId].keyword_description.split('\n')" :key="t">
          {{ t }}
        </div>
      </div>

      <div
        id="staticMap"
        class="bg-grey"
        style="width: 100vw; max-width: 500px; height: 200px">
      </div>

      <div
        v-for="keywordId in ds(currentStore.store_keyword_ids).slice(-4)" :key="keywordId"
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
          <q-btn class="fit" color="white" style="background-color: #0AD3FF; font-size: 20px" flat @click="toMenuPage()">주문하러 가기</q-btn>
        </div>
      </div>


      <!--<div
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
                no-transition no-spinner
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

      </div>-->
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
import { defineComponent, ref, onBeforeMount, onMounted, computed } from "vue";
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
    const { allStories, allKeywords, currentStore } = storeToRefs(storeInfo);

    async function initMap() {
      var storeLocation = ds(currentStore.value.store_location);
      var storeTitle = currentStore.value.store_title;
      var storeId = currentStore.value.store_id;

      // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      var content = document.createElement('div');
      content.className = 'customoverlay';
      content.id = storeId;

      var content_a = document.createElement('a');
      content_a.id = storeId;
      var content_title = document.createElement('span');

      content_title.className = 'title';
      content_title.innerHTML = storeTitle;
      content_title.id = storeId;

      content_a.appendChild(content_title);
      content.appendChild(content_a);

      content.addEventListener('click', (event) => {
        });

      //이미지 지도에서 마커가 표시될 위치입니다
      var position  = new kakao.maps.LatLng(storeLocation[0], storeLocation[1]);
      var staticMap;
      if(storeLocation.length != 2) {
        var geocoder = new window.kakao.maps.services.Geocoder();
        // 주소로 좌표를 검색합니다
        var storeAddress = currentStore.value.store_address
        await geocoder.addressSearch(storeAddress, function(result, status) {
          // 정상적으로 검색이 완료됐으면
          if (status === window.kakao.maps.services.Status.OK) {
            position = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            var staticMapContainer  = document.getElementById('staticMap'), // 이미지 지도를 표시할 div
                staticMapOption = {
                    center: position, // 이미지 지도의 중심좌표
                    level: 3, // 이미지 지도의 확대 레벨
                };

            // 이미지 지도를 생성합니다
            var staticMap = new window.kakao.maps.Map(staticMapContainer, staticMapOption);
            var customOverlay = new window.kakao.maps.CustomOverlay({
                    clickable: true,
                    position: position,
                    content: content,
                    yAnchor: 1
                });
            customOverlay.setMap(staticMap);
          }
        })
      }

      var staticMapContainer  = document.getElementById('staticMap'), // 이미지 지도를 표시할 div
          staticMapOption = {
              center: position, // 이미지 지도의 중심좌표
              level: 3, // 이미지 지도의 확대 레벨
          };

      // 이미지 지도를 생성합니다
      var staticMap = new window.kakao.maps.Map(staticMapContainer, staticMapOption);
      var customOverlay = new window.kakao.maps.CustomOverlay({
              clickable: true,
              position: position,
              content: content,
              yAnchor: 1
          });
      customOverlay.setMap(staticMap);
    }

    onBeforeMount(() => {
      setBottomTab('brand');
      const script = document.createElement("script");
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=cc41afe829f5357f1b44183ca6956c7c&libraries=services&autoload=false"
      script.onload = () => window.kakao.maps.load(initMap);
      document.head.appendChild(script);
    })

    var isOpenStory = ref(false);
    var selectedStoryId = ref(0);
    function openStory(storyId) {
      isOpenStory.value = true;
      selectedStoryId.value = storyId;
    }

    function toMenuPage() {
      router.push({ path: "/menu" });
    }

    return {
      storeSlide: ref(1),
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

      allKeywords,
      toMenuPage
    };
  },
});
</script>

<style>
.customoverlay
  {
    position:relative;
    border-radius:6px;
    border: 1px solid #ccc;
    border-bottom:2px solid #ddd;
    float:left;
  }
.customoverlay:nth-of-type(n)
  {
    border:0;
    box-shadow:0px 1px 2px #888;
  }
.customoverlay a
  {
    display:block;
    text-decoration:none;
    color:#000;
    text-align:center;
    border-radius:6px;
    font-size:14px;
    font-weight:bold;
    overflow:hidden;
    background: #000000;
    background: #000000 url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center;
  }
.customoverlay .title
  {
    display:block;
    text-align:center;
    background:#fff;
    margin-right:35px;
    padding:10px 15px;
    font-size:15px;
    font-weight:bold;
  }
.customoverlay:after
  {
    content:'';
    position:absolute;
    margin-left:-12px;
    left:50%;
    bottom:-12px;
    width:22px;
    height:12px;
    background:url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')
  }
  #menu_wrap {position:absolute;top:0;left:0;bottom:0;width:250px;margin:10px 0 30px 10px;padding:5px;overflow-y:auto;background:rgba(255, 255, 255, 0.7);z-index: 1;font-size:12px;border-radius: 10px;}

</style>

<style lang="sass" scoped>
.visible
  width: 95vw
  max-width: 400px
.invisible
  width: 0px
  height: 0px
  overflow: hidden
</style>
