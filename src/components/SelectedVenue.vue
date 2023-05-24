<template>
  <q-card
    flat bordered
    @click="toVenuPage(currentVenue)">
    <q-card-section class="q-pa-none">
      <div v-if="parseInt(currentVenue.venue_images_nums) == 0"
        class="bg-grey flex flex-center"
        style="height: 400px;">
        <div>
          이미지 준비중입니다.
        </div>
      </div>
      <q-carousel
        v-else
        v-model="venueSlide"
        class="q-pa-none"
        swipeable infinite
        style="height: 400px;">
        <q-carousel-slide
          v-for="venuImageNum in parseInt(currentVenue.venue_images_nums)" :key="venuImageNum" :name="venuImageNum"
          class=" q-pa-none bg-grey-4">
          <q-img
            no-transition
            no-spinner
            class="fit"
            fit="contain"
            :src="baseURL + '/static/images/venue/' + currentVenue.venue_id + '/' + venuImageNum + '.jpg'"
            style="max-height: 400px;"/>
        </q-carousel-slide>
      </q-carousel>
    </q-card-section>
    <q-card-section
      class="q-pa-none row justify-center bg-grey-4">
      <div
        v-for="venuImageNum in parseInt(currentVenue.venue_images_nums)" :key="venuImageNum"
        class="q-px-xs"
        @click="venueSlide = venuImageNum">
        <q-icon
          v-if="venuImageNum == venueSlide"
          class="text-blue-9" name="circle"
          style="font-size: 0.5em;" />
        <q-icon
          v-else
          class="text-white" name="circle"
          style="font-size: 0.5em;"/>
      </div>
    </q-card-section>
  </q-card>
  <q-card
    flat
    style="font-size: 18px"
    @click="toVenuPage(currentVenue)">
    <q-card-section
      class="q-pa-none q-pt-xs">
      <q-list>
        <q-item
          class="q-px-xs q-pb-none">
          <q-item-section>
            <q-item-label>
              {{ currentVenue.venue_title }}
            </q-item-label>
            <q-item-label
              style="font-size: 14px" caption>
                {{ currentVenue.venue_description }}
            </q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-item-label style="font-size: 18px" caption>
              <q-btn outline>상세보기</q-btn>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
  <!--<q-card
    flat
    style="font-size: 18px"
    @click="toMenuPage(currentStore)">
    <q-card-section
      class="q-pa-none q-pt-xs">
      <q-list>
        <q-item
          class="q-px-xs q-pb-none">
          <q-item-section>
            <q-item-label>
              {{ currentStore.store_title }}
              <q-chip color="white">
                <q-avatar color="white" text-color="yellow" font-size="1em" icon="star"/>
                4.9
              </q-chip>
            </q-item-label>
            <q-item-label
              style="font-size: 14px" caption>
              {{ currentStore.store_subtitle }}: {{ currentStore.store_description }}
            </q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-item-label style="font-size: 18px" caption>
              <q-btn outline>주문하러 가기</q-btn>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-card-actions class="q-px-xs q-col-gutter-sm">
      <span
        v-for="(value, index) in ds(currentStore.store_order_type)"
        :key="value">
        <q-badge
          v-if="value == '1'"
          class="bg-grey-4 text-black">
          <div class="q-pa-xs">
            {{ orderType[index] }}
          </div>
        </q-badge>
      </span>
    </q-card-actions>
  </q-card>-->
</template>

<script>
  import { defineComponent, ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { storeToRefs } from "pinia";
  import { api, baseURL } from "boot/axios";
  import { useRouteInfo } from "src/stores/routeInfo";
  import { useStoreInfo } from "src/stores/storeInfo";

  export default defineComponent({
    name: "SelectedVenue",
    components: {},
		props: {
			currentVenue: {
				type: Object
			}
		},
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
      const { setCurrentStore, setCurrentVenue } = storeInfo;

      // to brand page
      // to menu page
      function toVenuPage(venue_info) {
        setCurrentVenue(venue_info);
        router.push({ path: "/venue" }); //for develo
      }

      return {
        venueSlide: ref(1),
        ds,
        baseURL,
        orderType: ref(["테이블 주문 가능", "포장 가능", "배달 가능"]),
        toVenuPage,
      };
    },
  });
</script>
