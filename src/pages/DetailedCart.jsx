import { useState, useEffect } from "react";
import { 
  Minus, 
  Plus, 
  Trash2, 
  ArrowLeft, 
  ShoppingBag, 
  CreditCard, 
  Gift, 
  Info, 
  ChevronRight, 
  Truck 
} from "lucide-react";
import { Link } from "react-router-dom";
import chocoCake from "../assets/chocolate.jpg";
import chinchin from "../assets/chinchin.jpg";
import vanilla from "../assets/vanilla.jpg";
const CartPage = () => {
  // Animation state for the page entry
  const [isVisible, setIsVisible] = useState(false);
  
  // Cart state
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Chocolate Truffle Cake",
      price: 29.99,
      quantity: 1,
      image: chinchin,
      category: "Cake",
    },
    {
      id: 2,
      name: "Strawberry Dream Cake",
      price: 34.99,
      quantity: 2,
      image: vanilla,
      category: "Cake",
    },
    {
      id: 3,
      name: "ChinInWeb Premium Template",
      price: 49.99,
      quantity: 1,
      image: chocoCake,
      category: "Digital",
    }
  ]);
  
  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 5.99;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;
  
  // Coupon state
  const [coupon, setCoupon] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  
  // Quantity handlers
  const increaseQuantity = (id) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };
  
  const decreaseQuantity = (id) => {
    setCartItems(cartItems.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };
  
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  
  // Apply discount
  const applyDiscount = () => {
    if (coupon.toLowerCase() === "cake10") {
      setDiscountApplied(true);
    } else {
      alert("Invalid coupon code");
    }
  };
  
  // Entrance animation effect
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <h1 className="text-3xl font-bold text-gray-200 mb-2 flex items-center">
        <ShoppingBag className="mr-2" /> 
        My Cart
      </h1>
      
      <div className="text-gray-400 mb-8">
        <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
        <ChevronRight size={14} className="inline mx-2" />
        <span className="text-blue-400">Shopping Cart</span>
      </div>
      
      {cartItems.length === 0 ? (
        <div className="bg-slate-800/50 rounded-2xl p-12 text-center border border-slate-700">
          <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={32} className="text-blue-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-300 mb-4">Your cart is empty</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">Looks like you haven't added any items to your cart yet. Check out our products and find something you like!</p>
          <Link to="/products">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-xl transition-colors duration-300 font-medium">
              Browse Products
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left section - Cart items */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-200">Cart Items ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</h2>
                <button className="text-blue-400 hover:text-blue-500 text-sm font-medium flex items-center">
                  <Trash2 size={16} className="mr-2" />
                  Clear All
                </button>
              </div>
              
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row items-center p-4 rounded-xl bg-slate-700/30 border border-slate-600/30 hover:border-blue-500/30 transition-all duration-300">
                    <div className="flex-shrink-0 w-24 h-24 mb-4 sm:mb-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                    </div>
                    
                    <div className="flex-1 px-4">
                      <span className="text-xs uppercase font-semibold text-blue-400 tracking-wider">{item.category}</span>
                      <h3 className="text-lg font-medium text-gray-200">{item.name}</h3>
                      <div className="flex flex-wrap items-center gap-4 mt-2">
                        <div className="flex items-center justify-between bg-slate-800 rounded-lg p-1 w-28">
                          <button 
                            onClick={() => decreaseQuantity(item.id)}
                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="text-gray-200 font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => increaseQuantity(item.id)}
                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-red-400 hover:text-red-300 flex items-center text-sm"
                        >
                          <Trash2 size={14} className="mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-right mt-4 sm:mt-0 w-full sm:w-auto">
                      <p className="text-blue-400 font-semibold text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-gray-400 text-sm">${item.price.toFixed(2)} each</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Continue Shopping Button */}
            <Link to="/products">
              <button className="flex items-center text-gray-300 hover:text-blue-400 font-medium transition-colors">
                <ArrowLeft size={18} className="mr-2" />
                Continue Shopping
              </button>
            </Link>
          </div>
          
          {/* Right section - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 sticky top-20">
              <h2 className="text-xl font-semibold text-gray-200 mb-6">Order Summary</h2>
              
              {/* Promo code */}
            <div className="mb-4">
      <div className="flex items-center mb-1">
        <Gift size={16} className="text-blue-400 mr-1" />
        <h3 className="text-gray-300 text-sm font-medium">Promo Code</h3>
      </div>
      <div className="flex">
        <input 
          type="text" 
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Enter code" 
          className="flex-1 max-w-48 bg-slate-700 border border-slate-600 rounded-l-lg py-1 px-2 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
        />
        <button 
          onClick={applyDiscount}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 rounded-r-lg transition-colors"
        >
          Apply
        </button>
      </div>
      <div className="mt-1 text-xs text-blue-400">Try "CAKE10" for 10% off!</div>
    </div>
              
              {/* Summary details */}
              <div className="space-y-3 py-6 border-t border-b border-slate-700">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-gray-200 font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-gray-200 font-medium">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tax</span>
                  <span className="text-gray-200 font-medium">${tax.toFixed(2)}</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount (10%)</span>
                    <span>-${(subtotal * 0.1).toFixed(2)}</span>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-200 font-medium">Total</span>
                <span className="text-xl font-bold text-blue-400">
                  ${discountApplied ? (total - subtotal * 0.1).toFixed(2) : total.toFixed(2)}
                </span>
              </div>
              
              {/* Checkout button */}
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl transition-colors duration-300 flex items-center justify-center font-medium">
                <CreditCard size={18} className="mr-2" />
                Proceed to Checkout
              </button>
              
              {/* Shipping info */}
              <div className="mt-6 flex items-start p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <Truck size={16} className="text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-blue-400 font-medium">Free shipping on orders over $100</p>
                  <p className="text-gray-400 mt-1">Orders are typically processed within 24 hours</p>
                </div>
              </div>
              
              {/* Help section */}
              <div className="mt-6 flex items-start">
                <Info size={16} className="text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-gray-400 text-sm">
                  Need help with your order? <Link to="/contact" className="text-blue-400 hover:underline">Contact our support team</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;