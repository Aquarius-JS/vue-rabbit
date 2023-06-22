<script setup>
	import LayoutNav from "./components/LayoutNav.vue";
	import LayoutHeader from "./components/LayoutHeader.vue";
	import LayoutFooter from "./components/LayoutFooter.vue";
	import LayoutFixed from "./components/LayoutFixed.vue";
	import { onMounted } from "vue";
	//触发导航列表函数
	import { useCategoryStore } from "@/stores/category";
	const categoryStore = useCategoryStore();
	onMounted(() => {
		categoryStore.getCategory();
	})
</script>

<template>
	<LayoutFixed />
	<LayoutNav />
	<LayoutHeader />
	<RouterView />
	<LayoutFooter />
</template>
