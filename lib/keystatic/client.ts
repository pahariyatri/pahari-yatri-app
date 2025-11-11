import { config } from "@keystatic/core";
import { createReader } from "@keystatic/core/reader";

export const reader = createReader(process.cwd(), config);
