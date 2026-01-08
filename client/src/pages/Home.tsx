import React from "react";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Soraya’z Cosmetics | Moroccan Natural & Terroir Cosmetics</title>
        <meta
          name="description"
          content="Soraya’z Cosmetics is a Moroccan brand specializing in natural, terroir-based cosmetic products inspired by ancestral craftsmanship and modern beauty standards."
        />
        <meta
          name="keywords"
          content="Moroccan cosmetics, natural cosmetics, terroir cosmetics, argan oil, handmade cosmetics, Moroccan beauty brand"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.sorayazcosmetics.com/" />
      </Helmet>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="container">
          <h1>
            Moroccan Natural Cosmetics  
            <span>Inspired by Terroir & Craftsmanship</span>
          </h1>
          <p>
            Soraya’z Cosmetics creates premium natural cosmetic products,
            combining Moroccan ancestral know-how with modern formulation
            standards for local and international markets.
          </p>
          <a href="#products" className="btn-primary">
            Discover Our Products
          </a>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about">
        <div className="container">
          <h2>About Soraya’z Cosmetics</h2>
          <p>
            Soraya’z Cosmetics is a Moroccan brand dedicated to the valorization
            of local raw materials and artisanal expertise. Our products are
            formulated using carefully selected natural ingredients sourced
            from Moroccan terroirs.
          </p>
          <p>
            We focus on quality, authenticity, traceability, and sustainable
            production to meet the expectations of professional distributors,
            concept stores, and international partners.
          </p>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section id="products" className="products">
        <div className="container">
          <h2>Our Product Range</h2>

          <div className="product-grid">
            <div className="product-card">
              <h3>Natural Hair Oils</h3>
              <p>
                Fortifying and nourishing hair oils made with argan oil and
                botanical extracts, designed for daily care and professional
                use.
              </p>
            </div>

            <div className="product-card">
              <h3>Skin Care Oils</h3>
              <p>
                Multi-purpose oils for face and body, combining hydration,
                regeneration, and natural protection.
              </p>
            </div>

            <div className="product-card">
              <h3>Terroir-Based Cosmetics</h3>
              <p>
                Authentic cosmetic products inspired by Moroccan regions,
                traditions, and local resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* B2B SECTION */}
      <section className="b2b">
        <div className="container">
          <h2>B2B & International Partnerships</h2>
          <p>
            Soraya’z Cosmetics supports distributors, retailers, and private
            label partners looking for high-quality Moroccan cosmetic products.
          </p>
          <ul>
            <li>Bulk and finished product supply</li>
            <li>Private label development</li>
            <li>Export-ready documentation</li>
            <li>Gulf & European market focus</li>
          </ul>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="values">
        <div className="container">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div>
              <h4>Natural Ingredients</h4>
              <p>
                Carefully selected raw materials from Moroccan terroirs.
              </p>
            </div>
            <div>
              <h4>Craftsmanship</h4>
              <p>
                Inspired by traditional Moroccan beauty rituals.
              </p>
            </div>
            <div>
              <h4>Quality & Compliance</h4>
              <p>
                Formulations aligned with international cosmetic standards.
              </p>
            </div>
            <div>
              <h4>Sustainability</h4>
              <p>
                Responsible sourcing and ethical production practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact">
        <div className="container">
          <h2>Contact Us</h2>
          <p>
            Interested in working with Soraya’z Cosmetics or receiving our
            catalog? Contact our sales team for partnerships and inquiries.
          </p>

          <div className="contact-info">
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:sales@sorayazcosmetics.com">
                sales@sorayazcosmetics.com
              </a>
            </p>
            <p>
              <strong>WhatsApp:</strong> +212 677 092 060
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <p>
            © {new Date().getFullYear()} Soraya’z Cosmetics. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
