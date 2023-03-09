const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/StorePage.vue") },
      { path: "/brand", component: () => import("pages/BrandPage.vue") },
      { path: "/menu", component: () => import("pages/MenuPage.vue") },
      { path: "/cart", component: () => import("pages/CartPage.vue") },
      { path: "/check", component: () => import("pages/OrderCheck.vue") },
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
