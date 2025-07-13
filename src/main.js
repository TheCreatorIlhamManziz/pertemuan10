import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const app = createApp(App);
app.use(router);
app.use(createPinia());

// Hanya mount sekali, tanpa tunggu lama
let isAppMounted = false;

onAuthStateChanged(auth, (user) => {
  // Kalau belum login dan akses dashboard, alihkan ke login
  if (!user && location.pathname.startsWith("/dashboard")) {
    router.replace("/login");
  }

  // Cegah mount berkali-kali
  if (!isAppMounted) {
    app.mount("#app");
    isAppMounted = true;
  }
});
