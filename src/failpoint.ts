import { Request } from "express";

// Local fault injection: lets tests simulate a crash at a given point.
// Only active when NODE_ENV=test.
export function failpoint(req: Request, name: string) {
  if (process.env.NODE_ENV === "test" && req.header("x-test-fail-after") === name) {
    throw new Error(`Simulated failure after ${name}`);
  }
}
