import React, { useState } from "react";
import "../../styles/Forms.scss";
import { useStore } from "../../context/stores/form/main";

// Options for radio button questions
const questions = [
  {
    name: "refusedVisa",
    label:
      "Have you ever been refused a visa or permit, denied entry to, or ordered to leave Canada or any other country/territory? ",
    options: ["Yes", "No"],
  },
  {
    name: "criminalOffence",
    label:
      "Have you ever committed, been arrested for, been charged with or convicted of any criminal offence in any country/territory? ",
    options: ["Yes", "No"],
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
    criminalOffence: "",
    tuberculosisDiagnosis: "",
    healthcareWorkerContact: "",
    healthCondition: "",
    tuberculosisDiagnosed: "", // New field for subquestion
    explanation: "", // New field for text input
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentComponent(currentComponent + 1);
  };

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
            </div>
          </section>
        ))}

        {/* Conditional rendering for the text input based on the answer to the refusedVisa question */}
        {formData.refusedVisa === "Yes" && (
          <section className="form-section">
            <div className="form-container">
              <label htmlFor="explanation">
                <span className="text-red-500 italic">*</span> Please provide an
                explanation:
                <span className="text-red-500 italic">(required)</span>
              </label>
              <textarea
                name="explanation"
                id="explanation"
                value={formData.explanation}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </section>
        )}

        <div className="form-container items-end">
          <button type="submit" className="submit-button">
            NEXT
          </button>
        </div>
      </form>
    </div>
  );
}
