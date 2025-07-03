import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "docs",
    lib: {
      entry: "src/widget.jsx",
      name: "ChatbotWidget", 
      fileName: "chatbot-widget",
      formats: ["umd"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
});
