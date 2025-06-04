"use server";

export type Country = {
  name: string;
  currency: string;
  iso2: string;
  iso3: string;
};

export const getCountriesAndCurrency = async () => {
  const response = await fetch(
    "https://countriesnow.space/api/v0.1/countries/currency"
  );

  const data = await response.json();
  return data.data;
};
