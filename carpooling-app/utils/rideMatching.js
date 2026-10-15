const EARTH_RADIUS_KM = 6371;

const toFiniteNumber = (value) => {
  if (value === null || value === undefined || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

export const haversineDistanceKm = (lat1, lon1, lat2, lon2) => {
  const coordinates = [lat1, lon1, lat2, lon2].map(toFiniteNumber);
  if (coordinates.some((coordinate) => coordinate === null)) return null;

  const [startLat, startLon, endLat, endLon] = coordinates;
  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  const latitudeDelta = toRadians(endLat - startLat);
  const longitudeDelta = toRadians(endLon - startLon);
  const startLatitude = toRadians(startLat);
  const endLatitude = toRadians(endLat);
  const calculation =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(startLatitude) *
      Math.cos(endLatitude) *
      Math.sin(longitudeDelta / 2) ** 2;

  return (
    EARTH_RADIUS_KM *
    2 *
    Math.atan2(Math.sqrt(calculation), Math.sqrt(1 - calculation))
  );
};

export const findClosestRide = (
  rides,
  { startLat, startLon, endLat, endLon, maxDistanceKm = 5 }
) => {
  let closestRide = null;
  let closestDistance = maxDistanceKm;

  for (const ride of rides) {
    const pickupDistance = haversineDistanceKm(
      startLat,
      startLon,
      ride.OriginLatitude,
      ride.OriginLongitude
    );
    const destinationDistance = haversineDistanceKm(
      endLat,
      endLon,
      ride.DestinationLatitude,
      ride.DestinationLongitude
    );
    if (pickupDistance === null || destinationDistance === null) continue;

    const totalDistance = pickupDistance + destinationDistance;
    if (totalDistance < closestDistance) {
      closestDistance = totalDistance;
      closestRide = ride;
    }
  }

  if (!closestRide) return null;
  return {
    ...closestRide,
    matchDistanceKm: Number(closestDistance.toFixed(3)),
  };
};
