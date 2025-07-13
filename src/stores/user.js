import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(userData) {
      this.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
    },
    loadUser() {
      const stored = localStorage.getItem("user");
      if (stored) {
        this.user = JSON.parse(stored);
      }
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
    },
  },
});
