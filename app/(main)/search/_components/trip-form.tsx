"use client";

import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";

import useFetch from "@/hooks/use-fetch";
import { tripFormSchema } from "@/app/lib/schema";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { generateAndSaveTripDetails } from "@/actions/trip";
import { travelStyles } from "@/constants/travelstyle-list";

const TripForm = ({ destination }: { destination: string }) => {
  const router = useRouter();

  const {
    loading: tripLoading,
    fn: generateAndSaveTripFn,
    data: tripResult,
  } = useFetch(generateAndSaveTripDetails);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm({
    resolver: zodResolver(tripFormSchema),
    defaultValues: {
      destination,
    },
  });

  const onSubmit = async (values: any) => {
    try {
      await generateAndSaveTripFn({
        ...values,
      });
    } catch (error) {
      console.error("Itinerary generation error:", error);
    }
  };

  useEffect(() => {
    if (tripResult?.success && !tripLoading) {
      toast.success("Trip generated successfully!");
      router.push(`/trip-plan?id=${tripResult.id}`);
      router.refresh();
    }
  }, [tripResult, tripLoading]);

  return (
    <div className="mt-8 flex justify-center font-lato">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-2 space-x-8 space-y-4"
      >
        <div>
          <Input
            id="destination"
            placeholder="Destination"
            {...register("destination")}
          />
          {errors.destination && (
            <p className="text-sm text-red-500 mt-1">
              {errors.destination.message}
            </p>
          )}
        </div>
        <div>
          <Controller
            control={control}
            name="dateRange"
            render={({ field }) => (
              <Popover modal={true}>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !field.value?.from && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value?.from ? (
                      field.value?.to ? (
                        <>
                          {format(field.value?.from, "LLL dd, y")} -{" "}
                          {format(field.value?.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(field.value.from, "LLL dd, y")
                      )
                    ) : (
                      <span className="text-base md:text-sm">
                        Pick trip dates
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center">
                  <Calendar
                    mode="range"
                    defaultMonth={field.value?.from}
                    selected={{
                      from: field.value?.from,
                      to: field.value?.to,
                    }}
                    onSelect={field.onChange}
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.dateRange && (
            <p className="text-sm text-red-500 mt-1">
              {errors.dateRange.message}
            </p>
          )}
          {errors.dateRange?.from && (
            <p className="text-sm text-red-500 mt-1">
              {errors.dateRange.from.message}
            </p>
          )}
          {errors.dateRange?.to && (
            <p className="text-sm text-red-500 mt-1">
              {errors.dateRange.to.message}
            </p>
          )}
        </div>
        <div>
          <Input
            id="number_of_persons"
            placeholder="Number of persons"
            {...register("number_of_persons")}
          />
          {errors.number_of_persons && (
            <p className="text-sm text-red-500 mt-1">
              {errors.number_of_persons.message}
            </p>
          )}
        </div>
        <div>
          <Input
            id="budget"
            type="number"
            placeholder="Budget, e.g. 50000"
            {...register("budget")}
          />
          {errors.budget && (
            <p className="text-sm text-red-500 mt-1">{errors.budget.message}</p>
          )}
        </div>
        <div>
          <Controller
            control={control}
            name="travel_style"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a travel style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Travel Style</SelectLabel>
                    {travelStyles.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="text-center">
          <Textarea
            id="interests"
            placeholder="Your interests separated by comma, e.g. food, culture"
            {...register("interests")}
          />
        </div>
        <div>
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={tripLoading}
          >
            {tripLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span className="font-extrabold">Generating Itinerary</span>
              </>
            ) : (
              <span className="font-extrabold">Submit</span>
            )}
          </Button>
        </div>
        <div></div>
      </form>
    </div>
  );
};

export default TripForm;
