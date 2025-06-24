import { auth } from "@/auth";
import TripForm from "./_components/trip-form";

const Search = async ({ searchParams }: any) => {
  const session = await auth();

  const destination = (await searchParams)?.destination ?? "";

  return (
    <div className="w-full min-h-screen p-4">
      <div className="mt-4 p-4">
        <h1 className="text-[calc(1rem+2vw)] font-playfair">
          Hi <span className="">{session?.user?.name?.split(" ")[0]}</span>!
        </h1>
        <p className="text-[calc(1rem+0.5vw)] mt-4 font-lato ">
          Ready to switch on your <span className="italic">out-of-office</span>{" "}
          ? Let's plan your getaway without the guesswork.
        </p>
        <TripForm destination={destination} />
      </div>
    </div>
  );
};

export default Search;
