import client from "prom-client";

const registry = globalThis.metrics?.registry;

if (!registry) {
  throw new Error("Metrics registry not initailized");
}

export const requestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of http requests",
  labelNames: ["method", "route", "status_code"],
  registers: [registry],
});

export const activeRequestsGauge = new client.Gauge({
  name: "active_requests",
  help: "Number of active requests",
  registers: [registry],
});

export const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_ms",
  help: "Duration of HTTP requests in ms",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000],
  registers: [registry],
});
