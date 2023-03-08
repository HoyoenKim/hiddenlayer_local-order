const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/StorePage.vue") },
    ],
  },
  {
    path: "/brand",
    component: () => import("layouts/BrandLayout.vue"),
    children: [{ path: "", component: () => import("pages/BrandPage.vue") }],
    props: true,
  },
  {
    path: "/menu",
    component: () => import("layouts/BrandLayout.vue"),
    children: [{ path: "", component: () => import("pages/MenuPage.vue") }],
  },
  {
    path: "/cart",
    component: () => import("layouts/BrandLayout.vue"),
    children: [{ path: "", component: () => import("pages/CartPage.vue") }],
  },
  {
    path: "/check",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/OrderCheck.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
