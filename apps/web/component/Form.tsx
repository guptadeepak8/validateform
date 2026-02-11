"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../lib/api";
import { buildSchema } from "../lib/buildSchema";


type FormValues = {
  email: string;
  amount: number;
};

export default function Form() {
  const [schema, setSchema] = useState<any>();
  const [globalServerError, setGlobalServerError] = useState<string | null>(null);

  // ✅ create form FIRST
  const form = useForm<FormValues>({
    resolver: schema ? zodResolver(schema) : undefined,
    mode: "onBlur", // better UX than onSubmit
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    clearErrors,
    setError,
  } = form;

  // ✅ Fetch rules
  useEffect(() => {
    const fetchRules = async () => {
      try {
        const res = await api.get("/rules");
        setSchema(buildSchema(res.data.rules));
      } catch (e: any) {
        const response = e.response?.data;
        setGlobalServerError(response?.message || "Failed to load form rules");
      }
    };

    fetchRules();
  }, []);

  // ✅ Submit
  const onSubmit = async (data: FormValues) => {
    setGlobalServerError(null);
    clearErrors();

    try {
      await api.post("/submit", data);
      alert("Success");
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

  // ✅ Handle rule load failure
  if (globalServerError && !schema) {
    return <p className="text-red-600">{globalServerError}</p>;
  }

  if (!schema) {
    return <p>Loading rules...</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      
      {/* EMAIL */}
      <div>
        <input
          {...register("email", {
            onChange: () => clearErrors("email"), // clears server error on edit
          })}
          placeholder="Email"
          className="border p-2 w-full"
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

      {/* AMOUNT */}
      <div>
        <input
          type="number"
          {...register("amount", {
            valueAsNumber: true,
            onChange: () => clearErrors("amount"),
          })}
          placeholder="Amount"
          className="border p-2 w-full"
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

      {/* GLOBAL ERROR */}
      {globalServerError && (
        <div className="text-red-600 border border-red-500 p-2">
          {globalServerError}
        </div>
      )}

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-black text-white px-4 py-2 disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
