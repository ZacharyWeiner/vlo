const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");
const app = express();
const stripe = require("stripe")(
  "sk_test_51ITASLA5eISFnysu8F2ezOu5vdvsbQP6VfYK4BoMzCmtcTAAfZyOrjRxgHe4OjVGsT3HqSSeRgDLITxRwzOm7kes00m3BEa9VS"
);

//here we are configuring dist to serve app files
app.use("/", serveStatic(path.join(__dirname, "/dist")));

app.get("/secret", async (req, res) => {
  const intent = await stripe.paymentIntents.create({
    amount: 999,
    currency: "usd",
    automatic_payment_methods: { enabled: true },
  });
  res.json({ client_secret: intent.client_secret });
  return res;
});

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port);
console.log(`app is listening on port: ${port}`);
