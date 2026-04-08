import {
  buildMapUrl,
  formatLabel,
  formatNumber,
  formatObservationTime,
  getWeatherDescription,
} from '../lib/ecoshore';

function HomePage({
  beaches,
  nearestBeaches,
  onLocateMe,
  pageLinks,
  selectedBeach,
  userLocation,
  weather,
  navigate,
}) {
  const statesCovered = new Set(beaches.map((beach) => beach.state).filter(Boolean)).size;
  const weatherDetails = weather?.current_weather;
  const previewPages = pageLinks.filter((page) => page.path !== '/');
  const nearestPreview = nearestBeaches[0];

  return (
    <div className="w-full">
      {/* Hero Section with Video Background */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="https://player.vimeo.com/external/370467553.sd.mp4?s=e90dcaba73c19e0e36f03406b47bbd6a92d6e9a6&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
        </video>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-blue/80 via-turquoise/70 to-transparent"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 animate-fade-up drop-shadow-lg">
            <span className="text-soft-yellow animate-glow">Ecoshore</span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-sky-light">Your Smart Coastal Companion</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto animate-fade-up drop-shadow-md" style={{ animationDelay: '0.2s' }}>
            Discover beaches, stay safe, and plan perfect getaways with real-time data and community insights.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate('/atlas')} 
              className="inline-block bg-gradient-to-r from-coral to-soft-yellow text-white px-10 py-5 rounded-full text-xl font-bold shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-coral/50 animate-glow"
            >
              <i className="fas fa-compass mr-2"></i>
              Open Beach Atlas
            </button>
            <button 
              onClick={() => navigate('/conditions')} 
              className="inline-block bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/50 text-white px-10 py-5 rounded-full text-xl font-bold shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <i className="fas fa-cloud-sun mr-2"></i>
              Check Forecast
            </button>
          </div>
        </div>
      </section>

      {/* About Section (Dynamic stats) */}
      <section className="py-24 bg-gradient-to-br from-white via-sky-light to-turquoise/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
              Live from the <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean-blue to-turquoise">Shoreline</span>
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-2xl text-gray-700 mb-10 leading-relaxed">
                Ecoshore bridges the gap between travelers and real-time beach data, creating a comprehensive platform 
                that enhances coastal experiences while promoting safety and environmental awareness.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center animate-zoom-in bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-br from-seafoam to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-float">
                <i className="fas fa-water text-white text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Beaches Tracked</h3>
              <p className="text-gray-600 text-lg font-bold text-4xl mt-2">{beaches.length}</p>
            </div>
            <div className="text-center animate-zoom-in bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105" style={{ animationDelay: '0.2s' }}>
              <div className="w-20 h-20 bg-gradient-to-br from-coral to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-float" style={{ animationDelay: '0.2s' }}>
                <i className="fas fa-map-marker-alt text-white text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Location Mode</h3>
              <p className="text-gray-600 text-lg font-bold text-4xl mt-2">
                {userLocation ? `${formatNumber(userLocation.latitude, 1)}°` : 'Off'}
              </p>
            </div>
            <div className="text-center animate-zoom-in bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105" style={{ animationDelay: '0.4s' }}>
              <div className="w-20 h-20 bg-gradient-to-br from-ocean-blue to-turquoise rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-float" style={{ animationDelay: '0.4s' }}>
                <i className="fas fa-clock text-white text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Real-Time Data</h3>
              <p className="text-gray-600 text-lg mt-2">Always current, always accurate beach information</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Features Preview from original template routing to app pages */}
      <section className="py-24 bg-gradient-to-br from-turquoise/5 via-ocean-blue/5 to-sky-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean-blue to-turquoise">Ecoshore</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-ocean-blue/10 to-turquoise/20 rounded-2xl p-8 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fade-up flex flex-col items-center text-center cursor-pointer" onClick={() => navigate('/atlas')}>
              <div className="w-16 h-16 bg-gradient-to-br from-ocean-blue to-turquoise rounded-2xl flex items-center justify-center mb-6 animate-float">
                <i className="fas fa-search text-white text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Smart Search</h3>
              <p className="text-gray-600 leading-relaxed">Find perfect beaches based on your preferences and real-time conditions.</p>
            </div>

            <div className="bg-gradient-to-br from-coral/10 to-pink-100 rounded-2xl p-8 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fade-up flex flex-col items-center text-center cursor-pointer" style={{ animationDelay: '0.1s' }} onClick={() => navigate('/pulse')}>
              <div className="w-16 h-16 bg-gradient-to-br from-coral to-pink-500 rounded-2xl flex items-center justify-center mb-6 animate-float" style={{ animationDelay: '0.1s' }}>
                <i className="fas fa-chart-line text-white text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Data Pulse</h3>
              <p className="text-gray-600 leading-relaxed">View analytical data and insights about crowd densities and water quality.</p>
            </div>

            <div className="bg-gradient-to-br from-soft-yellow/20 to-orange-100 rounded-2xl p-8 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fade-up flex flex-col items-center text-center cursor-pointer" style={{ animationDelay: '0.2s' }} onClick={() => navigate('/nearby')}>
              <div className="w-16 h-16 bg-gradient-to-br from-soft-yellow to-orange-500 rounded-2xl flex items-center justify-center mb-6 animate-float" style={{ animationDelay: '0.2s' }}>
                <i className="fas fa-location-arrow text-white text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Nearby Beaches</h3>
              <p className="text-gray-600 leading-relaxed">Locate the best shoreline spots nearest to your current location.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
