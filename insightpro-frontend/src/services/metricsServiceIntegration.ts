import axios from "axios";

export const getMetrics = () => axios.get("/metrics").then((res) => res.data);

export const createMetric = (data: any) =>
  axios.post("/metrics", data).then((res) => res.data);

export const updateMetric = (id: string, data: any) =>
  axios.patch(`/metrics/${id}`, data).then((res) => res.data);

export const deleteMetric = (id: string) =>
  axios.delete(`/metrics/${id}`).then((res) => res.data);
