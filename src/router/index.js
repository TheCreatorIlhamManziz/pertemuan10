import { createRouter, createWebHistory } from "vue-router";

// Import views
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";

// Import child pages
import Home from "../views/pages/Home.vue";
import Kategori from "../views/pages/Kategori.vue";
import Peminjaman from "../views/pages/Peminjaman.vue";
import Pengembalian from "../views/pages/Pengembalian.vue";
import Denda from "../views/pages/Denda.vue";
import Pengaturan from "../views/pages/Pengaturan.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
      },
      {
        path: "kategori",
        name: "Kategori",
        component: Kategori,
      },
      {
        path: "peminjaman",
        name: "Peminjaman",
        component: Peminjaman,
      },
      {
        path: "pengembalian",
        name: "Pengembalian",
        component: Pengembalian,
      },
      {
        path: "denda",
        name: "Denda",
        component: Denda,
      },
      {
        path: "pengaturan",
        name: "Pengaturan",
        component: Pengaturan,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
