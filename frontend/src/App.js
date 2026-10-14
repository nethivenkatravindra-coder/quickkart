import React, { useState } from "react";
import "./App.css";

const products = [
  { id: 1, name: "Wireless Headphones", price: 1499, category: "Electronics", emoji: "🎧" },
  { id: 2, name: "Smart Watch", price: 2499, category: "Electronics", emoji: "⌚" },
  { id: 3, name: "Running Shoes", price: 1999, category: "Fashion", emoji: "👟" },
  { id: 4, name: "Travel Backpack", price: 999, category: "Fashion", emoji: "🎒" },
  { id: 5, name: "Smartphone", price: 12999, category: "Electronics", emoji: "📱" },
  { id: 6, name: "Coffee Maker", price: 1799, category: "Home", emoji: "☕" },
  { id: 7, name: "Sunglasses", price: 699, category: "Fashion", emoji: "🕶️" },
  { id: 8, name: "Bluetooth Speaker", price: 1299, category: "Electronics", emoji: "🔊" }
];

function App() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("All");
  const [showCart, setShowCart] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    setCart((previousCart) => [...previousCart, product]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart((previousCart) =>
      previousCart.filter((_, index) => index !== indexToRemove)
    );
  };

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="quickkart">
      <header className="navbar">
        <a href="/" className="logo">
          Quick<span>Kart</span>
        </a>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button aria-label="Search">🔍</button>
        </div>

        <button className="cart-button" onClick={() => setShowCart(!showCart)}>
          🛒 Cart ({cart.length})
        </button>
      </header>

      <section className="hero">
        <div>
          <p className="hero-label">YOUR EVERYDAY SHOPPING DESTINATION</p>
          <h1>Everything you love, delivered faster.</h1>
          <p>Discover great products at prices you'll love.</p>
          <a href="#products" className="shop-button">
            Shop Now →
          </a>
        </div>
        <div className="hero-emoji" aria-hidden="true">
          🛍️
        </div>
      </section>

      <main id="products" className="products-section">
        <div className="section-heading">
          <div>
            <h2>Explore Products</h2>
            <p>Find your next favourite item.</p>
          </div>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-label="Filter by category"
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home">Home</option>
          </select>
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image">{product.emoji}</div>
              <span className="product-category">{product.category}</span>
              <h3>{product.name}</h3>
              <div className="product-bottom">
                <strong>₹{product.price.toLocaleString("en-IN")}</strong>
                <button onClick={() => addToCart(product)}>
                  + Add
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="empty-message">
            No products found. Try another search.
          </p>
        )}
      </main>

      {showCart && (
        <section className="cart-panel">
          <div className="cart-heading">
            <h2>Your Shopping Cart</h2>
            <button onClick={() => setShowCart(false)}>✕</button>
          </div>

          {cart.length === 0 ? (
            <p>Your cart is empty. Start shopping!</p>
          ) : (
            <>
              {cart.map((item, index) => (
                <div className="cart-item" key={`${item.id}-${index}`}>
                  <span>{item.emoji} {item.name}</span>
                  <strong>₹{item.price.toLocaleString("en-IN")}</strong>
                  <button onClick={() => removeFromCart(index)}>
                    Remove
                  </button>
                </div>
              ))}
              <h3>Total: ₹{totalPrice.toLocaleString("en-IN")}</h3>
              <button
                className="checkout-button"
                onClick={() =>
                  alert("Checkout demo: connect a backend and payment gateway.")
                }
              >
                Proceed to Checkout
              </button>
            </>
          )}
        </section>
      )}

      <footer className="footer">
        <h2>QuickKart</h2>
        <p>Your one-stop shop for everyday essentials.</p>
        <p>© {new Date().getFullYear()} QuickKart. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;