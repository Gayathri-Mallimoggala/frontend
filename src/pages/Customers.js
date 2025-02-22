import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@/components/ui/table";

const API_URL = "http://localhost:5000";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({ name: "", contact: "" });
  const [editingCustomer, setEditingCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const { data } = await axios.get(`${API_URL}/customers`);
    setCustomers(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingCustomer) {
      await axios.put(`${API_URL}/customers/${editingCustomer.id}`, formData);
    } else {
      await axios.post(`${API_URL}/customers`, formData);
    }
    setFormData({ name: "", contact: "" });
    setEditingCustomer(null);
    fetchCustomers();
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setFormData({ name: customer.name, contact: customer.contact });
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/customers/${id}`);
    fetchCustomers();
  };

  return (
    <Card>
      <CardContent>
        <h2>Customers</h2>
        <form onSubmit={handleSubmit}>
          <Input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <Input name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} required />
          <Button type="submit">{editingCustomer ? "Update" : "Add"} Customer</Button>
        </form>
        <Table>
          <thead>
            <tr><th>Name</th><th>Contact</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.contact}</td>
                <td>
                  <Button onClick={() => handleEdit(c)}>Edit</Button>
                  <Button onClick={() => handleDelete(c.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default Customers;
