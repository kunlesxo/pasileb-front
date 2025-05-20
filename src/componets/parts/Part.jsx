import { useState, useEffect } from 'react';
import { Cake, ChevronLeft, ChevronRight, Users, Star, Trophy, Package } from 'lucide-react';

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

// Main component
export default function CakeAndBannerDisplay() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState("products");
  const [visibleSection, setVisibleSection] = useState(null);

  // Stats counters
  const [deliveries, setDeliveriesVisible] = useCounterAnimation(150000);
  const [clients, setClientsVisible] = useCounterAnimation(75000);
  const [events, setEventsVisible] = useCounterAnimation(32000);

  // Content for slides
  const slides = [
    {
      title: "Delicious Celebration Cakes",
      description: "Our handcrafted cakes are perfect for any celebration. Made with premium ingredients and love.",
      image: "/api/placeholder/500/400",
      alt: "Celebration cake with decorations"
    },
    {
      title: "Custom Celebration Banners",
      description: "Personalized banners to make your event truly special. Available in various designs and colors.",
      image: "/api/placeholder/500/400",
      alt: "Colorful celebration banner"
    },
    {
      title: "Special Package Deals",
      description: "Get both cake and banners at a special price. Perfect combo for birthdays, weddings, and anniversaries.",
      image: "/api/placeholder/500/400",
      alt: "Cake and banner package"
    }
  ];

  // Start counter animations when company section is visible
  useEffect(() => {
    if (visibleSection === "company") {
      setDeliveriesVisible(true);
      setClientsVisible(true);
      setEventsVisible(true);
    }
  }, [visibleSection]);

  // Auto-rotate slides
  useEffect(() => {
    if (activeTab !== "products") return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentSlide, activeTab]);

  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll("section");
    sections.forEach(section => observer.observe(section));

    return () => sections.forEach(section => observer.unobserve(section));
  }, []);

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
      

      {/* Navigation tabs */}
      <div className="sticky top-0 z-50 w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-700">
        <div className="container mx-auto flex justify-center">
          <nav className="flex space-x-1 p-2">
            <button 
              onClick={() => setActiveTab("products")}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === "products" 
                  ? "bg-orange-500 text-white" 
                  : "text-gray-300 hover:text-white hover:bg-slate-700"
              }`}
            >
              Products
            </button>
            <button 
              onClick={() => setActiveTab("company")}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === "company" 
                  ? "bg-orange-500 text-white" 
                  : "text-gray-300 hover:text-white hover:bg-slate-700"
              }`}
            >
              About Us
            </button>
            <button 
              onClick={() => setActiveTab("reviews")}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === "reviews" 
                  ? "bg-orange-500 text-white" 
                  : "text-gray-300 hover:text-white hover:bg-slate-700"
              }`}
            >
              Reviews
            </button>
          </nav>
        </div>
      </div>

      {/* Products Section */}
      <section 
        id="products" 
        className={`transition-opacity duration-500 ${activeTab === "products" ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}
      >
        <div className="container mx-auto min-h-screen flex flex-col md:flex-row items-center p-4 md:p-8">
          {/* Left Section - Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6 p-4 md:p-8">
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
                
                <div className="mt-8">
                  <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    Order Now
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
          
          {/* Right Section - Image Slider */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
              {/* Banner decoration */}
              <div className="absolute top-0 left-0 w-full h-10 bg-orange-500 flex items-center justify-center z-10">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                  <span className="text-sm font-bold">CELEBRATION ESSENTIALS</span>
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
              </div>
              
              {/* Image container */}
              <div className="w-full h-full relative">
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].alt}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out ${
                    isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                  }`}
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent"></div>
                
                {/* Navigation buttons */}
                <button 
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm z-20"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={24} className="text-white" />
                </button>
                
                <button 
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm z-20"
                  aria-label="Next slide"
                >
                  <ChevronRight size={24} className="text-white" />
                </button>
              </div>
              
              {/* Bottom banner */}
              <div className="absolute bottom-0 left-0 w-full bg-orange-500/80 py-3 px-4 backdrop-blur-sm">
                <div className="text-center text-white font-semibold">
                  {currentSlide === 0 && "Perfect for any celebration"}
                  {currentSlide === 1 && "Custom designs available"}
                  {currentSlide === 2 && "Save 15% on packages"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Section */}
      <section 
        id="company" 
        className={`transition-all duration-500 ${activeTab === "company" ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}
      >
        <div className="container mx-auto min-h-screen px-4 py-16">
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

      {/* Reviews Section */}
      <section 
        id="reviews" 
        className={`transition-opacity duration-500 ${activeTab === "reviews" ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}
      >
        <div className="container mx-auto min-h-screen px-4 py-16">
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

         </div>

          );
};