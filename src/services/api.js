import axios from "axios";

const API_URL = "http://localhost:5000";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};

export const loginUser = async (userData) => {
  return await axios.post(`${API_URL}/login`, userData);
};

export const getCustomers = async () =>
  axios.get(`${API_URL}/customers`, getAuthHeaders());

export const addCustomer = async (customer) =>
  axios.post(`${API_URL}/customers`, customer, getAuthHeaders());

export const updateCustomer = async (id, customer) =>
  axios.put(`${API_URL}/customers/${id}`, customer, getAuthHeaders());

export const deleteCustomer = async (id) =>
  axios.delete(`${API_URL}/customers/${id}`, getAuthHeaders());

export const makePayment = async (paymentData) =>
  axios.post(`${API_URL}/payments`, paymentData, getAuthHeaders());

export const fetchNotifications = async () =>
  axios.get(`${API_URL}/notifications`, getAuthHeaders());
