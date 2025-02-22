import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  makePayment,
} from "../services/api";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    contact: "",
    outstandingAmount: "",
    dueDate: "",
    paymentStatus: "",
  });
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await getCustomers();
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleAddCustomer = async () => {
    if (!newCustomer.name.trim()) return;
    try {
      await addCustomer(newCustomer);
      setNewCustomer({
        name: "",
        contact: "",
        outstandingAmount: "",
        dueDate: "",
        paymentStatus: "",
      });
      fetchCustomers();
      setNotification({
        open: true,
        message: "Customer added successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error adding customer:", error);
      setNotification({
        open: true,
        message: "Failed to add customer!",
        severity: "error",
      });
    }
  };

  const handleUpdateCustomer = async (id, name) => {
    try {
      await updateCustomer(id, { name });
      fetchCustomers();
      setNotification({
        open: true,
        message: "Customer updated successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error updating customer:", error);
      setNotification({
        open: true,
        message: "Failed to update customer!",
        severity: "error",
      });
    }
  };

  const handleDeleteCustomer = async (id) => {
    try {
      await deleteCustomer(id);
      fetchCustomers();
      setNotification({
        open: true,
        message: "Customer deleted successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error deleting customer:", error);
      setNotification({
        open: true,
        message: "Failed to delete customer!",
        severity: "error",
      });
    }
  };

  const openPaymentDialog = (customer) => {
    setSelectedCustomer(customer);
    setPaymentAmount("");
    setPaymentDialogOpen(true);
  };

  const handleMakePayment = async () => {
    if (!paymentAmount || paymentAmount <= 0) {
      alert("Enter a valid amount!");
      return;
    }

    try {
      await makePayment({
        customerId: selectedCustomer.id,
        amount: parseFloat(paymentAmount),
      });
      setPaymentDialogOpen(false);
      fetchCustomers();
      setNotification({
        open: true,
        message: "Payment made successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error making payment:", error);
      setNotification({
        open: true,
        message: "Failed to make payment!",
        severity: "error",
      });
    }
  };

  return (
    <Container>
      <Box
        sx={{
          mt: 4,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Customers
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            label="Name"
            value={newCustomer.name}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, name: e.target.value })
            }
            required
          />
          <TextField
            label="Contact"
            value={newCustomer.contact}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, contact: e.target.value })
            }
            required
          />
          <TextField
            label="Outstanding Amount"
            type="number"
            value={newCustomer.outstandingAmount}
            onChange={(e) =>
              setNewCustomer({
                ...newCustomer,
                outstandingAmount: e.target.value,
              })
            }
            required
          />
          <TextField
            type="date"
            value={newCustomer.dueDate}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, dueDate: e.target.value })
            }
            required
          />
          <TextField
            label="Payment Status"
            value={newCustomer.paymentStatus}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, paymentStatus: e.target.value })
            }
            required
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddCustomer}
          >
            Add Customer
          </Button>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Outstanding Amount</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.id}</TableCell>
                <TableCell>
                  <TextField
                    value={customer.name}
                    onChange={(e) =>
                      handleUpdateCustomer(customer.id, e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>{customer.contact}</TableCell>
                <TableCell>{customer.outstandingAmount}</TableCell>
                <TableCell>{customer.dueDate}</TableCell>
                <TableCell>{customer.paymentStatus}</TableCell>
                <TableCell>
                  {customer.paymentStatus !== "Completed" && (
                    <Button
                      color="primary"
                      onClick={() => openPaymentDialog(customer)}
                    >
                      Make Payment
                    </Button>
                  )}
                  <Button
                    color="error"
                    onClick={() => handleDeleteCustomer(customer.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Dialog
        open={paymentDialogOpen}
        onClose={() => setPaymentDialogOpen(false)}
      >
        <DialogTitle>Make Payment</DialogTitle>
        <DialogContent>
          <TextField
            label="Amount"
            type="number"
            fullWidth
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPaymentDialogOpen(false)}>Cancel</Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleMakePayment}
          >
            Pay
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert
          severity={notification.severity}
          onClose={() => setNotification({ ...notification, open: false })}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Customers;
