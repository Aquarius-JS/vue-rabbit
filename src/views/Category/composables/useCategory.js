//封装分类数据业务相关代码
import { ref, onMounted } from "vue";
import { getCategoryAPI } from "@/apis/layout";
import { useRoute,onBeforeRouteUpdate } from "vue-router";
export function useCategory() {
	const route = useRoute();
	const categoryData = ref({});
	const getCategory = async (id = route.params.id) => {
		let res = await getCategoryAPI(id);
		categoryData.value = res.result;
	};
	onMounted(() => {
		getCategory();
	});
	//路由参数发生变化时,可以把分类数据接口重新发送
	onBeforeRouteUpdate(to => {
		getCategory(to.params.id);
	});
}
