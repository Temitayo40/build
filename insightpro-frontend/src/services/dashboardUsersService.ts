import axios from "axios";

export function getDashboardUsers(dashboardId: string) {
  return axios.get(`/dashboard-users/${dashboardId}`).then((res) => res.data);
}

export function inviteDashboardUser(
  dashboardId: string,
  data: { email: string; role: string }
) {
  return axios.post(`/dashboard-users/${dashboardId}/add`, data);
}

export function updateUserRole(
  dashboardId: string,
  userId: string,
  role: string
) {
  return axios.patch(`/dashboard-users/${dashboardId}/role`, { userId, role });
}

export function deleteDashboardUser(dashboardId: string, userId: string) {
  return axios.delete(`/dashboard-users/${dashboardId}/remove/${userId}`);
}
