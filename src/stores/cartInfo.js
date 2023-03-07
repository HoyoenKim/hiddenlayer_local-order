import { LocalStorage, SessionStorage } from "quasar";
import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useCartStore = defineStore("shoppingCart", {
  state: () => ({
    cart: LocalStorage.getItem("cart") || {},
    name: "",
    phone: "",
    password: "",
    roomNumber: "",
  }),

  getters: {
    existCart(state) {},
    orderValidation(state) {
      if (
        state.name.length == 0 ||
        state.phone.length == 0 ||
        state.password.length == 0 ||
        state.roomNumber.length == 0
      ) {
        return false;
      }
      return true;
    },
  },

  actions: {
    insertCart(key, value) {
      if (!(key in this.cart)) {
        this.cart[key] = value;
      }
      LocalStorage.set("cart", this.cart);
    },
    deleteCart(key) {
      delete this.cart[key];
      LocalStorage.set("cart", this.cart);
    },
    resetCart() {
      this.cart = {};
      LocalStorage.set("cart", this.cart);
    },
    async sendCartToServer() {
      var query = "/order/orderInsert";
      await api
        .post(query, {
          cart: this.cart,
          name: this.name,
          phone: this.phone,
          password: this.password,
          roomNumber: this.roomNumber,
        })
        .then((response) => {})
        .catch((error) => {});
    },
    checkOrder(name, phone, password) {
      var query = "/order/checkOrder";
      api
        .post(query, {
          name: name,
          phone: phone,
          password: password,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {});
    },
  },
});
