<template>
  <q-page>
    <div class="bg-grey" style="overflow:hidden">
      <div
        id="map"
        style="width: 100vw; height: 90vh; position:relative; overflow:hidden;">
      </div>
      <div style="position:absolute; top:3vh; width:100vw; z-index: 1;">
        <q-input
          class="q-px-sm"
          v-model="searchStore"
          bg-color="white"
          outlined
          label-slot
          color="black"
          type="search">
          <template v-slot:label>
            <div class="text-grey-8">지역 명소를 검색해 보세요!</div>
          </template>
          <template v-slot:append>
            <q-btn
              icon="search"
              dense
              flat>
            </q-btn>
          </template>
        </q-input>
      </div>
      <div
        class="bg-white absolute-bottom shadow-up-3"
        :style="'position:absolute; top:' + activeBottomSize + 'vh; width:100vw; z-index: 1; border-radius: 20px 20px 0 0; overflow: hidden'"
        v-touch-swipe.mouse="handleSwipe">
        <div class="q-px-lg flex flex-center">
          <q-icon color="grey-6" size="lg" name="remove" ></q-icon>
        </div>
        <div class="q-px-md text-bold"
          style="font-size: 18px">
          내주변 둘러보기
        </div>
        <div>
          <q-tabs
            v-model="listTab"
            dense
            class="text-subtitle1 text-bold"
            no-caps
            align="left"
            :breakpoint="100"
            active-class="bg-white text-black"
            content-class="bg-white text-grey-5">
            <q-tab name="store" label="맛집" :ripple="false"/>
            <q-tab name="venue" label="행사장" :ripple="false"/>
          </q-tabs>
        </div>

        <div class="q-pt-sm">
          <q-scroll-area
            ref="scrollAreaRef"
            :style="activeScroll == 1 ? 'height: 65vh; width: 100vw;': ''"
            @scroll="onScroll"
            @touchstart.stop @mousedown.stop>
            <div v-if="listTab == 'store'" class="column flex-center">
              <div
                v-for="(store, storeIndex) in allStores"
                :key="storeIndex"
                class="store-card q-px-xs q-pb-md"
                @click="toBrandPage(store)">
                <SelectedStore :currentStore="store"/>
              </div>
            </div>
            <div v-else class="column flex-center">
              <div
                v-for="(venue, venuIndex) in allVenues"
                :key="venuIndex"
                class="store-card q-px-xs q-pb-md"
                @click="toVenuePage(venue)">
                <SelectedVenue :currentVenue="venue"/>
              </div>
            </div>
          </q-scroll-area>
          <div
            v-if="activeScroll == 0"
            style="height: 165vh; width: 100vw; overflow:hidden;">
            <div v-if="listTab == 'store'" class="column flex-center">
              <div
              v-for="(store, storeIndex) in allStores"
              :key="storeIndex"
              class="store-card q-px-xs q-pb-md"
              @click="toBrandPage(store)">
              <SelectedStore :currentStore="store"/>
            </div>
          </div>
          <div v-else class="column flex-center">
            <div
              v-for="(venue, venuIndex) in allVenues"
              :key="venuIndex"
              class="store-card q-px-xs q-pb-md"
              @click="toVenuePage(venue)">
              <SelectedVenue :currentVenue="venue"/>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </q-page>
  <q-dialog
    v-model="storeShow"
    position="bottom">
    <q-card
      style="width: 100vw; max-width: 500px">
      <q-card-section
        class="q-pa-none bg-grey-4 row justify-end">
        <q-btn
          size="sm"
          icon="close"
          :ripple="false"
          round flat v-close-popup/>
      </q-card-section>
      <q-card-section
        class="q-px-xs q-py-md flex flex-center">
        <div style="width: 100vw; max-width: 500px">
          <SelectedStore :currentStore="currentStore"/>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog
    v-model="venueShow"
    position="bottom">
    <q-card
      style="width: 100vw; max-width: 500px">
      <q-card-section
        class="q-pa-none bg-grey-4 row justify-end">
        <q-btn
          size="sm"
          icon="close"
          :ripple="false"
          round flat v-close-popup/>
      </q-card-section>
      <q-card-section
        class="q-px-xs q-py-md flex flex-center">
        <div style="width: 100vw; max-width: 500px">
          <SelectedVenue :currentVenue="currentVenue"></SelectedVenue>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;

import { defineComponent, ref, onMounted, onBeforeMount, computed } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { api, baseURL } from "boot/axios";
import { useRouteInfo } from "src/stores/routeInfo";
import { useStoreInfo } from "src/stores/storeInfo";
//import { Geolocation } from '@capcitor/geolocation';
import { LocalStorage, SessionStorage } from "quasar";

import SelectedStore from "components/SelectedStore.vue";
import SelectedVenue from "components/SelectedVenue.vue";

