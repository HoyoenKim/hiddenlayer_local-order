<template>
  <q-layout view="hHh lpR fFr">
    <q-header height-hint="98">
      <q-toolbar class="q-pt-sm bg-white text-black">
        <q-btn outline round icon="notifications" @click="toggleLeftDrawer"
          ><q-badge color="red" floating>10+</q-badge></q-btn
        >
        <q-toolbar-title class="text-center"> Local Order </q-toolbar-title>
        <q-btn outline round icon="person_outline" @click="toggleRightDrawer" />
      </q-toolbar>
      <q-tabs class="bg-white text-black">
        <q-route-tab no-caps to="/" exact>Store</q-route-tab>
        <!--<q-route-tab no-caps to="/order" exact>Order test</q-route-tab>-->
        <q-route-tab no-caps to="/curation" exact>Event</q-route-tab>
        <q-route-tab no-caps to="/check" exact>My Order</q-route-tab>
      </q-tabs>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      overlay
      behavior="mobile"
      bordered
    >
      <q-list>
        <q-item-label header> Event Notifications </q-item-label>
      </q-list>
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" overlay behavior="mobile">
      <q-list>
        <q-item-label header> Login / Sign Up </q-item-label>
        <q-item>
          <q-img
            class="absolute-top"
            src="https://cdn.quasar.dev/img/material.png"
            style="height: 150px"
          >
            <div class="absolute-bottom bg-transparent">
              <q-avatar size="56px" class="q-mb-sm">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
              <div class="text-weight-bold">thfdk0101</div>
              <div>@rstoenescu</div>
            </div>
          </q-img>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer elevated class="bg-white">
      <q-tabs dense v-model="tab" class="text-black">
        <q-tab name="search" icon="search" label="Search" no-caps />
        <q-tab name="qr" icon="qr_code" label="QR code" no-caps="" />
        <q-tab name="wallet" icon="wallet" label="My Wallet" no-caps />
        <q-tab name="info" icon="info" label="My Info" no-caps="" /></q-tabs
    ></q-footer>
  </q-layout>
</template>

<!--<q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-list>
        <q-item-label header> Related Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>-->

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Notion",
    caption: "재야의 커피",
    icon: "school",
    link: "https://nice-kumquat-8b2.notion.site/6a97c7144099478db97251e8143c2bb3",
  },
  {
    title: "Kakao Channel",
    caption: "커피 주문 카카오 챗봇",
    icon: "record_voice_over",
    link: "https://pf.kakao.com/_bBWJxj",
  },
  {
    title: "Instagram",
    caption: "@gistcoffeebean",
    icon: "public",
    link: "https://www.instagram.com/gistcoffeebean/",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    //EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
      tab: ref("search"),
    };
  },
});
</script>
