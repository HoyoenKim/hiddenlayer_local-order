<template>
  <q-page>
    <div v-if="Object.keys(currentStore).length != 0" class="q-pb-md">
      <div
        style="height: 25vh; max-height: 300px">
        <q-img
            class="fit"
            no-transition no-spinner
            :src="baseURL + '/static/images/store/' + currentStore.store_id + '/' + 0 + '.jpg'"
            fit="contain">
        </q-img>
      </div>      
      <div
        class="q-pt-lg row wrap justify-center">
        
        <div
          style="width: 100vw; max-width: 400px">
          <q-list>
            <q-item class="q-pb-lg">
              <q-item-section class="text-h5 text-bold">
                {{ currentStore.store_title }}
              </q-item-section>
              <q-item-section side >
                <div class="fit column items-center">
                  <q-icon color="orange" size="md" name="favorite_border" />
                  <div>
                    이벤트 구독
                  </div>
                </div>
              </q-item-section>
            </q-item>
            <q-separator />
            
            <q-item class="q-pt-lg">
              <q-item-section>
                <q-item-label class="text-h6 text-bold">
                  오늘의 이벤트
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="q-pb-lg column q-gutter-lg">
              <q-card
                v-for="(currentEvent, currentIndex) in currentEvents"
                :key="currentIndex"
                flat bordered
                class="bg-grey-4"
                style="width: 90vw; max-width: 400px; height: 20vh ;max-height: 150px; border-radius: 16px; border-width: 2px;">
                <q-card-section class="fit q-pa-none">
                  <q-img
                    class="fit"
                    no-transition no-spinner
                    :src="baseURL + '/static/images/event/' + currentEvent.event_id + '.jpg'"
                    style="width: 90vw; max-width: 400px; height: 20vh ;max-height: 150px; border-radius: 16px;">
                    <div class="absolute-full text-black" style="background-color: rgba(255, 255, 255, 0.7)">
                      <q-list
                        class="absolute-center"
                        style="width: 90vw; max-width: 400px;">
                        <q-item class="q-px-lg">
                          <q-item-section>
                            <q-item-label>
                              <div class="text-h6 text-bold">
                                {{ currentEvent.event_title }}
                              </div>
                              <div class="q-py-sm text-subtitle1">
                                {{ currentEvent.event_subtitle }}
                              </div>
                              <div class="text-overline">
                                {{ currentEvent.event_duedate.slice(0, 10) }}
                              </div>
                            </q-item-label>
                          </q-item-section>
                          <q-item-section side>
                            <div class="q-pt-lg fit column items-center text-black">
                              <q-icon color="black" size="md" name="favorite_border" />
                              <div>
                                0
                              </div>
                            </div>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </div>
                  </q-img>
                </q-card-section>
              </q-card>
            </q-item>
            
            <q-separator />
            
            <q-item class="q-pt-lg">
              <q-item-section>
                <q-item-label class="text-h6 text-bold">
                  그간의 이벤트
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="column q-gutter-lg">
              <q-card
                v-for="(pastEvent, pastIndex) in pastEvents"
                :key="pastIndex"
                flat bordered
                class="bg-grey-4"
                style="width: 90vw; max-width: 400px; height: 20vh ;max-height: 150px; border-radius: 16px; border-width: 2px;">
                <q-card-section class="fit q-pa-none">
                  <q-img
                    class="fit"
                    no-transition no-spinner
                    :src="baseURL + '/static/images/event/' + pastEvent.event_id + '.jpg'"
                    style="width: 90vw; max-width: 400px; height: 20vh ;max-height: 150px; border-radius: 16px">
                    <div class="absolute-full text-black" style="background-color: rgba(255, 255, 255, 0.7)">
                      <q-list
                        class="absolute-center"
                        style="width: 90vw; max-width: 400px;">
                        <q-item class="q-px-lg">
                          <q-item-section>
                            <q-item-label>
                              <div class="text-h6 text-bold">
                                {{ pastEvent.event_title }}
                              </div>
                              <div class="q-py-sm text-subtitle1">
                                {{ pastEvent.event_subtitle }}
                              </div>
                              <div class="text-overline">
                                {{ pastEvent.event_duedate.slice(0, 10) }}
                              </div>
                            </q-item-label>
                          </q-item-section>
                          <q-item-section side>
                            <div class="q-pt-lg fit column items-center text-black">
                              <q-icon color="black" size="md" name="favorite_border" />
                              <div>
                                0
                              </div>
                            </div>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </div>
                  </q-img>
                </q-card-section>
              </q-card>
            
            </q-item>
          </q-list>
        </div>
      
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { api, baseURL } from "boot/axios";
import { useRouteInfo } from "src/stores/routeInfo";
import { useStoreInfo } from "src/stores/storeInfo";

export default defineComponent({
  name: "EventPage",
  components: {},
  setup() {
    // routing
    const router = useRouter();

    // route, utils
    const routeInfoStore = useRouteInfo();
    const { headerTab, bottomTab } = storeToRefs(routeInfoStore);
    const { setHeaderTab, setBottomTab, ds } = routeInfoStore;

    // store Information
    const storeInfo = useStoreInfo();
    const { currentStore, allEvents } = storeToRefs(storeInfo);

    var currentEvents = ref([]);
    var pastEvents = ref([]);
    function initEvent() {
      // init event
      var nowTime = Date.now(); 
      for(const event_id of ds(currentStore.value.event_ids)) {
        var duedate = Date.parse(allEvents.value[event_id].event_duedate)
        if(duedate > nowTime) {
          currentEvents.value.push(allEvents.value[event_id]);
        }
        else {
          pastEvents.value.push(allEvents.value[event_id]);
        }
      }
    }
    
    onMounted(() => {
      setBottomTab('event');
      initEvent();
    })

    return {
      currentStore,
      baseURL,
      ds,
      currentEvents,
      pastEvents
    };
  },
});
</script>
<style lang="sass" scoped>
</style>
