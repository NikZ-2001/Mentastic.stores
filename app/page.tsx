"use client";

import { useState, useEffect } from "react";

export default function Home() {

const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);

  const [search, setSearch] = useState("");
const [filter, setFilter] = useState("all");
const [sort, setSort] = useState("default");

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  
  

  const banners = [
  "/images/banner 1.png",
  "/images/banner 2.png",
  "/images/banner 3.png"
];

const [currentBanner, setCurrentBanner] = useState(0);

const [touchStart, setTouchStart] = useState(0);  // swipe =======>
const [touchEnd, setTouchEnd] = useState(0);

const handleTouchStart = (e: any) => {
  setTouchStart(e.targetTouches[0].clientX);
};

const handleTouchMove = (e: any) => {
  setTouchEnd(e.targetTouches[0].clientX);
};

const handleTouchEnd = () => {
  if (touchStart - touchEnd > 50) {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  }

  if (touchStart - touchEnd < -50) {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  }
};
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  }, 3000);
  

  return () => clearInterval(interval);
}, []);

  const products = [  // add products here ================================>
    {
      name: "Seattle Full Sleeve T-Shirt",
      price: 899,
     category: "tshirt",
     
      image: "/images/full.jpeg",
      material: "Cotton",
    wash: "Machine wash cold",
    size: "S, M, L, XL, XXL, XXXL, XXXL"
    },
    {
      name: "Porsche Oversized Half Sleeve T-Shirt",
      price: 550,
      category: "tshirt",
      image: "/images/half.jpeg",
      material: "Cotton",
    wash: "Machine wash cold",
    size: "S, M, L, XL, XXL, XXXL, XXXL"
    },
    {
      name: "Party Wear Linen Shirt",
      price: 999,
      category: "shirt",
      image: "/images/shirt.jpeg",
      material: "Linen",
    wash: "Machine wash cold",
    size: "S, M, L, XL, XXL, XXXL, XXXL"
    }
  ];

  const phoneNumber = "918667344556";  // add phone number here =======>

  const addToCart = (item: any) => {
    const existing = cart.find((p) => p.name === item.name);

    if (existing) {
      setCart(cart.map((p) =>
        p.name === item.name ? { ...p, quantity: p.quantity + 1 } : p
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const decreaseQty = (name: string) => {
    const updated = cart
      .map((item) =>
        item.name === name
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updated);
  };

  const removeFromCart = (name: string) => {
    setCart(cart.filter((item) => item.name !== name));
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const filteredProducts = products
 .filter((item) => {
  const searchText = search.toLowerCase();

  return (
    item.name.toLowerCase().includes(searchText) ||
    item.category.toLowerCase().includes(searchText)
  );
})
  .filter((item) =>
    filter === "all" ? true : item.category === filter
  )
  .sort((a, b) => {
    if (sort === "low") return a.price - b.price;
    if (sort === "high") return b.price - a.price;
    return 0;
  });

  const buyNow = (item: any) => {
    const message = `Hi, I want to buy ${item.name} for ₹${item.price}`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`);
  };

  const buyAllCart = () => {
    if (!cart.length) return;

    let message = "Hi, I want to buy:\n\n";

    cart.forEach((item) => {
      message += `${item.quantity}x ${item.name} - ₹${item.price * item.quantity}\n`;
    });

    message += `\nTotal: ₹${getTotal()}`;

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`);
  };

  return (


    
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh", padding: "30px" }}>
      
      {/* HEADER */}
      <p style={{ textAlign: "right" }}>Cart Items: {getCartCount()}</p>

      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "36px", letterSpacing: "2px" }}>Mentastic</h1>
        <p style={{ color: "#aaa" }}>Look Fantastic</p>
      </div>
      

<div style={{ marginBottom: "30px", textAlign: "center" }}>

  {/* IMAGE */}
  <div style={{
    width: "100%",
    maxWidth: "900px",
    margin: "0 auto",
    overflow: "hidden",
    borderRadius: "16px"
  }}>
    <img
       src={banners[currentBanner]}
  onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
  style={{
        width: "100%",
        height: "300px",
        objectFit: "cover",
        transition: "0.5s"
      }}
    />
  </div>

  {/* DOTS */}
  <div style={{ marginTop: "10px" }}>
    {banners.map((_, index) => (
      <span
        key={index}
        onClick={() => setCurrentBanner(index)}
        style={{
          display: "inline-block",
          width: "10px",
          height: "10px",
          margin: "5px",
          borderRadius: "50%",
          background: currentBanner === index ? "white" : "gray",
          cursor: "pointer"
        }}
      />
    ))}
  </div>
  <button onClick={() => setCurrentBanner((currentBanner - 1 + banners.length) % banners.length)}>
  ◀
</button>

<button onClick={() => setCurrentBanner((currentBanner + 1) % banners.length)}>
  ▶
</button>

{selectedProduct && (  //  selected product ==================>
  <div style={{
    background: "#0a0a0a",
    padding: "30px",
    borderRadius: "16px",
    marginBottom: "30px",
    display: "flex",
    flexWrap: "wrap",
    gap: "30px",
    justifyContent: "center",
    alignItems: "center"
  }}>

    {/* 🖼 IMAGE */}
    <img
      src={selectedProduct.image}
      style={{
        width: "300px",
        borderRadius: "12px"
      }}
    />

    {/* 📄 DETAILS */}
    <div style={{ maxWidth: "400px" }}>
      
      <h2 style={{ marginBottom: "10px" }}>
        {selectedProduct.name}
      </h2>

      <p style={{ color: "#aaa", marginBottom: "15px" }}>
        ₹{selectedProduct.price}
      </p>

      {/* 🧾 EXTRA INFO */}
      <p><b>Material:</b> {selectedProduct.material}</p>
      <p><b>Wash Care:</b> {selectedProduct.wash}</p>
      <p><b>Available Sizes:</b> {selectedProduct.size}</p>

      {/* 🔘 BUTTONS */}
      <div style={{
        display: "flex",
        gap: "10px",
        marginTop: "20px",
        flexWrap: "wrap"
      }}>
        <button onClick={() => addToCart(selectedProduct)} style={btnWhite}>
          Add to Cart 🛒
        </button>

        <button onClick={() => buyNow(selectedProduct)} style={btnGreen}>
          Buy Now 💬
        </button>

        <button onClick={() => setSelectedProduct(null)} style={btnRed}>
          Close ❌
        </button>
      </div>

    </div>

  </div>
)}

</div>
      {/* 🛍️ PRODUCTS */}
      <div style={{ background: "#050505", padding: "20px", borderRadius: "16px", marginBottom: "30px" }}>
        <h2 style={{ marginBottom: "15px" }}>Products 🛍️</h2>

        <div style={{
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  marginBottom: "20px",
  justifyContent: "center"
}}>

  <input
    type="text"
    placeholder="Search products..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #333",
      background: "#111",
      color: "white"
    }}
  />

  <select
    onChange={(e) => setFilter(e.target.value)}
    style={{
      padding: "10px",
      borderRadius: "8px",
      background: "#111",
      color: "white"
    }}
  >
    <option value="all">All</option>
    <option value="tshirt">T-Shirts</option>
    <option value="shirt">Shirts</option>
  </select>

  <select
    onChange={(e) => setSort(e.target.value)}
    style={{
      padding: "10px",
      borderRadius: "8px",
      background: "#111",
      color: "white"
    }}
  >
    <option value="default">Sort</option>
    <option value="low">Price Low → High</option>
    <option value="high">Price High → Low</option>
  </select>

</div>

        {filteredProducts.length === 0 && (
  <p style={{
    textAlign: "center",
    color: "#aaa",
    marginBottom: "15px"
  }}>
    No exact match found… showing all products 👇
  </p>
)}

{/* 👇 GRID STARTS HERE */}
<div style={{
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "20px"
}}>
  {(filteredProducts.length === 0 ? products : filteredProducts).map((item, index) => (
      
            <div
  className="product-card"
  style={{ width: "250px", cursor: "pointer" }}
  onClick={() => setSelectedProduct(item)}
>
              <img src={item.image} width="100%" style={{ borderRadius: "10px" }} />

              <h2 style={{
                marginTop: "10px",
                minHeight: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center"
              }}>
                {item.name}
              </h2>

              <p style={{ color: "#aaa" }}>₹{item.price}</p>

              <button onClick={() => addToCart(item)} style={btnWhite}>
                Add to Cart 🛒
              </button>

              <button onClick={() => buyNow(item)} style={btnGreen}>
                Buy Now 💬
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 🧾 CART */}
      <div style={{ background: "#0a0a0a", padding: "20px", borderRadius: "16px" }}>
        <h2 style={{ marginBottom: "15px" }}>Your Cart 🛒</h2>

        {cart.length === 0 ? (
          <p>No items yet</p>
        ) : (
          <>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "15px" }}>
              {cart.map((item, index) => (
                <div key={index} className="cart-card" style={{ width: "250px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  
                  <div>
                    <img src={item.image} width="100%" style={{ borderRadius: "8px" }} />

                    <p style={{
                      marginTop: "10px",
                      minHeight: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center"
                    }}>
                      {item.name}
                    </p>

                    <p style={{ color: "#aaa" }}>₹{item.price}</p>

                    <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
                      <button onClick={() => decreaseQty(item.name)}>-</button>
                      <span>Qty: {item.quantity}</span>
                      <button onClick={() => addToCart(item)}>+</button>
                    </div>
                  </div>

                  <button onClick={() => removeFromCart(item.name)} style={btnRed}>
                    Remove ❌
                  </button>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "20px", textAlign: "right" }}>
              <h2>Total: ₹{getTotal()}</h2>
              <button onClick={buyAllCart} style={btnGreen}>
                Buy All via WhatsApp 💬
              </button>
            </div>
          </>
        )}
      </div>

      {/* ABOUT */}
      <div style={{ marginTop: "60px", textAlign: "center", borderTop: "1px solid #333", paddingTop: "20px" }}>
        <h2>About Us</h2>
        <p style={{ color: "#aaa", maxWidth: "600px", margin: "0 auto" }}>
          Mentastic is a premium men's wear brand based in Chennai offering stylish outfits.
        </p>
      </div>

      {/* LOCATION */}
      <div style={{ marginTop: "40px", textAlign: "center" }}>
        <h2>Visit Our Store📍</h2>
        <p style={{ color: "#aaa" }}>Anna Nagar, Chennai</p>
        <a href="https://maps.app.goo.gl/g9ATHM8Mxmykot5G6" target="_blank" style={{ color: "#4CAF50" }}>
          Open in Google Maps
        </a>
      </div>

    </div>
  );
}

/* 🔘 Button Styles */
const btnWhite = {
  marginTop: "10px",
  padding: "10px",
  width: "100%",
  background: "#fff",
  color: "#000",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold"
};

const btnGreen = {
  marginTop: "8px",
  padding: "10px",
  width: "100%",
  background: "green",
  color: "white",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold"
};

const btnRed = {
  marginTop: "10px",
  padding: "8px",
  width: "100%",
  background: "red",
  color: "white",
  borderRadius: "6px",
  cursor: "pointer"
};