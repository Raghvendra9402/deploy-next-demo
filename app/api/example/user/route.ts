import {
  activeRequestsGauge,
  httpRequestDuration,
  requestCounter,
} from "@/lib/metrics";
import { withMetrics } from "@/lib/withMetrics";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  return withMetrics(
    req,
    async () => {
      await new Promise((s) => setTimeout(s, 10000));
      return new NextResponse("fetched users successfully", { status: 200 });
    },
    {
      method: req.method,
      route: "/api/user",
    },
  );
}
