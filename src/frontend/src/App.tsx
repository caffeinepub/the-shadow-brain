import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { AppProvider } from "./context/AppContext";
import { DashboardPage } from "./pages/DashboardPage";
import { ProjectPage } from "./pages/ProjectPage";

// ── Routes ────────────────────────────────────────────────────────

const rootRoute = createRootRoute({
  component: () => (
    <AppProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Outlet />
        <Footer />
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "glass-panel border-primary/20 font-body text-sm",
        }}
      />
    </AppProvider>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: DashboardPage,
});

const projectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/project/$id",
  component: ProjectPage,
});

const routeTree = rootRoute.addChildren([indexRoute, projectRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// ── App ───────────────────────────────────────────────────────────

export default function App() {
  return <RouterProvider router={router} />;
}
