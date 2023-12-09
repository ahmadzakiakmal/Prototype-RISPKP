import L from "leaflet";

export const normalMarkerIcon = new L.Icon({
  iconUrl: "/svgs/MarkerNormal.png",
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -48],
});

export const alertMarkerIcon = new L.Icon({
  iconUrl: "/svgs/MarkerAlert.png",
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -48],
});