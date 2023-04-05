<template>
	<q-card
		flat bordered
		style="width: 100vw; max-width: 400px">
		<q-item>
			<q-item-section avatar>
				<q-avatar>
					<q-img
						no-transition no-spinner
						:src="baseURL + '/static/images/store/' + currentStore.store_id + '/0.jpg'"/>
				</q-avatar>
			</q-item-section>
			<q-item-section
				class="text-subtitle2">
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
		<q-card-section
			class="q-pa-none">
			<q-carousel
        v-model="storySlide"
        class="q-pa-none"
        swipeable infinite>      
        <q-carousel-slide
          v-for="storyImageNum in parseInt(allStories[storyId].story_type)" :key="storyImageNum" :name="storyImageNum "
          class="fit q-pa-none bg-grey-4"
					style="width: 95vw; max-width: 400px">
          <q-img
            class="fit"
						no-transition no-spinner
            :src="baseURL + '/static/images/story/' + storyId + '/' + (storyImageNum - 1) + '.jpg'"
            style="max-height: 400px;"/>
        </q-carousel-slide>
      </q-carousel>
		</q-card-section>
		<q-card-section
			v-if="parseInt(allStories[storyId].story_type) > 1"
			class="q-pa-none row justify-center bg-grey-4">
			<div
				v-for="storeImageNum in parseInt(allStories[storyId].story_type)" :key="storeImageNum"
				class="q-px-xs" 
				@click="storySlide = storeImageNum">
				<q-icon
					v-if="storeImageNum == storySlide"
					class="text-blue-9" name="circle"
					style="font-size: 0.5em;" />
				<q-icon
					v-else 
					class="text-white" name="circle"
					style="font-size: 0.5em;"/>
			</div>
		</q-card-section>
		<q-card-actions
			class="q-px-sm q-pt-md q-pb-none q-col-gutter-sm">
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
</template>

<script>
  import { defineComponent, ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { storeToRefs } from "pinia";
  import { api, baseURL } from "boot/axios";
  import { useRouteInfo } from "src/stores/routeInfo";
  import { useStoreInfo } from "src/stores/storeInfo";
  
  export default defineComponent({
    name: "SelectedStory",
    components: {},
		props: {
			storyId: {
				type: Number
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
	    const { allStories, currentStore } = storeToRefs(storeInfo);

			return {
				storySlide: ref(1),
				currentStore,
				allStories,
				baseURL,
				ds
			};
		},
  });
</script>
