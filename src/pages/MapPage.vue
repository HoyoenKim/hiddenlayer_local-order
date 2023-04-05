<template>
  <q-page>
    <div>
      <div
        id="map"
        style="width: 100vw; height: 85vh"/>
    </div>
  </q-page>
  <q-dialog
    v-model="storeShow"
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
        class="q-pa-md flex flex-center">
        <div style="width: 400px">
          <SelectedStore :currentStore="currentStore"/>
        </div>   
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;

import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { api, baseURL } from "boot/axios";
import { useRouteInfo } from "src/stores/routeInfo";
import { useStoreInfo } from "src/stores/storeInfo";

import SelectedStore from "components/SelectedStore.vue";

export default defineComponent({
  name: "MapPage",
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
    const { allStores } = storeToRefs(storeInfo);
    const { setAllStores, setAllMenus, setCurrentStore } = storeInfo;

    // rendering map
    var storeShow = ref(false);
    var currentStore = ref({});
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

        // 커스텀 오버레이를 생성합니다
        var customOverlay = new kakao.maps.CustomOverlay({
            map: map,
            clickable: true,
            position: position,
            content: content,
            yAnchor: 1 
        });
      });
    }
    
    onMounted(() => {
      setHeaderTab("near");
      setBottomTab("home");
      if (window.kakao && window.kakao.maps) {
        initMap();
      }
      else {
        const script = document.createElement("script");
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=cc41afe829f5357f1b44183ca6956c7c&autoload=false"
        script.onload = () => window.kakao.maps.load(initMap);
        
        document.head.appendChild(script);
      }
    })
    
    return {
      storeShow,
      currentStore,
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
</style>