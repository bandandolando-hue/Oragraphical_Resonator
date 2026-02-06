import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,        // starting port
    strictPort: false, // false lets Vite try 5174, 5175, … if 5173 is busy
    host: "0.0.0.0",   // optional: listen on LAN
  },
});