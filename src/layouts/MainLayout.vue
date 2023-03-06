<template>
  <q-layout view="hHh lpR fFr">
    <q-header height-hint="98">
      <q-toolbar class="q-py-sm bg-white text-black">
        <q-btn outline round icon="notifications" @click="toggleLeftDrawer"
          ><q-badge color="red" floating>1</q-badge></q-btn
        >
        <q-toolbar-title class="text-center" cliackable to="/">
          <q-tabs
            indicator-color="transparent"
            dense
            class="bg-white text-black"
          >
            <q-route-tab :ripple="false" no-caps to="/" exact
              >Local Order</q-route-tab
            >
          </q-tabs>
        </q-toolbar-title>
        <q-btn outline round icon="person_outline" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      overlay
      behavior="mobile"
      bordered
    >
      <q-list>
        <EventNotifications></EventNotifications>
      </q-list>
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" overlay behavior="mobile">
      <q-list>
        <q-item-label header> 로그인 / 회원가입 ( 준비중 )</q-item-label>
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
              <div class="text-weight-bold">developer - thfdk0101</div>
              <div>@jtys0316</div>
            </div>
          </q-img>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer elevated class="bg-white">
      <q-tabs dense class="text-black">
        <q-route-tab exact to="/" icon="search" label="Store" no-caps />
        <q-route-tab
          exact
          to="/check"
          icon="info"
          label="My Order"
          no-caps="" /></q-tabs
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
import EventNotifications from "src/components/EventNotifications.vue";

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
    EventNotifications,
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
