import { MapContainer, Polygon, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import data from "@/data/Kepadatan_Penduduk.json";
import { useEffect, useState } from "react";

export default function MapKepadatanPenduduk(props: any) {
  const { position, zoom } = props;
  const [areas, setAreas] = useState<any>([]);
  const [maxKepDuk, setMaxKepDuk] = useState<number>(0);

  const invertCoordinate = (coord: Array<any>): Array<any> => {
    return [coord[1], coord[0]];
  };

  useEffect(() => {
    console.log(data.features);
    // let max = 0;
    const cleanedData: Array<any> = data.features.map((area) => {
      const coordinates = area.geometry.coordinates[0].map((coord) =>
        invertCoordinate(coord)
      );
      // if (area.properties.kepadatan_penduduk > max)
      //   max = area.properties.kepadatan_penduduk;
      if(area.properties.Klas_ha === "Sangat Rendah") console.log(area);
      return {
        coordinates,
        kecamatan: area.properties.DESA,
        level: area.properties.Klas_ha,
        ...area,
      };
    });
    console.log(cleanedData);
    setAreas(cleanedData);
    // setMaxKepDuk(max);
  }, []);

  if (areas.length > 0)
    return (
      <MapContainer
        className="w-full h-full select-none"
        center={position}
        zoom={zoom}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
          OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Polygon positions={areas[0]} color="blue" />
      <Polygon positions={areas[1]} color="blue" /> */}
        {areas.map((area: any, i: number) => (
          <Polygon
            key={i}
            positions={area.coordinates}
            color={
              area.level === "Sangat Rendah"
                ? "#D8F2ED"
                : area.level === "Rendah"
                  ? "#9FC4BE"
                  : area.level === "Sedang"
                    ? "#6B9993"
                    : area.level === "Tinggi"
                      ? "#3F736D"
                      : area.level === "Sangat Tinggi"
                        ? "#154F4A"
                        : ""
            }
            fill={true}
            fillOpacity={0.8}
          >
            <Tooltip>
              <span>{area.kecamatan}</span>
              <br />
              <span>Kepadatan: {area.level}</span>
            </Tooltip>
          </Polygon>
        ))}
      </MapContainer>
    );
}
