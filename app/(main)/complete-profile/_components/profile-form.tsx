"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import useFetch from "@/hooks/use-fetch";
import { completeProfileSchema } from "@/app/lib/schema";
import { updateUser } from "@/actions/user";
import { Country, getCountriesAndCurrency } from "@/actions/country";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const CompleteProfileForm = () => {
  const router = useRouter();
  const [opennameCombobox, setOpennameCombobox] = useState(false);

  const [countryList, setCountryList] = useState<Country[]>([]);

  const [selectedNationality, setSelectedNationality] = useState("");

  const getnameList = async () => {
    const data = await getCountriesAndCurrency();
    setCountryList(
      data.sort((a: { name: string }, b: { name: string }) =>
        a.name.localeCompare(b.name, "en", { sensitivity: "base" })
      )
    );
  };

  const {
    loading: updateLoading,
    fn: updateUserFn,
    data: updateResult,
  } = useFetch(updateUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(completeProfileSchema),
  });

  const onSubmit = async (values: any) => {
    try {
      await updateUserFn({
        ...values,
      });
    } catch (error) {
      console.error("Profile completion error:", error);
    }
  };

  useEffect(() => {
    if (updateResult?.success && !updateLoading) {
      toast.success("Profile completed successfully!");
      router.push("/home");
      router.refresh();
    }
  }, [updateResult, updateLoading]);

  useEffect(() => {
    getnameList();
  }, []);

  return (
    <div className="mt-12 flex justify-center">
      <Card className="w-full max-w-md mt-10 mx-2 drop-shadow-md drop-shadow-cyan-400/30">
        <CardHeader>
          <CardTitle className=" text-lg md:text-2xl text-center">
            Complete Your Profile
          </CardTitle>
          <CardDescription className="text-center text-sm">
            Select your nationality to get personalized trip plans and visa
            info.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex mt-4 justify-center text-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex gap-2 w-full">
              <Label htmlFor="nationality">Nationality</Label>
              <Popover
                open={opennameCombobox}
                onOpenChange={setOpennameCombobox}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={opennameCombobox}
                    className="w-[200px] justify-between"
                  >
                    {selectedNationality
                      ? countryList.find((c) => c.name === selectedNationality)
                          ?.name
                      : "Select country"}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search name" className="h-9" />
                    <CommandList>
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        {countryList.map((c) => (
                          <CommandItem
                            key={c.name}
                            value={c.name}
                            onSelect={(currentValue) => {
                              setSelectedNationality(
                                currentValue === selectedNationality
                                  ? ""
                                  : currentValue
                              );
                              setValue("nationality", currentValue);
                              setValue(
                                "currency",
                                countryList?.find(
                                  (c) => c.name === currentValue
                                )?.currency || ""
                              );
                              setOpennameCombobox(false);
                            }}
                          >
                            {c.name}
                            <Check
                              className={cn(
                                "ml-auto",
                                selectedNationality === c.name
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {typeof errors.nationality?.message === "string" && (
                <p className="text-sm text-red-500">
                  {errors.nationality.message}
                </p>
              )}
            </div>

            {
              <div className="flex gap-4 w-full">
                <Label htmlFor="currency">Currency</Label>

                <Input
                  disabled
                  id="currency"
                  placeholder=""
                  {...register("currency")}
                />
              </div>
            }

            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={updateLoading}
            >
              {updateLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Complete Profile"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompleteProfileForm;
