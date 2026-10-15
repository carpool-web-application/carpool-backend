import test from "node:test";
import assert from "node:assert/strict";
import {
  findClosestRide,
  haversineDistanceKm,
} from "../carpooling-app/utils/rideMatching.js";

const search = {
  startLat: 41,
  startLon: -87,
  endLat: 42,
  endLon: -88,
};

const matchingRide = {
  _id: "matching-ride",
  OriginLatitude: 41,
  OriginLongitude: -87,
  DestinationLatitude: 42,
  DestinationLongitude: -88,
};

test("haversine distance is zero for identical coordinates", () => {
  assert.equal(haversineDistanceKm(41, -87, 41, -87), 0);
});

test("selects the closest compatible route", () => {
  const fartherRide = {
    ...matchingRide,
    _id: "farther-ride",
    OriginLatitude: 41.01,
  };
  const result = findClosestRide([fartherRide, matchingRide], search);
  assert.equal(result._id, "matching-ride");
  assert.equal(result.matchDistanceKm, 0);
});

test("excludes rides outside the combined five kilometer limit", () => {
  const result = findClosestRide(
    [{ ...matchingRide, OriginLatitude: 45 }],
    search
  );
  assert.equal(result, null);
});

test("ignores rides with incomplete coordinates", () => {
  const result = findClosestRide(
    [{ ...matchingRide, DestinationLongitude: null }],
    search
  );
  assert.equal(result, null);
});
