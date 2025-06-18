"use server";

export type Country = {
  name: string;
  currency: string;
  iso2: string;
  iso3: string;
};

export const getDestinationImage = async (destination: string) => {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${destination}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );

  const data = await response.json();
  return data?.urls?.full;
};
