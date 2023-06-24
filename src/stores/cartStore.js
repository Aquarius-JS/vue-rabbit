import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore(
	"cart",
	() => {
		const cartList = ref([]);
		const addCart = goods => {
			//添加购物车操作
			const item = cartList.value.find(() => goods.skuId === item.skuId);
			if (item) {
				//已经添加过
				item.count++;
			} else {
				//未添加过
				cartList.value.push(goods);
			}
		};
		return {
			cartList,
			addCart,
		};
	},
	{
		persist: true,
	}
);
