import React, { lazy, Suspense } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider as BalancerProvider } from "react-wrap-balancer";
import "./index.scss";

const Loader = lazy(() => import("@/components/layout/loader"));

const AuthPage = lazy(() => import("@/pages/auth"));
const QuestionPage = lazy(() => import("@/pages/question"));

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BalancerProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route
                element={<AuthPage />}
                path="/"
                loader={() => <Loader />}
              />
              <Route
                element={<QuestionPage />}
                path="/question"
                loader={() => <Loader />}
              />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </BalancerProvider>
  </React.StrictMode>
);
