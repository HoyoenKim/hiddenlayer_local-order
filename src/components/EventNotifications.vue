<template>
  <q-list bordered class="rounded-borders">
    <q-item-label header>Event Notifications </q-item-label>
    <q-separator />
    <q-item>
      <q-item-section avatar top>
        <q-icon
          name="fa-brands fa-instagram"
          tag="a"
          href="https://www.instagram.com/gistcoffeebean/"
          color="pink-4"
        />
        <q-icon
          class="q-pt-sm"
          name="fa-solid fa-comment"
          tag="a"
          href="https://pf.kakao.com/_bBWJxj"
          color="yellow-7"
        />
      </q-item-section>
      <q-item-section top>
        <q-item-label>
          <div class="text-weight-medium">재야의 커피</div>
          <div caption class="text-caption text-grey">@gistcoffeebean</div>
        </q-item-label>
        <q-item-label
          lines="1"
          class="q-pt-xs text-body2 text-weight-bold text-blue"
        >
          <span class="cursor-pointer">( ~ 3/2) 재야의 커피 판매 개시</span>
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EventNotifications",
});
</script>
