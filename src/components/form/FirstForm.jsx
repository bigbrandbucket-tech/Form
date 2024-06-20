// import "./FirstForm.scss";
import "../../styles/Forms.scss";
import React, { useEffect, useState } from "react";
import {
  CountrySelect,
  PhoneNumberCodeSelect,
} from "../../utils/components/form/SelectCountry";
import DatePicker from "../../utils/components/form/DatePicker";
import { useStore } from "../../context/stores/form/main";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function FirstForm() {
  const { currentComponent, setCurrentComponent } = useStore();
  const { currentState, setCurrentState } = useStore();

  // 1	ID Primary	varchar(255)	utf8mb4_unicode_ci		No	None			Change Change	Drop Drop
  // 2	firstName	varchar(255)	utf8mb4_unicode_ci		Yes	NULL			Change Change	Drop Drop
  // 3	middleName	varchar(255)	utf8mb4_unicode_ci		Yes	NULL			Change Change	Drop Drop
  // 4	lastName	varchar(255)	utf8mb4_unicode_ci		Yes	NULL			Change Change	Drop Drop
  // 5	email	varchar(255)	utf8mb4_unicode_ci		Yes	NULL			Change Change	Drop Drop
  // 6	phoneNumberExt	varchar(255)	utf8mb4_unicode_ci		Yes	NULL			Change Change	Drop Drop
  // 7	phoneNumber	varchar(255)	utf8mb4_unicode_ci		Yes	NULL			Change Change	Drop Drop
  // 8	dob	date			Yes	NULL			Change Change	Drop Drop
  // 9	gender	varchar(255)	utf8mb4_unicode_ci		Yes	NULL			Change Change	Drop Drop
  // 10	countryOfBIrth	date			Yes	NULL			Change Change	Drop Drop
  // 11	cityOfBirth	varchar(255)	utf8mb4_unicode_ci		Yes	NULL			Change Change	Drop Drop
  // 12	martialStatus	varchar(255)	utf8mb4_unicode_ci		Yes	NULL			Change Change	Drop Drop
  // 13	preferredLanguage

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    emailConfirm: "",
    phoneCode: "",
    phoneNumber: "",
    phoneConfirm: "",
    phoneNumberExt: "+91",
    countryOfBIrth: "",
    cityOfBirth: "",
    martialStatus: "",
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

  let { id } = useParams();

  const parseDate = (dateString) => {
    const date = new Date(dateString);
    console.log(date, dateString);
    const day = date.getDate();
    const monthName = date.getMonth();
    const year = date.getFullYear();
    return [`${day}`, `${monthName}`, `${year}`];
  };

  const checkID = async () => {
    const response = await axios.get(
      `https://form-backend-gamma.vercel.app/api/user/${id}`
    );
    console.log(parseDate(response.data.dob)[0]);
    setFormData({
      ...response.data,
      emailConfirm: response.data.email,
      phoneConfirm: response.data.phoneNumber,
      dob: {
        day: parseDate(response.data.dob)[0],
        month: parseDate(response.data.dob)[1],
        year: parseDate(response.data.dob)[2],
      },
    });
  };

  useEffect(() => {
    console.log(id);
    if (id) {
      checkID();
      const filteredData = Object.keys(formData)
        .filter((key) => key !== "emailConfirm" && key !== "phoneConfirm")
        .reduce((obj, key) => {
          obj[key] = formData[key];
          return obj;
        }, {});
      setCurrentState(filteredData);
    }
    // return () => setCurrentState(filteredData)
  }, [formData.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setCurrentState(formData);
  };

  const handleSubmit = async (e) => {
    console.log("response");
    e.preventDefault();
    if (
      formData.email === formData.emailConfirm &&
      formData.phoneNumber === formData.phoneConfirm
    ) {
      // setCurrentComponent(currentComponent + 1);

      const insertData = async () => {
        if (id) {
          const response = await axios.put(
            `https://form-backend-gamma.vercel.app/api/user/${id}`,
            {
              firstName: formData.firstName,
              middleName: formData.middleName,
              lastName: formData.lastName,
              email: formData.email,
              phoneNumber: formData.phoneNumber,
              phoneNumberExt: formData.phoneNumberExt,
              countryOfBIrth: formData.countryOfBIrth,
              cityOfBirth: formData.cityOfBirth,
              martialStatus: formData.martialStatus,
              preferredLanguage: formData.preferredLanguage,
              gender: formData.gender,
              dob: new Date(
                formData.dob.year,
                formData.dob.month,
                formData.dob.day
              ),
            }
          );
        } else {
          const response = await axios.post(
            "https://form-backend-gamma.vercel.app/api/user",
            {
              firstName: formData.firstName,
              middleName: formData.middleName,
              lastName: formData.lastName,
              email: formData.email,
              phoneNumber: formData.phoneNumber,
              phoneNumberExt: formData.phoneNumberExt,
              countryOfBIrth: formData.countryOfBIrth,
              cityOfBirth: formData.cityOfBirth,
              martialStatus: formData.martialStatus,
              preferredLanguage: formData.preferredLanguage,
              gender: formData.gender,
              dob: new Date(
                formData.dob.year,
                formData.dob.month,
                formData.dob.day
              ),
            }
          );
          console.log(response);
          setCurrentState({ ...currentState, ID: response.data.id });
        }
      };
      try {
        await insertData();
        setCurrentComponent(currentComponent + 1);
      } catch {
        console.log("ERROR in Submission");
      }
    }
  };

  useEffect(() => {
    if (formData.email !== formData.emailConfirm) {
      setEmailMatch("Email Does not match");
    } else {
      setEmailMatch("required");
    }

    if (formData.phoneNumber !== formData.phoneConfirm) {
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
            <label htmlFor="phoneNumber">
              * Phone <span className="text-red-500 italic">(required)</span>
            </label>
            <div className="phoneNumber-number-div">
              <PhoneNumberCodeSelect
                handleChange={handleChange}
                formData={formData}
                name="phoneNumberExt"
              />
              <input
                className="input-field"
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phoneNumber number"
                required
              />
            </div>
          </div>

          <div className="form-container">
            <label htmlFor="phoneConfirm">
              * Re-Phone{" "}
              <span className="text-red-500 italic">({phoneMatch})</span>
            </label>
            <div className="phoneNumber-number-div">
              <PhoneNumberCodeSelect
                handleChange={handleChange}
                formData={formData}
                name="phoneNumberExt"
              />
              <input
                className="input-field"
                type="tel"
                id="phoneConfirm"
                name="phoneConfirm"
                value={formData.phoneConfirm}
                onChange={handleChange}
                placeholder="Enter your phoneNumber number"
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
            <label htmlFor="countryOfBIrth">
              * Country/region of birth{" "}
              <span className="text-red-500 italic">(required)</span>
            </label>
            <CountrySelect
              handleChange={handleChange}
              formData={formData}
              name="countryOfBIrth"
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
            <label htmlFor="martialStatus">
              * Marital status{" "}
              <span className="text-red-500 italic">(required)</span>
            </label>
            <select
              className="input-field"
              name="martialStatus"
              value={formData.martialStatus}
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
