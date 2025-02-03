import { Link } from "react-router-dom"

const SpaceXLauncher = () => {
  return (
    <article className="w-full h-[40vh] spacex">
      <div className="align-element text-white p-2 pt-24 mt-20">
        <p className="font-bold text-4xl capitalize">More about space X</p>
        <button type="button" className="mt-4 slider-btn">
          <Link to="/spacex">Explore</Link>
        </button>
      </div>
    </article>
  )
}

export default SpaceXLauncher
