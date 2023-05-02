<template>
	<q-page class="flex flex-center column">
		<div class="q-pb-lg">
			<q-btn class="bg-white" size="4rem" round>
				<q-icon name="nfc" size="lg"/>
			</q-btn>
		</div>
		<div class="q-pa-sm text-subtitle1 text-center text-bold">
			<div>
				현재 선택된 가게가 없습니다.
			</div>
			<div>
				둘러보기에서 선택해 주세요.
			</div>
		</div>
	</q-page>
</template>
  
<script>
import { defineComponent, ref } from "vue";
  
export default defineComponent({
  name: "NfcTagPage",
  setup() {
    return {};
  },
});
</script>
<style lang="sass" scoped>
</style>
  