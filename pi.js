// pi.js

Pi.init({ version: "2.0", sandbox: true });

function connectToPi() {
  Pi.authenticate(['username'], function(piUser) {
    document.getElementById('status').innerText = `✅ Connected as @${piUser.username}`;
    console.log("Authenticated user:", piUser);
  });
}

function payWithPi() {
  Pi.createPayment(
    {
      amount: 3.14,
      memo: "Berries Calling service payment",
      metadata: { purpose: "call_center" }
    },
    {
      onReadyForServerApproval: function (paymentId) {
        document.getElementById('status').innerText = `🔄 Approving payment ${paymentId}...`;
        console.log("Ready for approval:", paymentId);
        // You can send the paymentId to your backend here
      },
      onReadyForServerCompletion: function (paymentId, txid) {
        document.getElementById('status').innerText = `✅ Payment complete (txid: ${txid})`;
        console.log("Ready to complete:", paymentId, txid);
        // You can call your backend to confirm the payment here
      },
      onCancel: function (paymentId) {
        document.getElementById('status').innerText = "❌ Payment cancelled";
        console.log("Cancelled payment:", paymentId);
      },
      onError: function (error, payment) {
        document.getElementById('status').innerText = `❌ Error: ${error}`;
        console.error("Payment error:", error);
      }
    }
  );
}
