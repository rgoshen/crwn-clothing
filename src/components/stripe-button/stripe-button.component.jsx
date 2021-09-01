import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51JUgbBLLMzfb7Jb62iKkholzaVE8WV8MnPp5MkwV0zTU8ellfCLJLEmngWD3ULJXTVO7IXjUuIcz9j6Vqfez3tTT00ntrC2fl5";

  const onToken = (token) => {
    console.info(token);
    alert("Payment successful!");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Crwn Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://stripe.com/img/documentation/checkout/marketplace.png"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
