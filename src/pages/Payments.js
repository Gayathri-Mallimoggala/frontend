import PaymentForm from '../components/PaymentForm';

const Payments = () => {
  const handlePayment = (e) => {
    e.preventDefault();
    console.log("Payment submitted");
  };

  return (
    <div>
      <h2>Payments</h2>
      <PaymentForm onSubmit={handlePayment} />
    </div>
  );
};

export default Payments;
