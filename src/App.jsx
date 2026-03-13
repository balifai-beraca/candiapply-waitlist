// ─────────────────────────────────────────────────────────────────────────────
// App.jsx — Point d'entrée principal
// Gère le routage simple : landing ↔ demo
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { LandingPage } from "./pages/LandingPage";
import { DemoPage }    from "./pages/DemoPage";

export default function App() {
  const [page, setPage] = useState("landing"); // "landing" | "demo"

  if (page === "demo") {
    return (
      <DemoPage
        onBack={()   => setPage("landing")}
        onSignup={()  => {
          setPage("landing");
          // Petit délai pour laisser la page se monter avant de scroller
          setTimeout(() => {
            document.querySelector("[data-waitlist-section]")?.scrollIntoView({ behavior: "smooth", block: "center" });
          }, 100);
        }}
      />
    );
  }

  return <LandingPage onShowDemo={() => setPage("demo")} />;
}
