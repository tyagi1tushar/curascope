import { metrics } from "@opentelemetry/api";

const meter = metrics.getMeter("curascope");

export const counter = meter.createCounter("test.counter");

setInterval(() => {
  console.log("Incrementing test.counter");
  counter.add(1);
}, 5000);