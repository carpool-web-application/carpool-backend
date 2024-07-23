import {
  saveRiderRide,
  getRiderRide,
  removeRiderRide,
  updateDetails,
  searchRide,
} from "../services/riderCreateRide-service";

export const post = async (request, response) => {
  try {
    const newRiderRide = request.body;
    const savedRiderRide = await saveRiderRide(newRiderRide);
    setSuccessfulResponse(savedRiderRide, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

export const index = async (request, response) => {
  try {
    const params = {};
    const rider = await searchRide(params);
    setSuccessfulResponse(riderRide, response);
  } catch (err) {
    setErrorResponse(err, response);
    //jj
  }
};

//define the method for rider searching
export const find = async (request, response) => {
  try {
    const id = request.params.id;
    const riderRide = await getRiderRide(id);
    setSuccessfulResponse(riderRide, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

//define the method for reminder deletion
export const deleteRiderRide = async (request, response) => {
  try {
    const id = request.params.id;
    const riderRide = await removeRiderRide(id);
    setSuccessfulResponse(riderRide, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

//define the method for reminder updation
export const updatedRiderRide = async (request, response) => {
  try {
    const id = request.params.id;
    const body = request.body;
    const riderRide = await updateDetails(id, body);

    setSuccessfulResponse(riderRide, response);
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
