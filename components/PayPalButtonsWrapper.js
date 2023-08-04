import { useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js";

const ButtonWrapper = ({ type }) => {
  const [{ options }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        intent: "subscription",
      },
    });
  }, [type]);

  return (
    <PayPalButtons
      createSubscription={(data, actions) => {
        return actions.subscription
          .create({
            plan_id: "P-14E78001HK6911726MTF5WKI",
          })
          .then((orderId) => {
            // Your code here after creating the order
            return orderId;
          });
      }}

      style={{
        label: "subscribe",
      }}
    />
  );
};

const PayPalButtonsWrapper = () => {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": "AdJ7uTyWfAR9Y3MqeJrBjy_TxmkI4F7MmTr41vvHExBo49fbTJ9cBmd_DgTE92bFqEFctWpBQEzFTSci",
        components: "buttons",
        intent:"subscription",
        vault: true,
      }}
    >
      <ButtonWrapper type="subscription" />
    </PayPalScriptProvider>
  );
};

export default PayPalButtonsWrapper;
