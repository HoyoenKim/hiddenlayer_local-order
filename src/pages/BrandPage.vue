<template>
  <q-page class="flex-center bg-grey-4">
    <!--<div>{{ currentStore }}</div>
    <div>{{ brandStory }}</div>-->
    <div>
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
          <q-toolbar>
            <q-btn flat dense>
              <q-icon name="arrow_back" @click="toHomePage()" />
            </q-btn>
            <q-toolbar-title class="text-h5 text-bold">
              {{ currentStore.store_title }}
            </q-toolbar-title>
            <q-btn flat @click="toCartPage()">
              <q-icon name="shopping_cart" />
              <q-badge v-if="existCart" color="red" floating>{{
                cartLength
              }}</q-badge>
            </q-btn>
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

        <q-card-section
          v-ripple
          class="col-12 no-wrap row justify-center q-py-none text-h6 text-center cursor-pointer q-hoverable q-gutter-xs"
        >
          <q-card
            flat
            bordered
            class="bg-grey-4 text-orange-7 text-bold col-6 q-pr-sm"
            @click="toMenuPage()"
          >
            <q-card-section> 테이블 주문</q-card-section>
          </q-card>
          <q-card
            flat
            bordered
            class="bg-grey-4 text-orange-7 text-bold col-6"
            @click="toMenuPage()"
          >
            <q-card-section> 픽업 주문</q-card-section>
          </q-card>
        </q-card-section>
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
              <div class="fit row no-wrap q-gutter-md">
                <div
                  v-for="story_info in brand_info.story_info"
                  :key="story_info"
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
                  <q-card v-else class="col-8 story-card-2">
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
                        <!--<q-btn
                          dense
                          flat
                          icon="edit"
                          @click="prompt = true"
                        ></q-btn>-->
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
                          class="rounded-borders"
                          fit="fit"
                          :ratio="1"
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
                        <q-chip v-if="isCuration" outline color="green">
                          <div class="text-overline text-green">Curation</div>
                        </q-chip>
                        <q-chip v-if="isDiscount" outline color="orange">
                          <div class="text-overline text-orange">Discount</div>
                        </q-chip>
                        <q-chip v-if="isPromotion" outline color="blue">
                          <div class="text-overline text-blue">Promotion</div>
                        </q-chip>
                        <q-chip v-if="isNewMenu" outline color="red">
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
                            expanded
                              ? 'keyboard_arrow_up'
                              : 'keyboard_arrow_down'
                          "
                          @click="expanded = !expanded"
                        />
                      </div>
                    </q-card-actions>
                    <q-slide-transition class="col-12">
                      <div v-show="expanded">
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
    </div>
  </q-page>
  <q-dialog v-model="prompt" persistent>
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
  </q-dialog>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { api, baseURL } from "boot/axios";
import { useStoreInfo } from "src/stores/storeInfo";
import { useCartStore } from "src/stores/cartInfo";

export default defineComponent({
  name: "BrandPage",
  components: {},
  setup() {
    // routing
    const router = useRouter();

    // store information
    const storeInfo = useStoreInfo();
    const { currentStore } = storeToRefs(storeInfo);

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

    // Request brand and its story from server.
    var brandStory = ref({});
    onMounted(async () => {
      const brandIds = ds(currentStore.value.brand_ids);

      // Request all brand infromation from server.
      for (const brandId of brandIds) {
        var query = "brand/readBrand/" + brandId;
        await api.get(query).then((response) => {
          var brand_info = response.data.brand[0];
          var brand_id = brand_info.brand_id;

          brandStory.value[brand_id] = brand_info;
          brandStory.value[brand_id]["story_info"] = {};
        });
      }

      // Request all story infromation from server.
      for (const brandId of brandIds) {
        var query = "brand/readStory/" + brandId;
        await api.get(query).then((response) => {
          var stories = response.data.stories;
          for (var story_info of stories) {
            var brand_id = story_info.brand_id;
            var story_id = story_info.story_id;
            brandStory.value[brand_id]["story_info"][story_id] = story_info;
          }
        });
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

    // to deserialize the json string
    function ds(string) {
      return JSON.parse(string);
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
      storeSlide: ref("4"),
      storeSlideAutoplay: ref(2500),
      baseURL,

      currentStore,
      toMenuPage,
      toHomePage,
      toCartPage,
      storeInfoTab: ref("brand"),

      brandStory,

      expanded: ref(true),
      openImageDialog,
      ds,
      isClicked,
      currentBrandId,
      currentStoryId,
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

      cartLength,
      existCart,
    };
  },
});
</script>

<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)
.story-card
  width: 300px
.story-card-2
  width: 400px
</style>
