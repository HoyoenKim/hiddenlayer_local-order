<template>
  <q-page class="flex-center">
    <!--<div>{{ currentStore }}{{ brandStory }}</div>-->
    <div v-if="Object.keys(currentStore).length != 0" class="q-pb-md">
      <div class="q-pa-md text-h5 text-bold">
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
      <div class="q-pt-sm q-pb-md q-px-md">
        <q-input
          v-model="text"  
          dense
          outlined
          label-slot
          color="black"
          type="search">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
          <template v-slot:label>
            <div class="text-grey-5">
              {{ currentStore.store_title }}에서 검색하기
            </div>
          </template>
        </q-input>
      </div>
      <div class="q-py-md row justify-center ">
        <q-scroll-area
          style="height: 200px; width: 100vw;">
          <div class="q-pl-md fit row no-wrap q-gutter-md">
            <div v-for="n in parseInt(currentStore.store_images_nums)" :key="n" class="bg-grey-4"
              style="height: 180px; width: 180px; border-radius: 16px">
              <q-img
                no-transition
                no-spinner
                class="fit"
                :src="baseURL + '/static/images/store/' + currentStore.store_id + '/' + n + '.jpg'"
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
      <div class="q-pt-xs row justify-center">
        <div
          v-if="storeInfoTab == 'story'"
          class="fit row q-gutter-xs"
          style="width: 100wv; max-width: 405px">
          <div
            v-for="n in ds(currentStore.story_ids)" :key="n"
            style="height: 130px; width: 130px">
            <q-img
              no-transition
              no-spinner
              class="fit"
              :src="baseURL + '/static/images/story/' + n + '/0.jpg'"/>
          </div>
        </div>
        <div v-else-if="storeInfoTab == 'brand'"
          class="fit row justify-center q-gutter-md"
          style="width: 95vw; max-width: 400px">
          <div v-for="storyId in ds(currentStore.story_ids)" :key="storyId">
            <q-card
              flat
              bordered
              style="width: 95vw; max-width: 400px">
              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <q-img
                      no-transition
                      no-spinner
                      :src="baseURL + '/static/images/store/' + currentStore.store_id + '/0.jpg'"/>
                  </q-avatar>
                </q-item-section>
                <q-item-section class="text-subtitle2">
                  <q-item-label>
                    {{ currentStore.store_title }}
                  </q-item-label>
                  <q-item-label caption>
                    {{ currentStore.store_subtitle }}: {{ currentStore.store_description }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-card-section class="q-pa-none">
                <div
                  class="fit bg-grey-4"
                  style="width: 95vw; max-width: 400px">
                  <q-img
                    class="fit"
                    :src="baseURL + '/static/images/story/' + storyId + '/0.jpg'"/>
                </div>
              </q-card-section>
              <q-card-actions class="q-px-sm q-pt-md q-pb-none q-col-gutter-sm">
                <span
                  v-for="(storyTag, index) in ds(allStories[storyId].story_tag )"
                  :key="index">
                  <q-badge>
                    #{{ storyTag }}
                  </q-badge>
                </span>
              </q-card-actions>
              <q-card-section
                class="q-pa-none">
                <q-list>
                  <q-item>
                    <q-item-section>
                      <q-item-label
                        style="font-size: 22px">
                        {{ allStories[storyId].story_title }}
                      </q-item-label>
                      <q-item-label
                        style="font-size: 18px" caption>
                        {{ allStories[storyId].story_subtitle }}
                      </q-item-label>
                      <q-item-label class="q-pt-md q-pb-sm">
                        {{ allStories[storyId].story_description }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
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
      <!--<div>
        <q-carousel
          animated
          swipeable
          infinite
          navigation
          navigation-position="bottom"
          :autoplay="storeSlideAutoplay"
          transition-prev="slide-right"
          transition-next="slide-left"
          @mouseenter="storeSlideAutoplay = false"
          @mouseleave="storeSlideAutoplay = 2500"
          v-model="storeSlide"
          height="250px"
        >
          <q-carousel-slide name="4">
            <q-img
              :src="
                baseURL +
                '/static/images/store/' +
                currentStore.store_id +
                '/4.jpg'
              "
              fit="scale-down"
              width="100%"
              height="100%"
            ></q-img>
          </q-carousel-slide>
          <q-carousel-slide name="5">
            <q-img
              :src="
                baseURL +
                '/static/images/store/' +
                currentStore.store_id +
                '/5.jpg'
              "
              fit="scale-down"
              width="100%"
              height="100%"
            ></q-img>
          </q-carousel-slide>
          <q-carousel-slide name="6">
            <q-img
              :src="
                baseURL +
                '/static/images/store/' +
                currentStore.store_id +
                '/6.jpg'
              "
              fit="scale-down"
              width="100%"
              height="100%"
            ></q-img>
          </q-carousel-slide>
        </q-carousel>
      </div>
      <div>
        <q-card flat class="row">
          <q-card-section horizontal class="col-12 q-pt-sm text-center">
            <q-toolbar class="bg-white text-black">

              <q-toolbar-title class="text-h5 text-bold text-center">
                {{ currentStore.store_title }}
              </q-toolbar-title>

            </q-toolbar>
          </q-card-section>

          <q-card-actions
            align="center"
            class="col-12 no-wrap items-center q-pa-none"
          >
            <q-btn flat color="red" icon="favorite">
              <div class="q-pa-sm text-black">좋아요</div></q-btn
            >
            <q-btn flat color="accent" icon="bookmark">
              <div class="q-pa-sm text-black">정기 구독</div></q-btn
            >
            <q-btn flat color="primary" icon="share">
              <div class="q-pa-sm text-black">공유</div></q-btn
            >
          </q-card-actions>

          
          <q-card-section class="col-12 q-pa-none q-pb-none items-center">
            <q-tabs
              v-model="storeInfoTab"
              no-caps
              class="bg-white text-black"
              style="width: 100vw"
            >
              <q-tab name="brand" :label="currentStore.store_title + ' 브랜드'" />
              <q-tab name="info" :label="currentStore.store_title + ' 정보'" />
            </q-tabs>
          </q-card-section>
        </q-card>
        <div v-if="storeInfoTab == 'brand'" class="q-pt-md items-center">
          <q-list bordered class="bg-white">
            <q-expansion-item
              v-for="brand_info in brandStory"
              :key="brand_info"
              icon="perm_identity"
              :label="brand_info.brand_title"
              default-opened
              header-class="text-primary"
            >
              <div class="scroll bg-grey-4 q-pa-md">
                <div class="fit row no-wrap">
                  <div
                    v-for="story_info in brand_info.story_info"
                    :key="story_info"
                    class="q-pr-md"
                  >
                    <q-card
                      v-if="story_info.story_type == 0"
                      class="col-4 story-card"
                      @click="
                        openImageDialog(brand_info.brand_id, story_info.story_id)
                      "
                      style="max-height: 300px"
                    >
                      <q-card-section horizontal>
                        <div class="bg-white fit">
                          <q-img
                            :src="
                              baseURL +
                              '/static/images/brand/' +
                              brand_info.brand_id +
                              '/' +
                              story_info.story_id +
                              '.jpg'
                            "
                            class="rounded-borders"
                            fit="fit"
                            :ratio="1"
                            style="max-height: 300px"
                          />
                        </div>
                      </q-card-section>
                    </q-card>
                    <q-card v-else class="col-10 story-card-2">
                      <q-item>
                        <q-item-section avatar>
                          <q-avatar>
                            <q-img
                              :src="
                                baseURL +
                                '/static/images/store/' +
                                currentStore.store_id +
                                '/0.jpg'
                              "
                            />
                          </q-avatar>
                        </q-item-section>

                        <q-item-section>
                          <q-item-label>{{
                            currentStore.store_title
                          }}</q-item-label>
                          <q-item-label caption>
                            {{ currentStore.store_subtitle }}
                          </q-item-label>
                        </q-item-section>
                        <q-item-section side>
                        </q-item-section>
                      </q-item>

                      <q-separator />

                      <q-card-section horizontal class="col-12 column"
                        ><div class="col">
                          <q-img
                            :src="
                              baseURL +
                              '/static/images/brand/' +
                              brand_info.brand_id +
                              '/' +
                              story_info.story_id +
                              '.jpg'
                            "
                            class="rounded-borders bg-black"
                            fit="scale-down"
                            :ratio="16 / 9"
                            style="max-height: 300px"
                            @click="
                              openImageDialog(
                                brand_info.brand_id,
                                story_info.story_id
                              )
                            "
                          />
                        </div>
                      </q-card-section>
                      <q-card-section class="q-pa-sm col-12">
                        <div>
                          <q-chip
                            v-if="ds(story_info.story_tag)[0] == 1"
                            outline
                            dense
                            square
                            color="green"
                          >
                            <div class="text-overline text-green">Curation</div>
                          </q-chip>
                          <q-chip
                            v-if="ds(story_info.story_tag)[1] == 1"
                            outline
                            dense
                            square
                            color="orange"
                          >
                            <div class="text-overline text-orange">Discount</div>
                          </q-chip>
                          <q-chip
                            v-if="ds(story_info.story_tag)[2] == 1"
                            outline
                            dense
                            square
                            color="blue"
                          >
                            <div class="text-overline text-blue">Promotion</div>
                          </q-chip>
                          <q-chip
                            v-if="ds(story_info.story_tag)[3] == 1"
                            outline
                            dense
                            square
                            color="red"
                          >
                            <div class="text-overline text-red">New Menu</div>
                          </q-chip>
                        </div>
                      </q-card-section>
                      <q-card-section class="q-py-none col-12">
                        <div class="text-h5">{{ story_info.story_title }}</div>
                      </q-card-section>
                      <q-card-actions class="q-pt-none q-pl-md col-12 row">
                        <div class="col-11 text-caption text-grey">
                          {{ story_info.story_subtitle }}
                        </div>
                        <div class="col-1">
                          <q-btn
                            color="grey"
                            round
                            flat
                            dense
                            :icon="
                              story_info.expanded
                                ? 'keyboard_arrow_up'
                                : 'keyboard_arrow_down'
                            "
                            @click="story_info.expanded = !story_info.expanded"
                          />
                        </div>
                      </q-card-actions>
                      <q-slide-transition class="col-12">
                        <div v-show="story_info.expanded">
                          <q-separator />
                          <q-card-section class="text-subitle2">
                            {{ story_info.story_description }}
                          </q-card-section>
                        </div>
                      </q-slide-transition>
                    </q-card>
                  </div>
                </div>
              </div>
            </q-expansion-item>
          </q-list>
        </div>
        <div v-else class="q-pt-md items-center">
          <q-list bordered class="bg-white">
            <q-expansion-item
              icon="info"
              label="가게 위치 및 영업 시간"
              default-opened
              header-class="text-primary"
            >
              <div class="bg-grey-4 q-pa-md">
                <q-card class="q-pt-sm">
                  <q-card-section
                    horizontal
                    class="q-pl-md q-pb-sm column q-gutter-sm"
                  >
                    <div class="col">
                      <q-icon name="place" size="xs" color="grey-6" />
                      위치
                    </div>
                    <div class="col">
                      {{ ds(currentStore.store_official_information)[1] }}
                      {{ ds(currentStore.store_location) }}
                    </div>
                  </q-card-section>
                  <q-card-section
                    horizontal
                    class="q-pl-md q-pb-md column q-gutter-sm"
                  >
                    <div class="col">
                      <q-icon name="alarm" size="xs" color="grey-6" />
                      영업 시간
                    </div>
                    <div
                      class="col"
                      v-for="(open_time, index) in ds(
                        currentStore.store_open_time
                      )"
                      :key="open_time"
                    >
                      {{ dateString[index] }}
                      {{ open_time[0] }}:00 - {{ open_time[1] }}:00
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </q-expansion-item>
            <q-separator />
            <q-expansion-item
              icon="info"
              label="사업자등록 정보"
              default-opened
              header-class="text-black"
            >
              <div class="bg-grey-4 q-pa-md">
                <q-card class="q-py-sm">
                  <q-card-section horizontal class="column q-gutter-sm">
                    <div
                      v-for="(info, index) in ds(
                        currentStore.store_official_information
                      )"
                      :key="info"
                      class="col row"
                    >
                      <div class="col-1"></div>
                      <div class="col-3">{{ infoString[index] }}</div>
                      <div class="col-8">{{ info }}</div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </q-expansion-item>
          </q-list>
        </div>
      </div>-->
    <!--<q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 90vw; min-height: 50vh">
        <q-card-section>
          <div class="text-h6">Image</div>
        </q-card-section>

        <q-card-section class="q-pt-none"
          ><q-uploader
            flat
            bordered
            label="Image Uploader"
            auto-upload
            accept=".jpg, image/*"
            url="http://localhost:4444/upload"
          />
        </q-card-section>

        <q-card-section>
          <div class="text-h6">Story Type</div>
        </q-card-section>
        <q-card-actions>
          <q-checkbox v-model="isCuration" label="Curation" />
          <q-checkbox v-model="isDiscount" label="Discount" />
          <q-checkbox v-model="isPromotion" label="Promotion" />
          <q-checkbox v-model="isNewMenu" label="New Menu" />
        </q-card-actions>

        <q-card-section>
          <div class="text-h6">Title</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="storyTitle1" autofocus />
        </q-card-section>

        <q-card-section>
          <div class="text-h6">Subtitle</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="storySubTitle1" />
        </q-card-section>

        <q-card-section>
          <div class="text-h6">Story</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-editor v-model="story1" min-height="50vh" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Save" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isClicked">
      <q-card style="width: 700px; max-width: 80vw">
        <q-img
          :src="
            baseURL +
            '/static/images/brand/' +
            currentBrandId +
            '/' +
            currentStoryId +
            '.jpg'
          "
        />
      </q-card>
    </q-dialog>-->
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { api, baseURL } from "boot/axios";
import { useRouteInfo } from "src/stores/routeInfo";
import { useStoreInfo } from "src/stores/storeInfo";
import { useCartStore } from "src/stores/cartInfo";

