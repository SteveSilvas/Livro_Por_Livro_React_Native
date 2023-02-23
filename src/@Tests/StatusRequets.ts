import axios from 'axios';
import Config from 'react-native-config';
const StatusRequest = () => {
    console.log(process.env)
    const statusURL = "http://10.9.0.115:4200/status";

    fetch(`${statusURL}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
};

const StatusAxiosRequest = () =>{
  const localURL = "http://192.168.1.103:4200/status";

  return axios.get(`${localURL}`)
    .then((response) => {
      console.log(response);
      if (response.status >= 400) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return response.data;
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
}

export default { StatusRequest, StatusAxiosRequest}