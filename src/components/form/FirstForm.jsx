// import "./FirstForm.scss";
import "../../styles/Forms.scss";
import React, { useEffect, useState } from "react";
import {
  CountrySelect,
  PhoneNumberCodeSelect,
} from "../../utils/components/form/SelectCountry";
import DatePicker from "../../utils/components/form/DatePicker";
import { useStore } from "../../context/stores/form/main";

export default function FirstForm() {
  const { currentComponent, setCurrentComponent } = useStore();

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    emailConfirm: "",
    phoneCode: "",
    phone: "",
    phoneConfirm: "",
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

  const [emailMatch, setEmailMatch] = useState("");
  const [phoneMatch, setPhoneMatch] = useState("");

  const handlePaste = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.email === formData.emailConfirm &&
      formData.phone === formData.phoneConfirm
    ) {
      setCurrentComponent(currentComponent + 1);
    }
  };

  useEffect(() => {
    if (formData.email !== formData.emailConfirm) {
      setEmailMatch("Email Does not match");
    } else {
      setEmailMatch("required");
    }

    if (formData.phone !== formData.phoneConfirm) {
      setPhoneMatch("Phone no. Does not match");
    } else {
      setPhoneMatch("required");
    }

    // console.log(formData.dob);
  }, [formData]);

  return (
    <div className="my-form">
      <form onSubmit={handleSubmit}>
        <section className="form-section">
          <div className="form-container">
            <label htmlFor="firstName">
              * First name{" "}
              <span className="text-red-500 italic">(required)</span>
            </label>
            <input
              className="input-field"
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="form-container">
            <label htmlFor="middleName">Middle name (optional)</label>
            <input
              className="input-field"
              type="text"
              id="middleName"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              placeholder="Enter your middle name"
            />
          </div>
          <div className="form-container">
            <label htmlFor="lastName">
              Last name <span className="text-red-500 italic">(required)</span>
            </label>
            <input
              className="input-field"
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

        <section className="form-section">
          <div className="form-container">
            <label htmlFor="email">
              * Email address{" "}
              <span className="text-red-500 italic">(required)</span>
            </label>
            <input
              className="input-field"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
            />
          </div>
          <div className="form-container">
            <label htmlFor="emailConfirm">
              * Email address (re-enter){" "}
              <span className="text-red-500 italic">({emailMatch})</span>
            </label>
            <input
              className="input-field"
              type="email"
              id="emailConfirm"
              name="emailConfirm"
              value={formData.emailConfirm}
              onChange={handleChange}
              placeholder="Re-enter your email address"
              onPaste={handlePaste}
              required
            />
          </div>
        </section>

        <section className="form-section">
          <div className="form-container">
            <label htmlFor="phone">
              * Phone <span className="text-red-500 italic">(required)</span>
            </label>
            <div className="phone-number-div">
              <PhoneNumberCodeSelect
                handleChange={handleChange}
                formData={formData}
              />
              <input
                className="input-field"
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>

          <div className="form-container">
            <label htmlFor="phoneConfirm">
              * Re-Phone{" "}
              <span className="text-red-500 italic">({phoneMatch})</span>
            </label>
            <div className="phone-number-div">
              <PhoneNumberCodeSelect
                handleChange={handleChange}
                formData={formData}
              />
              <input
                className="input-field"
                type="tel"
                id="phoneConfirm"
                name="phoneConfirm"
                value={formData.phoneConfirm}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>
        </section>

        <section className="form-section">
          <div className="form-container">
            <label htmlFor="dob">
              * Date of Birth{" "}
              <span className="text-red-500 italic">(required)</span>
            </label>
            <div className="date-picker">
              <DatePicker handleChange={handleChange} formData={formData} />
            </div>
          </div>

          <div className="form-container">
            <label htmlFor="gender">
              * Gender <span className="text-red-500 italic">(required)</span>
            </label>
            <select
              className="input-field"
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

        <section className="form-section">
          <div className="form-container">
            <label htmlFor="countryOfBirth">
              * City/town of birth{" "}
              <span className="text-red-500 italic">(required)</span>
            </label>
            <CountrySelect
              handleChange={handleChange}
              formData={formData}
              name="countryOfBirth"
            />
          </div>

          <div className="form-container">
            <label htmlFor="cityOfBirth">
              * City/town of birth{" "}
              <span className="text-red-500 italic">(required)</span>
            </label>
            <input
              className="input-field"
              type="text"
              name="cityOfBirth"
              value={formData.cityOfBirth}
              onChange={handleChange}
              placeholder="Enter your city/town of birth"
              required
            />
          </div>
        </section>

        <section className="form-section">
          <div className="form-container">
            <label htmlFor="maritalStatus">
              * Marital status{" "}
              <span className="text-red-500 italic">(required)</span>
            </label>
            <select
              className="input-field"
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
          <div className="form-container">
            <label htmlFor="preferredLanguage">
              * Preferred language to contact you{" "}
              <span className="text-red-500 italic">(required)</span>
            </label>
            <select
              className="input-field"
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

        <div className="form-container items-end">
          <button type="submit" className="submit-button">
            NEXT
          </button>
        </div>
      </form>
    </div>
  );
}
