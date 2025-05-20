import { useState } from 'react';

export default function CakeOrderForm() {
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
      alert('Please fill out all required fields');
      return;
    }
    
    // In a real application, this would submit to a server
    alert(`Thank you for your order!\n\nSize: ${formData.cakeSize}\nColor: ${formData.cakeColor}\nDelivery Address: ${formData.deliveryAddress}\n\nWe will contact you at ${formData.phoneNumber} to confirm your order.`);
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-2 text-pink-300">Sweet Delights Bakery</h1>
        <p className="text-center mb-8 text-gray-300">Crafting your perfect celebration cake</p>
        
        <div className="bg-slate-800 bg-opacity-60 rounded-lg shadow-xl p-6 backdrop-filter backdrop-blur-sm border border-slate-700">
          <form onSubmit={handleSubmit}>
            {/* Product Display Section */}
            <div className="mb-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <div className="bg-slate-700 rounded-lg p-2 shadow-inner">
                  <img src="/api/placeholder/500/400" alt="Celebration Cake" className="rounded w-full object-cover" />
                </div>
              </div>
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-2 text-white">Celebration Cake</h2>
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-300">(237 reviews)</span>
                </div>
                <p className="text-gray-200 mb-4">Our signature celebration cake is perfect for birthdays, anniversaries, or any special occasion. Made with premium ingredients and customized to your preferences.</p>
                <div className="text-2xl font-bold mb-4 text-white">$59.99</div>
                <div className="text-sm text-gray-300 mb-2">Free delivery on orders over $75</div>
              </div>
            </div>
            
            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4 text-pink-300">Select Cake Size</h3>
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
                      className="block border-2 border-slate-600 rounded-lg p-4 cursor-pointer text-center hover:border-pink-400 transition-all peer-checked:border-pink-400 peer-checked:bg-pink-400 peer-checked:bg-opacity-10"
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
              <h3 className="text-lg font-medium mb-4 text-pink-300">Select Frosting Color</h3>
              <div className="flex flex-wrap gap-4 justify-center">
                {[
                  { id: 'color-pink', value: 'Pink', bgColor: 'bg-pink-400' },
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
              <h3 className="text-lg font-medium mb-4 text-pink-300">Delivery Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-gray-300 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    id="fullName" 
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent" 
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
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent" 
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
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent" 
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
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent" 
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
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="deliveryTime" className="block text-gray-300 mb-2">Preferred Delivery Time</label>
                  <select 
                    id="deliveryTime" 
                    value={formData.deliveryTime}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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
              <label htmlFor="specialInstructions" className="block text-lg font-medium mb-2 text-pink-300">Special Instructions</label>
              <textarea 
                id="specialInstructions" 
                value={formData.specialInstructions}
                onChange={handleInputChange}
                rows="4" 
                placeholder="Any special message for the cake? Allergies? Special delivery instructions?" 
                className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              ></textarea>
            </div>
            
            {/* Submit Button */}
            <div className="text-center">
              <button 
                type="submit" 
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium py-3 px-8 rounded-lg hover:opacity-90 transform transition hover:scale-105"
              >
                Complete Order
              </button>
            </div>
          </form>
        </div>
        
        
      </div>
    </div>
  );
}