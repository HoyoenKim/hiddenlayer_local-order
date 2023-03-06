import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useOrderCheckStore = defineStore("shoppingCart", {
  state: () => ({
    name: "",
    orderList: [],
  }),

  getters: {},

  actions: {
    checkOrder(name, phone, password) {
      var query = "/order/checkOrder";
      this.name = name;
      api
        .post(query, {
          name: name,
          phone: phone,
          password: password,
        })
        .then((response) => {
          console.log(response.data);
          this.orderList = response.data;
        })
        .catch((error) => {});
    },
  },
});
