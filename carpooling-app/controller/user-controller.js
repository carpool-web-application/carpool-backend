import {
  saveUser,
  getuser,
  removeuser,
  updateDetails,
  searchuser,
  getuserName,
  getuserDetails,
} from "../services/user-service.js";

export const post = async (request, response) => {
  try {
    const newUser = request.body;
    const savedUser = await saveUser(newUser);
    setSuccessfulResponse(savedUser, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

export const index = async (request, response) => {
  try {
    const params = request;
    const users = await searchuser(params);

    setSuccessfulResponse(users, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

export const login = async (request, response, next) => {
  try {
    const body = request.body;
    const user = await getuserDetails(body);
    if (!user) {
      return response.status(401).send("User not found or password incorrect");
    }
    request.body = user;
    next();
  } catch (err) {
    setErrorResponse(err, response);
  }
};

//define the method for rider searching
export const find = async (request, response) => {
  try {
    const id = request.params.id;
    const user = await getuser(id);
    setSuccessfulResponse(user, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

export const findbyUserName = async (request, response) => {
  try {
    const id = request.params.riderId;
    const user = await getuserName(id);
    setSuccessfulResponse(user, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

//define the method for reminder deletion
export const deleteUser = async (request, response) => {
  try {
    const id = request.params.id;
    const user = await removeuser(id);
    setSuccessfulResponse(user, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

//define the method for reminder updation
export const updatuser = async (request, response) => {
  try {
    const id = request.params.id;
    const body = request.body;
    const user = await updateDetails(id, body);

    setSuccessfulResponse(user, response);
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
