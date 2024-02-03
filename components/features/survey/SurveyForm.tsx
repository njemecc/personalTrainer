"use client";
//components
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

//zod
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

//validator
import { surveyFormSchema } from "@/lib/validator";

//hooks
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

//Select
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

//Calendar
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

//redux
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const SurveyForm = () => {
  const [statusZaposlenja, setStatusZaposlenja] = useState<String>("");
  const [ranijeTrenirali, setRanijeTrenirali] = useState<String>("");

  const form = useForm<z.infer<typeof surveyFormSchema>>({
    resolver: zodResolver(surveyFormSchema),
  });

  const page = useSelector((state: RootState) => state.pagination.page);

  const onSubmit = (values: z.infer<typeof surveyFormSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-5 w-4/5 ">
        {page === 1 && (
          <>
            {" "}
            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="telefon"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Label className="text-bela p-bold-20" htmlFor="telefon">
                      Telefon
                    </Label>
                    <FormControl>
                      <Input
                        id="telefon"
                        placeholder="+381631423..."
                        {...field}
                        className="input-field"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="visina"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Label className="text-bela p-bold-20" htmlFor="visina">
                      Visina
                    </Label>
                    <FormControl>
                      <Input
                        id="visina"
                        placeholder="180cm"
                        {...field}
                        className="input-field"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="tezina"
                render={({ field }) => (
                  <FormItem className=" w-full lg:w-1/2">
                    <Label className="text-bela p-bold-20" htmlFor="tezina">
                      Težina
                    </Label>
                    <FormControl>
                      <Input
                        id="tezina"
                        placeholder="90kg"
                        {...field}
                        className="input-field"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="datumRodjenja"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-white p-regular-20">
                      Datum Rodjenja
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger className="lg:h-[54px] h-[45px]" asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Izaberite datum</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          className="self-center"
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="radniStatus"
                render={({ field }) => (
                  <FormItem className="w-full lg:w-1/2">
                    <FormLabel className="text-white p-bold-20">
                      Zaposlenje
                    </FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setStatusZaposlenja(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="lg:h-[54px] h-[45px] p-regular-16 text-white">
                          <SelectValue placeholder="izaberite..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Zaposlen/a">Zaposlen/a</SelectItem>
                        <SelectItem value="Student/Škola">
                          Student/Škola
                        </SelectItem>
                        <SelectItem value="Nešto drugo">Nešto drugo</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {statusZaposlenja === "Zaposlen/a" && (
                <FormField
                  control={form.control}
                  name="radnoVreme"
                  render={({ field }) => (
                    <FormItem className="w-full lg:w-1/2 ">
                      <Label className="text-bela p-bold-20" htmlFor="telefon">
                        Radno Vreme
                      </Label>
                      <FormControl>
                        <Input
                          id="radnoVreme"
                          placeholder="9h - 17h"
                          {...field}
                          className="input-field"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>{" "}
          </>
        )}

        {page === 2 && (
          <>
            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="satiSpavanja"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Label
                      className="text-bela p-bold-20"
                      htmlFor="satiSpavanja"
                    >
                      Koliko sati spavate
                    </Label>
                    <FormControl>
                      <Input
                        id="satiSpavanja"
                        placeholder="8h"
                        {...field}
                        className="input-field"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="brojObroka"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Label className="text-bela p-bold-20" htmlFor="brojObroka">
                      Koliko dnevno imate obroka
                    </Label>
                    <FormControl>
                      <Input
                        id="brojObroka"
                        placeholder="2-3"
                        {...field}
                        className="input-field"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="zdravstveniProblem"
                render={({ field }) => (
                  <FormItem className="w-full lg:w-1/2">
                    <Label
                      className="text-bela p-bold-20"
                      htmlFor="zdravstveniProblem"
                    >
                      Imate li nekih zdravstvenih problema
                    </Label>
                    <FormControl>
                      <Input
                        id="zdravstveniProblem"
                        placeholder="povišen krvni pritisak.."
                        {...field}
                        className="input-field"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tipOsobe"
                render={({ field }) => (
                  <FormItem className="w-full lg:w-1/2">
                    <FormLabel className="text-white p-bold-20">
                      Da li ste pretežno aktivan ili sedentaran tip
                    </FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="lg:h-[54px] h-[45px] p-regular-16 text-white">
                          <SelectValue placeholder="izaberite..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Aktivan">Aktivan</SelectItem>
                        <SelectItem value="Sedentaran">Sedentaran</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}
        {page === 3 && (
          <>
            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="ranijeTrenirali"
                render={({ field }) => (
                  <FormItem className="w-full lg:w-1/2">
                    <FormLabel className="text-white p-bold-20">
                      Da li ste ranije trenirali
                    </FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setRanijeTrenirali(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="lg:h-[54px] h-[45px] p-regular-16 text-white">
                          <SelectValue placeholder="izaberite..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="da">Da</SelectItem>
                        <SelectItem value="ne">Ne</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ocekivanja"
                render={({ field }) => (
                  <FormItem className="w-full lg:w-1/2">
                    <Label className="text-bela p-bold-20" htmlFor="ocekivanja">
                      Koja su vaša očekivanja od programa
                    </Label>
                    <FormControl>
                      <Input
                        id="ocekivanja"
                        placeholder="Želim da smršam..."
                        {...field}
                        className="input-field"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {ranijeTrenirali === "da" && (
              <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                  control={form.control}
                  name="imaliTrenera"
                  render={({ field }) => (
                    <FormItem className="w-full lg:w-1/2">
                      <FormLabel className="text-white p-bold-20">
                        Da li ste ranije imali svog trenera
                      </FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="lg:h-[54px] h-[45px] p-regular-16 text-white">
                            <SelectValue placeholder="izaberite..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="da">Da</SelectItem>
                          <SelectItem value="ne">Ne</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="razlogPrestanka"
                  render={({ field }) => (
                    <FormItem className="w-full lg:w-1/2">
                      <Label
                        className="text-bela p-bold-20"
                        htmlFor="razlogPrestanka"
                      >
                        Zašto ste prestali
                      </Label>
                      <FormControl>
                        <Input
                          id="razlogPrestanka"
                          placeholder="Povreda.."
                          {...field}
                          className="input-field"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="dodatno"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl className="h-56">
                      <Textarea
                        placeholder="Dodatne napomene..."
                        {...field}
                        className="textarea rounded-2xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}
      </form>
    </Form>
  );
};

export default SurveyForm;
