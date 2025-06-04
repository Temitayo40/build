import { defineStore } from "pinia";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface Credentials {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem("token") || "",
  }),

  actions: {
    async login(credentials: Credentials) {
      try {
        const res = await axios.post(`${API_URL}/auth/login`, credentials);
        this.token = res.data.token;
        localStorage.setItem("token", this.token);
        await this.fetchUser();
        return true;
      } catch (err) {
        console.error("Login error:", err);
        return false;
      }
    },

    async register(data: RegisterPayload) {
      try {
        const res = await axios.post(`${API_URL}/auth/register`, data);
        this.token = res.data.token;
        localStorage.setItem("token", this.token);
        await this.fetchUser();
        return true;
      } catch (err) {
        console.error("Registration error:", err);
        return false;
      }
    },

    async fetchUser() {
      if (!this.token) return null;

      try {
        const res = await axios.get(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.user = res.data;
        return this.user;
      } catch (err) {
        console.error("Fetch user error:", err);
        this.logout();
        return null;
      }
    },

    logout() {
      this.token = "";
      this.user = null;
      localStorage.removeItem("token");
    },
  },
});
