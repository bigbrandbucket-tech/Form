import "./FirstForm.scss";
import React, { useEffect, useState } from "react";
import {
  SelectCountry,
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

    console.log(formData.dob);
  }, [formData]);

  return (
    <div className="first-form">
      <form onSubmit={handleSubmit}>
        <section>
          <div className="">
            <label htmlFor="firstName">
              * First name{" "}
              <span className="text-red-500 italic">(required)</span>
            </label>
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
            <label htmlFor="lastName">
              Last name{" "}
              <span className="text-red-500 italic"> (required) </span>
            </label>
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
            <label>
              * Email address{" "}
              <span className="text-red-500 italic">(required)</span>
            </label>
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
            <label>
              * Email address (re-enter){" "}
              <span className="text-red-500 italic">({emailMatch})</span>
            </label>
            <input
              className=""
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

        <section className="flex">
          <div>
            <label>
              * Phone <span className="text-red-500 italic">(required)</span>
            </label>
            <div className="phone-number-div">
              <PhoneNumberCodeSelect
                handleChange={handleChange}
                formData={formData}
              />

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
          </div>

          <div>
            <label>
              * Re-Phone{" "}
              <span className="text-red-500 italic">({phoneMatch})</span>
            </label>
            <div className="phone-number-div">
              <PhoneNumberCodeSelect
                handleChange={handleChange}
                formData={formData}
              />
              <input
                className=""
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

        <section>
          <div>
            <label>
              * Date of Birth{" "}
              <span className="text-red-500 italic">(required)</span>
            </label>
            <div>
              <section className="date-of-birth">
                <DatePicker handleChange={handleChange} formData={formData} />
              </section>
            </div>
          </div>

          <div>
            <label>
              * Gender <span className="text-red-500 italic">(required)</span>
            </label>
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
          <SelectCountry handleChange={handleChange} formData={formData} />
          <div>
            <label>
              * City/town of birth{" "}
              <span className="text-red-500 italic">(required)</span>
            </label>
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
            <label>
              * Marital status{" "}
              <span className="text-red-500 italic">(required)</span>
            </label>
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
            <label>
              * Preferred language to contact you{" "}
              <span className="text-red-500 italic">(required)</span>
            </label>
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

// function DatePicker({ handleChange, formData }) {
//   const monthNames = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   const getDaysInMonth = (year, month) => {
//     return new Date(year, month, 0).getDate();
//   };

//   // Function to generate an array of numbers from 1 to n
//   const range = (start, end) => {
//     return Array.from({ length: end - start + 1 }, (_, i) => start + i);
//   };

//   // Year options (adjust the range as needed)
//   const yearOptions = range(
//     new Date().getFullYear() - 100,
//     new Date().getFullYear()
//   ).reverse();

//   return (
//     <>
//       <select
//         name="year"
//         value={formData.dob.year}
//         onChange={(e) =>
//           handleChange({
//             target: {
//               name: "dob",
//               value: { ...formData.dob, year: e.target.value },
//             },
//           })
//         }
//         required
//       >
//         <option value="">Year</option>
//         {/* Generate options for years */}
//         {yearOptions.map((year) => (
//           <option key={year} value={year}>
//             {year}
//           </option>
//         ))}
//       </select>

//       <select
//         name="month"
//         value={formData.dob.month}
//         onChange={(e) => {
//           const monthValue = e.target.value;
//           const yearValue = formData.dob.year;
//           const daysInMonth =
//             monthValue && yearValue
//               ? getDaysInMonth(yearValue, monthValue)
//               : 31; // Default to 31 days if month or year is not selected

//           handleChange({
//             target: {
//               name: "dob",
//               value: {
//                 ...formData.dob,
//                 month: monthValue,
//                 day: formData.dob.day > daysInMonth ? "" : formData.dob.day,
//               }, // Reset day if it exceeds the number of days in the selected month
//             },
//           });
//         }}
//         required
//       >
//         <option value="">Month</option>
//         {/* Generate options for months */}
//         {monthNames.map((month, index) => (
//           <option key={index + 1} value={index + 1}>
//             {month}
//           </option>
//         ))}
//       </select>

//       <select
//         name="day"
//         value={formData.dob.day}
//         onChange={(e) =>
//           handleChange({
//             target: {
//               name: "dob",
//               value: { ...formData.dob, day: e.target.value },
//             },
//           })
//         }
//         required
//       >
//         <option value="">Day</option>
//         {/* Generate options for days based on the selected month and year */}
//         {range(1, getDaysInMonth(formData.dob.year, formData.dob.month)).map(
//           (day) => (
//             <option key={day} value={day}>
//               {day}
//             </option>
//           )
//         )}
//       </select>
//     </>
//   );
// }

// import { countries } from "countries-list"; // Importing countries list from the package

// function SelectCountry({ handleChange, formData }) {
//   // Convert the object of countries into an array of objects
//   const countryOptions = Object.keys(countries).map((countryCode) => ({
//     code: countryCode,
//     name: countries[countryCode].name,
//   }));

//   return (
//     <div>
//       <label>
//         * Country of birth{" "}
//         <span className="text-red-500 italic">(required)</span>
//       </label>
//       <select
//         name="countryOfBirth"
//         value={formData.countryOfBirth}
//         onChange={handleChange}
//         required
//       >
//         <option value="">Select Country</option>
//         {/* Map over the countryOptions array and create an option for each country */}
//         {countryOptions.map((country) => (
//           <option key={country.code} value={country.code}>
//             {country.name}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

// function PhoneNumberCodeSelect({ handleChange, formData }) {
//   // Convert the object of countries into an array of objects
//   const countryOptions = Object.keys(countries).map((countryCode) => ({
//     code: "+" + countries[countryCode].phone,
//     name: countries[countryCode].name,
//   }));

//   return (
//     <select
//       name="countryCode"
//       value={formData.countryCode}
//       onChange={handleChange}
//       required
//     >
//       <option value="">Please Select</option>
//       {countryOptions.map((country, index) => (
//         <option key={index} value={country.code}>
//           {country.code} {country.name}
//         </option>
//       ))}
//     </select>
//   );
// }
