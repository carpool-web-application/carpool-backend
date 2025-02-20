const setSuccessfullResponse = (obj, response) => {
  return response.status(200).json(obj);
};

export default setSuccessfullResponse;
