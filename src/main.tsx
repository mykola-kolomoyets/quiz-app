import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider as BalancerProvider } from "react-wrap-balancer";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./index.scss";

const Loader = lazy(() => import("@/components/layout/loader"));

const AuthPage = lazy(() => import("@/pages/auth"));
const QuestionPage = lazy(() => import("@/pages/question"));

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BalancerProvider>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<AuthPage />} path="/" loader={() => <Loader />} />
            <Route
              element={<QuestionPage />}
              path="/question"
              loader={() => <Loader />}
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </BalancerProvider>
  </React.StrictMode>
);
