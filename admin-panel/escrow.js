let payments = [];

const HOLD_TIME = 24 * 60 * 60 * 1000; // 24 часа


function holdPayment(data) {
  payments.push({
    id: Date.now(),

    userId: data.userId,
    amount: data.amount,

    status: "hold",

    createdAt: new Date()
  });
}


function releasePayments() {
  const now = Date.now();

  payments.forEach(payment => {

    const timePassed =
      now - new Date(payment.createdAt).getTime();

    if (timePassed >= HOLD_TIME) {
      payment.status = "available";
    }

  });
}


function getPayments() {
  return payments;
}


export {
  holdPayment,
  releasePayments,
  getPayments
};