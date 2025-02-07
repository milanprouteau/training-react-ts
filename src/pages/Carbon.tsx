import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CitySearch } from "@/models/city-search.model";
import { cityCustomFetch, transportCustomFetch } from "@/utils/customFetch";
import { TransportResponse } from "@/utils/types";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { LoaderFunction, useLoaderData } from "react-router-dom";

export const transportFetch = async () => {
  try {
    const response = await transportCustomFetch.get<TransportResponse>("", {});
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const cityFetch = async (query: any) => {
  console.log('here');

  try {
    const params = { q: query };
    const response = await cityCustomFetch.get("", { params });
    return response.data.features
      .filter(({ properties }) => properties.type === "city")
      .map((city) => new CitySearch(city));
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const carbonLoader: LoaderFunction = async () => {
  try {
    const response = await transportCustomFetch.get<TransportResponse>("");
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const Carbon = () => {
  function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  const data = useLoaderData();
  const form = useForm();
  const [cities, setCities] = useState([]);

  function onSubmit(f) { console.log(f) };
  function onError(e) { console.log('err', e)}
  const { onChange } = form.register("from");
  const fetchCity = debounce((event) => {
    if (event.target.value.length > 2) {
      cityFetch(event.target.value).then((result) => setCities(result));
    } 
  }, 1000);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className="h-full">
        <FormField
          control={form.control}
          name="from"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center m-12 gap-2">
                <FormLabel>From</FormLabel>
                <FormControl>
                  <Input placeholder="from ?" {...form.register("from", {
                    onChange: fetchCity,
                    minLength: 3
                  })} />
                </FormControl>
                {cities.length > 0 && (
                  <ul>
                    {cities.map((city, index) => (
                      <li key={index} onClick={() => {
                        form.setValue("from", city.name);
                        setCities([]);
                      }}>
                        {city.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="to"
          render={() => (
            <FormItem>
              <div className="flex justify-between items-center m-12 gap-2">
                <FormLabel>-</FormLabel>
                <FormControl>
                <Input placeholder="To ?" {...form.register("to", {
                    onChange: fetchCity,
                  })} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormDescription className="m-12 text-center">
          Find out how much CO₂ you'll consume for this trip
        </FormDescription>
        <Button type="submit" className="m-12">Submit</Button>
      </form>
    </Form>
  )
}

export default Carbon;
