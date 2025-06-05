import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/auth";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("./../views/HomeView.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("./../views/LoginView.vue"),
    meta: { public: true },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("./../views/RegisterView.vue"),
    meta: { public: true },
  },

  {
    path: "/dashboard",
    component: () => import("./../views/DashboardHomeView.vue"),
    meta: { requiresAuth: true, allowedRoles: ["owner", "editor", "viewer"] },
  },
  {
    path: "/metrics",
    component: () => import("./../views/MetricsView.vue"),
    meta: { requiresAuth: true, allowedRoles: ["owner", "editor"] },
  },
  {
    path: "/insights",
    component: () => import("./../views/InsightsView.vue"),
    meta: { requiresAuth: true, allowedRoles: ["owner", "editor", "viewer"] },
  },
  {
    path: "/reports",
    component: () => import("./../views/ReportsView.vue"),
    meta: { requiresAuth: true, allowedRoles: ["owner", "editor"] },
  },
  {
    path: "/dashboard/:id/users",
    component: () => import("./../views/DashboardUsersView.vue"),
    meta: { requiresAuth: true, allowedRoles: ["owner"] },
  },

  // {
  //   path: "/admin",
  //   component: () => import("@/views/AdminPanel.vue"),
  //   meta: { requiresAuth: true, allowedRoles: ["owner"] },
  // },

  {
    path: "/unauthorized",
    component: () => import("../views/UnauthorizedView.vue"),
    meta: { public: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Auto-fetch user if token exists and user is null (e.g. page refresh)
  if (authStore.token && !authStore.user) {
    await authStore.fetchUser();
  }

  const isAuthenticated = !!authStore.user;
  const routeIsPublic = to.meta.public;
  const requiresAuth = to.meta.requiresAuth;
  const allowedRoles = to.meta.allowedRoles as string[] | undefined;
  const userRole = authStore.user?.role;

  // Not authenticated
  if (requiresAuth && !isAuthenticated) {
    return next("/login");
  }

  // Authenticated user visiting public route
  if (routeIsPublic && isAuthenticated) {
    return next("/dashboard");
  }

  // Authenticated but role not allowed
  if (allowedRoles && !allowedRoles.includes(userRole!)) {
    return next("/unauthorized");
  }

  return next();
});
export default router;
