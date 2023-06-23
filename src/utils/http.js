//axios基础的封装
import axios from "axios";
const httpInstance = axios.create({
	baseURL: "http://pcapi-xiaotuxian-front-devtest.iteima.net",
	// baseURL: "http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com",
	timeout: 5000,
});

//拦截器配置
httpInstance.interceptors.request.use(
	config => {
		return config;
	},
	e => Promise.reject(e)
);

httpInstance.interceptors.response.use(
	res => res.data,
	e => {
		return Promise.reject(e);
	}
);

export default httpInstance;
