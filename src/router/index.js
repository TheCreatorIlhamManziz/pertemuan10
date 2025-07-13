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
import BookDetail from "../views/pages/BookDetail.vue";

// Import store user
import { useUserStore } from "@/stores/user";

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
<<<<<<< HEAD
    meta: { title: "Dasboard" },
=======
    meta: { requiresAuth: true, title: "Dashboard" },
>>>>>>> cdd08d8 (update terbaru)
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
<<<<<<< HEAD
        meta: { title: "Home" }
=======
        meta: { title: "Home", requiresAuth: true },
>>>>>>> cdd08d8 (update terbaru)
      },
      {
        path: "kategori",
        name: "Kategori",
        component: Kategori,
<<<<<<< HEAD
        meta: { title: "Kategori" }
=======
        meta: { title: "Kategori", requiresAuth: true },
>>>>>>> cdd08d8 (update terbaru)
      },
      {
        path: "peminjaman",
        name: "Peminjaman",
        component: Peminjaman,
<<<<<<< HEAD
        meta: { title: "Peminjaman" }
=======
        meta: { title: "Peminjaman", requiresAuth: true },
>>>>>>> cdd08d8 (update terbaru)
      },
      {
        path: "pengembalian",
        name: "Pengembalian",
        component: Pengembalian,
<<<<<<< HEAD
        meta: { title: "pengembalian" }
=======
        meta: { title: "Pengembalian", requiresAuth: true },
>>>>>>> cdd08d8 (update terbaru)
      },
      {
        path: "denda",
        name: "Denda",
        component: Denda,
<<<<<<< HEAD
        meta: { title: "Denda" }
=======
        meta: { title: "Denda", requiresAuth: true },
>>>>>>> cdd08d8 (update terbaru)
      },
      {
        path: "pengaturan",
        name: "Pengaturan",
        component: Pengaturan,
<<<<<<< HEAD
        meta: { title: "Pengaturan" }
=======
        meta: { title: "Pengaturan", requiresAuth: true },
      },
      {
        path: "book/:id",
        name: "BookDetail",
        component: BookDetail,
        meta: { title: "Detail Buku", requiresAuth: true },
>>>>>>> cdd08d8 (update terbaru)
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

<<<<<<< HEAD
router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'Vite + Vue App'
    next()
  })
=======
// Middleware Auth Check
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  userStore.loadUser();

  const isAuthRequired = to.matched.some((record) => record.meta.requiresAuth);
  const isLoggedIn = !!userStore.user;

  document.title = to.meta.title || "Pustaka Digital";

  if (isAuthRequired && !isLoggedIn) {
    next("/login");
  } else if ((to.path === "/login" || to.path === "/register") && isLoggedIn) {
    next("/dashboard");
  } else {
    next();
  }
});

>>>>>>> cdd08d8 (update terbaru)
export default router;

