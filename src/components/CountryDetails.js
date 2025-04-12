import React from 'react';

function CountryDetails({ country, onBorderClick }) {
  const currencies = country.currencies
    ? Object.values(country.currencies).map(c => c.name).join(', ')
    : 'N/A';

  const languages = country.languages
    ? Object.values(country.languages).join(', ')
    : 'N/A';

  const borders = country.borders || [];

  return (
    <div className="card p-4 shadow mt-3 w-75 mx-auto"> {/* Adjusted width using w-75 */}
      <div className="text-center mb-3">
        <img 
          src={country.flags?.png || country.flags?.svg} 
          alt={`${country.name.common} flag`} 
          className="img-fluid" 
          style={{ maxHeight: '150px' }} 
        />
      </div>

      <h4>{country.name.common}</h4>
      <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Subregion:</strong> {country.subregion}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Area:</strong> {country.area.toLocaleString()} km²</p>
      <p><strong>Coordinates:</strong> {country.latlng?.join(', ')}</p>
      <p><strong>Timezones:</strong> {country.timezones?.join(', ')}</p>
      <p><strong>Currency:</strong> {currencies}</p>
      <p><strong>Languages:</strong> {languages}</p>

      <div>
        <strong>Borders:</strong>
        {borders.length > 0 ? (
          <ul>
            {borders.map((borderCode, index) => (
              <li key={index}>
                <button onClick={() => onBorderClick(borderCode)}>
                  {borderCode}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No border countries</p>
        )}
      </div>
    </div>
  );
}

export default CountryDetails;
