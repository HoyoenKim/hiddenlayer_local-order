<template>
  <q-page>
    <div v-if="Object.keys(currentStore).length != 0" class="q-pb-md">
      <div
        class=bg-grey-4
        style="height: 25vh; max-height: 300px">
      </div>      
      <div class="q-pt-md row wrap justify-center">
      <div
        style="width: 100vw; max-width: 400px">
        <q-list>
          <q-item>
            <q-item-section class="text-h5 text-bold">
              {{ currentStore.store_title }}
            </q-item-section>
            <q-item-section avatar>
              <q-icon color="orange" name="favorite_border" />
              <q-item-label caption>이벤트 구독</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-subtitle2">
                오늘의 이벤트
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="column q-gutter-lg">
            <q-card
              v-for="n in 2"
              :key="n"
              flat
              bordered
              class="bg-grey-4"
              style="width: 90vw; max-width: 400px; height: 20vh ;max-height: 150px; border-radius: 16px">
            </q-card>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-subtitle2">
                그간의 이벤트
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="column q-gutter-lg">
            <q-card
              v-for="n in 6"
              :key="n"
              flat
              bordered
              class="bg-grey-4"
              style="width: 90vw; max-width: 400px; height: 20vh ;max-height: 150px; border-radius: 16px">
            </q-card>
          </q-item>
        </q-list>
      </div>
    </div>
      <div>

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
    const { currentStore } = storeToRefs(storeInfo);

    onMounted(() => {
      setBottomTab('event');
    })

    return {
      currentStore
    };
  },
});
</script>
<style lang="sass" scoped>
</style>
