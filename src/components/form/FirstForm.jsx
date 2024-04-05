import React, { useState } from "react";

export default function FirstForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    emailConfirm: "",
    phone: "",
    countryCode: "+91",
    countryOfBirth: "",
    cityOfBirth: "",
    maritalStatus: "",
    preferredLanguage: "",
    gender: "",
    dob: {
      year: "",
      month: "",
      day: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your logic to submit the form data
  };

  return (
    <div className="first-form">
      <form onSubmit={handleSubmit}>
        <div className="form-input-div">
          <label htmlFor="firstName">First name (required)</label>
          <input
            className=""
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            required
          />
        </div>
        <div>
          <label htmlFor="middleName">Middle name (optional)</label>
          <input
            type="text"
            id="middleName"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            placeholder="Enter your middle name"
          />
        </div>
        <div>
          <label htmlFor="lastName">Last name (required)</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email address (required)</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
          />
        </div>
        <div>
          <label htmlFor="emailConfirm">
            Email address (re-enter) (required)
          </label>
          <input
            type="email"
            id="emailConfirm"
            name="emailConfirm"
            value={formData.emailConfirm}
            onChange={handleChange}
            placeholder="Re-enter your email address"
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone (required)</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div>
          <label>Date of Birth (required)</label>
          <div>
            <input
              type="number"
              placeholder="Year"
              name="year"
              value={formData.dob.year}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "dob",
                    value: { ...formData.dob, year: e.target.value },
                  },
                })
              }
              required
            />
            <input
              type="number"
              placeholder="Month"
              name="month"
              value={formData.dob.month}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "dob",
                    value: { ...formData.dob, month: e.target.value },
                  },
                })
              }
              required
            />
            <input
              type="number"
              placeholder="Day"
              name="day"
              value={formData.dob.day}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "dob",
                    value: { ...formData.dob, day: e.target.value },
                  },
                })
              }
              required
            />
          </div>
        </div>
        <div>
          <label>Gender (required)</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Please Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Country of birth (required)</label>
          <input
            type="text"
            name="countryOfBirth"
            value={formData.countryOfBirth}
            onChange={handleChange}
            placeholder="Enter your country of birth"
            required
          />
        </div>
        <div>
          <label>City/town of birth (required)</label>
          <input
            type="text"
            name="cityOfBirth"
            value={formData.cityOfBirth}
            onChange={handleChange}
            placeholder="Enter your city/town of birth"
            required
          />
        </div>
        <div>
          <label>Marital status (required)</label>
          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            required
          >
            <option value="">Please select</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>
        <div>
          <label>Preferred language to contact you (required)</label>
          <select
            name="preferredLanguage"
            value={formData.preferredLanguage}
            onChange={handleChange}
            required
          >
            <option value="">Please select</option>
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
            {/* Add more languages as needed */}
          </select>
        </div>
        <div>
          <button type="submit">NEXT</button>
        </div>
      </form>
    </div>
  );
}
