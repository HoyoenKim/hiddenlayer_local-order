const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/", component: () => import("pages/MapPage.vue") },
      { path: "/brand", component: () => import("pages/BrandPage.vue") },
      { path: "/menu", component: () => import("pages/MenuPage.vue") },
      { path: "/event", component: () => import("pages/EventPage.vue") },
      { path: "/check", component: () => import("pages/OrderCheck.vue") },
      { path: "/cart", component: () => import("pages/CartPage.vue") },
      { path: "/nfc", component: () => import("pages/NfcTagPage.vue") },
      { path: "/venue", component: () => import("pages/VenuePage.vue") },
      { path: "/venueMenu", component: () => import("pages/VenueMenuPage.vue") },
      { path: "/venueEvent", component: () => import("pages/VenueEventPage.vue") },
    ],
  },
  {
    path: "/user",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/SignupPage.vue") },
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
