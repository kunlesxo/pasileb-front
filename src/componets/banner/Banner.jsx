import chocoCake from "../../assets/chocolate.jpg";
import chinchin from "../../assets/chinchin.jpg";
import vanilla from "../../assets/vanilla.jpg"; // ← Use correct relative path
            
import { useState, useEffect } from 'react';
import { Cake, ChevronLeft, ChevronRight, Users, Star, Trophy, Package, MapPin, Phone, Mail, Clock, Search, ShoppingCart } from 'lucide-react';
// Counter animation hook
const useCounterAnimation = (target, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
 

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime;
    let animationFrame;
    
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };
    
    animationFrame = requestAnimationFrame(step);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, isVisible]);

  return [count, setIsVisible];
};

// Reviews data
const reviews = [
  {
    name: "Sarah Johnson",
    rating: 5,
    comment: "Absolutely perfect! The cake was delicious and the banner looked amazing at my daughter's birthday party.",
    date: "May 12, 2025"
  },
  {
    name: "Michael Thompson",
    rating: 5,
    comment: "Outstanding service and quality. Everyone at our anniversary celebration was impressed!",
    date: "May 5, 2025"
  },
  {
    name: "Emily Rodriguez",
    rating: 4,
    comment: "Beautiful cake and banner combo. Would have been 5 stars but delivery was slightly delayed.",
    date: "April 28, 2025"
  }
];

// Cake data
const cakeTypes = [
  { name: "Birthday Cake", price: "#4000", image: vanilla , description: "Perfect for birthday celebrations" },
  { name: "Wedding Cake", price: "#4000", image: chinchin, description: "Elegant multi-tier design" },
  { name: "Anniversary Cake", price: "#4000", image: vanilla, description: "Romantic design with custom message" },
  { name: "Graduation Cake", price: "#4000", image: chocoCake, description: "Celebrate academic success" },
  { name: "Baby Shower Cake", price: "#4000", image: chinchin, description: "Sweet designs for new arrivals" },
  { name: "Corporate Cake", price:"#4000", image: chocoCake, description: "Professional designs with logo" },
  { name: "Holiday Cake", price: "#4000", image: vanilla, description: "Seasonal themes and flavors" },
  { name: "Custom Design", price: "From #5000", image: chocoCake, description: "Your unique vision brought to life" }
];

// Store locations
const locations = [
  {
    name: "Pasileb Cakes and events",
    address:"10, dofkem plaza,ilepo, lagos",
    phone: "+2347084764672",
    hours: "Mon-Sat: 8am-8pm, Sun: 9am-6pm"
  },
  {
   name: "Pasileb Cakes and events",
    address: "10, dofkem plaza,ilepo, lagos",
    phone: "+2347084764672",
    hours: "Mon-Sat: 8am-8pm, Sun: 9am-6pm"
  },
  {
   name: "Pasileb Cakes and events",
    address: "10, dofkem plaza,ilepo, lagos",
    phone: "+2347084764672",
    hours: "Mon-Sat: 8am-8pm, Sun: 9am-6pm"
  }
];



// Main component


