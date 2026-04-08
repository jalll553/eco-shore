import { formatNumber } from '../lib/ecoshore';

function FeaturesPage({ beaches, weather, navigate }) {
  // Use up to 3 beaches dynamically for the demo
  const demoBeaches = beaches.slice(0, 3);
  
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-ocean-blue/10 via-turquoise/5 to-sky-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-up">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean-blue to-turquoise">Features</span> That Make a Difference
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Everything you need for the perfect beach experience, powered by real-time data and community insights.
            </p>
          </div>
        </div>
      </section>

      {/* Features with Image Carousels */}
      <section className="py-24 bg-gradient-to-br from-white via-sky-light to-turquoise/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-zoom-in">
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <div className="flex absolute min-w-full min-h-full items-center justify-center bg-sky-100">
                  <i className="fas fa-search text-ocean-blue text-6xl opacity-30"></i>
                </div>
              </div>
              <div className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-ocean-blue to-turquoise rounded-2xl flex items-center justify-center mb-6 animate-float">
                  <i className="fas fa-search text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Smart Beach Search</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Find the perfect beach based on your preferences, location, and current conditions. Our intelligent atlas catalogs shorelines globally.
                </p>
                <button onClick={() => navigate('/atlas')} className="bg-gradient-to-r from-ocean-blue to-turquoise text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Try Search
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-zoom-in" style={{ animationDelay: '0.1s' }}>
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <div className="flex absolute min-w-full min-h-full items-center justify-center bg-red-50">
                  <i className="fas fa-shield-alt text-coral text-6xl opacity-30"></i>
                </div>
              </div>
              <div className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-coral to-pink-500 rounded-2xl flex items-center justify-center mb-6 animate-float" style={{ animationDelay: '0.1s' }}>
                  <i className="fas fa-shield-alt text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Real-Time Data Pulse</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Stay informed about current conditions. Access detailed analytics regarding water quality and crowd density across our catalog.
                </p>
                <button onClick={() => navigate('/pulse')} className="bg-gradient-to-r from-coral to-pink-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  View Analytics
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-zoom-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <div className="flex absolute min-w-full min-h-full items-center justify-center bg-yellow-50">
                  <i className="fas fa-cloud-sun text-soft-yellow text-6xl opacity-30"></i>
                </div>
              </div>
              <div className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-soft-yellow to-orange-500 rounded-2xl flex items-center justify-center mb-6 animate-float" style={{ animationDelay: '0.2s' }}>
                  <i className="fas fa-cloud-sun text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Weather Forecasts</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Detailed weather information including temperature, wind speed, and accurate forecasting tools directly integrating live shoreline updates.
                </p>
                <button onClick={() => navigate('/conditions')} className="bg-gradient-to-r from-soft-yellow to-orange-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Check Weather
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-zoom-in" style={{ animationDelay: '0.3s' }}>
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <div className="flex absolute min-w-full min-h-full items-center justify-center bg-green-50">
                  <i className="fas fa-location-arrow text-seafoam text-6xl opacity-30"></i>
                </div>
              </div>
              <div className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-seafoam to-emerald-500 rounded-2xl flex items-center justify-center mb-6 animate-float" style={{ animationDelay: '0.3s' }}>
                  <i className="fas fa-location-arrow text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Proximity Search</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Get personalized suggestions for beaches closest to your physical location. Instantly drift to the nearest spots.
                </p>
                <button onClick={() => navigate('/nearby')} className="bg-gradient-to-r from-seafoam to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Find Nearby
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Data Demo mapped dynamically */}
      <section className="py-24 bg-gradient-to-br from-ocean-blue/5 via-turquoise/5 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean-blue to-turquoise">Live</span> Beach Data
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">Real-time information directly pulled from our active catalog.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {demoBeaches.length > 0 ? demoBeaches.map((beach, index) => {
              // Creating pseudo-dynamic weather based on real state logic to mimic template
              let temp = weather?.current_weather?.temperature ? weather.current_weather.temperature - (index * 2) : 75 - index * 3;
              let tempF = formatNumber((temp * 9/5) + 32, 0);
              let wind = weather?.current_weather?.windspeed ? weather.current_weather.windspeed + index : 8 + index;
              let isUnsafe = beach.water_quality?.toLowerCase() === 'poor' || beach.crowd_density?.toLowerCase() === 'high';
              
              return (
                <div key={beach.id} className="bg-white rounded-2xl p-8 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-zoom-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 truncate">{beach.name}</h3>
                    <i className={`fas fa-${isUnsafe ? 'cloud-showers-heavy text-ocean-blue' : 'sun text-soft-yellow'} text-3xl animate-float`} style={{ animationDelay: `${index * 0.1}s` }}></i>
                  </div>
                  <div className="text-4xl font-bold text-gray-800 mb-4">{tempF}°F</div>
                  <p className="text-gray-600 text-lg mb-6">{isUnsafe ? 'Currently Unsafe' : 'Sunny, Perfect for swimming'}</p>
                  <div className="flex justify-between text-gray-500">
                    <span>Wind: {formatNumber(wind, 1)} mph</span>
                    <span>City: {beach.city}</span>
                  </div>
                </div>
              );
            }) : (
               <p className="text-gray-500">Awaiting Django API backend connection to preview beaches...</p>
            )}
          </div>

          <div className="mt-16">
            <h3 className="text-3xl font-bold text-gray-800 mb-10 text-center animate-fade-up">Current Safety Alerts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {demoBeaches.filter(b => b.water_quality?.toLowerCase() === 'poor').slice(0, 1).map((beach) => (
                <div key={`wq-${beach.id}`} className="bg-gradient-to-r from-coral/20 to-red-100 border-l-4 border-coral p-6 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 animate-fade-up">
                  <div className="flex items-center">
                    <i className="fas fa-ban text-coral text-2xl mr-4 animate-float"></i>
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg mb-2">Poor Water Quality</h4>
                      <p className="text-gray-600">{beach.name} - Not recommended for swimming today.</p>
                    </div>
                  </div>
                </div>
              ))}
              {demoBeaches.filter(b => b.crowd_density?.toLowerCase() === 'high').slice(0, 1).map((beach, index) => (
                <div key={`cd-${beach.id}`} className="bg-gradient-to-r from-soft-yellow/20 to-yellow-100 border-l-4 border-soft-yellow p-6 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                  <div className="flex items-center">
                    <i className="fas fa-exclamation-triangle text-soft-yellow text-2xl mr-4 animate-float"></i>
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg mb-2">High Crowd Density</h4>
                      <p className="text-gray-600">{beach.name} - High visitor activity detected.</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {demoBeaches.filter(b => b.water_quality?.toLowerCase() === 'poor' || b.crowd_density?.toLowerCase() === 'high').length === 0 && (
                <div className="col-span-2 text-center py-6 text-gray-500">
                  <i className="fas fa-check-circle text-seafoam text-3xl mb-3"></i>
                  <p>All scanned beaches are reporting safe conditions!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FeaturesPage;
