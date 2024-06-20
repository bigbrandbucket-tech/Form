// import "./SecondForm.scss";
import "../../styles/Forms.scss";
import React, { useEffect, useState } from "react";
import { PhoneNumberCodeSelect } from "../../utils/components/form/SelectCountry";
import { useStore } from "../../context/stores/form/main";
import axios from "axios";

export default function SecondForm() {
  const { currentComponent, setCurrentComponent } = useStore();
  const { currentState, setCurrentState } = useStore();

  console.log(currentState);

  const [formData, setFormData] = useState({
    applyingOnBehalf: "0",
    iam: "",
    applicantSurname: "",
    applicantGivenName: "",
    applicantMailingAddress: "",
    applicantPhoneExt: "+91",
    applicantPhone: "",
    declaration: "",
    authorization: "",
  });

  useEffect(() => {
    if (formData.iam !== currentState.iam) {
      setFormData({
        applyingOnBehalf: currentState.applyingOnBehalf,
        iam: currentState.iam,
        applicantSurname: currentState.applicantSurname,
        applicantGivenName: currentState.applicantGivenName,
        applicantMailingAddress: currentState.applicantMailingAddress,
        applicantPhoneExt: currentState.applicantPhoneExt,
        applicantPhone: currentState.applicantPhone,
      });
    }
  }, [currentState.iam]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(typeof value);
    const val = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: val });
    setCurrentState({ ...currentState, ...formData });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filteredData = Object.keys(formData)
      .filter(
        (key) =>
          key !== "declaration" &&
          key !== "authorization" &&
          key !== "phoneCode"
      )
      .reduce((obj, key) => {
        obj[key] = formData[key];
        return obj;
      }, {});
    const response = await axios
      .put(
        `https://form-backend-gamma.vercel.app/api/user/${currentState.ID}`,
        {
          ...filteredData,
          firstName: currentState.firstName,
          middleName: currentState.middleName,
          lastName: currentState.lastName,
          email: currentState.email,
          phoneNumber: currentState.phoneNumber,
          phoneNumberExt: currentState.phoneNumberExt,
          countryOfBIrth: currentState.countryOfBIrth,
          cityOfBirth: currentState.cityOfBirth,
          martialStatus: currentState.martialStatus,
          preferredLanguage: currentState.preferredLanguage,
          gender: currentState.gender,
          dob: new Date(
            currentState.dob.year,
            currentState.dob.month,
            currentState.dob.day
          ),
        }
      )
      .then(() => {
        setCurrentComponent(currentComponent + 1);
      });
  };

  return (
    <div className="my-form">
      <form onSubmit={handleSubmit}>
        <SomeoneElseCheck handleChange={handleChange} formData={formData} />
        {formData.applyingOnBehalf == "1" ? (
          <YesComponent handleChange={handleChange} formData={formData} />
        ) : null}
        <div className="form-container items-end">
          <div className="flex gap-4">
            <button
              type="button"
              className="submit-button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentComponent(currentComponent - 1);
              }}
            >
              BACK
            </button>

            <button type="submit" className="submit-button">
              NEXT
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function SomeoneElseCheck({ handleChange, formData, setFormData }) {
  const options = [
    { label: "YES", value: "1" },
    { label: "NO", value: "0" },
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
                name="applyingOnBehalf"
                value={option.value}
                checked={formData.applyingOnBehalf == option.value}
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
          <label htmlFor="applicantSurname">
            * Surname(s) / last name(s){" "}
            <span className="text-red-500 italic">(required)</span>
          </label>
          <input
            type="text"
            className="input-field"
            name="applicantSurname"
            value={formData.applicantSurname}
            onChange={handleChange}
            placeholder="Enter your surname(s) / last name(s)"
            required
          />
        </div>
        <div className="form-container">
          <label htmlFor=" applicantGivenName">
            * Given name(s) / first name(s){" "}
            <span className="text-red-500 italic">(required)</span>
          </label>
          <input
            type="text"
            className="input-field"
            name="applicantGivenName"
            value={formData.applicantGivenName}
            onChange={handleChange}
            placeholder="Enter your given name(s) / first name(s)"
            required
          />
        </div>
      </section>

      <section className="form-section">
        <div className="form-container">
          <label htmlFor="applicantMailingAddress">
            * Mailing address{" "}
            <span className="text-red-500 italic">(required)</span>
          </label>
          <input
            type="text"
            className="input-field"
            name="applicantMailingAddress"
            value={formData.applicantMailingAddress}
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
              name={"applicantPhoneExt"}
            />
            <input
              type="tel"
              className="input-field"
              name="applicantPhone"
              value={formData.applicantPhone}
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
