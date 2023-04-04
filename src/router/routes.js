const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/MapPage.vue") },
      { path: "/store", component: () => import("pages/StorePage.vue") },
      { path: "/brand", component: () => import("pages/BrandPage.vue") },
      { path: "/event", component: () => import("pages/EventPage.vue") },
      { path: "/menu", component: () => import("pages/MenuPage.vue") },
      { path: "/check", component: () => import("pages/OrderCheck.vue") },
      { path: "/cart", component: () => import("pages/CartPage.vue") },
      { path: "/nfc", component: () => import("pages/NfcTagPage.vue") }
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
