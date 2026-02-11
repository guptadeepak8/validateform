
import sharedConfig from "@repo/tailwind-config/tailwind";
import type { Config } from "tailwindcss";

export default {
  ...sharedConfig,
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
} satisfies Config;
