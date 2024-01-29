// src/components/Map.tsx
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import useDynamicZoom from "@/hooks/useDynamicZoom";
import DynamicZoom from "./utilities/DynamicZoom";
import dynamic from "next/dynamic";
import { Icon } from "leaflet";
import { GeoJsonObject } from "geojson";

import dataAnalisisRisikoKebakaran from "@/data/Risiko_Kebakaran.json";
import dataSebaranHidranKering from "@/data/Titik_Sebaran_Hidran_Kering.json";
import dataSebaranHidran from "@/data/Titik_Sebaran_Hidran_Basah.json";
import dataJalanKota from "@/data/Jalan_Kota.json";
import dataRedkar from "@/data/Redkar_Per_Kelurahan.json";
import { PiCaretDownBold } from "react-icons/pi";
import { useState } from "react";

const toPascalCase = (str: string) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

function Map() {
  const zoom = useDynamicZoom();
  const [openSettings, setOpenSettings] = useState<boolean>(true);
  const [showRisikoKebakaran, setShowRisikoKebakaran] = useState<boolean>(true);
  const [showHidranKering, setShowHidranKering] = useState<boolean>(true);
  const [showHidran, setShowHidran] = useState<boolean>(true);
  const [showPetaJalan, setShowPetaJalan] = useState<boolean>(true);
  const [showPetaRedkar, setShowPetaRedkar] = useState<boolean>(true);

  return (
    <section className="h-[80vh] max-h-[800px] relative">
      <MapContainer
        className="w-full h-full select-none relative z-[1]"
        center={[-7.801363, 110.364787]}
        zoom={14}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DynamicZoom zoom={zoom} />

        {/* GeoJSON Analisis Risiko Kebakaran */}
        {showRisikoKebakaran && (
          <GeoJSON
            data={dataAnalisisRisikoKebakaran as GeoJsonObject}
            style={(feature) => {
              const level = feature?.properties.gridcode;
              return {
                fillColor:
                  level == 1 ? "#5EBA30" : level == 2 ? "#FFFF30" : "#FF3030",
                fillOpacity: 0.65,
                color: "#23272A",
                weight: 0,
              };
            }}
            onEachFeature={(feature, layer) => {
              const level =
                feature.properties.gridcode === 1
                  ? "Rendah"
                  : feature.properties.gridcode === 2
                    ? "Sedang"
                    : "Tinggi";
              layer.bindTooltip(
                `<span class="font-semibold font-poppins">Tingkat Risiko: ${level}</span>`
              );
            }}
          />
        )}

        {/* Mapping Hidran Kering */}
        {showHidranKering &&
          dataSebaranHidranKering.features.map((item) => {
            return (
              <Marker
                position={[
                  item.geometry.coordinates[1],
                  item.geometry.coordinates[0],
                ]}
                icon={
                  new Icon({
                    iconUrl: "/pngs/HydrantDry.png",
                    iconSize: [30 / 2, 37.5 / 2],
                    iconAnchor: [30 / 2, 37.5 / 2],
                    popupAnchor: [0, (-37.5 / 5) * 2],
                  })
                }
              >
                <Tooltip
                  children={
                    <div>
                      <p className="font-semibold font-poppins text-wrap">
                        Hidran Kering
                      </p>
                      <p className="font-poppins text-wrap">
                        Lokasi:{" "}
                        <span className="font-semibold">
                          {toPascalCase(item.properties.lokasi)}
                        </span>
                      </p>
                      <p className="font-poppins text-wrap">
                        Kondisi:{" "}
                        <span className="font-semibold">
                          {toPascalCase(item.properties.kondisi)}
                        </span>
                      </p>
                    </div>
                  }
                />
              </Marker>
            );
          })}

        {/* Mapping Hidran Basah */}
        {showHidran &&
          dataSebaranHidran.features.map((item) => {
            return (
              <Marker
                position={[
                  item.geometry.coordinates[1],
                  item.geometry.coordinates[0],
                ]}
                icon={
                  new Icon({
                    iconUrl: "/pngs/Hydrant.png",
                    iconSize: [30 / 2, 37.5 / 2],
                    iconAnchor: [30 / 2, 37.5 / 2],
                    popupAnchor: [0, (-37.5 / 5) * 2],
                  })
                }
              >
                <Tooltip
                  children={
                    <div>
                      <p className="font-semibold font-poppins text-wrap">
                        {item.properties.kategori_h}
                      </p>
                      <p className="font-poppins text-wrap">
                        Lokasi:{" "}
                        <span className="font-semibold">
                          {toPascalCase(item.properties.lokasi)}
                        </span>
                      </p>
                      <p className="font-poppins text-wrap">
                        Kondisi:{" "}
                        <span className="font-semibold">
                          {toPascalCase(item.properties.kondisi)}
                        </span>
                      </p>
                    </div>
                  }
                />
              </Marker>
            );
          })}

        {/* GeoJSON Redkar */}
        {showPetaRedkar && (
          <GeoJSON
            data={dataRedkar as GeoJsonObject}
            style={(feature) => {
              type colorMap = {
                [key: number]: string;
              };
              const jumlahRedkar: number = feature?.properties.Jum_Redkar;
              const colors: colorMap = {
                10: "#B8FCD4",
                11: "#FCB3F6",
                12: "#FCCAB6",
                13: "#B6DEFC",
                14: "#F9FCB6",
                15: "#C6BDFC",
                16: "#FCB8CE",
                17: "#FCF2D2",
                18: "#F7D4FC",
                20: "#D7FCEB",
                25: "#B3FCB6",
              };
              return {
                fillColor: colors[jumlahRedkar],
                fillOpacity: 0.5,
                color: "#233132",
                weight: 1,
              };
            }}
            onEachFeature={(feature, layer) => {
              const jumlahRedkar = feature?.properties.Jum_Redkar;
              const kelurahan = feature?.properties.DESA;
              layer.bindTooltip(
                `
              <p class="font-semibold font-poppins">${kelurahan}</p>
              <p class="font-poppins">Jumlah Redkar: <span class="font-semibold">${jumlahRedkar}</span></p>
              `
              );
            }}
          />
        )}

        {/* GeoJSON Jalan Kota */}
        {
          showPetaJalan && <GeoJSON
            data={dataJalanKota as GeoJsonObject}
            style={{ opacity: 0.7, color: "#233212" }}
            onEachFeature={(feature, layer) => {
              layer.bindTooltip(
                `<span class="font-poppins font-semibold">${feature.properties.REMARK}</span>`
              );
            }}
          />
        }
      </MapContainer>
      <section className="absolute text-[10px] md:text-[12px] shadow-md rounded-[5px] top-0 right-0 px-[8px] py-[5px] md:px-[15px] md:py-[7px] bg-white outline outline-1 m-5 !z-[10] flex flex-col">
        <button
          onClick={() => setOpenSettings(!openSettings)}
          className="flex justify-between items-center w-full gap-2"
        >
          <h1 className="font-semibold">Pengaturan</h1>
          <PiCaretDownBold
            className={`transition-[transform] duration-200 ${
              openSettings && "rotate-180"
            }`}
          />
        </button>
        <div
          className={`grid transition-[grid-template-rows] duration-200 ${
            openSettings ? "grid-rows-[1fr] pt-1" : "grid-rows-[0fr] pt-0"
          }`}
        >
          <div className="overflow-y-hidden flex flex-col gap-1">
            <label className="flex gap-1 justify-between">
              Risiko Kebakaran
              <input
                type="checkbox"
                checked={showRisikoKebakaran}
                onClick={() => setShowRisikoKebakaran(!showRisikoKebakaran)}
              />
            </label>
            <label className="flex gap-1 justify-between">
              Hidran Kering
              <input
                type="checkbox"
                checked={showHidranKering}
                onClick={() => setShowHidranKering(!showHidranKering)}
              />
            </label>
            <label className="flex gap-1 justify-between">
              Hidran Basah
              <input
                type="checkbox"
                checked={showHidran}
                onClick={() => setShowHidran(!showHidran)}
              />
            </label>
            <label className="flex gap-1 justify-between">
              Jalan
              <input
                type="checkbox"
                checked={showPetaJalan}
                onClick={() => setShowPetaJalan(!showPetaJalan)}
              />
            </label>
            <label className="flex gap-1 justify-between">
              Relawan
              <input 
                type="checkbox"
                checked={showPetaRedkar}
                onClick={() => setShowPetaRedkar(!showPetaRedkar)} />
            </label>
          </div>
        </div>
      </section>
    </section>
  );
}

export default dynamic(() => Promise.resolve(Map), {
  ssr: false,
});
