import React, { useState } from 'react';
import Layout from '../components/Layout';
import hospitalData from './hospitalData.json'; // Import JSON data

const Phone = () => {
  const [city, setCity] = useState('');
  const [searchResult, setSearchResult] = useState(null); // Initialize with null

  const handleSearch = () => {
    const cityData = fetchHospitalData(city.toLowerCase()); // Convert entered city to lowercase
    setSearchResult(cityData);
  };

  const fetchHospitalData = (cityName) => {
    const cityData = hospitalData.find(item => item.city.toLowerCase() === cityName); // Convert city name in data to lowercase
    return cityData ? cityData : { city: cityName, hospitals: [] };
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Layout>
      <h1 className='page-title'>Emergency Phone Numbers</h1>
      <hr />
      <div>
        <h1 className='normal-text inc'>Enter City Name: </h1><br />
        <div className='d-flex align-items-center mb-4'>
          <input
            className='input'
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress} // Add event listener for key press
          />
          <button className='search' onClick={handleSearch}>Search</button>
        </div>
      </div>
      {searchResult && (
        <div>
          <h2>Hospitals in {searchResult.city}</h2>
          <ul>
            {searchResult.hospitals.map((hospital, index) => (
              <li key={index}>
                <strong>{hospital.name}</strong>: {hospital.phone}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Layout>
  );
};

export default Phone;
