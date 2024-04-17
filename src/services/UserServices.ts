import axios from "axios";
import { LoginType } from "../@Types/LoginType";

const usersURL = "http://192.168.1.103:4200/users";

const GetUserByEmail = (email: string) => {
    return fetch(`${usersURL}?email ${email}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            return response.text();
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

export default { GetUserByEmail, LoginAxiosRequest };
