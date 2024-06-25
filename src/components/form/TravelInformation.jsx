import React, { useEffect, useState } from "react";
import "../../styles/Forms.scss";
import { CountrySelect } from "../../utils/components/form/SelectCountry";
import DatePicker, { TimePicker } from "../../utils/components/form/DatePicker";
import { useStore } from "../../context/stores/form/main";
import axios from "axios";

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
    <>
      <section className="form-section-sub">
        <div className="form-container">
          <label>
            <span className="text-red-500 italic">*</span> Indicate which When
            do you plan to travel to Canada?{" "}
            <span className="text-red-500 italic">(required)</span>
          </label>
          <h1 className="font-semibold">
            If you don't know, you may enter an approximate date.
          </h1>
          <div className="form-section">
            <DatePicker
              formData={formData}
              handleChange={handleChange}
              name={"travelDate"}
            />
          </div>
        </div>
      </section>

      <section className="form-section-sub">
        <div className="form-container">
          <h1 className="font-semibold">
            If you don't know, you may enter an approximate time.
          </h1>
          <div className="form-section">
            <TimePicker
              formData={formData}
              handleChange={handleChange}
              name={"travelTime"}
            />
          </div>
        </div>
      </section>
    </>
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
  const { currentState, setCurrentState } = useStore();
  const [formData, setFormData] = useState(() => {
    const storedData = localStorage.getItem("formData");
    return storedData
      ? JSON.parse(storedData)
      : {
          appliedForVisa: "",
          uciPreviousVisaNumber: "",
          uciPreviousVisaNumberReenter: "",

          knowTravelDate: "",
          travelDate: { year: "", month: "", day: "" },
          travelTime: { hour: "", minute: "", timezone: "" },

          travelingAlone: "",
          travelingMembers: "",

          additionalNationalities: "",
          citizenship: "",
        };
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("travelFormData", JSON.stringify(formData));
  }, [formData]);

  const [matchData, setMatchData] = useState({
    uciPreviousVisaNumber: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
    setCurrentState({ ...currentState, ...formData });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filteredData = Object.keys(currentState)
      .filter(
        (key) =>
          key !== "declaration" &&
          key !== "authorization" &&
          key !== "passportNumberReenter" &&
          key !== "emailConfirm"
      )
      .reduce((obj, key) => {
        obj[key] = formData[key];
        return obj;
      }, {});
    setLoading(false);
    const response = await axios
      .put(
        `https://form-backend-gamma.vercel.app/api/user/${currentState.ID}`,
        {
          ...filteredData,
          travelDate: new Date(
            formData.travelDate.year,
            formData.travelDate.month,
            formData.travelDate.day
          ),
          travelTime: JSON.stringify([
            formData.travelTime.hour,
            formData.travelTime.minute,
            formData.travelTime.timezone,
          ]),
        }
      )
      .then(() => {
        setCurrentComponent(currentComponent + 1);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      })
      .finally(() => {
        setLoading(false);
      });
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
  const parseDate = (dateString) => {
    const date = new Date(dateString);
    console.log(date, dateString);
    const day = date.getDate();
    const monthName = date.getMonth();
    const year = date.getFullYear();
    return [`${day}`, `${monthName}`, `${year}`];
  };

  useEffect(() => {
    if (formData.appliedForVisa !== currentState.appliedForVisa) {
      console.log(
        currentState?.travelTime && parseDate(currentState?.travelTime)[0]
      );
      setFormData({
        appliedForVisa: currentState.appliedForVisa,
        uciPreviousVisaNumber: currentState.uciPreviousVisaNumber,
        uciPreviousVisaNumberReenter: currentState.uciPreviousVisaNumberReenter,

        knowTravelDate: currentState.knowTravelDate,
        travelDate: {
          day: parseDate(currentState.travelDate)[0],
          month: parseDate(currentState.travelDate)[1],
          year: parseDate(currentState.travelDate)[2],
        },
        travelTime: {
          hour:
            currentState?.travelTime && parseDate(currentState?.travelTime)[0],
          minute:
            currentState?.travelTime && parseDate(currentState?.travelTime)[1],
          timezone:
            currentState?.travelTime && parseDate(currentState?.travelTime)[2],
        },

        travelingAlone: currentState.travelingAlone,
        travelingMembers: currentState.travelingMembers,

        additionalNationalities: currentState.additionalNationalities,
        citizenship: currentState.citizenship,
      });
    }
  }, [currentState.appliedForVisa]);

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
          <div className="flex gap-4">
            <button
              type="button"
              className="submit-button button-style"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentComponent(currentComponent - 1);
              }}
            >
              BACK
            </button>

            <button
              type="submit"
              className="submit-button button-style"
              disabled={loading}
            >
              {loading ? (
                <box-icon
                  name="loader-alt"
                  animation="spin"
                  flip="horizontal"
                ></box-icon>
              ) : (
                "NEXT"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
