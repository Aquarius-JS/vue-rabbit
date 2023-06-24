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
		//删除购物车操作
		const delCart = skuId => {
			const index = cartList.value.findIndex(item => skuId === item.skuId);
			cartList.value.splice(index, 1);
		};
		return {
			cartList,
			addCart,
			delCart,
		};
	},
	{
		persist: true,
	}
);
