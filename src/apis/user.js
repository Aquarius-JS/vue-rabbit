import httpInstance from "@/utils/http";
//封装与用户相关的接口函数
export const loginAPI = ({ account, password }) => {
	return httpInstance({
		url: "/login",
		method: "post",
		data: {
			account,
			password,
		},
	});
};