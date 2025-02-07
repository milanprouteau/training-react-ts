import { CitySearch } from "../models/city-search.model";
import { transportCustomFetch, cityCustomFetch, tripDistanceFetch } from "@/utils/customFetch";

export const fetchTransports = async () => {
  try {
    const response = await transportCustomFetch.get<TransportResponse>("", {});
    return response.data;
  } catch (error) {
    return null;
  }
}

export const fetchCities = async (query: any) => {
  try {
    const params = { q: query };
    const response = await cityCustomFetch.get("", { params });
    return response.data.features
      .filter(({ properties }) => properties.type === "city")
      .map((city) => new CitySearch(city));
  } catch (error) {
    return null;
  }
}

export const getTripDistance = async ({ origin, destination }) => {
  try {
    const data = {
      destinations: {
        latitude: destination[0],
        longitude: destination[1],
      },
      origins: {
        latitude: origin[0],
        longitude: origin[1],
      }
    };
    const response = await tripDistanceFetch.post("", data);
    console.log('res', response);
  } catch (err) {
    console.log('err', err);
  }
}