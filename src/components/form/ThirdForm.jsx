import "../../styles/Forms.scss";

import React, { useEffect, useState } from "react";
import {
  PhoneNumberCodeSelect,
  CountrySelect,
} from "../../utils/components/form/SelectCountry";
import DatePicker from "../../utils/components/form/DatePicker";
import { useStore } from "../../context/stores/form/main";

export default function ThirdForm() {
  const { currentComponent, setCurrentComponent } = useStore();

  const [passportData, setPassportData] = useState({
    passportNumber: "",
    passportNumberReenter: "",
    issueDate: { year: "", month: "", day: "" },
    endDate: { year: "", month: "", day: "" },
    countryNationality: "",
  });

  const [matchData, setMatchData] = useState({
    passportNumber: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassportData({ ...passportData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(matchData).every((value) => value)) {
      setCurrentComponent(currentComponent + 1);
    }
  };

  useEffect(() => {
    setMatchData({
      passportNumber:
        passportData.passportNumber === passportData.passportNumberReenter,
    });
  }, [passportData]);

  return (
    <div className="my-form">
      <form onSubmit={handleSubmit}>
        <section className="form-section">
          <div className="form-container">
            <label htmlFor="passportNumber">
              <span className="text-red-500 italic">*</span> Passport number{" "}
              <span className="text-red-500 italic">(required)</span>
            </label>
            <input
              type="text"
              name="passportNumber"
              placeholder="Enter passport number"
              value={passportData.passportNumber}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div className="form-container">
            <label htmlFor="passportNumberReenter">
              <span className="text-red-500 italic">*</span> Passport number
              (re-enter){" "}
              <span className="text-red-500 italic">
                (
                {matchData.passportNumber
                  ? "required"
                  : "Passport number does not match"}
                )
              </span>
            </label>
            <input
              type="text"
              name="passportNumberReenter"
              placeholder="Re-enter passport number"
              value={passportData.passportNumberReenter}
              onChange={handleChange}
              required
              onPaste={(e) => e.preventDefault()}
              className="input-field"
            />
          </div>
        </section>

        <section className="form-section">
          <div className="form-container">
            <label htmlFor="issueDate">
              <span className="text-red-500 italic">*</span> Passport Issue Date{" "}
              <span className="text-red-500 italic">(required)</span>
            </label>
            <div className="date-picker">
              <DatePicker
                formData={passportData}
                handleChange={handleChange}
                name="issueDate"
              />
            </div>
          </div>

          <div className="form-container">
            <label htmlFor="endDate">
              <span className="text-red-500 italic">*</span> Passport Expiry
              Date <span className="text-red-500 italic">(required)</span>
            </label>
            <div>
              <div className="date-picker">
                <DatePicker
                  formData={passportData}
                  handleChange={handleChange}
                  name="endDate"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="form-section">
          <div className="form-container">
            <label htmlFor="countryNationality">
              <span className="text-red-500 italic">*</span> Passport
              Country/Nationality{" "}
              <span className="text-red-500 italic">(required)</span>
            </label>
            <CountrySelect
              formData={passportData}
              handleChange={handleChange}
              name="countryNationality"
            />
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

//

function ThirdForms() {
  const { currentComponent, setCurrentComponent } = useStore();

  const [formData, setFormData] = useState({
    someoneElse: "NO",
    iam: "",
    surnames: "",
    givenNames: "",
    mailingAddress: "",
    countryCode: "+91",
    phone: "",
    declaration: "",
    authorization: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentComponent(currentComponent + 1);
  };

  return (
    <div className="second-form">
      <form onSubmit={handleSubmit}>
        <SomeoneElseCheck handleChange={handleChange} formData={formData} />
        {formData.someoneElse === "YES" ? (
          <YesComponent handleChange={handleChange} formData={formData} />
        ) : null}
        <div className="form-container items-end">
          <button type="submit" className="submit-button">
            NEXT
          </button>
        </div>
      </form>
    </div>
  );
}

function SomeoneElseCheck({ handleChange, formData }) {
  const options = [
    { label: "YES", value: "YES" },
    { label: "NO", value: "NO" },
  ];

  return (
    <section className="form-section">
      <div className="form-container">
        <label htmlFor="iam">
          * Are you applying on behalf of someone?
          <span className="text-red-500 italic">(required)</span>
        </label>
        <div className="flex gap-8 p-2">
          {options.map((option) => (
            <div
              key={option.value}
              className="flex gap-1 items-center font-semibold"
            >
              <input
                type="radio"
                name="someoneElse"
                value={option.value}
                checked={formData.someoneElse === option.value}
                onChange={handleChange}
              />
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function YesComponent({ handleChange, formData }) {
  return (
    <>
      <section className="form-section">
        <div className="form-container">
          <label htmlFor="iam">
            * I am? <span className="text-red-500 italic">(required)</span>
          </label>
          <select
            className="input-field"
            name="iam"
            value={formData.iam}
            onChange={handleChange}
            required
          >
            <option value="">Please select</option>
            <option value="familyMemberOrFriend">
              A family member or friend
            </option>
            {/* Add more options as needed */}
          </select>
        </div>
      </section>

      <section className="form-section">
        <div className="form-container">
          <label htmlFor="surnames">
            * Surname(s) / last name(s){" "}
            <span className="text-red-500 italic">(required)</span>
          </label>
          <input
            type="text"
            className="input-field"
            name="surnames"
            value={formData.surnames}
            onChange={handleChange}
            placeholder="Enter your surname(s) / last name(s)"
            required
          />
        </div>
        <div className="form-container">
          <label htmlFor="givenNames">
            * Given name(s) / first name(s){" "}
            <span className="text-red-500 italic">(required)</span>
          </label>
          <input
            type="text"
            className="input-field"
            name="givenNames"
            value={formData.givenNames}
            onChange={handleChange}
            placeholder="Enter your given name(s) / first name(s)"
            required
          />
        </div>
      </section>

      <section className="form-section">
        <div className="form-container">
          <label htmlFor="mailingAddress">
            * Mailing address{" "}
            <span className="text-red-500 italic">(required)</span>
          </label>
          <input
            type="text"
            className="input-field"
            name="mailingAddress"
            value={formData.mailingAddress}
            onChange={handleChange}
            placeholder="Enter your mailing address"
            required
          />
        </div>
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
              type="tel"
              className="input-field"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>
        </div>
      </section>

      <section className="form-section">
        <div className="form-container">
          <label htmlFor="declaration">
            * Representative's declaration{" "}
            <span className="text-red-500 italic">(required)</span>
          </label>

          <span className="checkbox-span">
            <input
              type="checkbox"
              className="red-checkbox"
              name="declaration"
              checked={formData.declaration}
              onChange={handleChange}
              required
            />
            <span>
              I declare that my contact and personal information above is
              truthful, complete and correct.
            </span>
          </span>
        </div>
      </section>

      <section className="form-section">
        <div className="form-container">
          <label htmlFor="authorization">
            * Representative's authorization{" "}
            <span className="text-red-500 italic">(required)</span>
          </label>
          <span className="checkbox-span">
            <input
              type="checkbox"
              className="red-checkbox"
              name="authorization"
              checked={formData.authorization}
              onChange={handleChange}
              required
            />
            <span>
              I understand and accept that I am the person appointed by the
              applicant to conduct business on the applicant or sponsor's behalf
              with Immigration, Refugees and Citizenship Canada and the Canada
              Border Services Agency.
            </span>
          </span>
        </div>
      </section>
    </>
  );
}
