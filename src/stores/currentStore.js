import { defineStore } from "pinia";

export const useCurrentStore = defineStore("current", {
  state: () => ({
    counter: 0,
    storeName: "가게 이름",
  }),

  getters: {
    doubleCount(state) {
      return state.counter * 2;
    },
  },

  setters: {},

  actions: {
    increment() {
      this.counter++;
    },
    setStoreName(storeName) {
      this.storeName = storeName;
    },
  },
});
