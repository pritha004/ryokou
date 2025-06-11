import { getTrip } from "@/actions/itinerary";
import BentoGrid from "./_components/bento-grid";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const TripPlan = async ({ searchParams }: Props) => {
  const tripId = (await searchParams).id;
  let tripDetails: { success: boolean; trip: any } = {
    success: false,
    trip: null,
  };

  if (tripId && typeof tripId == "string") {
    tripDetails = await getTrip(tripId);
  }

  return <BentoGrid tripDetails={tripDetails.trip} />;
};

export default TripPlan;
