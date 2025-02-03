/* eslint-disable no-console */
import { ApodLauncher, HubbleLauncher, NewsLauncher, SpaceXLauncher, WebbLauncher } from "@/components";
import { datastroCustomFetch, nasaCustomFetch, snapiCustomFetch } from "@/utils/customFetch";
import { ApodType, HubbleImage, HubbleImagesResponse, LandingPageNewsApodHubbles, News, NewsResponse } from "@/utils/types";
import { LoaderFunction } from "react-router-dom";

const newsParams = { ordering: "published_at" };

const hubblesParams = {
  order_by: "photo_date_taken desc",
  limit: 12,
};


export const newsFetch = async ():Promise<News[] | null> => {
  try {
    const response = await snapiCustomFetch.get<NewsResponse>("", {params: newsParams });
    return response.data.results;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const apodFetch = async ():Promise<ApodType | null> => {
  try {
    const response = await nasaCustomFetch.get<ApodType>("");
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const hubblesFetch = async ():Promise<HubbleImage[] | null> => {
  try {
    const response = await datastroCustomFetch.get<HubbleImagesResponse>("", {params: hubblesParams });
    return response.data.results;
  } catch (error) {
    console.log(error);
    return null;
  };
}

export const landingPageLoader: LoaderFunction = async ():Promise<LandingPageNewsApodHubbles | null> => {
  try {
    const [news, apod, hubbles] = await Promise.all([newsFetch(), apodFetch(), hubblesFetch()]);
    return { news, apod, hubbles };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const Landing = () => {
  return (
    <section>
      <NewsLauncher />
      <SpaceXLauncher />
      <ApodLauncher />
      <WebbLauncher />
      <HubbleLauncher />

    </section>
  )
}

export default Landing
