import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar'; // ✅ import your SearchBar component
import CountryDetails from '../components/CountryDetails'; // ✅ assuming you have this


function Home() {
  const [country, setCountry] = useState(null);
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedPopulation, setSelectedPopulation] = useState('');

  const fetchCountry = (name) => {
    axios.get(`https://restcountries.com/v3.1/name/${name}`)
      .then(res => {
        setCountry(res.data[0]);
      })
      .catch(() => {
        setCountry(null); // if country not found
      });
  };

  
  const fetchAllCountries = () => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(res => {
        setAllCountries(res.data);
        setFilteredCountries(res.data); // Initialize filtered countries with all countries
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchCountry('Afghanistan');
    fetchAllCountries(); // Fetch all countries for filtering
  }, []);

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
    filterCountries(e.target.value, selectedPopulation);
  };

  const handlePopulationChange = (e) => {
    setSelectedPopulation(e.target.value);
    filterCountries(selectedRegion, e.target.value);
  };

  const filterCountries = (region, population) => {
    let filtered = allCountries;

    if (region) {
      filtered = filtered.filter(country => country.region === region);
    }

    if (population) {
      filtered = filtered.filter(country => country.population > population);
    }

    setFilteredCountries(filtered);
  };

  const handleBorderClick = (borderCode) => {
    fetchCountry(borderCode); // fetch border country details
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Country Info Viewer</h1>
      
      <div className="d-flex justify-content-center mb-4">
        {/* Search Bar */}
        <SearchBar onSearch={fetchCountry} /> 
        
        {/* Region Dropdown */}
        <div className="ms-3">
          <select 
            className="form-select" 
            value={selectedRegion} 
            onChange={handleRegionChange}
            style={{ maxWidth: '200px' }}
          >
            <option value="">Select Region</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Africa">Africa</option>
            <option value="Oceania">Oceania</option>
            <option value="Americas">Americas</option>
          </select>
        </div>

        {/* Population Size Dropdown */}
        <div className="ms-3">
          <select 
            className="form-select" 
            value={selectedPopulation} 
            onChange={handlePopulationChange}
            style={{ maxWidth: '200px' }}
          >
            <option value="">Select Population Size</option>
            <option value="10000000">Over 10 million</option>
            <option value="50000000">Over 50 million</option>
            <option value="100000000">Over 100 million</option>
            <option value="500000000">Over 500 million</option>
          </select>
        </div>
      </div>

      {/* Display country details if found */}
      {country ? (
         <div className="mb-4">
        <CountryDetails 
          country={country} 
          onBorderClick={handleBorderClick}  // Make sure this line is here
        />
         </div>
      ) : (
        <p className="text-danger">Country not found.</p>
      )}

      {/* Display filtered countries */}
      <div className="row">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div className="col-md-4 mb-4" key={country.cca3}>
                 
              <div className="card">
                <img
                  src={country.flags.png}
                  alt={`${country.name.common} flag`}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{country.name.common}</h5>
                  <button
                    className="btn btn-primary"
                    onClick={() => fetchCountry(country.name.common)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No countries match your filter criteria.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
