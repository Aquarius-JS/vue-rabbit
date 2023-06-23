import { createApp } from "vue";
import { createPinia } from "pinia";
import { useIntersectionObserver } from "@vueuse/core";

import App from "./App.vue";
import router from "./router";

//引入初始化的样式文件
import "@/styles/common.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

app.directive("img-lazy", {
	mounted(el, binding) {
		//el指令绑定的元素
		//binding： binding.value 指令后面绑定的绑定的表达式的值
		console.log(binding);
		console.log(111);
		useIntersectionObserver(el, ([{ isIntersecting }]) => {
			if (isIntersecting) {
				el.src = binding.value;
			}
		});
	},
});
