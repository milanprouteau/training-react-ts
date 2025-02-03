import { LandingPageNewsApodHubbles } from "@/utils/types"
import { useLoaderData } from "react-router-dom"
import NewsLauncherHeader from "./NewsLauncherHeader";
import NewsLauncherSquaredCards from "./NewsLauncherSquaredCards";
import NewsLauncherBubbleCards from "./NewsLauncherBubbleCards";

const NewsLauncher = () => {
  const { news } = useLoaderData() as LandingPageNewsApodHubbles;
  return (
    <article className="w-full py-12">
      <div className="align-element h-full">
        <NewsLauncherHeader />
        {news && <NewsLauncherSquaredCards news={news} />}
        {news && <NewsLauncherBubbleCards news={news} />}
      </div>
    </article>
  )
}

export default NewsLauncher
