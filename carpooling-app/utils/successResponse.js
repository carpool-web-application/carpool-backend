const setSuccessfullResponse = (obj, response) => {
  response.status(200).json(obj);
};

export default setSuccessfullResponse;
