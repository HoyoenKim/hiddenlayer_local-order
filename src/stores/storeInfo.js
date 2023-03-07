import { LocalStorage, SessionStorage } from "quasar";
import { defineStore } from "pinia";

export const useStoreInfo = defineStore("storeInfo", {
  state: () => ({
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
  },

  persist: true,
});
