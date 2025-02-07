import { useState } from "react"
import { useFormContext } from "react-hook-form";
import { debounce } from "@/lib/utils"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { fetchCities } from "../services/carbon.service";

export const CitySearchInput = ({ name, placeHolder, setCity }) => {
  const form = useFormContext();
  const [cities, setCities] = useState([]);

  const getCities = debounce(async(event) => {
    if (event.target.value.length > 2) {
      try {
        const response = await fetchCities(event.target.value);
        setCities(response);
      } catch (err) {
        console.log('err', err);
      }
    } 
  }, 1000);

  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={() => (
          <FormItem>
            <div className="flex justify-between items-center m-12 gap-2">
              <FormLabel>From</FormLabel>
              <FormControl>
                <Input
                  placeholder={placeHolder}
                  {...form.register(name, {
                    onChange: getCities,
                    minLength: {
                      value: 3,
                      message: 'This field should at least contain 3 characters'
                    },
                    required: "This field is required",
                  })}
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      {cities.length > 0 && (
        <ul>
          {cities.map((city, index) => (
            <li key={index} onClick={() => {
              form.setValue(name, city.name);
              setCities([]);
              setCity(city);
            }}>
              {city.name}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
