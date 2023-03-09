import { LocalStorage, SessionStorage } from "quasar";
import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useStoreInfo = defineStore("storeInfo", {
  state: () => ({
    allStores: [],
    allMenus: [],
    currentStore: LocalStorage.getItem("currentStore") || {},
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
    },
    setAllStores() {
      var query = "store/allStores";
      api
        .get(query)
        .then((response) => {
          var stores = response.data.stores;
          this.allStores = stores;
        })
        .catch((error) => {});
    },
    setAllMenus() {
      var query = "menu/allMenus";
      api
        .get(query)
        .then((response) => {
          var menus = response.data.menus;
          this.allMenus = menus;
        })
        .catch((error) => {});
    },
  },
});
