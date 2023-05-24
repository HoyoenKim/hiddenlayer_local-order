<template>
  <q-page>
    {{ currentVenue }}
    <div
      class="column content-center">
      <div
        class="q-px-xs q-pb-md text-center text-h4"
        style="width:100vw; max-width:500px">
        {{ currentVenue.venue_title }}
      </div>
      <div
        class="q-px-xs q-pb-md text-center"
        style="width:100vw; max-width:500px">
        <q-separator size="4px" color="grey-4" inset />
      </div>

      <div
        class="q-px-xs q-pb-md text-center text-h5"
        style="width:100vw; max-width:500px">
        {{ currentVenue.venue_description }}
      </div>
      <div
        class="q-px-xs q-pb-md text-center text-h5"
        style="width:100vw; max-width:500px">
        <q-img
            no-transition
            no-spinner
            class="fit"
            fit="contain"
            :src="baseURL + '/static/images/venue/' + currentVenue.venue_id + '/0.jpg'"
            style="max-height: 400px;"/>
      </div>

      <div id="map" style="width:100vw; max-width:500px; height:150px;"></div>
      <div
        class="q-px-xs q-pb-md"
        style="width:100vw; max-width:500px">
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
    const { currentVenue } = storeToRefs(storeInfo);
    const { setAllStores, setAllMenus, setCurrentStore } = storeInfo;

    async function initMap() {
      var domain = 'https://i1.daumcdn.net';
      var path = '/dmaps/apis/openapi/sampleimg/';
      var plan = function( x, y, z ) {
          y = -y - 1;
          var limit = Math.ceil( 3 / Math.pow( 2, z ) );

          if ( 0 <= y && y < limit && 0 <= x && x < limit ) {
              return baseURL + '/static/images/venue/' + currentVenue.value.venue_id + '/0.jpg';
          } else {
              return 'https://i1.daumcdn.net/dmaps/apis/white.png';
          }
      };

      kakao.maps.Tileset.add( 'PLAN',
              new kakao.maps.Tileset(
                  512, 512, plan, '', false, 0, 2 ) );

      var node = document.getElementById( 'map' );
      var map = new kakao.maps.Map( node, {
          projectionId: null,
          mapTypeId: kakao.maps.MapTypeId.PLAN,
          $scale: false,
          center: new kakao.maps.Coords( 650, -550 ),
          level: 2
      } );
      var center = map.getCenter();
      var marker = new kakao.maps.Marker({
          position: center
      });
      marker.setMap(map);

      var infowindow = new kakao.maps.InfoWindow({
          content: '커스텀 타일셋을 올릴수 있습니다!'
      });
      infowindow.open(map, marker);
    }
    onBeforeMount(() => {
      setBottomTab('brand');
      const script = document.createElement("script");
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=cc41afe829f5357f1b44183ca6956c7c&libraries=services&autoload=false"
      script.onload = () => window.kakao.maps.load(initMap);
      document.head.appendChild(script);
    })

    return {
      currentVenue,
      baseURL,
    };
  },
});
</script>
<style lang="sass" scoped>
.store-card
  width: 95vw
  max-width: 400px
</style>
