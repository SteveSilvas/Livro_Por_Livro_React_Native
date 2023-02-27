import axios from "axios";
import { UserRegisterType } from "../../@Types/UserRegisterType";

const usersURL = "http://192.168.1.102:4200/users";

const RegisterRequest = (data: UserRegisterType) => {
    return fetch(`${usersURL}/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            console.log(response)
            return response.text();
        })
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch((error) => {
            console.error("erro "+error);
        });
};

const RegisterAxiosRequest = (data: UserRegisterType) => {

    return axios
        .post(`${usersURL}/add`, data)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
};

export default { RegisterRequest, RegisterAxiosRequest };
