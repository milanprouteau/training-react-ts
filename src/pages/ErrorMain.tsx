import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"

const ErrorMain = () => {
  return (
    <div className="section flex flex-col gap-10 items-start">
      <h4>There was an error...</h4>
      <Button asChild size={"lg"} variant={"default"}>
        <Link to="/">Back home</Link>
      </Button>
    </div>
  )
}

export default ErrorMain
