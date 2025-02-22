const API_URL = "http://localhost:5000/api";

export const fetchCustomers = async () => {
  const response = await fetch(`${API_URL}/customers`);
  return response.json();
};

export const fetchPayments = async () => {
  const response = await fetch(`${API_URL}/payments`);
  return response.json();
};

export const makePayment = async (paymentData) => {
  const response = await fetch(`${API_URL}/payments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(paymentData),
  });
  return response.json();
};
