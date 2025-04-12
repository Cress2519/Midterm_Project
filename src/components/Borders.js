import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Borders({ borders }) {
  const [borderCountries, setBorderCountries] = useState([]);

  useEffect(() => {
    if (borders) {
      const fetchBorders = async () => {
        const responses = await Promise.all(borders.map(border =>
          axios.get(`https://restcountries.com/v3.1/alpha/${border}`)
        ));
        setBorderCountries(responses.map(response => response.data[0]));
      };

      fetchBorders();
    }
  }, [borders]);

  return (
    <div className="borders">
      <h3>Bordering Countries:</h3>
      <ul>
        {borderCountries.map(country => (
          <li key={country.cca3}>{country.name.common}</li>
        ))}
      </ul>
    </div>
  );
}

export default Borders;
