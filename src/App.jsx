// src/App.jsx

import { useState } from "react";
import "./App.css";

const instruments = [
  {
    id: 1,
    name: "Guitar Pro",
    category: "String Instruments",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=700&q=85",
    color: "blue",
  },
  {
    id: 2,
    name: "Grand Piano",
    category: "Keyboards & Pianos",
    image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=700&q=85",
    color: "purple",
  },
  {
    id: 3,
    name: "Studio Drums",
    category: "Drums & Percussion",
    image: "drums.jpeg",
    color: "orange",
  },
  {
    id: 4,
    name: "Alto Sax",
    category: "Brass & Woodwinds",
    image: "violine.jpeg",
    color: "green",
  },
];

const categories = [
  {
    name: "Pianos",
    count: "85+ Items",
    image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=400&q=85",
  },
  {
    name: "Drums",
    count: "120+ Items",
    image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=400&q=85",
  },
  {
    name: "Guitars",
    count: "150+ Items",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=400&q=85",
  },
  {
    name: "Violins",
    count: "60+ Items",
    image: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?auto=format&fit=crop&w=400&q=85",
  },
  {
    name: "Saxophones",
    count: "45+ Items",
    image: "https://images.unsplash.com/photo-1573871669414-010dbf73ca84?auto=format&fit=crop&w=400&q=85",
  },
];

