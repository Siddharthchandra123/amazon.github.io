import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  Menu,
  Search,
  ShoppingCart,
  Star,
  UserRound,
} from "lucide-react";
import "./styles.css";

const categories = [
  {
    name: "Gaming essentials",
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=900&q=85",
    link: "Level up your setup",
  },
  {
    name: "Refresh your space",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85",
    link: "Explore home picks",
  },
  {
    name: "Beauty favorites",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85",
    link: "Shop beauty",
  },
  {
    name: "New year, new gear",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=900&q=85",
    link: "Discover electronics",
  },
];

const products = [
  {
    id: 1,
    name: "AeroSound Pro Wireless Noise Cancelling Headphones",
    category: "Electronics",
    price: 79.99,
    oldPrice: 129.99,
    rating: 4.8,
    reviews: 1243,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85",
    badge: "Best seller",
  },
  {
    id: 2,
    name: "Minimal Ceramic Pour-Over Coffee Set",
    category: "Home",
    price: 34.5,
    oldPrice: 48,
    rating: 4.6,
    reviews: 688,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=85",
    badge: "Limited deal",
  },
  {
    id: 3,
    name: "Everyday Carry Backpack with Laptop Sleeve",
    category: "Fashion",
    price: 42,
    oldPrice: 65,
    rating: 4.7,
    reviews: 956,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85",
    badge: "Top rated",
  },
  {
    id: 4,
    name: "Smart Fitness Watch with Health Tracking",
    category: "Electronics",
    price: 54.99,
    oldPrice: 89.99,
    rating: 4.5,
    reviews: 2031,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85",
    badge: "38% off",
  },
];

