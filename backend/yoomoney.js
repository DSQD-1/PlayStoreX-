const yoomoneyConfig = {
  receiver: "",
  secret: "",
  currency: "RUB"
};


function createPayment(amount, description) {

  return {
    amount,
    description,
    status: "pending"
  };

}


function checkPayment(paymentId) {

  return {
    id: paymentId,
    paid: false
  };

}


export {
  yoomoneyConfig,
  createPayment,
  checkPayment
};