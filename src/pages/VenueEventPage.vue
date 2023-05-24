<template>
  <q-page>

    <div
      class="column items-center">
      <div
        class="q-px-xs q-py-md text-center text-h4"
        style="width:100vw; max-width:500px">
        행사장 이벤트
      </div>
      <div
        class="q-px-xs q-pb-md text-center"
        style="width:100vw; max-width:500px">
        <q-separator size="4px" color="grey-4" inset />
      </div>
      <div
        class="q-px-xs q-pb-md text-center text-h6"
        style="width:100vw; max-width:500px">
        {{ currentVenue.venue_description }}
      </div>
      <div
        class="q-px-xs q-pb-md text-center text-h5"
        style="width:100vw; max-width:500px">
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
      </div>
      <div
      class="q-px-xs q-py-md text-center text-h4"
      style="width:100vw; max-width:500px">
      부스 이벤트
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
          class="q-px-xl q-pb-md"
          style="width:100vw; max-width:500px;">
          <q-separator size="4px" color="grey-4" inset />
        </div>
        <div
          class="q-px-xs q-pb-md"
          style="width:100vw; max-width:500px;">
          <q-card
            v-for="eventId in ds(currentBooth.booth_events_ids)"
            :key="eventId"
            flat bordered
            class="bg-grey-4"
            style="; max-width: 500px; height: 25vh ; border-radius: 16px; border-width: 2px;">
            <q-card-section class="fit q-pa-none">
              <q-img
                class="fit"
                no-transition no-spinner
                :src="baseURL + '/static/images/event/' + eventId + '.jpg'"
                style="width: 100vw; max-width: 500px; height: 25vh ;border-radius: 16px;">
                <div class="absolute-full text-black" style="background-color: rgba(255, 255, 255, 0.7)">
                  <q-list
                    class="absolute-center"
                    style="width: 100vw; max-width: 500px;">
                    <q-item class="q-px-lg">
                      <q-item-section>
                        <q-item-label>
                          <div class="text-h6 text-bold">
                            {{ allEvents[eventId].event_title }}
                          </div>
                          <div class="q-py-sm text-subtitle1">
                            {{ allEvents[eventId].event_subtitle }}
                          </div>
                          <div class="q-py-sm">
                            {{ allEvents[eventId].event_description }}
                          </div>
                          <div class="text-overline">
                            ~ {{ allEvents[eventId].event_duedate.slice(0, 10) }}
                          </div>
                        </q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <div class="q-pt-lg fit column items-center text-black">
                          <q-icon color="black" size="md" name="favorite_border" />
                          <div>
                            {{ allEvents[eventId].event_subscription_number }}
                          </div>
                        </div>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </q-img>
            </q-card-section>
          </q-card>
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
  name: "VenueEventPage",
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
    const { currentVenue, allBooths, selectedBoothId, currentBooth, allKeywords, allEvents } = storeToRefs(storeInfo);
    const { setAllStores, setAllMenus, setCurrentStore, setSelectedBoothId } = storeInfo;

    onBeforeMount(() => {
      setBottomTab('event');
      setSelectedBoothId(selectedBoothId.value);
    })

    function selectedBooth(boothId) {
      setSelectedBoothId(boothId)
    }

    return {
      venueSlide: ref(1),
      currentVenue,
      baseURL,
      ds,
      allBooths,
      selectedBooth,
      selectedBoothId,
      currentBooth,
      boothSlide: ref(1),
      allKeywords,
      allEvents
    };
  },
});
</script>
<style lang="sass" scoped>
</style>
