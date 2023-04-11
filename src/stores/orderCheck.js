import { LocalStorage, SessionStorage } from "quasar";
import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useOrderCheckStore = defineStore("orderCheck", {
  state: () => ({
    orders: LocalStorage.getItem("orders") || [],
    isForm: true,
    Name: "",
    Phone: "",
    Password: "",
  }),

  getters: {},

  actions: {
    checkOrder() {
      var query =
        "/order/selectOrder/" +
        this.Name +
        "/" +
        this.Phone +
        "/" +
        this.Password;
      api
        .get(query)
        .then((response) => {
          this.orders = response.data.orders;
          LocalStorage.set("orders", this.orders);
        })
        .catch((error) => {});
    },
    deleteOrder(orderId, orderIndex) {
      var query = "/order/deleteOrder/" + orderId;
      api.delete(query).then((response) => {
        this.orders.splice(orderIndex, 1);
        LocalStorage.set("orders", this.orders);
      });
    },
    setIsForm(bool) {
      this.isForm = bool;
    },
    setName(name) {
      this.Name = name;
    },
    setPhone(phone) {
      this.Phone = phone;
    },
    setPassword(password) {
      this.Password = password;
    },
  },
});
