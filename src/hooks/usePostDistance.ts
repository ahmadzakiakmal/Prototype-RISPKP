import { useState, useEffect } from "react";
import PostsGeoJSON from "@/data/Poin_Pos.json";
import PostData from "@/data/DataPos.json";

interface GeolocationPosition {
  lat: number;
  lon: number;
  acc: number;
}

interface ClosestPost {
  post: Post;
  distance: number;
  accuracy: number;
}

interface Post {
  Pos: number;
  Nama: string;
}

const usePostDistance = () => {
  const [coords, setCoords] = useState<GeolocationPosition>({
    lat: NaN,
    lon: NaN,
    acc: NaN,
  });
  const [closestPost, setClosestPost] = useState<ClosestPost>({
    post: {
      Pos: NaN,
      Nama: "",
    },
    distance: NaN,
    accuracy: NaN
  });

  const PostCoords = PostsGeoJSON.features.map((f) => ({
    lat: f.geometry.coordinates[1],
    lon: f.geometry.coordinates[0],
  }));

  useEffect(() => {
    if ("geolocation" in navigator) {
      if (!isNaN(coords.lat) || !isNaN(coords.lon)) return;
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          acc: position.coords.accuracy,
        });
      });
    }
  }, [coords]);

  useEffect(() => {
    if (!isNaN(coords.lat) && !isNaN(coords.lon)) {
      let minDistance = Number.MAX_VALUE;
      let closestIndex = -1;

      PostCoords.forEach((c, index) => {
        const d = haversineDistance(coords.lat, coords.lon, c.lat, c.lon);
        if (d < minDistance) {
          minDistance = d;
          closestIndex = index;
        }
      });

      if (closestIndex !== -1) {
        setClosestPost({
          post: {
            Pos: closestIndex,
            Nama: PostData[closestIndex]["Titik Pos"][0]
          },
          distance: minDistance,
          accuracy: coords.acc
        });
      }
    }
  }, [coords]);

  // Haversine Formula
  function haversineDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) {
    const R = 6371; // Radius of the Earth in km
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degreesToRadians(lat1)) *
        Math.cos(degreesToRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }

  function degreesToRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }

  return closestPost;
};

export default usePostDistance;
