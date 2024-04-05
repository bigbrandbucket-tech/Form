import "./FirstForm.scss";
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
  };

  return (
    <div className="first-form">
      <form onSubmit={handleSubmit}>
        <section>
          <div className="">
            <label htmlFor="firstName">* First name (required)</label>
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
          <div className="">
            <label htmlFor="middleName">Middle name (optional)</label>
            <input
              className=""
              type="text"
              id="middleName"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              placeholder="Enter your middle name"
            />
          </div>
          <div className="">
            <label htmlFor="lastName">Last name (required)</label>
            <input
              className=""
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              required
            />
          </div>
        </section>

        <section>
          <div>
            <label>* Email address (required)</label>
            <input
              className=""
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
            <label>* Email address (re-enter) (required)</label>
            <input
              className=""
              type="email"
              id="emailConfirm"
              name="emailConfirm"
              value={formData.emailConfirm}
              onChange={handleChange}
              placeholder="Re-enter your email address"
              required
            />
          </div>
        </section>

        <section className="flex">
          <div>
            <label>* Phone (required)</label>
            <input
              className=""
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
            <label>* Re-Phone (required)</label>
            <input
              className=""
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>
        </section>

        <section>
          <div>
            <label>* Date of Birth (required)</label>
            <div>
              <section className="date-of-birth">
                <input
                  className=""
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
                  className=""
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
                  className=""
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
              </section>
            </div>
          </div>

          <div>
            <label>* Gender (required)</label>
            <select
              className=""
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
        </section>

        <section>
          <div>
            <label>* Country of birth (required)</label>
            <input
              className=""
              type="text"
              name="countryOfBirth"
              value={formData.countryOfBirth}
              onChange={handleChange}
              placeholder="Enter your country of birth"
              required
            />
          </div>
          <div>
            <label>* City/town of birth (required)</label>
            <input
              className=""
              type="text"
              name="cityOfBirth"
              value={formData.cityOfBirth}
              onChange={handleChange}
              placeholder="Enter your city/town of birth"
              required
            />
          </div>
        </section>

        <section>
          <div>
            <label>* Marital status (required)</label>
            <select
              className=""
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
            <label>* Preferred language to contact you (required)</label>
            <select
              className=""
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
        </section>

        <div className="items-end">
          <button type="submit" className="submit-button">
            NEXT
          </button>
        </div>
      </form>
    </div>
  );
}
