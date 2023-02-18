<template>
  <q-card class="my-card" flat bordered>
    <q-card-section horizontal>
      <q-card-section class="q-pt-xs">
        <div class="text-overline text-orange-9">{{ option }}</div>
        <div class="row no-wrap items-center q-mt-sm">
          <div class="col text-h6">{{ title }}</div>
          <div
            class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
          >
            {{ price }}
          </div>
        </div>
        <div class="text-caption text-grey q-pt-md">
          {{ explain }}
        </div>
      </q-card-section>
      <q-card-section class="col-5 flex flex-center">
        <q-img class="rounded-borders" src="/imgs/coffee.jpg">
          <q-tooltip
            anchor="center middle"
            self="center middle"
            class="bg-black"
            >주문하기</q-tooltip
          >
        </q-img>
      </q-card-section>
    </q-card-section>
    <q-card-actions>
      <q-btn flat color="dark" :href="explainLink" label="More.." />
      <q-btn
        flat
        color="primary"
        href="https://docs.google.com/forms/d/1dKUJJWzPUq-EG8kA1nEBjzimwtZmF20Vk1VMp_gHjN8/edit"
        label="예약하기"
      />

      <q-space />

      <q-btn
        color="grey"
        round
        flat
        dense
        :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="expanded = !expanded"
      />
    </q-card-actions>

    <q-slide-transition>
      <div v-show="expanded">
        <q-separator />
        <q-card-section class="text-subitle2"> Review </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "CoffeeCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    option: {
      type: String,
      default: "",
    },
    price: {
      type: String,
      default: "",
    },
    explain: {
      type: String,
      default: "",
    },
    explainLink: {
      type: String,
      default: "https://www.instagram.com/gistcoffeebean/",
    },
  },
  setup() {
    return {
      expanded: ref(false),
    };
  },
});
</script>
<style lang="sass" scoped>
.my-card
  width: 95vw
  max-width: 95vw
</style>
