import React, { useEffect, useState } from "react";
import "../../styles/Forms.scss";
import { useStore } from "../../context/stores/form/main";

// Options for radio button questions
const questions = [
  {
    name: "refusedVisa",
    label:
      "Have you ever been refused a visa or permit, denied entry to, or ordered to leave Canada or any other country/territory? ",
    options: ["Yes", "No"],
    textAreaCondition: "Yes",
    textAreaLabel:
      "For each refusal, please indicate the country that refused you a visa or permit, or denied you entry, as well as the reasons provided to you by the country.",
    textAreaName: "refusedVisaTextArea",
  },
  {
    name: "criminalOffence",
    label:
      "Have you ever committed, been arrested for, been charged with or convicted of any criminal offence in any country/territory? ",
    options: ["Yes", "No"],
    textAreaCondition: "Yes",
    textAreaLabel:
      "For each arrest, charge, or conviction, please indicate where (city, country), when (month/year), the nature of the offence, and the sentence.",
    textAreaName: "criminalOffenceTextArea",
  },
  {
    name: "tuberculosisDiagnosis",
    label:
      "In the past two years, were you diagnosed with tuberculosis or have you been in close contact with a person with tuberculosis? ",
    options: ["Yes", "No"],
    subquestions: [
      {
        name: "healthcareWorkerContact",
        label:
          "Is your contact with tuberculosis the result of being a health care worker? ",
        options: ["Yes", "No"],
        subquestions: [
          {
            name: "tuberculosisDiagnosed",
            label: "Have you ever been diagnosed with tuberculosis? ",
            options: ["Yes", "No"],
          },
        ],
      },
    ],
  },
  {
    name: "healthCondition",
    label: "Do you have one of these conditions? ",
    options: [
      "Untreated syphilis",
      "Untreated drug or alcohol addiction",
      "Untreated mental health condition with psychosis",
      "None of these",
    ],
  },
];

export default function Eligibility() {
  const { currentComponent, setCurrentComponent } = useStore();
  const [formData, setFormData] = useState({
    refusedVisa: "",
    refusedVisaTextArea: "",
    criminalOffence: "",
    criminalOffenceTextArea: "",
    tuberculosisDiagnosis: "",
    healthcareWorkerContact: "",
    healthCondition: "",
    tuberculosisDiagnosed: "", // New field for subquestion
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentComponent(currentComponent + 1);
  };

  useEffect(() => {}, [formData]);

  // Function to recursively render subquestions
  const renderSubquestions = (subquestions) => {
    return subquestions.map((subquestion, subindex) => (
      <div key={subindex} className="subquestion form-section-sub">
        <label>
          <span className="text-red-500 italic">*</span> {subquestion.label}
          <span className="text-red-500 italic">(required)</span>
        </label>
        <div className="radio-options">
          {subquestion.options.map((suboption, suboptionIndex) => (
            <label key={suboptionIndex}>
              <input
                type="radio"
                name={subquestion.name}
                value={suboption}
                checked={formData[subquestion.name] === suboption}
                onChange={handleChange}
                required
                className=""
              />
              {suboption}
            </label>
          ))}
        </div>
        {/* Recursively render subquestions if the parent question is answered "Yes" */}
        {subquestion.subquestions &&
          formData[subquestion.name] === "Yes" &&
          renderSubquestions(subquestion.subquestions)}
      </div>
    ));
  };

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
              {/* Render subquestions if the parent question is answered "Yes" */}
              {question.subquestions &&
                formData[question.name] === "Yes" &&
                renderSubquestions(question.subquestions)}

              {question.textAreaLabel &&
                question.textAreaCondition === formData[question.name] && (
                  <TextAreaInput
                    text={question.textAreaLabel}
                    formData={formData}
                    handleChange={handleChange}
                    name={question.textAreaName}
                  />
                )}
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
