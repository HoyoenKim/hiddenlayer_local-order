import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useOrderCheckStore = defineStore("shoppingCart", {
  state: () => ({
    orders: [],
  }),

  getters: {},

  actions: {
    checkOrder(name, phone, password) {
      var query = "/order/selectOrder/" + name + "/" + phone + "/" + password;
      api
        .get(query)
        .then((response) => {
          console.log(response.data);
          this.orders = response.data.orders;
        })
        .catch((error) => {});
    },
  },
});
