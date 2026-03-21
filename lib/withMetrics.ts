import {
  activeRequestsGauge,
  httpRequestDuration,
  requestCounter,
} from "./metrics";

export async function withMetrics(
  req: Request,
  handler: (req: Request) => Promise<Response>,
  { method, route }: { method: string; route: string },
) {
  const startTime = Date.now();
  activeRequestsGauge.inc();
  let status = "200";

  try {
    const res = await handler(req);
    status = String(res.status);
    return res;
  } catch (error) {
    status = "500";
    throw error;
  } finally {
    const endTime = Date.now();

    httpRequestDuration.observe(
      {
        method: method,
        route: route,
        status_code: status,
      },
      (endTime - startTime) / 1000,
    );

    requestCounter.inc({
      method: method,
      route: route,
      status_code: status,
    });
    activeRequestsGauge.dec();
  }
}
