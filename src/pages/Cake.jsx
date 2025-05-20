import { useState, useEffect } from 'react';
import { Search, Filter, ChevronUp, ChevronDown, Heart, ShoppingCart, X, Plus, Minus, Trash2, ArrowLeft, CreditCard, Calendar, Clock, User, Phone, Mail, MapPin, MessageSquare, ArrowRight } from 'lucide-react';
import chocoCake from "../assets/chocolate.jpg";
import chinchin from "../assets/chinchin.jpg";
import vanilla from "../assets/vanilla.jpg";

// Sample cake data
const cakesData = [
  {
    id: 1,
    name: "Chocolate Delight",
    category: "chocolate",
    price: 32.99,
    rating: 4.8,
    image:vanilla,
    description: "Rich chocolate layers with ganache frosting"
  },
  {
    id: 2,
    name: "Strawberry Dream",
    category: "fruit",
    price: 28.99,
    rating: 4.6,
    image:chinchin,
    description: "Light vanilla cake with fresh strawberries"
  },
  {
    id: 3,
    name: "Red Velvet",
    category: "classic",
    price: 34.99,
    rating: 4.9,
    image: chocoCake,
    description: "Classic red velvet with cream cheese frosting"
  },
  {
    id: 4,
    name: "Lemon Blueberry",
    category: "fruit",
    price: 30.99,
    rating: 4.7,
    image: vanilla,
    description: "Tangy lemon cake with blueberry filling"
  },
  {
    id: 5,
    name: "Caramel Macchiato",
    category: "coffee",
    price: 36.99,
    rating: 4.5,
    image: chocoCake,
    description: "Coffee-infused cake with caramel drizzle"
  },
  {
    id: 6,
    name: "Vanilla Bean",
    category: "classic",
    price: 26.99,
    rating: 4.4,
    image: chinchin,
    description: "Classic vanilla bean cake with buttercream"
  },
  {
    id: 7,
    name: "Matcha Green Tea",
    category: "specialty",
    price: 38.99,
    rating: 4.6,
    image:chocoCake,
    description: "Delicate matcha-flavored cake with white chocolate"
  },
  {
    id: 8,
    name: "Triple Chocolate",
    category: "chocolate",
    price: 39.99,
    rating: 4.9,
    image: vanilla,
    description: "Three layers of different chocolate intensities"
  }
];

// We need to fake framer-motion since it's not available
// This is a mock implementation to avoid errors
const motionDiv = ({ children, ...props }) => <div {...props}>{children}</div>;
const AnimatePresenceComp = ({ children }) => <>{children}</>;

