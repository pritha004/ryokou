import { auth } from "@/auth";
import TripForm from "./_components/trip-form";

const Search = async ({ searchParams }: any) => {
  const destination = (await searchParams)?.destination ?? "";

  return (
    <div className="w-full min-h-screen p-4">
      <div className="mt-4 p-4">
        <p className="text-[calc(1rem+1.4vw)] mt-4 font-lato ">
          <span className="flex mb-4">Hey,</span>
          <span className="text-[calc(1rem+1.2vw)]">
            Ready to switch on your{" "}
            <span className="italic">out-of-office</span> ? Let's plan your
            getaway without the guesswork.
          </span>
        </p>
        <TripForm destination={destination} />
      </div>
    </div>
  );
};

export default Search;
