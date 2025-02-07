export class CitySearch {
  constructor({
    geometry,
    properties,
  }) {
    const { city = "", country = "", county = "", district = "", locality = "", postcode = "", state = "", street = "", type = "", name = "" } = properties;
    this.name = `${name} ${city} ${street} ${postcode} ${country}`;
    this.coordinates = geometry.coordinates;
  }
};
