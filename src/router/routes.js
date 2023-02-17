const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/StorePage.vue") },
    ],
  },
  {
    path: "/event",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/EventPage.vue") },
    ],
  },
  {
    path: "/check",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/OrderCheck.vue") }],
  },
  {
    path: "/search",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/SearchPage.vue") }],
  },
  {
    path: "/qr",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/QrCodeCamera.vue") }],
  },
  {
    path: "/myWallet",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/MyWallet.vue") }],
  },
  {
    path: "/myInfo",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/MyInfo.vue") }],
  },
  {
    path: "/menu",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/MenuPage.vue") }],
  },
  {
    path: "/order",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/OrderPage.vue") }],
  },
  {
    path: "/curation",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/CoffeeCuration.vue") },
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
