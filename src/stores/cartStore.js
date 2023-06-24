import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./user";
import { insertCartAPI, findNewCartListAPI, delCartAPI } from "@/apis/cart";
export const useCartStore = defineStore(
	"cart",
	() => {
		const userStore = useUserStore();
		const isLogin = computed(() => userStore.userInfo.token);
		const cartList = ref([]);
		const addCart = async goods => {
			const { skuId, count } = goods;
			if (isLogin) {
				//登陆之后的加入购物车逻辑
				await insertCartAPI({ skuId, count });
				const res = await findNewCartListAPI();
				cartList.value = res.result;
			} else {
				//添加购物车操作
				const item = cartList.value.find(() => goods.skuId === item.skuId);
				if (item) {
					//已经添加过
					item.count++;
				} else {
					//未添加过
					cartList.value.push(goods);
				}
			}
		};
		//删除购物车操作
		const delCart = async skuId => {
			if (isLogin) {
				await delCartAPI([skuId]);
				const res = await findNewCartListAPI();
				cartList.value = res.result;
			} else {
				const index = cartList.value.findIndex(item => skuId === item.skuId);
				cartList.value.splice(index, 1);
			}
		};
		//单选功能
		const singleCheck = (skuId, selected) => {
			cartList.value.find(item => item.skuId === skuId);
			item.selected = selected;
		};
		//全选功能
		const allCheck = selected => {
			cartList.value.forEach(item => (item.selected = selected));
		};

		//计算属性
		//1.总的数量
		const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0));
		//2.总价
		const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0));
		//3.已选择数量
		const selectedCount = computed(() =>
			cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0)
		);
		//4.已选商品价钱合计
		const selectedPrice = computed(() =>
			cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0)
		);
		//是否全选
		const isAll = computed(() => cartList.value.every(item => item.selected));
		return {
			cartList,
			allCount,
			allPrice,
			selectedCount,
			selectedPrice,
			isAll,
			addCart,
			delCart,
			singleCheck,
			allCheck,
		};
	},
	{
		persist: true,
	}
);
