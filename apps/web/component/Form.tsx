"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../lib/api";
import { buildSchema } from "../lib/buildSchema";
import FormRules from "./FormRules";
import type { DynamicRule } from "@repo/types";


type FormValues = {
  email: string;
  amount: number;
};

export default function Form({ rules }: { rules: DynamicRule[] }) {
  const schema = useMemo(() => buildSchema(rules), [rules]);
  const [globalServerError, setGlobalServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);


  const form = useForm<FormValues>({
    resolver:zodResolver(schema) as any,
    mode: "onBlur", 
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    clearErrors,
    setError,
    reset
  } = form;


  const onSubmit = async (data: FormValues) => {
    setGlobalServerError(null);
    clearErrors();

    try {
      await api.post("/submit", data);
      setSuccess(true);
      reset() 
      setTimeout(() => {
        setSuccess(false);
      }, 4000);
    } catch (e: any) {
      const response = e.response?.data;

      if (response?.field) {
        setError(response.field as keyof FormValues, {
          type: "server",
          message: response.message,
        });
      } else {
        setGlobalServerError(response?.message || "Something went wrong");
      }
    }
  };

  if (globalServerError && !schema) {
    return <p className="text-red-600">{globalServerError}</p>;
  }

  if (!schema) {
    return <p>Loading rules...</p>;
  }

  return (
    <div className="flex flex-col gap-20">
        <div>
       <FormRules rules={rules}/>
      </div>
    
      <div className="flex justify-center items-center"> 

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md ">

      <div className="flex flex-col gap-2">
      <label htmlFor="email">Email: </label>
        <input
          {...register("email", {
            onChange: () => clearErrors("email"), 
          })}
          placeholder="Email"
          className="border p-2 w-[240px]"
        />

        {errors.email && (
          <p
            className={
              errors.email.type === "server"
                ? "text-red-600 font-semibold"
                : "text-red-400"
            }
          >
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="amount">Amount: </label>
        <input
          type="number"
          {...register("amount", {
            valueAsNumber: true,
            onChange: () => clearErrors("amount"),
          })}
          placeholder="Amount"
          className="border p-2 w-[240px]"
        />

        {errors.amount && (
          <p
            className={
              errors.amount.type === "server"
                ? "text-red-600 font-semibold"
                : "text-red-400"
            }
          >
            {errors.amount.message}
          </p>
        )}
      </div>
      {globalServerError && (
        <div className="text-red-600 border border-red-500 p-2">
          {globalServerError}
        </div>
      )}

{success && (
  <div className="bg-green-50 border border-green-400 text-green-700 p-2 rounded">
    Form submitted successfully.
  </div>
)}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-black text-white px-4 py-2 disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
      </div>
      
    </div>
  );
}
