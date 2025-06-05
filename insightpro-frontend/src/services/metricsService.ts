import axios from "axios"; // axios instance

export async function fetchMetrics() {
  const res = await axios.get("/metrics");
  return res.data;
}
export async function fetchMetricsById(id: string) {
  const res = await axios.get(`/metrics/${id}`);
  return res.data;
}
