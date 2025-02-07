import axios from "axios";

const snapiAPI = "https://api.spaceflightnewsapi.net/v4/articles/";
const datastroAPI = "https://www.datastro.eu/api/explore/v2.1/catalog/datasets/nasahubble/records";
const nasaAPI = "https://api.nasa.gov/planetary/apod";
const webbAPI = "https://api.jwstapi.com/all/type/jpg";
const spacexAPI = "https://api.spacexdata.com/v3/";
const transportAPI = "https://impactco2.fr/api/v1/thematiques/ecv/4?detail=1&language=en";
// ex: https://impactco2.fr/api/v1/transport?km=100&displayAll=0&ignoreRadiativeForcing=0&occupencyRate=1&includeConstruction=0&language=fr
const carbonAPI = "https://impactco2.fr/api/v1/";
const cityAPI = "https://photon.komoot.io/api/";
const distanceApiUrl = "https://impactco2.fr/api/callGMap";

export const snapiCustomFetch = axios.create({
    baseURL: snapiAPI,
});

export const datastroCustomFetch = axios.create({
    baseURL: datastroAPI,
});

export const nasaCustomFetch = axios.create({
    baseURL: nasaAPI,
    params: { api_key: import.meta.env.VITE_API_KEY_NASA },
});

export const webbCustomFetch = axios.create({
    baseURL: webbAPI,
    headers: { "X-API-KEY": import.meta.env.VITE_API_KEY_JWST },
});

export const spacexCustomFetch = axios.create({
    baseURL: spacexAPI,
});

export const transportCustomFetch = axios.create({
    baseURL: transportAPI,
})

export const carbonCustomFetch = axios.create({
    baseURL: carbonAPI,
});

export const cityCustomFetch = axios.create({
    baseURL: cityAPI,
});

export const tripDistanceFetch = axios.create({
    baseURL: distanceApiUrl,
    headers: { "Authorization": "Bearer 5da2a7d3-addf-4b3f-baae-7dfa2ef5b9a4"}
})
