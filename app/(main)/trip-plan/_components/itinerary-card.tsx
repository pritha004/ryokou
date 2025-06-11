import { ItineraryDay } from "@/app/lib/model";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Prop = {
  date: string;
  itinerary: ItineraryDay;
};

const ItinenaryCard = ({ date, itinerary }: Prop) => {
  const { title, summary, attractions, transportation } = itinerary;
  return (
    <AccordionItem value={date}>
      <AccordionTrigger className="cursor-pointer font-lato text-lg italic">
        {date}: {title}
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-4 font-lato">
        <p className="text-base">{summary}</p>
        <p className="text-base">{attractions}</p>
        <p className="text-base">{transportation}</p>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ItinenaryCard;
