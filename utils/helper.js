//create data form to send back to client side
module.exports.getResponseForm = function (data, message) {
  const dataForm = {
    data: [],
    detail: {
      message: null,
    },
  };
  if (data) {
    dataForm.data.push(data);
  }
  if (message) {
    dataForm.detail.message = message;
  }
  return dataForm;
};
