import "../../styles/Forms.scss";

import React, { useEffect, useState } from "react";
import {
  PhoneNumberCodeSelect,
  CountrySelect,
} from "../../utils/components/form/SelectCountry";
import DatePicker from "../../utils/components/form/DatePicker";
import {
  useStore,
  passportDetailsFormData,
} from "../../context/stores/form/main";
import axios from "axios";

export default function ThirdForm() {
  const { currentComponent, setCurrentComponent } = useStore();
  const { currentState, setCurrentState } = useStore();
  const [loading, setLoading] = useState(false);

  const { passportData, setPassportData } = passportDetailsFormData();

  const [matchData, setMatchData] = useState({
    passportNumber: true,
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    await setCurrentState({ ...currentState, ...passportData });
    await setPassportData({ ...passportData, [name]: value });
  };

  const parseDate = (dateString) => {
    const date = new Date(dateString);
    console.log(date, dateString);
    const day = date.getDate();
    const monthName = date.getMonth();
    const year = date.getFullYear();
    return [`${day}`, `${monthName}`, `${year}`];
  };

  useEffect(() => {
    if (passportData.passportNumber !== currentState.passportNumber) {
      setPassportData({
        passportNumber: currentState.passportNumber,
        passportIssueDate: {
          day: parseDate(currentState?.passportIssueDate)[0],
          month: parseDate(currentState?.passportIssueDate)[1],
          year: parseDate(currentState.passportIssueDate)[2],
        },
        passportExpiryDate: {
          day: parseDate(currentState.passportExpiryDate)[0],
          month: parseDate(currentState.passportExpiryDate)[1],
          year: parseDate(currentState.passportExpiryDate)[2],
        },
        passportCountry: currentState.passportCountry,
      });
    }
  }, [currentState.passportNumber]);

  useEffect(() => {
    setMatchData({
      passportNumber:
        passportData.passportNumber === passportData.passportNumberReenter,
    });
  }, [passportData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filteredData = Object.keys(passportData)
      .filter((key) => key !== "passportNumberReenter")
      .reduce((obj, key) => {
        obj[key] = passportData[key];
        return obj;
      }, {});

    const currentStateFilter = Object.keys(currentState)
      .filter(
        (key) =>
          key !== "phoneConfirm" &&
          key !== "emailConfirm" &&
          key !== "phoneCode" &&
          key !== "passportNumberReenter" &&
          key !== "formData"
      )
      .reduce((obj, key) => {
        obj[key] = currentState[key];
        return obj;
      }, {});

    setLoading(true);
    const response = await axios
      .put(
        `https://form-backend-gamma.vercel.app/api/user/${currentState.ID}`,
        {
          ...filteredData,
          passportIssueDate: new Date(
            filteredData.passportIssueDate.year,
            filteredData.passportIssueDate.month,
            filteredData.passportIssueDate.day
          ),
          passportExpiryDate: new Date(
            filteredData.passportExpiryDate.year,
            filteredData.passportExpiryDate.month,
            filteredData.passportExpiryDate.day
          ),
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
            <label htmlFor="passportIssueDate">
              <span className="text-red-500 italic">*</span> Passport Issue Date{" "}
              <span className="text-red-500 italic">(required)</span>
            </label>
            <div className="date-picker">
              <DatePicker
                formData={passportData}
                handleChange={handleChange}
                name="passportIssueDate"
              />
            </div>
          </div>

          <div className="form-container">
            <label htmlFor="passportExpiryDate">
              <span className="text-red-500 italic">*</span> Passport Expiry
              Date <span className="text-red-500 italic">(required)</span>
            </label>
            <div>
              <div className="date-picker">
                <DatePicker
                  formData={passportData}
                  handleChange={handleChange}
                  name="passportExpiryDate"
                  reverse={true}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="form-section">
          <div className="form-container">
            <label htmlFor="passportCountry">
              <span className="text-red-500 italic">*</span> Passport
              Country/Nationality{" "}
              <span className="text-red-500 italic">(required)</span>
            </label>
            <CountrySelect
              formData={passportData}
              handleChange={handleChange}
              name="passportCountry"
            />

            {passportData.passportCountry === "TW" && (
              <>
                <label htmlFor="passportCountry">
                  <span className="text-red-500 italic">*</span> Taiwan
                  Identification Number
                  <span className="text-red-500 italic">(required)</span>
                </label>
                <input
              type="text"
              name="TIN"
              value={passportData.TIN}
              onChange={handleChange}
              required
              onPaste={(e) => e.preventDefault()}
              className="input-field"
            />
              </>
            )}
          </div>
        </section>

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