export default defineComponent({
  name: "MapPage",
  components: { SelectedStore, SelectedVenue },
  setup() {
    const scrollAreaRef = ref(null);

    // routing
    const router = useRouter();

    // route, utils
    const routeInfoStore = useRouteInfo();
    const { headerTab, bottomTab } = storeToRefs(routeInfoStore);
    const { setHeaderTab, setBottomTab, ds } = routeInfoStore;

    // store information
    const storeInfo = useStoreInfo();
    const { allStores, allVenues } = storeToRefs(storeInfo);
    const { setAllStores, setAllVenues, setAllMenus, setCurrentStore, setCurrentVenue } = storeInfo;

    // rendering map
    var storeShow = ref(false);
    var currentStore = ref({});
    var venueShow = ref(false);
    var currentVenue = ref({});
    async function initMap() {
      var mapContainer = document.getElementById('map'), // 지도를 표시할 div
          mapOption = {
                center: new kakao.maps.LatLng("35.23021", "126.839829" ), // 지도의 중심좌표
                level: 5 // 지도의 확대 레벨
            };
      var map = new kakao.maps.Map(mapContainer, mapOption);

      if(allStores.value.length == 0) {
        setAllStores();
      }

      if(allVenues.value.length == 0) {
        setAllVenues();
      }

      allStores.value.forEach((storeInfo) => {
        var storeLocation = ds(storeInfo.store_location)
        var storeTitle = storeInfo.store_title;
        var storeId = storeInfo.store_id;

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
          //console.log(event.target.id);
          storeShow.value = true;
          currentStore.value = allStores.value[event.target.id];
        });

        // 커스텀 오버레이가 표시될 위치입니다
        var position = new kakao.maps.LatLng(storeLocation[0], storeLocation[1]);
        if(storeLocation.length != 2) {
          var geocoder = new window.kakao.maps.services.Geocoder();
          // 주소로 좌표를 검색합니다
          var storeAddress = storeInfo.store_address
          geocoder.addressSearch(storeAddress, function(result, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === window.kakao.maps.services.Status.OK) {
              position = new window.kakao.maps.LatLng(result[0].y, result[0].x);
              var customOverlay = new kakao.maps.CustomOverlay({
                  map: map,
                  clickable: true,
                  position: position,
                  content: content,
                  yAnchor: 1
              });
            }
          })
        }
        else {
          var customOverlay = new kakao.maps.CustomOverlay({
              map: map,
              clickable: true,
              position: position,
              content: content,
              yAnchor: 1
          });
        }
      });

      allVenues.value.forEach((venueInfo) => {
        var venueLocation = ds(venueInfo.venue_location)
        var venueTitle = venueInfo.venue_title;
        var venueId = venueInfo.venue_id + 10000;

        // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        var content = document.createElement('div');
        content.className = 'customoverlay';
        content.id = venueId;

        var content_a = document.createElement('a');
        content_a.id = venueId;

        var content_title = document.createElement('span');
        content_title.className = 'title';
        content_title.innerHTML = venueTitle;
        content_title.id = venueId;

        content_a.appendChild(content_title);
        content.appendChild(content_a);

        content.addEventListener('click', (event) => {
          //console.log(event.target.id);
          venueShow.value = true;
          currentVenue.value = allVenues.value[event.target.id - 10000];
        });

        // 커스텀 오버레이가 표시될 위치입니다
        var position = new kakao.maps.LatLng(venueLocation[0], venueLocation[1]);
        if(venueLocation.length != 2) {
          var geocoder = new window.kakao.maps.services.Geocoder();
          // 주소로 좌표를 검색합니다
          var venueAddress = venueInfo.venue_address
          //console.log(venueAddress)
          geocoder.addressSearch(venueAddress, function(result, status) {
            // 정상적으로 검색이 완료됐으면
            //console.log(status)
            if (status === window.kakao.maps.services.Status.OK) {
              position = new window.kakao.maps.LatLng(result[0].y, result[0].x);
              var customOverlay = new kakao.maps.CustomOverlay({
                  map: map,
                  clickable: true,
                  position: position,
                  content: content,
                  yAnchor: 1
              });
            }
          })
        }
        else {
          var customOverlay = new kakao.maps.CustomOverlay({
              map: map,
              clickable: true,
              position: position,
              content: content,
              yAnchor: 1
          });
        }
      });
    }

    onBeforeMount(() => {
      setHeaderTab("near");
      setBottomTab("home");
      const script = document.createElement("script");
      script.src = "http://dapi.kakao.com/v2/maps/sdk.js?appkey=cc41afe829f5357f1b44183ca6956c7c&libraries=services&autoload=false"
      script.onload = () => window.kakao.maps.load(initMap);
      document.head.appendChild(script);
    })

    const info = ref(null);
    var activeBottomSize = ref(65);
    var scrollVerticalPosition = ref(-1);
    var activeScroll = ref(0);

    // to menu page
    function toBrandPage(store_Info) {
      setCurrentStore(store_Info);
      router.push({ path: "/brand" });
    }

    function toVenuePage(venu_info) {
      setCurrentVenue(venu_info);
      router.push({ path: "/venue"})
    }

    return {
      searchStore: ref(""),
      storeShow,
      currentStore,
      venueShow,
      currentVenue,
      allVenues,
      info,
      activeBottomSize,
      handleSwipe ({ evt, ...newInfo }) {
        info.value = newInfo
        //console.log(newInfo)
        if(activeBottomSize.value == 65) {
          if(newInfo.direction == "up") {
            activeBottomSize.value = 12;
          }
          else if(newInfo.direction == "down") {
            activeBottomSize.value = 80;
          }
        }
        else if(activeBottomSize.value == 12) {
          if(newInfo.direction == "down") {
            activeBottomSize.value = 65;
          }
          else if(newInfo.direction == "up") {
            activeScroll.value = 1;
            scrollAreaRef.value.setScrollPosition('vertical', 300, 300)
          }
        }
        else if(activeBottomSize.value == 80) {
          if(newInfo.direction == "up") {
            activeBottomSize.value = 65;
          }
        }

        // native Javascript eventß
        // console.log(evt)
      },
      allStores,
      onScroll (info) {
        if(scrollVerticalPosition.value != -1 || info.verticalPosition != 0) {
          scrollVerticalPosition.value = info.verticalPosition;
        }

        if(scrollVerticalPosition.value == 0) {
          activeScroll.value = 0;
          scrollVerticalPosition.value = -1;
        }
      },
      toBrandPage,
      toVenuePage,
      scrollVerticalPosition,
      activeScroll,
      scrollAreaRef,
      listTab: ref('store'),
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
.store-card
  width: 100vw
  max-width: 500px
</style>
