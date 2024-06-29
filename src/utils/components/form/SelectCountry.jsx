import { countries } from "countries-list"; // Importing countries list from the package
import React, { useState } from "react";
import { customCountries } from "../../countries";

export function SelectCountry({ handleChange, formData }) {
  // Convert the object of countries into an array of objects

   
  
 
  
  const countryOptions = Object.keys(customCountries).map((countryCode) => ({
    code: countryCode,
    name: countries[countryCode].name,
  }));
  console.log('countryOptions',countryOptions);
  return (
    <div>
      <label>
        * Country of birth{" "}
        <span className="text-red-500 italic">(required)</span>
      </label>
      <select
        name="countryOfBIrth"
        value={formData.countryOfBIrth}
        onChange={handleChange}
        required
        className="input-field"
      >
        <option value="">Select Country</option>
        {/* Map over the countryOptions array and create an option for each country */}
        {countryOptions.map((country) => (
          <option key={country.name} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export function CountrySelect({ handleChange, formData, name }) {
  // Convert the object of countries into an array of objects
  const countryOptions = Object.keys(customCountries).map((countryCode) => ({
    code: countryCode,
    name: customCountries[countryCode].name,
  }));

  return (
    <select
      name={name}
      value={formData[name]}
      onChange={handleChange}
      required
      className="input-field"
    >
      <option value="">Select Country</option>
      {/* Map over the countryOptions array and create an option for each country */}
      {countryOptions.map((country) => (
        <option key={country.code} value={country.code}>
          {country.name}
        </option>
      ))}
    </select>
  );
}

export function PhoneNumberCodeSelect({ handleChange, formData, name }) {
  // Convert the object of countries into an array of objects
  const countryOptions = Object.keys(countries).map((countryCode) => ({
    code: "+" + countries[countryCode].phone,
    name: countries[countryCode].name,
  }));

  return (
    <select
      className="input-field"
      name={name}
      value={formData[name]}
      onChange={handleChange}
      required
    >
      <option value="">Please Select</option>
      {countryOptions.map((country, index) => (
        <option key={index} value={country.code}>
          {country.name} {country.code}
        </option>
      ))}
    </select>
  );
}