export default function CakeAndBannerDisplay() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  
  
  // Stats counters
  const [deliveries, setDeliveriesVisible] = useCounterAnimation(150000);
  const [clients, setClientsVisible] = useCounterAnimation(75000);
  const [events, setEventsVisible] = useCounterAnimation(32000);

  // Content for slides
  const slides = [
    {
      title: "Delicious Celebration Cakes",
      description: "Our handcrafted cakes are perfect for any celebration. Made with premium ingredients and love.",
      image: chocoCake,
      alt: "Celebration cake with decorations"
    },
    {
      title: "Custom Celebration Banners",
      description: "Personalized banners to make your event truly special. Available in various designs and colors.",
      image: vanilla,
      alt: "Colorful celebration banner"
    },
    {
      title: "Special Package Deals",
      description: "Get both cake and banners at a special price. Perfect combo for birthdays, weddings, and anniversaries.",
      image: chocoCake,
      alt: "Cake and banner package"
    },
    {
      title: "Chocolate Dream Cakes",
      description: "Rich, decadent chocolate cakes with ganache filling. A chocolate lover's paradise.",
      image: chinchin,
      alt: "Chocolate cake with ganache"
    },
    {
      title: "Seasonal Fruit Cakes",
      description: "Fresh, seasonal fruit cakes with light cream frosting. Perfect for summer celebrations.",
      image:vanilla,
      alt: "Fruit cake with cream frosting"
    },
    {
      title: "Custom Character Cakes",
      description: "Cakes featuring your favorite characters or themes. Perfect for kids' birthday parties.",
      image: chocoCake,
      alt: "Character themed cake"
    }
  ];

  // Function to add to cart
  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`Added ${product.name} to cart!`);
  };

  // Function to search products
  const searchProducts = () => {
    alert(`Searching for products matching: "${searchQuery}"`);
    // Here you would normally fetch products from an API based on the search query
  };

  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target.id === "company") {
            setDeliveriesVisible(true);
            setClientsVisible(true);
            setEventsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll("section");
    sections.forEach(section => observer.observe(section));

    return () => sections.forEach(section => observer.unobserve(section));
  }, []);

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentSlide]);

  // Handle slide navigation
  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white overflow-x-hidden">
      {/* Search Bar and Cart - Replacing the removed header */}
      {/* <div className="sticky top-0 z-50 w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-700">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center space-x-2">
            <Cake className="text-orange-500" size={28} />
            <span className="text-xl font-bold">Sweet Celebrations</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-800 text-white rounded-lg py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button 
                onClick={searchProducts}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500"
              >
                <Search size={18} />
              </button>
            </div>
            
            <div className="relative">
              <ShoppingCart className="text-orange-500" size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </div> */}

      {/* Hero Section with Products - MODIFIED FOR FLEX LAYOUT */}
      <section id="products" className="py-10 md:py-20">
        {/* Main container for flex layout */}
        <div className="container mx-auto p-4">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Left Section - Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 p-4">
              <div className="flex items-center space-x-2">
                <Cake className="text-orange-500" size={36} />
                <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">
                  Sweet Celebrations
                </h1>
              </div>
              
              <div className="relative pt-6 overflow-hidden">
                <div className={`transition-all duration-500 ease-in-out ${isAnimating ? 'opacity-0 transform -translate-y-8' : 'opacity-100 transform translate-y-0'}`}>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4">{slides[currentSlide].title}</h2>
                  <p className="text-base md:text-lg text-gray-300">{slides[currentSlide].description}</p>
                  
                  <div className="mt-8 flex space-x-4">
                    <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                      Order Now
                    </button>
                    <button 
                      onClick={() => addToCart({name: slides[currentSlide].title, price: "$79"})}
                      className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition-all duration-300 flex items-center"
                    >
                      <ShoppingCart size={18} className="mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 pt-8">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentSlide === index ? 'bg-orange-500 w-6' : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right Section - Banner Image */}
            <div className="w-full lg:w-1/2 relative bg-slate-800/50 rounded-xl overflow-hidden">
              <div className="aspect-[4/3] relative">
                {/* Banner Image */}
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].alt}
                  className={`w-full h-full object-cover transition-all duration-500 ease-in-out ${
                    isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                  }`}
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent"></div>
                
                {/* Navigation buttons */}
                <button 
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm z-20"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={24} className="text-white" />
                </button>
                
                <button 
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm z-20"
                  aria-label="Next slide"
                >
                  <ChevronRight size={24} className="text-white" />
                </button>
                
                {/* Bottom banner */}
                <div className="absolute bottom-0 left-0 w-full bg-orange-500/80 py-3 px-4 backdrop-blur-sm flex justify-between items-center">
                  <div className="text-center text-white font-semibold">
                    {currentSlide === 0 && "Perfect for any celebration"}
                    {currentSlide === 1 && "Custom designs available"}
                    {currentSlide === 2 && "Save 15% on packages"}
                    {currentSlide === 3 && "Chocolate lovers rejoice"}
                    {currentSlide === 4 && "Fresh seasonal options"}
                    {currentSlide === 5 && "Character cakes for kids"}
                  </div>
                  
                  <button 
                    onClick={() => addToCart({name: slides[currentSlide].title, price: "$79"})}
                    className="px-4 py-2 bg-white text-orange-500 hover:bg-gray-100 rounded-lg font-semibold transition-all duration-300 flex items-center"
                  >
                    <ShoppingCart size={18} className="mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cake Gallery Section */}
      <section id="cakes" className="py-20 bg-slate-800/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Cake Collection</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Browse our selection of handcrafted cakes perfect for any celebration.
              Each cake is made fresh to order with premium ingredients and custom designs.
            </p>
          </div>
          
          {/* Cake Grid - 4 columns on large screens, 2 on medium */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cakeTypes.map((cake, index) => (
              <div key={index} className="bg-slate-700 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 hover:transform hover:scale-105">
                <div className="relative">
                  <img src={cake.image} alt={cake.name} className="w-full h-48 object-cover" />
                  <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-md font-bold text-sm">
                    {cake.price}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{cake.name}</h3>
                  <p className="text-gray-300 text-sm mb-3">{cake.description}</p>
                  <div className="flex space-x-2">
                    <button className="flex-1 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition-all duration-300 text-sm">
                      Order Now
                    </button>
                    <button 
                      onClick={() => addToCart(cake)} 
                      className="px-3 py-2 bg-slate-600 hover:bg-slate-500 rounded-lg transition-all duration-300"
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Cake size and flavor options */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="flex justify-center mb-6 border-b border-slate-600">
              <button
                onClick={() => setActiveTab(0)}
                className={`px-4 py-2 font-semibold ${activeTab === 0 ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-400'}`}
              >
                Sizes
              </button>
              <button
                onClick={() => setActiveTab(1)}
                className={`px-4 py-2 font-semibold ${activeTab === 1 ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-400'}`}
              >
                Flavors
              </button>
              <button
                onClick={() => setActiveTab(2)}
                className={`px-4 py-2 font-semibold ${activeTab === 2 ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-400'}`}
              >
                Extras
              </button>
            </div>
            
            <div className="bg-slate-700 rounded-xl p-6">
              {activeTab === 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-600">
                        <th className="px-4 py-2">Size</th>
                        <th className="px-4 py-2">Serves</th>
                        <th className="px-4 py-2">Base Price</th>
                        <th className="px-4 py-2">Dimensions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-600/50">
                        <td className="px-4 py-3">Small</td>
                        <td className="px-4 py-3">8-10 people</td>
                        <td className="px-4 py-3">#4900</td>
                        <td className="px-4 py-3">8" round</td>
                      </tr>
                      <tr className="border-b border-slate-600/50">
                        <td className="px-4 py-3">Medium</td>
                        <td className="px-4 py-3">12-16 people</td>
                        <td className="px-4 py-3">#4900</td>
                        <td className="px-4 py-3">10" round</td>
                      </tr>
                      <tr className="border-b border-slate-600/50">
                        <td className="px-4 py-3">Large</td>
                        <td className="px-4 py-3">20-24 people</td>
                        <td className="px-4 py-3">#4900</td>
                        <td className="px-4 py-3">12" round</td>
                      </tr>
                      <tr className="border-b border-slate-600/50">
                        <td className="px-4 py-3">Sheet</td>
                        <td className="px-4 py-3">30-40 people</td>
                        <td className="px-4 py-3">#4900</td>
                        <td className="px-4 py-3">11"x15" rectangle</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">Tiered (2)</td>
                        <td className="px-4 py-3">40-50 people</td>
                        <td className="px-4 py-3">#4900</td>
                        <td className="px-4 py-3">8" + 10" rounds</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              
              {activeTab === 1 && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-600">
                        <th className="px-4 py-2">Flavor</th>
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2">Add-on Price</th>
                        <th className="px-4 py-2">Recommended For</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-600/50">
                        <td className="px-4 py-3">Vanilla</td>
                        <td className="px-4 py-3">Classic vanilla cake with buttercream</td>
                        <td className="px-4 py-3">Included</td>
                        <td className="px-4 py-3">All celebrations</td>
                      </tr>
                      <tr className="border-b border-slate-600/50">
                        <td className="px-4 py-3">Chocolate</td>
                        <td className="px-4 py-3">Rich chocolate cake with ganache</td>
                        <td className="px-4 py-3">Included</td>
                        <td className="px-4 py-3">Birthdays, Anniversaries</td>
                      </tr>
                      <tr className="border-b border-slate-600/50">
                        <td className="px-4 py-3">Red Velvet</td>
                        <td className="px-4 py-3">Red velvet with cream cheese frosting</td>
                        <td className="px-4 py-3">#4900</td>
                        <td className="px-4 py-3">Valentine's, Anniversaries</td>
                      </tr>
                      <tr className="border-b border-slate-600/50">
                        <td className="px-4 py-3">Lemon</td>
                        <td className="px-4 py-3">Lemon cake with citrus buttercream</td>
                        <td className="px-4 py-3">#4900</td>
                        <td className="px-4 py-3">Summer events, Showers</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">Marble</td>
                        <td className="px-4 py-3">Vanilla and chocolate swirled</td>
                        <td className="px-4 py-3">#4900</td>
                        <td className="px-4 py-3">Kids parties, Birthdays</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              
              {activeTab === 2 && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-600">
                        <th className="px-4 py-2">Extra</th>
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2">Add-on Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-600/50">
                        <td className="px-4 py-3">Fondant Covering</td>
                        <td className="px-4 py-3">Smooth fondant finish for decorations</td>
                        <td className="px-4 py-3">#4900</td>
                      </tr>
                      <tr className="border-b border-slate-600/50">
                        <td className="px-4 py-3">Custom Toppers</td>
                        <td className="px-4 py-3">Handmade fondant figures</td>
                        <td className="px-4 py-3">#4900</td>
                      </tr>
                      <tr className="border-b border-slate-600/50">
                        <td className="px-4 py-3">Edible Image</td>
                        <td className="px-4 py-3">Your photo printed on edible paper</td>
                        <td className="px-4 py-3">#4900</td>
                      </tr>
                      <tr className="border-b border-slate-600/50">
                        <td className="px-4 py-3">Fruit Filling</td>
                        <td className="px-4 py-3">Fresh fruit between layers</td>
                        <td className="px-4 py-3">#4900</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">Gold/Silver Accents</td>
                        <td className="px-4 py-3">Edible metallic decorations</td>
                        <td className="px-4 py-3">#4900</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full py-8">
        <div className="max-w-lg mx-auto flex items-center px-4">
          <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
          <Cake className="mx-4 text-orange-500" size={24} />
          <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
        </div>
      </div>

      {/* Company Section */}
      <section id="company" className="py-20 bg-slate-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Our Company</h2>
            <p className="text-lg text-gray-300">
              Since 2010, Sweet Celebrations has been creating memorable moments with our premium cakes and banners. 
              Our team of dedicated professionals works tirelessly to ensure every celebration is special, with custom-designed 
              products that exceed our clients' expectations.
            </p>
          </div>
          
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Deliveries */}
            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 text-center transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/10">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package size={28} className="text-orange-500" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">
                {deliveries.toLocaleString()}+
              </div>
              <h3 className="text-xl font-semibold mb-2">Successful Deliveries</h3>
              <p className="text-gray-400">Cakes and banners delivered on time, every time</p>
            </div>
            {/* Clients */}
            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 text-center transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/10">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={28} className="text-orange-500" />  
              </div>
              <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">
                {clients.toLocaleString()}+
              </div>
              <h3 className="text-xl font-semibold mb-2">Satisfied Clients</h3>
              <p className="text-gray-400">Families and businesses who trust us</p>
            </div>       
            {/* Events */}
            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 text-center transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/10">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy size={28} className="text-orange-500" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">
                {events.toLocaleString()}+
              </div>
              <h3 className="text-xl font-semibold mb-2">Special Events</h3>
              <p className="text-gray-400">Birthdays, weddings, and corporate events</p>
            </div>
          </div>
          
          {/* Company Timeline */}
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-10">Our Journey</h3>
            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-1/2 before:h-full before:w-0.5 before:bg-orange-500/30">
              <div className="relative pl-10">
                <div className="absolute left-0 top-0 bg-orange-500 rounded-full w-4 h-4 -translate-x-1/2"></div>
                <h4 className="text-xl font-semibold text-orange-400">2010</h4>
                <p className="mt-2 text-gray-300">Founded as a small bakery specializing in birthday cakes</p>
              </div>
              
              <div className="relative pl-10">
                <div className="absolute left-0 top-0 bg-orange-500 rounded-full w-4 h-4 -translate-x-1/2"></div>
                <h4 className="text-xl font-semibold text-orange-400">2015</h4>
                <p className="mt-2 text-gray-300">Expanded to include custom celebration banners and decorations</p>
              </div>
              
              <div className="relative pl-10">
                <div className="absolute left-0 top-0 bg-orange-500 rounded-full w-4 h-4 -translate-x-1/2"></div>
                <h4 className="text-xl font-semibold text-orange-400">2020</h4>
                <p className="mt-2 text-gray-300">Launched nationwide delivery and corporate event services</p>
              </div>
              
              <div className="relative pl-10">
                <div className="absolute left-0 top-0 bg-orange-500 rounded-full w-4 h-4 -translate-x-1/2"></div>
                <h4 className="text-xl font-semibold text-orange-400">2025</h4>
                <p className="mt-2 text-gray-300">Celebrating 15 years with over 150,000 successful deliveries!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full py-8">
        <div className="max-w-lg mx-auto flex items-center px-4">
          <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
          <Star className="mx-4 text-orange-500 fill-orange-500" size={24} />
          <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
        </div>
      </div>

      {/* Reviews Section */}
      <section id="reviews" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Client Reviews</h2>
            <div className="flex items-center justify-center gap-1 mb-4">
              <Star className="text-orange-500 fill-orange-500" size={24} />
              <Star className="text-orange-500 fill-orange-500" size={24} />
              <Star className="text-orange-500 fill-orange-500" size={24} />
              <Star className="text-orange-500 fill-orange-500" size={24} />
              <Star className="text-orange-500 fill-orange-500" size={24} />
              <span className="ml-2 text-xl font-semibold">4.9/5</span>
            </div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Based on over 12,000 verified customer reviews across multiple platforms
            </p>
          </div>
          
          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {reviews.map((review, index) => (
              <div 
                key={index} 
                className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 transform transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">{review.name}</h4>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={i < review.rating ? "text-orange-500 fill-orange-500" : "text-gray-500"} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 mb-3">{review.comment}</p>
                <p className="text-gray-500 text-sm">{review.date}</p>
              </div>
            ))}
          </div>
          
          {/* Review Statistics */}
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-8 border border-slate-600">
            <h3 className="text-xl font-semibold mb-6 text-center">Why Our Customers Love Us</h3>
            
            {/* Progress bars */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>On-time Delivery</span>
                  <span>98%</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2.5">
                  <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span>Product Quality</span>
                  <span>99%</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2.5">
                  <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '99%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span>Customer Service</span>
                  <span>97%</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2.5">
                  <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '97%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span>Value for Money</span>
                  <span>95%</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2.5">
                  <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition-all duration-300">
                Read More Reviews
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section with Map */}
      <section id="locations" className="py-20 bg-slate-800/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Visit Our Locations</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Stop by one of our bakery locations to taste samples, discuss custom orders, 
              or pick up your delicious cake and banner creations.
            </p>
          </div>
          
          {/* Map */}
          <div className="mb-12 rounded-xl overflow-hidden shadow-xl border border-slate-700">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.107061265927!2d3.297502815081342!3d6.636391863757122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b9120b6e636c7%3A0x303a992501f5bb6a!2sDofkem%20Plaza!5e0!3m2!1sen!2sng!4v1684603967991!5m2!1sen!2sng"

              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              title="Pasileb Locations Map"
              className="w-full"
            ></iframe>
          </div>
          
          {/* Location Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <div 
                key={index}
                className="bg-slate-700 rounded-xl p-6 border border-slate-600 transform transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10"
              >
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mb-4 text-orange-500">
                  <MapPin size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{location.name}</h3>
                <p className="text-gray-300 mb-4">{location.address}</p>
                
                <div className="flex items-center mb-2 text-gray-300">
                  <Phone size={16} className="mr-2 text-orange-500" />
                  <span>{location.phone}</span>
                </div>
                
                <div className="flex items-start mb-4 text-gray-300">
                  <div className="mt-1">
                    <Clock size={16} className="mr-2 text-orange-500" />
                  </div>
                  <span>{location.hours}</span>
                </div>
                
                <button className="w-full py-2 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition-all duration-300 text-sm">
                  Get Directions
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
 
    </div>
  );
}