// Main component
export default function CakeShop() {
  const [cakes, setCakes] = useState(cakesData);
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: "all",
    sortBy: "featured"
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [animateCake, setAnimateCake] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [view, setView] = useState("shop"); // 'shop' or 'order'
  const [selectedCake, setSelectedCake] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    deliveryAddress: '',
    deliveryDate: '',
    deliveryTime: 'morning',
    specialInstructions: '',
    cakeSize: '6-inch',
    cakeColor: 'Pink'
  });

  // Handle filter change
  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value
    });
  };

  // Apply filters
  useEffect(() => {
    let filteredCakes = [...cakesData];
    
    // Filter by category
    if (filters.category !== "all") {
      filteredCakes = filteredCakes.filter(cake => cake.category === filters.category);
    }
    
    // Filter by price range
    if (filters.priceRange === "under30") {
      filteredCakes = filteredCakes.filter(cake => cake.price < 30);
    } else if (filters.priceRange === "30to35") {
      filteredCakes = filteredCakes.filter(cake => cake.price >= 30 && cake.price <= 35);
    } else if (filters.priceRange === "over35") {
      filteredCakes = filteredCakes.filter(cake => cake.price > 35);
    }
    
    // Filter by search query
    if (searchQuery) {
      filteredCakes = filteredCakes.filter(cake => 
        cake.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cake.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Sort
    if (filters.sortBy === "priceLow") {
      filteredCakes.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "priceHigh") {
      filteredCakes.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === "topRated") {
      filteredCakes.sort((a, b) => b.rating - a.rating);
    }
    
    setCakes(filteredCakes);
  }, [filters, searchQuery]);

  // Toggle favorite
  const toggleFavorite = (cakeId) => {
    if (favorites.includes(cakeId)) {
      setFavorites(favorites.filter(id => id !== cakeId));
      showToastNotification("Removed from favorites");
    } else {
      setFavorites([...favorites, cakeId]);
      showToastNotification("Added to favorites");
    }
  };

  // Add to cart with animation
  const addToCart = (cakeId) => {
    setAnimateCake(cakeId);
    setTimeout(() => setAnimateCake(null), 800);
    
    const cakeToAdd = cakesData.find(cake => cake.id === cakeId);
    const existingCartItem = cart.find(item => item.id === cakeId);
    
    if (existingCartItem) {
      setCart(cart.map(item => 
        item.id === cakeId 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
      showToastNotification(`Increased ${cakeToAdd.name} quantity`);
    } else {
      setCart([...cart, { ...cakeToAdd, quantity: 1 }]);
      showToastNotification(`Added ${cakeToAdd.name} to cart`);
    }
  };
  
  // Remove from cart
  const removeFromCart = (cakeId) => {
    const cakeToRemove = cart.find(item => item.id === cakeId);
    setCart(cart.filter(item => item.id !== cakeId));
    showToastNotification(`Removed ${cakeToRemove.name} from cart`);
  };
  
  // Update quantity
  const updateQuantity = (cakeId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(cakeId);
      return;
    }
    
    setCart(cart.map(item => 
      item.id === cakeId 
        ? { ...item, quantity: newQuantity } 
        : item
    ));
  };
  
  // Apply coupon
  const applyCoupon = () => {
    // Sample coupon codes
    const coupons = {
      "SWEET10": 10,
      "CAKE20": 20,
      "DELICIOUS15": 15
    };
    
    if (coupons[couponCode]) {
      setDiscount(coupons[couponCode]);
      showToastNotification(`Applied coupon for ${coupons[couponCode]}% off!`);
    } else {
      setDiscount(0);
      showToastNotification("Invalid coupon code", true);
    }
  };
  
  // Calculate cart totals
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };
  
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = subtotal * (discount / 100);
    return subtotal + calculateTax() - discountAmount;
  };
  
  // Order form handlers
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.fullName || !formData.phoneNumber || !formData.emailAddress || !formData.deliveryAddress) {
      showToastNotification("Please fill out all required fields", true);
      return;
    }
    
    // In a real application, this would submit to a server
    showToastNotification(`Order complete! We'll deliver your ${selectedCake.name} cake on ${formData.deliveryDate}`);
    setTimeout(() => {
      setView("shop");
      setSelectedCake(null);
    }, 2000);
  };
  
  // Show toast notification
  const showToastNotification = (message, isError = false) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };
  
  // Start cake order process
  const orderCake = (cake) => {
    setSelectedCake(cake);
    setView("order");
    window.scrollTo(0, 0);
  };