const dealProducts = [
  { name: "Premium audio", discount: "Up to 40% off", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=500&q=80" },
  { name: "Kitchen upgrades", discount: "From $24.99", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=500&q=80" },
  { name: "Smart watches", discount: "Save 35%", image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=500&q=80" },
  { name: "Fresh sneakers", discount: "Under $60", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80" },
  { name: "Skin care", discount: "Buy 2, save 20%", image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?auto=format&fit=crop&w=500&q=80" },
  { name: "Desk essentials", discount: "Up to 25% off", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=80" },
];

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="Amazon home">
      <span>Amazon</span>
      <svg viewBox="0 0 120 24" aria-hidden="true">
        <path d="M8 5c28 18 68 18 101 2" />
        <path d="m101 3 9 4-6 8" />
      </svg>
    </a>
  );
}

function App() {
  const [cartCount, setCartCount] = useState(2);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [notice, setNotice] = useState("");

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesQuery = !normalized || product.name.toLowerCase().includes(normalized);
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      return matchesQuery && matchesCategory;
    });
  }, [query, selectedCategory]);

  const addToCart = (product) => {
    setCartCount((count) => count + 1);
    setNotice(`${product.name.split(" ").slice(0, 4).join(" ")} added to cart`);
    window.setTimeout(() => setNotice(""), 2200);
  };

  const toggleFavorite = (id) => {
    setFavorites((items) =>
      items.includes(id) ? items.filter((item) => item !== id) : [...items, id],
    );
  };

  return (
    <div id="top">
      <header>
        <div className="topbar">
          <Logo />
          <button className="delivery-button">
            <MapPin size={19} />
            <span><small>Deliver to</small><strong>New York 10001</strong></span>
          </button>
          <form className="search-bar" onSubmit={(event) => event.preventDefault()}>
            <label className="select-wrap">
              <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                aria-label="Search category"
              >
                <option>All</option>
                <option>Electronics</option>
                <option>Home</option>
                <option>Fashion</option>
              </select>
              <ChevronDown size={13} />
            </label>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search Amazon"
              aria-label="Search Amazon"
            />
            <button type="submit" aria-label="Search"><Search size={24} /></button>
          </form>
          <button className="header-action language"><span className="flag-us">US</span> <strong>EN</strong><ChevronDown size={13} /></button>
          <button className="header-action account">
            <UserRound size={19} />
            <span><small>Hello, sign in</small><strong>Account & Lists</strong></span>
          </button>
          <button className="header-action returns"><span><small>Returns</small><strong>& Orders</strong></span></button>
          <button className="cart">
            <span className="cart-icon"><ShoppingCart size={31} /><b>{cartCount}</b></span>
            <strong>Cart</strong>
          </button>
        </div>
        <nav className="nav-bar" aria-label="Main navigation">
          <a href="#categories"><Menu size={20} /> All</a>
          <a href="#deals">Today&apos;s Deals</a>
          <a href="#products">Best Sellers</a>
          <a href="#categories">Home & Kitchen</a>
          <a href="#products">Electronics</a>
          <a href="#products">Fashion</a>
          <a href="#products">Beauty</a>
          <a href="#products">Sports & Outdoors</a>
          <a className="nav-promo" href="#deals">Summer sale: up to 40% off <ChevronRight size={16} /></a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <button className="hero-arrow left" aria-label="Previous offer"><ChevronLeft /></button>
          <div className="hero-content">
            <p className="eyebrow">THE SUMMER EDIT</p>
            <h1>Small upgrades.<br /><em>Big summer energy.</em></h1>
            <p>Fresh finds for brighter days, longer nights, and everything in between.</p>
            <a className="primary-button" href="#products">Shop the collection <ChevronRight size={18} /></a>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="sun"></div>
            <div className="hero-image"></div>
            <span className="float-card card-one">Outdoor living<br /><strong>from $29</strong></span>
            <span className="float-card card-two">Weekend-ready<br /><strong>essentials</strong></span>
          </div>
          <button className="hero-arrow right" aria-label="Next offer"><ChevronRight /></button>
          <div className="hero-dots"><span className="active"></span><span></span><span></span></div>
        </section>

        <section className="category-grid section-shell" id="categories">
          {categories.map((category) => (
            <article className="category-card" key={category.name}>
              <h2>{category.name}</h2>
              <div className="category-image">
                <img src={category.image} alt="" />
              </div>
              <a href="#products">{category.link} <ChevronRight size={15} /></a>
            </article>
          ))}
        </section>

        <section className="deals section-shell" id="deals">
          <div className="section-heading">
            <div><span className="kicker">HURRY, WHILE THEY LAST</span><h2>Deals worth discovering</h2></div>
            <a href="#products">See all deals <ChevronRight size={16} /></a>
          </div>
          <div className="deal-row">
            {dealProducts.map((deal) => (
              <article className="deal-card" key={deal.name}>
                <div className="deal-image"><img src={deal.image} alt="" /></div>
                <span>{deal.discount}</span>
                <h3>{deal.name}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="products-section section-shell" id="products">
          <div className="section-heading">
            <div><span className="kicker">POPULAR RIGHT NOW</span><h2>Picked for you</h2></div>
            <div className="filter-pills">
              {["All", "Electronics", "Home", "Fashion"].map((category) => (
                <button
                  className={selectedCategory === category ? "active" : ""}
                  onClick={() => setSelectedCategory(category)}
                  key={category}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          {filteredProducts.length ? (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="product-image">
                    <span className="product-badge">{product.badge}</span>
                    <button
                      className={`favorite ${favorites.includes(product.id) ? "active" : ""}`}
                      onClick={() => toggleFavorite(product.id)}
                      aria-label="Add to favorites"
                    >
                      <Heart size={20} fill={favorites.includes(product.id) ? "currentColor" : "none"} />
                    </button>
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <p className="product-category">{product.category}</p>
                    <h3>{product.name}</h3>
                    <div className="rating"><span><Star size={15} fill="currentColor" /> {product.rating}</span><small>({product.reviews.toLocaleString()})</small></div>
                    <div className="price-row">
                      <p className="price"><sup>$</sup>{Math.floor(product.price)}<sup>{String(product.price.toFixed(2)).split(".")[1]}</sup></p>
                      <del>${product.oldPrice.toFixed(2)}</del>
                    </div>
                    <p className="delivery"><strong>FREE delivery</strong> tomorrow</p>
                    <button className="add-button" onClick={() => addToCart(product)}>Add to cart</button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state"><Search size={28} /><h3>No matches found</h3><p>Try another search or browse all products.</p><button onClick={() => { setQuery(""); setSelectedCategory("All"); }}>Clear filters</button></div>
          )}
        </section>

        <section className="member-banner section-shell">
          <div>
            <span className="mini-logo">A<span>+</span></span>
            <p className="eyebrow">AMAZON PLUS</p>
            <h2>More joy in every delivery.</h2>
            <p>Fast, free delivery. Member-only deals. Entertainment included.</p>
            <button>Try Plus free for 30 days</button>
          </div>
          <div className="member-art"><span>FREE</span><strong>same-day<br />delivery</strong></div>
        </section>
      </main>

      <footer>
        <a href="#top" className="back-top">Back to top</a>
        <div className="footer-main section-shell">
          <Logo />
          <p>Your everyday marketplace for thoughtful finds and fast delivery.</p>
          <div className="footer-links"><a href="#products">Shop</a><a href="#deals">Deals</a><a href="#top">Help</a><a href="#top">Your account</a></div>
          <small>&copy; 2026 Amazon. Demo marketplace experience.</small>
        </div>
      </footer>
      {notice && <div className="toast"><span>&#10003;</span>{notice}</div>}
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode><App /></React.StrictMode>,
);
