"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../lib/api";
import { buildSchema } from "../lib/buildSchema";


export default function Form() {
  const [schema, setSchema] = useState<any>();
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    api.get("/rules").then(res => {
      setSchema(buildSchema(res.data.rules));
    });
  }, []);

  const form = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
  });

  const onSubmit = async (data: any) => {
    setServerError(null);
    try {
      await api.post("/submit", data);
      alert("Success");
    } catch (e: any) {
        form.setError{}
      setServerError(e.response.data.message);
    }
  };

  if (!schema) return <p className="">Loading rules...</p>;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input {...form.register("email")} placeholder="Email" />
      <p>{form.formState.errors.email?.message}</p>

      <input
        type="number"
        {...form.register("amount", { valueAsNumber: true })}
        placeholder="Amount"
      />
      <p>{form.formState.errors.amount?.message}</p>

      {serverError && <p style={{ color: "red" }}>{serverError}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}
