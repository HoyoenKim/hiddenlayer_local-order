import { LocalStorage, SessionStorage } from "quasar";
import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useCartStore = defineStore("cartInfo", {
  state: () => ({
    cart: LocalStorage.getItem("cart") || {},
    name: LocalStorage.getItem("name") || "",
    phone: LocalStorage.getItem("phone") || "",
    password: LocalStorage.getItem("password") || "",
    roomNumber: LocalStorage.getItem("roomNumber") || "",
  }),

  getters: {
    orderValidation(state) {
      if (
        Object.keys(state.cart).length == 0 ||
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
      } else {
        this.cart[key].number =
          value.number;
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
    saveUser() {
      LocalStorage.set("name", this.name);
      LocalStorage.set("phone", this.phone);
      LocalStorage.set("password", this.password);
      LocalStorage.set("roomNumber", this.roomNumber);
    },
    sendCartToServer() {
      var query = "/order/createOrder";
      api
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
    convertPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  },
});
