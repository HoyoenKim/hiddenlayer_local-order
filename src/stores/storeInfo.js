import { LocalStorage, SessionStorage } from "quasar";
import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useStoreInfo = defineStore("storeInfo", {
  state: () => ({
    allStores: LocalStorage.getItem("allStores") || {},
    allVenues: LocalStorage.getItem("allVenues") || {},
    allKeywords: LocalStorage.getItem("allKeywords") || {},
    allStories: LocalStorage.getItem("allStories") || {},
    allMenuTables: LocalStorage.getItem("allMenuTables") || {},
    allMenus: LocalStorage.getItem("allMenus") || {},
    allEvents: LocalStorage.getItem("allEvents") || {},
    allBooths: LocalStorage.getItem("allBooths") || {},
    currentStore: LocalStorage.getItem("currentStore") || {},
    currentVenue: LocalStorage.getItem("currentVenue") || {},
    selectedMode: LocalStorage.getItem("selectedMode") || 'store',
    currentBooth: LocalStorage.getItem("currentBooth") || {},
    selectedBoothId: LocalStorage.getItem("selectedBoothId") || -1,
  }),

  getters: {
    storeName(state) {
      return state.currentStore.store_title;
    },
  },

  actions: {
    setCurrentStore(store) {
      LocalStorage.set("currentStore", store);
      this.currentStore = store;
      LocalStorage.getItem("selectedMode", 'store')
      this.selectedMode = 'store'
    },
    setCurrentVenue(venue) {
      LocalStorage.set("currentVenue", venue);
      this.currentVenue = venue;
      LocalStorage.getItem("selectedMode", 'venue')
      this.selectedMode = 'venue'
    },
    setSelectedBoothId(boothId) {
      LocalStorage.set("selectedBoothId", boothId);
      this.selectedBoothId = boothId;

      this.currentBooth = this.allBooths[boothId];
      LocalStorage.set("currentBooth", this.currentBooth);
    },
    async setAllStores() {
      var query = "store/allStores";
      await api
        .get(query)
        .then((response) => {
          var stores = response.data.stores;
          LocalStorage.set("allStores", stores);
          this.allStores = stores;
        })
        .catch((error) => {});
    },
    async setAllVenues() {
      var query = "venue/allVenues";
      await api
        .get(query)
        .then((response) => {
          var venues = response.data.venues;
          LocalStorage.set("allVenues", venues);
          this.allVenues = venues;
        })
        .catch((error) => {});
    },
    async setAllKeywords() {
      var query = "keyword/allKeywords";
      await api
        .get(query)
        .then((response) => {
          var keywords = response.data.keywords;
          LocalStorage.set("allKeywords", keywords);
          this.allKeywords = keywords;
        })
    },
    async setAllBooths() {
      var query = "booth/allBooths";
      await api
        .get(query)
        .then((response) => {
          var booths = response.data.booths;
          LocalStorage.set("allBooths", booths);
          this.allBooths = booths;
        })
    },
    async setAllStories() {
      var query = "brand/allStories";
      await api
        .get(query)
        .then((response) => {
          var stories = response.data.stories;
          LocalStorage.set("allStories", stories);
          this.allStories = stories;
        })
        .catch((error) => {});
    },
    async setAllMenuTables() {
      var query = "menu/allMenuTables";
      await api
        .get(query)
        .then((response) => {
          var menuTables = response.data.menuTables;
          LocalStorage.set("allMenuTables", menuTables);
          this.allMenuTables = menuTables;
        })
        .catch((error) => {});
    },
    async setAllMenus() {
      var query = "menu/allMenus";
      await api
        .get(query)
        .then((response) => {
          var menus = response.data.menus;
          LocalStorage.set("allMenus", menus);
          this.allMenus = menus;
        })
        .catch((error) => {});
    },
    async setAllEvents() {
      var query = "event/allEvents";
      await api
        .get(query)
        .then((response) => {
          var events = response.data.events;
          LocalStorage.set("allEvents", events);
          this.allEvents = events;
        })
        .catch((error) => {});
    }
  },
});