return (
  <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8 text-gray-100">
    {/* Page Title */}
    <div className="mb-10 text-center">
      <h1 className="text-4xl font-bold text-cyan-400 mb-2 font-serif tracking-tight">Pasileb Cakes</h1>
      <p className="text-gray-400 max-w-2xl mx-auto">Handcrafted cakes made with love and the finest ingredients</p>
    </div>
    
    {/* Navigation Tabs */}
    {view === "shop" && (
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-700 p-4 rounded-lg shadow-lg border border-slate-600">
          {/* Search */}
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search cakes..."
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 placeholder-gray-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
          </div>
          
          {/* Filter Toggle Button (Mobile) */}
          <button 
            className="md:hidden flex items-center justify-center w-full gap-2 py-2 bg-slate-800 rounded-lg text-cyan-400 border border-slate-600"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter size={18} />
            Filters {isFilterOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {/* Desktop Filters */}
          <div className="hidden md:flex items-center gap-4">
            {/* Category Filter */}
            <select 
              className="p-2 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-800 text-gray-200"
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="chocolate">Chocolate</option>
              <option value="fruit">Fruit</option>
              <option value="classic">Classic</option>
              <option value="coffee">Coffee</option>
              <option value="specialty">Specialty</option>
            </select>
            
            {/* Price Range Filter */}
            <select 
              className="p-2 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-800 text-gray-200"
              value={filters.priceRange}
              onChange={(e) => handleFilterChange("priceRange", e.target.value)}
            >
              <option value="all">All Prices</option>
              <option value="under30">Under $30</option>
              <option value="30to35">$30 - $35</option>
              <option value="over35">Over $35</option>
            </select>
            
            {/* Sort By */}
            <select 
              className="p-2 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-800 text-gray-200"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="topRated">Top Rated</option>
            </select>
            
            {/* Cart Button */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 bg-cyan-600 rounded-lg text-white hover:bg-cyan-700 transition-colors"
            >
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-cyan-400 text-slate-900 rounded-full text-xs flex items-center justify-center font-bold">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Filters (Expandable) */}
        {isFilterOpen && (
          <div className="md:hidden mt-4 p-4 bg-slate-700 rounded-lg shadow-lg border border-slate-600 space-y-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
              <select 
                className="w-full p-2 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-800 text-gray-200"
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="chocolate">Chocolate</option>
                <option value="fruit">Fruit</option>
                <option value="classic">Classic</option>
                <option value="coffee">Coffee</option>
                <option value="specialty">Specialty</option>
              </select>
            </div>
            
            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Price Range</label>
              <select 
                className="w-full p-2 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-800 text-gray-200"
                value={filters.priceRange}
                onChange={(e) => handleFilterChange("priceRange", e.target.value)}
              >
                <option value="all">All Prices</option>
                <option value="under30">Under $30</option>
                <option value="30to35">$30 - $35</option>
                <option value="over35">Over $35</option>
              </select>
            </div>
            
            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Sort By</label>
              <select 
                className="w-full p-2 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-800 text-gray-200"
                value={filters.sortBy}
                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="topRated">Top Rated</option>
              </select>
            </div>
            
            {/* Cart Button (Mobile) */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="flex items-center justify-center gap-2 w-full p-2 bg-cyan-600 rounded-lg text-white hover:bg-cyan-700 transition-colors"
            >
              <ShoppingCart size={20} />
              <span>View Cart</span>
              {cart.length > 0 && (
                <span className="ml-1 w-5 h-5 bg-cyan-400 text-slate-900 rounded-full text-xs flex items-center justify-center font-bold">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        )}
      </div>
    )}
    
    {/* Back button when in order form */}
    {view === "order" && (
      <div className="max-w-7xl mx-auto mb-8">
        <button 
          onClick={() => setView("shop")}
          className="flex items-center gap-2 py-2 px-4 bg-slate-700 rounded-lg text-cyan-400 border border-slate-600 hover:bg-slate-600 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Shop
        </button>
      </div>
    )}
    
    {/* Main Content Area - Product Grid or Order Form */}
    {view === "shop" ? (
      <div className="max-w-7xl mx-auto">
        {cakes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cakes.map(cake => (
              <div 
                key={cake.id} 
                className={`bg-slate-700 rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 border border-slate-600 hover:shadow-lg hover:shadow-cyan-900/20 ${animateCake === cake.id ? 'scale-95' : 'hover:-translate-y-2'}`}
              >
                <div className="relative">
                  <img 
                    src={cake.image} 
                    alt={cake.name} 
                    className="w-full h-48 object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <button 
                    onClick={() => toggleFavorite(cake.id)}
                    className="absolute top-3 right-3 p-2 bg-slate-800/80 rounded-full shadow-md hover:bg-slate-700 transition-colors"
                  >
                    <Heart size={18} className={favorites.includes(cake.id) ? 'fill-cyan-400 text-cyan-400' : 'text-gray-400'} />
                  </button>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white py-2 px-4">
                    <span className="text-xs font-medium px-2 py-1 bg-cyan-500 rounded-full">{cake.category}</span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-100 mb-1">{cake.name}</h3>
                  <p className="text-gray-400 text-sm mb-2">{cake.description}</p>
                  
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-lg ${i < Math.floor(cake.rating) ? 'text-cyan-400' : 'text-gray-600'}`}>★</span>
                    ))}
                    <span className="text-sm text-gray-400 ml-1">({cake.rating})</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-cyan-400">${cake.price}</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => orderCake(cake)}
                        className="flex items-center gap-1 bg-slate-600 text-white py-2 px-3 rounded-lg hover:bg-slate-500 transition-all shadow-md"
                      >
                        Order
                      </button>
                      <button 
                        onClick={() => addToCart(cake.id)}
                        className="flex items-center gap-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 px-3 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all shadow-md"
                      >
                        <ShoppingCart size={16} />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-cyan-400 font-bold text-xl mb-2">No cakes found</div>
            <p className="text-gray-400">Try adjusting your filters or search term</p>
          </div>
        )}
        
        {/* Results count */}
        <div className="max-w-7xl mx-auto mt-6 text-center text-gray-400">
          Showing {cakes.length} {cakes.length === 1 ? 'cake' : 'cakes'}
        </div>
      </div>
    ) : (
      /* Order Form */
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-800 bg-opacity-60 rounded-lg shadow-xl p-6 backdrop-filter backdrop-blur-sm border border-slate-700">
          <form onSubmit={handleSubmit}>
            {/* Product Display Section */}
            <div className="mb-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <div className="bg-slate-700 rounded-lg p-2 shadow-inner">
                  <img src={selectedCake.image} alt={selectedCake.name} className="rounded w-full object-cover" />
                </div>
              </div>
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-2 text-white">{selectedCake.name}</h2>
                <div className="flex items-center mb-3">
                  <div className="flex text-cyan-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-lg ${i < Math.floor(selectedCake.rating) ? 'text-cyan-400' : 'text-gray-600'}`}>★</span>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-300">({selectedCake.rating})</span>
                </div>
                <p className="text-gray-200 mb-4">{selectedCake.description}</p>
                <div className="text-2xl font-bold mb-4 text-cyan-400">${selectedCake.price}</div>
                <div className="text-sm text-gray-300 mb-2">Free delivery on orders over $75</div>
              </div>
            </div>
            
            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4 text-cyan-300">Select Cake Size</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'size-small', value: '6-inch', size: '6" Round', serves: 'Serves 8 people' },
                  { id: 'size-medium', value: '8-inch', size: '8" Round', serves: 'Serves 12-16 people' },
                  { id: 'size-large', value: '10-inch', size: '10" Round', serves: 'Serves 20-24 people' }
                ].map((sizeOption) => (
                  <div key={sizeOption.id}>
                    <input 
                      type="radio" 
                      name="cakeSize" 
                      id={sizeOption.id} 
                      value={sizeOption.value} 
                      checked={formData.cakeSize === sizeOption.value}
                      onChange={handleRadioChange}
                      className="hidden peer" 
                    />
                    <label 
                      htmlFor={sizeOption.id} 
                      className="block border-2 border-slate-600 rounded-lg p-4 cursor-pointer text-center hover:border-cyan-400 transition-all peer-checked:border-cyan-400 peer-checked:bg-cyan-400 peer-checked:bg-opacity-10"
                    >
                      <div className="text-xl font-bold mb-1">{sizeOption.size}</div>
                      <div className="text-gray-300">{sizeOption.serves}</div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Color Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4 text-cyan-300">Select Frosting Color</h3>
              <div className="flex flex-wrap gap-4 justify-center">
                {[
                  { id: 'color-cyan', value: 'Cyan', bgColor: 'bg-cyan-400' },
                  { id: 'color-blue', value: 'Blue', bgColor: 'bg-blue-400' },
                  { id: 'color-green', value: 'Green', bgColor: 'bg-green-400' },
                  { id: 'color-purple', value: 'Purple', bgColor: 'bg-purple-400' },
                  { id: 'color-yellow', value: 'Yellow', bgColor: 'bg-yellow-400' }
                ].map((colorOption) => (
                  <div key={colorOption.id}>
                    <input 
                      type="radio" 
                      name="cakeColor" 
                      id={colorOption.id} 
                      value={colorOption.value} 
                      checked={formData.cakeColor === colorOption.value}
                      onChange={handleRadioChange}
                      className="hidden peer" 
                    />
                    <label 
                      htmlFor={colorOption.id} 
                      className={`block w-12 h-12 rounded-full ${colorOption.bgColor} cursor-pointer border-4 border-slate-700 transition-all peer-checked:scale-110 peer-checked:shadow-lg peer-checked:shadow-white/20`}
                    ></label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Delivery Information */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4 text-cyan-300">Delivery Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-gray-300 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    id="fullName" 
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-gray-300 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phoneNumber" 
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent" 
                    required 
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="emailAddress" className="block text-gray-300 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="emailAddress" 
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent" 
                    required 
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="deliveryAddress" className="block text-gray-300 mb-2">Delivery Address</label>
                  <textarea 
                    id="deliveryAddress" 
                    value={formData.deliveryAddress}
                    onChange={handleInputChange}
                    rows="3" 
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent" 
                    required
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="deliveryDate" className="block text-gray-300 mb-2">Delivery Date</label>
                  <input 
                    type="date" 
                    id="deliveryDate" 
                    value={formData.deliveryDate}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="deliveryTime" className="block text-gray-300 mb-2">Preferred Delivery Time</label>
                  <select 
                    id="deliveryTime" 
                    value={formData.deliveryTime}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  >
                    <option value="morning">Morning (9AM - 12PM)</option>
                    <option value="afternoon">Afternoon (12PM - 5PM)</option>
                    <option value="evening">Evening (5PM - 8PM)</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Special Instructions */}
            <div className="mb-8">
              <label htmlFor="specialInstructions" className="block text-lg font-medium mb-2 text-cyan-300">Special Instructions</label>
              <textarea 
                id="specialInstructions" 
                value={formData.specialInstructions}
                onChange={handleInputChange}
                rows="4" 
                placeholder="Any special message for the cake? Allergies? Special delivery instructions?" 
                className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              ></textarea>
            </div>
            
            {/* Submit Button */}
            <div className="text-center">
              <button 
                type="submit" 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium py-3 px-8 rounded-lg hover:opacity-90 transform transition hover:scale-105"
              >
                Complete Order
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
);
}