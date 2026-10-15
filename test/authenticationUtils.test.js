import test from "node:test";
import assert from "node:assert/strict";
import AppError from "../carpooling-app/utils/AppError.js";
import { authorizeSelfOrAdmin } from "../carpooling-app/utils/authenticationUtils.js";

test("AppError marks client errors as operational failures", () => {
  const error = new AppError("Not found", 404);
  assert.equal(error.status, "fail");
  assert.equal(error.statusCode, 404);
  assert.equal(error.isOperational, true);
});

test("a user can access their own profile by username", () => {
  const middleware = authorizeSelfOrAdmin("userId");
  let forwardedError;
  middleware(
    {
      params: { userId: "alex" },
      token: { id: "mongo-id", userId: "public-id", userName: "alex" },
    },
    {},
    (error) => {
      forwardedError = error;
    }
  );
  assert.equal(forwardedError, undefined);
});

test("a user cannot access another user's private profile", () => {
  const middleware = authorizeSelfOrAdmin("userId");
  let forwardedError;
  middleware(
    {
      params: { userId: "someone-else" },
      token: {
        id: "mongo-id",
        userId: "public-id",
        userName: "alex",
        commuterType: "Rider",
      },
    },
    {},
    (error) => {
      forwardedError = error;
    }
  );
  assert.equal(forwardedError.statusCode, 403);
});

test("an admin can access another user's profile", () => {
  const middleware = authorizeSelfOrAdmin("userId");
  let forwardedError;
  middleware(
    {
      params: { userId: "someone-else" },
      token: { commuterType: "Admin" },
    },
    {},
    (error) => {
      forwardedError = error;
    }
  );
  assert.equal(forwardedError, undefined);
});
