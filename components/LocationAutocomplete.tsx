/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "../utils/apipath";

type LocationAutocompleteProps = {
  onLocationSelect: (location: string) => void;
};

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  onLocationSelect,
}) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [locationBias, setLocationBias] = useState(null as any);

  // Get user location on mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocationBias({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        console.error("Geolocation error:", err);
      }
    );
  }, []);

  // Fetch suggestions when input changes
  useEffect(() => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      const response: any = await axios.get(
        `${apiPath}/api/autocomplete`,
        {
          params: {
            input,
            // key: "AIzaSyDB0Xo5sVNSdEfgQkNh14tUV6qc4Nsbu80",
            lat: locationBias?.lat,
            lng: locationBias?.lng,
          },
        }
      );
      setSuggestions(response.data.predictions);
    };

    fetchSuggestions();
  }, [input, locationBias]);

  return (
    <div className="relative">
      <label className="block text-sm font-medium mb-1">Location</label>
      <input
        type="text"
        placeholder="Enter location"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 border rounded"
      />
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border w-full max-h-48 overflow-auto mt-1 rounded shadow z-10">
          {suggestions.map((s: any) => (
            <li
              key={s.place_id}
              className="p-2 cursor-pointer hover:bg-blue-100"
              onClick={() => {
                setInput(s.description);
                setSuggestions([]);
                onLocationSelect(s.description);
              }}
            >
              {s.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationAutocomplete;
