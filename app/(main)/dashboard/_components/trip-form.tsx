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
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import useFetch from "@/hooks/use-fetch";
import { tripFormSchema } from "@/app/lib/schema";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";

const TripForm = () => {
  const router = useRouter();

  const {
    loading: itinenaryLoading,
    fn: generateItinenaryFn,
    data: itinenaryResult,
  } = useFetch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm({
    resolver: zodResolver(tripFormSchema),
  });

  const onSubmit = async (values: any) => {
    console.log(values);

    try {
      await generateItinenaryFn({
        ...values,
      });
    } catch (error) {
      console.error("Itinenary generation error:", error);
    }
  };

  useEffect(() => {
    if (itinenaryResult?.success && !itinenaryLoading) {
      toast.success("Profile completed successfully!");
      router.push("/dashboard");
      router.refresh();
    }
  }, [itinenaryResult, itinenaryLoading]);

  return (
    <div className="mt-12 flex justify-center">
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
            <p className="text-sm text-red-500">{errors.destination.message}</p>
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
                      from: field.value?.from!,
                      to: field.value?.to,
                    }}
                    onSelect={field.onChange}
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.dateRange && (
            <p className="text-sm text-red-500">{errors.dateRange.message}</p>
          )}
        </div>
        <div>
          <Input
            id="number_of_persons"
            placeholder="Number of persons"
            {...register("number_of_persons")}
          />
          {errors.number_of_persons && (
            <p className="text-sm text-red-500">
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
            <p className="text-sm text-red-500">{errors.budget.message}</p>
          )}
        </div>
        <div>
          <Input
            id="travel_style"
            placeholder="Your travel style, e.g. adventure"
            {...register("travel_style")}
          />
        </div>
        <div className="text-center">
          <Textarea
            id="interests"
            placeholder="Your interests separated by comma, e.g. food, culture"
            {...register("interests")}
          />
        </div>

        <div className="">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default TripForm;
