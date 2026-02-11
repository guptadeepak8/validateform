import { DynamicRule } from "@repo/types";
import { error } from "console";
import { z } from "zod";


export function buildSchema(rules: DynamicRule[]) {
  let shape: any = {};

  for (const rule of rules) {
    if (rule.field === "email") {
      let field = z.string();
      if (rule.required) field = field.min(1, "Required Emails");
      if (rule.pattern) field = field.regex(new RegExp(rule.pattern), "Invalid email");
      shape.email = field;
    }

    if (rule.field === "amount") {
      let field = z.number();
      if (rule.required) field = field.min(1, "Required Amount");
      if (rule.min !== undefined) field = field.min(rule.min,`Minimum amount is ₹${rule.min}`);
      shape.amount = field;
    }
  }

  return z.object(shape);
}
