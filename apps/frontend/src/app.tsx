import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./styles/global.css";
import "./styles/app.css";
import { ToastContainer } from "./components/ui/Toast";

export default function App() {
  return (
    <Router
      root={(props) => (
        <>
          <Suspense fallback={
            <div class="flex items-center justify-center min-h-screen bg-[var(--color-surface-secondary)]">
              <span
                class="h-8 w-8 block rounded-full border-2 border-current border-t-transparent animate-spin text-[var(--color-primary)]"
              />
            </div>
          }>
            {props.children}
          </Suspense>
          <ToastContainer />
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
