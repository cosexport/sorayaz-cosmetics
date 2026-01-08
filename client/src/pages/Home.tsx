import React from "react";

export default function Home() {
  return (
    <main style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1>Soraya’z Cosmetics</h1>

      <p>
        Premium Moroccan beauty rituals, crafted for the Gulf market.
      </p>

      <p>
        We specialize in the export of authentic Moroccan cosmetic products,
        combining ancestral know-how with modern elegance.
      </p>

      <a
        href="https://wa.me/212677092060"
        target="_blank"
        rel="noreferrer"
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "12px 20px",
          backgroundColor: "#C47A2C",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "6px",
        }}
      >
        Contact us on WhatsApp
      </a>
    </main>
  );
}
