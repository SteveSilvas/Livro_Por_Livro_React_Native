import axios from "axios";
import { LoginType } from "../../@Types/LoginType";

const usersURL = "http://192.168.1.103:4200/users";

const LoginRequest = (data: LoginType) => {
    return fetch(`${usersURL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch((error) => {
            console.error(error);
        });
};

const LoginAxiosRequest = (data: LoginType) => {

    return axios
        .post(`${usersURL}/login`, data)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
};

export default { LoginRequest, LoginAxiosRequest };
