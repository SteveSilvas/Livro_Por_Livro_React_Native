import axios from "axios";
import { UserRegisterType } from "../../@Types/UserRegisterType";

const RegisterRequest = (data: UserRegisterType) => {
    const usersURL = "http://192.168.1.103:4200/users";
    return fetch(`${usersURL}/add`, {
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

const RegisterAxiosRequest = (data: UserRegisterType) => {
    const usersURL = "http://192.168.1.103:4200/users";

    return axios
        .post(`${usersURL}/add`, data)
        .then((response) => {
            return response.data;
        })
        .then((response) => {
            alert(response);
        })
        .catch((error) => {
            console.error(error);
        });
};

export default { RegisterRequest, RegisterAxiosRequest };
