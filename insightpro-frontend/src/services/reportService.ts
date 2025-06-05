import axios from "axios";

export async function generateReport({
  startDate,
  endDate,
  format,
}: {
  startDate: string;
  endDate: string;
  format: "pdf" | "csv";
}) {
  const response = await axios.get("/reports/download", {
    params: { startDate, endDate, format },
    responseType: "blob",
  });
  return response.data;
}
