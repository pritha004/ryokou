"use server";

export type Country = {
  name: string;
  currency: string;
  iso2: string;
  iso3: string;
};

export const getDestinationImage = async (destination: string) => {
  const destination_query = encodeURIComponent(
    `${destination} travel tourism landscape city architecture famous`
  );
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${destination_query}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );

  const data = await response.json();

  return data?.results[0]?.urls?.full;
};
