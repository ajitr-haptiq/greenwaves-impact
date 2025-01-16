import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const StripePaymentModal = ({ amount, onSuccess, onClose, userId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (!stripe || !elements) {
      setErrorMessage("Stripe has not been initialized.");
      setLoading(false);
      return;
    }

    try {
      // Send amount in rupees
      const response = await fetch(
        "http://localhost:4001/api/stripe/create-payment-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: amount, userId: userId }), // Include userId
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create payment intent.");
      }

      const { clientSecret } = await response.json();

      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        setErrorMessage(error.message || "Payment failed. Please try again.");
        return;
      }

      if (paymentIntent.status === "succeeded") {
        onSuccess(amount); // Notify parent component with the amount in rupees
      }
    } catch (err) {
      setErrorMessage("An error occurred. Please try again.");
      console.error("Payment error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Donate ₹{amount}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <CardElement
            className="p-2 border rounded"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          {errorMessage && (
            <div className="text-red-500 text-sm text-center">
              {errorMessage}
            </div>
          )}
          <button
            type="submit"
            disabled={!stripe || loading}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
          >
            {loading ? "Processing..." : `Pay ₹${amount}`}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition duration-300"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default StripePaymentModal;
