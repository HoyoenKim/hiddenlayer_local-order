<template>
  <div class="text-center q-pa-md flex-center">
    <q-input v-model="search" filled type="search" hint="Search Anythings">
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SearchPage",
  setup() {
    return {
      search: ref(""),
    };
  },
});
</script>
