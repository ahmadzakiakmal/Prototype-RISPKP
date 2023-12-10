import { Marker, Popup } from "react-leaflet";
import { normalMarkerIcon, alertMarkerIcon } from "./MarkerIcon";

export default function MapMarker({ position, status, name }: any) {
  return (
    <Marker icon={status === "normal" ? normalMarkerIcon : alertMarkerIcon} position={position}>
      <Popup>
        <div className="flex flex-col">
          <h1 className="text-[18px] font-semibold">{name}</h1>
          <p className="text-sm !m-0">Status: {status}</p>
        </div>
      </Popup>
    </Marker>
  );
}
