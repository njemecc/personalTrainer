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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

//zod
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
//hooks
import { useForm } from "react-hook-form";
import { surveyFormSchema } from "@/lib/validator";
import { Label } from "@/components/ui/label";

const SurveyForm = () => {
  const form = useForm<z.infer<typeof surveyFormSchema>>({
    resolver: zodResolver(surveyFormSchema),
  });

  return (
    <Form {...form}>
      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <Label htmlFor="email">Email:</Label>
                <FormControl>
                  <Input
                    placeholder="marko@gmail.com"
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
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <Label htmlFor="phoneNumber">Telefon:</Label>
                <FormControl>
                  <Input
                    placeholder="+381631423778"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default SurveyForm;
