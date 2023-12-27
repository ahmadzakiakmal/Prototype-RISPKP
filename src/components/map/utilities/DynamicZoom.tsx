import { useEffect } from "react";
import { useMap } from "react-leaflet";

const DynamicZoom = ({ zoom } : any) => {
  const map = useMap();

  useEffect(() => {
    if (map) {
      map.setZoom(zoom);
    }
  }, [zoom, map]);

  return null;
};

export default DynamicZoom;
