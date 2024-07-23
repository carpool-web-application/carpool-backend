import {
  saveDriverRide,
  getDriverRide,
  removeDriver,
  updateDetails,
  searchDriver,
} from "../services/driverCreateRide-service.js";

export const post = async (request, response) => {
  try {
    const newDriverRide = request.body;
    const savedDriverRide = await saveDriverRide(newDriverRide);
    setSuccessfulResponse(savedDriverRide, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

export const index = async (request, response) => {
  try {
    const params = {};
    const driverRides = await searchDriver(params);
    setSuccessfulResponse(driverRides, response);
  } catch (err) {
    setErrorResponse(err, response);
    //jj
  }
};

//define the method for rider searching
export const find = async (request, response) => {
  try {
    const id = request.params.id;
    const driverRide = await getDriverRide(id);
    setSuccessfulResponse(driverRide, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

//define the method for reminder deletion
export const deleteDriverRide = async (request, response) => {
  try {
    const id = request.params.id;
    const driverRide = await removeDriver(id);
    setSuccessfulResponse(driverRide, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

//define the method for reminder updation
export const updatedriver = async (request, response) => {
  try {
    const id = request.params.id;
    const body = request.body;
    const driverRide = await updateDetails(id, body);

    setSuccessfulResponse(driverRide, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

//define when the request is successful
const setSuccessfulResponse = (obj, response) => {
  response.status(200);
  response.json(obj);
};

//define the error response
const setErrorResponse = (err, response) => {
  response.status(500);
  response.status(404);
  response.json({
    error: {
      message: err,
    },
  });
};
