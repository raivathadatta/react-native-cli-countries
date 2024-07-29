import axios from 'axios';
import axiosInstance from './middleware/axiosIntercepter'; // Adjust the import path as needed

const fetchCountriesData = async () => {
  const response = await axiosInstance.get('all');
  // console.log(response.data);
  return response.data;
};

export const fetchAddress = async (latitude, longitude) => {
  const response = await axios.get(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
  );
  return response.data;
};
export default fetchCountriesData;
