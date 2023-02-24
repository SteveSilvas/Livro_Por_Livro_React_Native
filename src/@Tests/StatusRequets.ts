import axios from 'axios';

const statusURL = "http://10.9.0.115:4200/status";

const StatusRequest = () => {
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
  return axios.get(`${statusURL}`)
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