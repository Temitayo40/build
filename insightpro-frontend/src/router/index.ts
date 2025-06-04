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
    component: () => import("./../layouts/BaseLayout.vue"),
    meta: { requiresAuth: true },
  },
  // More routes as you build
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

  if (to.meta.requiresAuth && !authStore.user) {
    next("/login");
  } else if (to.meta.public && authStore.user) {
    next("/dashboard"); // Prevent logged-in users from seeing login/register
  } else {
    next();
  }
});
export default router;
