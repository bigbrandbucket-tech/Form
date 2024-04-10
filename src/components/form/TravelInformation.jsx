import React, { useEffect, useState } from "react";
import "../../styles/Forms.scss";
import {
  PhoneNumberCodeSelect,
  CountrySelect,
} from "../../utils/components/form/SelectCountry";
import { useStore } from "../../context/stores/form/main";

// Options for radio button questions
const questions = [
  {
    name: "appliedForVisa",
    label:
      "Have you ever applied for or obtained a visa, an eTA or a permit to visit, live, work or study in Canada? ",
    options: ["Yes", "No"],

    child: (formData, handleChange, matchData, setMatchData) =>
      appliedForVisa({ formData, handleChange, matchData, setMatchData }),
    childCondition: "Yes",
    // childName: "appliedForVisaChild",
  },
  {
    name: "knowTravelDate",
    label: "Do you know when you will travel to Canada? ",
    options: ["Yes", "No"],

    child: (formData, handleChange, matchData, setMatchData) =>
      knowTravelDate({ formData, handleChange, matchData, setMatchData }),
    childCondition: "Yes",
    // childName: "knowTravelDateChild",
  },
  {
    name: "travelingAlone",
    label: "Are you traveling alone? ",
    options: ["Yes", "No"],

    child: (formData, handleChange, matchData, setMatchData) =>
      travelingAlone({ formData, handleChange, matchData, setMatchData }),
    childCondition: "No",
    // childName: "travelingAloneChild",
  },
  {
    name: "additionalNationalities",
    label: "Do you have Additional nationalities? ",
    options: ["Yes", "No"],

    child: (formData, handleChange, matchData, setMatchData) =>
      additionalNationalities({
        formData,
        handleChange,
        matchData,
        setMatchData,
      }),
    childCondition: "Yes",
    // childName: "additionalNationalitiesChild",
  },
];

function knowTravelDate({ formData, handleChange, matchData, setMatchData }) {
  return (
    <section className="form-section-sub">
      <div className="form-container">
        <label>
          <span className="text-red-500 italic">*</span> Indicate which
          countries/territories you are a citizen of.
        </label>
        <CountrySelect
          formData={formData}
          handleChange={handleChange}
          name={"citizenship"}
        />
      </div>
    </section>
  );
}

function additionalNationalities({
  formData,
  handleChange,
  matchData,
  setMatchData,
}) {
  return (
    <section className="form-section-sub">
      <div className="form-container">
        <label>
          <span className="text-red-500 italic">*</span> Indicate which
          countries/territories you are a citizen of.{" "}
          <span className="text-red-500 italic">(required)</span>
        </label>
        <CountrySelect
          formData={formData}
          handleChange={handleChange}
          name={"citizenship"}
        />
      </div>
    </section>
  );
}

function travelingAlone({ formData, handleChange, matchData, setMatchData }) {
  return (
    <section className="form-section-sub">
      <div className="form-container">
        <label>
          <span className="text-red-500 italic">*</span> How many members
          traveling with you?{" "}
          <span className="text-red-500 italic">(required)</span>
        </label>
        <select
          name="travelingMembers"
          value={formData.travelingMembers}
          onChange={handleChange}
          required
          className="input-field"
        >
          <option value="">Select one</option>
          {[...Array(10)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
          {/* Add more options if needed */}
        </select>
      </div>
    </section>
  );
}

function appliedForVisa({ formData, handleChange, matchData, setMatchData }) {
  return (
    <>
      <section className="form-section-sub">
        <div className="form-container">
          <label htmlFor="uciPreviousVisaNumber">
            <span className="text-red-500 italic">*</span> Unique client
            identifier (UCI) / Previous Canadian visa, eTA or permit number{" "}
            <span className="italic">(optional)</span>
          </label>
          <input
            type="text"
            name="uciPreviousVisaNumber"
            placeholder="Enter UCI or previous visa/permit number"
            value={formData.uciPreviousVisaNumber}
            onChange={handleChange}
            className="input-field"
          />
        </div>
      </section>

      <section className="form-section-sub">
        <div className="form-container">
          <label htmlFor="uciPreviousVisaNumberReenter">
            <span className="text-red-500 italic">*</span> Unique client
            identifier (UCI) / Previous Canadian visa, eTA or permit number{" "}
            <span className="italic">(re-enter)</span>
            <span className="text-red-500 italic">
              {matchData.uciPreviousVisaNumber ? "" : "(Number does not match)"}
            </span>
          </label>
          <input
            type="text"
            name="uciPreviousVisaNumberReenter"
            placeholder="Re-enter UCI or previous visa/permit number"
            value={formData.uciPreviousVisaNumberReenter}
            onChange={handleChange}
            required={!matchData.uciPreviousVisaNumber}
            onPaste={(e) => e.preventDefault()}
            className="input-field"
          />
        </div>
      </section>
    </>
  );
}

export default function TravelInformation() {
  const { currentComponent, setCurrentComponent } = useStore();
  const [formData, setFormData] = useState({
    appliedForVisa: "",
    uciPreviousVisaNumber: "",
    uciPreviousVisaNumberReenter: "",

    knowTravelDate: "",

    travelingAlone: "",
    travelingMembers: "",

    additionalNationalities: "",
    citizenship: "",
  });

  const [matchData, setMatchData] = useState({
    uciPreviousVisaNumber: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentComponent(currentComponent + 1);
  };

  useEffect(() => {
    setMatchData(() => {
      const arr = ["uciPreviousVisaNumber"];
      return arr.reduce((acc, name) => {
        acc[name] = formData[name] === formData[name + "Reenter"];
        return acc;
      }, {});
    });

    return () => {};
  }, [formData]);

  return (
    <div className="my-form">
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <section key={index} className="form-section">
            <div className="form-container">
              <label>
                <span className="text-red-500 italic">*</span> {question.label}
                <span className="text-red-500 italic">(required)</span>
              </label>
              <div className="radio-options">
                {question.options.map((option, optionIndex) => (
                  <label key={optionIndex}>
                    <input
                      type="radio"
                      name={question.name}
                      value={option}
                      checked={formData[question.name] === option}
                      onChange={handleChange}
                      required
                      className=""
                    />
                    {option}
                  </label>
                ))}
              </div>

              {question.child &&
                question.childCondition === formData[question.name] &&
                question.child(formData, handleChange, matchData, setMatchData)}
            </div>
          </section>
        ))}

        <div className="form-container items-end">
          <button type="submit" className="submit-button">
            NEXT
          </button>
        </div>
      </form>
    </div>
  );
}

function TextAreaInput({
  text = "Provide Details",
  formData,
  handleChange,
  name,
}) {
  return (
    <section className="form-section-textarea">
      <div className="form-container">
        <label htmlFor={name}>
          <span className="text-red-500 italic">*</span> {text}{" "}
          <span className="text-red-500 italic">(required)</span>
        </label>
        <textarea
          name={name}
          id={name}
          value={formData[name]}
          onChange={handleChange}
          className="input-field"
          required
        ></textarea>
      </div>
    </section>
  );
}
