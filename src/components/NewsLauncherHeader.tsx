import { CirclePlay } from "lucide-react"
import Title from "./Title"
import { Link } from "react-router-dom"

const NewsLauncherHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <Title text="recent news" />
      <p className="font-bold ml-auto mr-2">More news</p>
      <Link to="/news">
        <CirclePlay color="var(--clr-violet)" className="transion-all hover:scale-150" />
      </Link>
    </div>
  )
}

export default NewsLauncherHeader
