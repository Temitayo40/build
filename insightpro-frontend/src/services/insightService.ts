import axios from "axios"; // axios instance

export async function getInsightSummary() {
  const res = await axios.get("/insights/summary");
  return res.data;
}
