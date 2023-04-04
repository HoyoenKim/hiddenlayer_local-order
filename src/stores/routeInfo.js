import { LocalStorage, SessionStorage } from "quasar";
import { defineStore } from "pinia";

export const useRouteInfo = defineStore("routeInfo", {
  state: () => ({
    headerTab : LocalStorage.getItem("headerTab") || "near",
    bottomTab : LocalStorage.getItem("bottomTab") || {},
  }),

  getters: {
  },

  actions: {
    setHeaderTab(header) {
      LocalStorage.set("headerTab", header);
      this.headerTab = header;
    },
    setBottomTab(bottom) {
      LocalStorage.set("bottomTab", bottom);
      this.bottomTab = bottom;
    },
    ds(string) {
      if(!string) {
        var empty = {};
        return empty;
      }
      else {
        return JSON.parse(string);
      }
    }
  },
});