const products = [
  {
    id: 101,
    name: "Acoustic Guitar",
    price: 249.99,
    oldPrice: 299.99,
    discount: "-20%",
    rating: "4.8",
    reviews: 128,
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 102,
    name: "Digital Piano",
    price: 799.99,
    oldPrice: 899.99,
    discount: "-10%",
    rating: "4.7",
    reviews: 86,
    image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 103,
    name: "Classic Violin",
    price: 349.99,
    oldPrice: 399.99,
    discount: "NEW",
    rating: "4.9",
    reviews: 94,
    image: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 104,
    name: "Alto Saxophone",
    price: 589.99,
    oldPrice: 649.99,
    discount: "",
    rating: "4.8",
    reviews: 76,
    image: "https://images.unsplash.com/photo-1573871669414-010dbf73ca84?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 105,
    name: "Studio Drums",
    price: 1199.99,
    oldPrice: 1399.99,
    discount: "-15%",
    rating: "4.9",
    reviews: 54,
    image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=700&q=85",
  },
];

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const addToCart = (product) => {
    setCart((previous) => {
      const existing = previous.find((item) => item.id === product.id);

      if (existing) {
        return previous.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previous, { ...product, quantity: 1 }];
    });

    setShowOrder(false);
    setShowCart(true);
  };

  const updateQuantity = (id, amount) => {
    setCart((previous) =>
      previous
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart((previous) => previous.filter((item) => item.id !== id));
  };

  const toggleFavorite = (id) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const placeOrder = () => {
    if (cart.length === 0) return;

    setOrderNumber(`MUS${Date.now().toString().slice(-8)}`);
    setCart([]);
    setShowCart(false);
    setShowOrder(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="music-store">
      <header className="navbar">
        <a className="logo" href="#home" onClick={closeMenu}>
          <span className="logo-note">♫</span> musicio<span>.</span>
        </a>

        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#categories" onClick={closeMenu}>Categories</a>
          <a href="#instruments" onClick={closeMenu}>Instruments</a>
          <a href="#trending" onClick={closeMenu}>Products</a>
        </nav>

        <button
          className="header-cart"
          onClick={() => {
            setShowOrder(false);
            setShowCart(true);
            closeMenu();
          }}
          aria-label="Open shopping cart"
        >
          <span className="bag-icon">♧</span>
          <span className="cart-badge">{cartCount}</span>
        </button>
      </header>

      {showOrder ? (
        <main className="order-page">
          <div className="order-success-icon">✓</div>
          <p className="eyebrow">ORDER CONFIRMATION</p>
          <h1>Order Placed Successfully!</h1>
          <p className="order-description">
            Thank you for choosing Musicio. Your demo order has been confirmed.
          </p>
          <div className="order-details">
            <span>Order number</span>
            <strong>{orderNumber}</strong>
            <span>Order status</span>
            <strong className="order-status">Confirmed</strong>
            <span>Total paid</span>
            <strong>${cartTotal.toFixed(2)}</strong>
          </div>
          <p className="demo-note">
            This is a demo website. No actual payment or delivery is processed.
          </p>
          <button
            className="primary-btn"
            onClick={() => {
              setShowOrder(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Continue Shopping
          </button>
        </main>
      ) : (
        <>
          <main>
            <section className="hero" id="home">
              <img
                className="hero-image"
                src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=2000&q=90"
                alt="Musician performing with a guitar"
              />
              <div className="hero-overlay"></div>

              <div className="hero-content">
                <span className="hero-label">NEW COLLECTION 2026</span>
                <h1>Elevate Your<br />Musical Journey</h1>
                <p>
                  Discover premium quality instruments crafted
                  <br className="desktop-break" /> for passion, performance
                  and precision.
                </p>
                <div className="hero-actions">
                  <a className="primary-btn" href="#trending">Shop Now ↗</a>
                  <a className="outline-btn" href="#instruments">View Collection</a>
                </div>
              </div>

              <div className="benefits">
                <div className="benefit">
                  <span>♧</span>
                  <div>
                    <strong>Free Shipping</strong>
                    <p>On orders above $50</p>
                  </div>
                </div>
                <div className="benefit">
                  <span>⟳</span>
                  <div>
                    <strong>Easy Returns</strong>
                    <p>30-day return policy</p>
                  </div>
                </div>
                <div className="benefit">
                  <span>♢</span>
                  <div>
                    <strong>Secure Payment</strong>
                    <p>Secure checkout experience</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="categories-section" id="categories">
              <div className="section-heading">
                <span className="eyebrow">FIND YOUR SOUND</span>
                <h2>Shop by Category</h2>
                <p>Explore instruments for every kind of musician.</p>
              </div>

              <div className="category-grid">
                {categories.map((category) => (
                  <a
                    className="category-item"
                    href="#trending"
                    key={category.name}
                  >
                    <div className="category-image-wrap">
                      <img
                        src={category.image}
                        alt={category.name}
                        loading="lazy"
                      />
                    </div>
                    <h3>{category.name}</h3>
                    <p>{category.count}</p>
                  </a>
                ))}
              </div>
            </section>

            <section className="instrument-section" id="instruments">
              <div className="section-heading instrument-heading">
                <span className="eyebrow">MADE FOR MUSIC LOVERS</span>
                <h2>3D Instrument Cards</h2>
                <p>Hover over the instrument images to see them pop out.</p>
              </div>

              <div className="instrument-grid">
                {instruments.map((instrument) => (
                  <article
                    className={`instrument-card ${instrument.color}`}
                    key={instrument.id}
                  >
                    <div className="instrument-image-area">
                      <img
                        className="instrument-image"
                        src={instrument.image}
                        alt={instrument.name}
                        loading="lazy"
                      />
                    </div>
                    <div className="instrument-info">
                      <h3>{instrument.name}</h3>
                      <p>Category: {instrument.category}</p>
                      <span className="instrument-tag">Explore Instrument ↗</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="promo-section">
              <article className="promo-card promo-sale">
                <img
                  src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1200&q=85"
                  alt="Guitar close-up"
                  loading="lazy"
                />
                <div className="promo-overlay"></div>
                <div className="promo-content">
                  <span className="eyebrow">SUMMER SALE</span>
                  <h2>Up to 50%<br />Off</h2>
                  <p>On selected items</p>
                  <a href="#trending" className="primary-btn">Shop Now</a>
                </div>
              </article>

              <article className="promo-card promo-explore">
                <img
                  src="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1200&q=85"
                  alt="Musical instruments collection"
                  loading="lazy"
                />
                <div className="promo-overlay"></div>
                <div className="promo-content">
                  <span className="eyebrow">EXPLORE OUR COLLECTION</span>
                  <h2>Discover The<br />Latest Trends</h2>
                  <p>Find your perfect sound</p>
                  <a href="#trending" className="primary-btn">Explore Now</a>
                </div>
              </article>
            </section>

            <section className="trending-section" id="trending">
              <div className="trending-heading">
                <div>
                  <span className="eyebrow">OUR BESTSELLERS</span>
                  <h2>Trending Products</h2>
                  <p>Discover instruments loved by musicians.</p>
                </div>
                <a href="#trending" className="view-all">View All ↗</a>
              </div>

              <div className="product-grid">
                {products.map((product) => (
                  <article className="product-card" key={product.id}>
                    <div className="product-image-wrap">
                      <img
                        className="product-image"
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                      />

                      {product.discount && (
                        <span
                          className={`discount-badge ${
                            product.discount === "NEW" ? "new-badge" : ""
                          }`}
                        >
                          {product.discount}
                        </span>
                      )}

                      <button
                        className={`favorite-btn ${
                          favorites.includes(product.id) ? "favorited" : ""
                        }`}
                        onClick={() => toggleFavorite(product.id)}
                        aria-label={`Add ${product.name} to favorites`}
                      >
                        {favorites.includes(product.id) ? "♥" : "♡"}
                      </button>

                      <button
                        className="product-add-btn"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart <span>↗</span>
                      </button>
                    </div>

                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <div className="price-row">
                        <strong>${product.price.toFixed(2)}</strong>
                        <del>${product.oldPrice.toFixed(2)}</del>
                      </div>
                      <div className="rating">
                        <span>★★★★★</span>
                        <small>{product.rating} ({product.reviews})</small>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </main>

          <footer className="footer">
            <a className="footer-logo" href="#home">♫ musicio<span>.</span></a>
            <p>© 2026 Musicio. All rights reserved.</p>
            <p>Made with ♡ for music lovers.</p>
          </footer>
        </>
      )}

      {showCart && (
        <div className="cart-backdrop" onClick={() => setShowCart(false)}>
          <aside
            className="cart-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cart-header">
              <div>
                <span className="eyebrow">YOUR SELECTION</span>
                <h2>Shopping Cart ({cartCount})</h2>
              </div>
              <button
                className="close-cart"
                onClick={() => setShowCart(false)}
                aria-label="Close cart"
              >
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <span>♧</span>
                <h3>Your cart is empty</h3>
                <p>Discover your next favourite instrument.</p>
                <button
                  className="primary-btn"
                  onClick={() => setShowCart(false)}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <div className="cart-item-image">
                        <img src={item.image} alt={item.name} />
                      </div>

                      <div className="cart-item-details">
                        <h3>{item.name}</h3>
                        <strong>${item.price.toFixed(2)}</strong>

                        <div className="quantity-controls">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        className="remove-item"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div className="total-row">
                    <span>Subtotal</span>
                    <strong>${cartTotal.toFixed(2)}</strong>
                  </div>
                  <p>Shipping calculated at checkout.</p>
                  <button className="checkout-btn" onClick={placeOrder}>
                    Place Order · ${cartTotal.toFixed(2)}
                  </button>
                  <small>
                    Demo checkout only. No actual payment is collected.
                  </small>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {!showCart && !showOrder && (
        <button
          className="floating-cart"
          onClick={() => setShowCart(true)}
          aria-label="Open shopping cart"
        >
          <span>🛒 Cart</span>
          <span className="floating-count">{cartCount}</span>
        </button>
      )}
    </div>
  );
}

export default App;