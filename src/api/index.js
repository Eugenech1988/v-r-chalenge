import axios from 'axios';
import apiDefault from './endpoints';

const axiosRequest = (method = 'GET', url = '', data) => (
  axios(`${apiDefault}${url}`, {
    method,
    data
  })
    .then(res => res.data)
    .catch(err => err)
);

export const fetchOrdersApi = () => axiosRequest();

export const patchOrderName = (payload, id) => axiosRequest('PATCH', `/${id}`, payload);

export default axiosRequest;
