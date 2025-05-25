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
    meta: { title: "Login" },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { title: "Register" },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { title: "Dasboard" },
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
        meta: { title: "Home" }
      },
      {
        path: "kategori",
        name: "Kategori",
        component: Kategori,
        meta: { title: "Kategori" }
      },
      {
        path: "peminjaman",
        name: "Peminjaman",
        component: Peminjaman,
        meta: { title: "Peminjaman" }
      },
      {
        path: "pengembalian",
        name: "Pengembalian",
        component: Pengembalian,
        meta: { title: "pengembalian" }
      },
      {
        path: "denda",
        name: "Denda",
        component: Denda,
        meta: { title: "Denda" }
      },
      {
        path: "pengaturan",
        name: "Pengaturan",
        component: Pengaturan,
        meta: { title: "Pengaturan" }
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'Vite + Vue App'
    next()
  })
export default router;

