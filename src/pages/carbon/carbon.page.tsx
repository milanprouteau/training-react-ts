import { Button } from "@/components/ui/button";
import { Form, FormDescription } from "@/components/ui/form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { fetchTransports, getTripDistance } from "./services/carbon.service";
import { CitySearchInput } from './components/city-search-input.component';

export const carbonLoader: LoaderFunction = async () => {
  try {
    const response = await fetchTransports()
    return response.data;
  } catch (error) {
    return null;
  }
}

export const CarbonPage = () => {
  const data = useLoaderData();
  const form = useForm();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(f) {
    setIsLoading(true);
    try {
      const distance = await getTripDistance({
        origin: originCity?.coordinates,
        destination: destinationCity?.coordinates
      });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log('err', err);
    }
  };

  function onError(e) { console.log('err', e)}

  const [originCity, setOriginCity] = useState();
  const [destinationCity, setDestinationCity] = useState();

  return isLoading ? <div>Loading ... </div> : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className="h-full">
        <CitySearchInput name="from" placeHolder="From ?" setCity={setOriginCity} />
        <CitySearchInput name="to" placeHolder="To ?" setCity={setDestinationCity} />

        <FormDescription className="m-12 text-center">
          Find out how much CO₂ you'll consume for this trip
        </FormDescription>
        <Button type="submit" className="m-12">Submit</Button>
      </form>
    </Form>
  )
}
