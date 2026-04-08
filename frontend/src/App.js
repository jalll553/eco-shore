import { startTransition, useDeferredValue, useEffect, useState } from 'react';
import './App.css';
import { useEcoShoreData } from './hooks/useEcoShoreData';
import { normalizeRoute, pageLinks } from './lib/ecoshore';
import AtlasPage from './pages/AtlasPage';
import ConditionsPage from './pages/ConditionsPage';
import HomePage from './pages/HomePage';
import NearbyPage from './pages/NearbyPage';
import PulsePage from './pages/PulsePage';

function readRoute() {
  if (typeof window === 'undefined') {
    return '/';
  }

  return normalizeRoute(window.location.hash);
}

function App() {
  const [route, setRoute] = useState(readRoute);
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const {
    beaches,
    beachesError,
    isLoadingBeaches,
    isLoadingNearest,
    isLoadingWeather,
    locationError,
    nearestBeaches,
    weather,
    weatherError,
    selectedBeach,
    selectedBeachId,
    selectBeach,
    handleLocateMe,
    userLocation,
  } = useEcoShoreData();

  useEffect(() => {
    function syncRoute() {
      startTransition(() => {
        setRoute(readRoute());
      });
    }

    window.addEventListener('hashchange', syncRoute);

    return () => {
      window.removeEventListener('hashchange', syncRoute);
    };
  }, []);

  useEffect(() => {
    const activePage = pageLinks.find((page) => page.path === route) || pageLinks[0];
    document.title = `Ecoshore | ${activePage.title}`;

    if (typeof window.scrollTo === 'function') {
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        window.scrollTo(0, 0);
      }
    }
  }, [route]);

  const filteredBeaches = beaches.filter((beach) => {
    const haystack = `${beach.name} ${beach.city} ${beach.state}`.toLowerCase();
    return haystack.includes(deferredSearchTerm.toLowerCase());
  });

  function navigate(nextRoute) {
    const normalizedRoute = normalizeRoute(nextRoute);
    const nextHash = `#${normalizedRoute}`;

    if (window.location.hash !== nextHash) {
      window.location.hash = normalizedRoute;
      return;
    }

    startTransition(() => {
      setRoute(normalizedRoute);
    });
  }

  function handleLinkClick(event, nextRoute) {
    event.preventDefault();
    navigate(nextRoute);
  }

  function handleSelectBeach(beachId) {
    selectBeach(beachId);
  }

  let pageContent = (
    <HomePage
      beaches={beaches}
      nearestBeaches={nearestBeaches}
      onLocateMe={handleLocateMe}
      pageLinks={pageLinks}
      selectedBeach={selectedBeach}
      userLocation={userLocation}
      weather={weather}
      navigate={navigate}
    />
  );

  if (route === '/atlas') {
    pageContent = (
      <AtlasPage
        beaches={beaches}
        beachesError={beachesError}
        filteredBeaches={filteredBeaches}
        isLoadingBeaches={isLoadingBeaches}
        navigate={navigate}
        onSearchChange={setSearchTerm}
        searchTerm={searchTerm}
        selectBeach={handleSelectBeach}
        selectedBeach={selectedBeach}
        selectedBeachId={selectedBeachId}
      />
    );
  }

  if (route === '/conditions') {
    pageContent = (
      <ConditionsPage
        beaches={beaches}
        isLoadingWeather={isLoadingWeather}
        navigate={navigate}
        selectBeach={handleSelectBeach}
        selectedBeach={selectedBeach}
        selectedBeachId={selectedBeachId}
        weather={weather}
        weatherError={weatherError}
      />
    );
  }

  if (route === '/nearby') {
    pageContent = (
      <NearbyPage
        isLoadingNearest={isLoadingNearest}
        locationError={locationError}
        nearestBeaches={nearestBeaches}
        onLocateMe={handleLocateMe}
        selectBeach={handleSelectBeach}
        userLocation={userLocation}
        navigate={navigate}
      />
    );
  }

  if (route === '/pulse') {
    pageContent = (
      <PulsePage
        beaches={beaches}
        beachesError={beachesError}
        isLoadingBeaches={isLoadingBeaches}
        navigate={navigate}
        selectedBeach={selectedBeach}
      />
    );
  }

  return (
    <div className="bg-gradient-to-br from-sky-light via-white to-sand min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md shadow-lg fixed w-full z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="#/" onClick={(event) => handleLinkClick(event, '/')} style={{ textDecoration: 'none' }} className="flex-shrink-0 flex items-center animate-float">
                <div className="w-10 h-10 bg-gradient-to-br from-ocean-blue to-turquoise rounded-full flex items-center justify-center mr-3 shadow-lg">
                  <i className="fas fa-umbrella-beach text-white text-lg"></i>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-ocean-blue to-turquoise bg-clip-text text-transparent">Ecoshore</span>
              </a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {pageLinks.map((page) => (
                  <a
                    key={page.path}
                    className={`font-semibold px-3 py-2 rounded-lg text-sm transition-all duration-300 hover:bg-sky-light hover:scale-105 ${route === page.path ? 'text-ocean-blue' : 'text-gray-700 hover:text-ocean-blue'}`}
                    href={`#${page.path}`}
                    onClick={(event) => handleLinkClick(event, page.path)}
                  >
                    {page.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16 flex-grow">
        <div key={route}>
          {pageContent}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white py-16 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-ocean-blue to-turquoise rounded-full flex items-center justify-center mr-4 animate-float">
                  <i className="fas fa-umbrella-beach text-white text-xl"></i>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-ocean-blue to-turquoise bg-clip-text text-transparent">Ecoshore</span>
              </div>
              <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed">
                Your smart coastal companion for discovering beaches, staying safe, and planning perfect getaways.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 text-turquoise">Quick Links</h3>
              <div className="space-y-3">
                {pageLinks.map((page) => (
                  <a
                    key={page.path}
                    href={`#${page.path}`}
                    onClick={(event) => handleLinkClick(event, page.path)}
                    className="block text-gray-300 hover:text-ocean-blue transition-all duration-300 hover:translate-x-2"
                  >
                    {page.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 text-ocean-blue">Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <i className="fas fa-envelope text-ocean-blue mr-4 text-lg"></i>
                  <span className="text-gray-300">hello@ecoshore.com</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-phone text-turquoise mr-4 text-lg"></i>
                  <span className="text-gray-300">+1 (555) 123-4567</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-300 text-lg">
              © 2024 Ecoshore. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