export default defineComponent({
  name: "BrandPage",
  components: {},
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

    // cart information
    const cartStore = useCartStore();
    const { cart } = storeToRefs(cartStore);
    // getter error why?
    const cartLength = computed(() => {
      return Object.keys(cart.value).length;
    });
    const existCart = computed(() => {
      if (Object.keys(cart.value).length == 0) {
        return false;
      }
      return true;
    });

    // Request brand and its stories from server.
    //var brandStory = ref({});
    //async function initBrand() {
    //  if(Object.keys(currentStore.value).length != 0) {
    //    const brandIds = ds(currentStore.value.brand_ids);
    //
    //    // Request brands' infromation from server.
    //    for (const brandId of brandIds) {
    //      var query = "brand/readBrand/" + brandId;
    //      await api.get(query).then((response) => {
    //        var brand_info = response.data.brand[0];
    //        var brand_id = brand_info.brand_id;
    //
    //        brandStory.value[brand_id] = brand_info;
    //        brandStory.value[brand_id]["story_info"] = {};
    //      });
    //    }
    //
    //    // Request all stories' infromation from server.
    //    for (const brandId of brandIds) {
    //      var query = "brand/readAllStory/" + brandId;
    //      await api.get(query).then((response) => {
    //        var stories = response.data.stories;
    //        for (var story_info of stories) {
    //          var brand_id = story_info.brand_id;
    //          var story_id = story_info.story_id;
    //          story_info["expanded"] = ref(false);
    //          brandStory.value[brand_id]["story_info"][story_id] = story_info;
    //        }
    //      });
    //    }
    //  }
    //}

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
      //initBrand();
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

    // to store page
    function toHomePage() {
      router.push({ path: "/" });
    }

    // to menu page
    function toMenuPage() {
      router.push({ path: "/menu" });
    }

    // to cart page
    function toCartPage() {
      router.push({ path: "/cart" });
    }
    
    // zoom in page
    var currentBrandId = ref("0");
    var currentStoryId = ref("0");
    var isClicked = ref(false);
    function openImageDialog(brandId, storyId) {
      currentBrandId.value = brandId;
      currentStoryId.value = storyId;
      isClicked.value = true;
    }

    return {
      text: ref(''),
      storeSlide: ref("4"),
      storeSlideAutoplay: ref(2500),
      baseURL,

      currentStore,
      allStories,
      toHomePage,
      toMenuPage,
      toCartPage,
      cartLength,
      existCart,
      storeInfoTab: ref("story"),

      expanded: ref(true),
      openImageDialog,
      ds,
      isClicked,
      currentBrandId,
      currentStoryId,

      initMap,
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

      prompt: ref(false),
      isCuration: ref(false),
      isPromotion: ref(false),
      isDiscount: ref(false),
      isNewMenu: ref(false),
      storyTitle1: ref("특별 Event - 원두 큐레이션"),
      storySubTitle1: ref("사용자 맞춤 원두 큐레이션"),
      story1: ref("주문 내역을 바탕을 원두를 추천해 드립니다."),
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
