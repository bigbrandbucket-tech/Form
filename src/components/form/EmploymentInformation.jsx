import React, { useState } from "react";
import "../../styles/Forms.scss";
import { CountrySelect } from "../../utils/components/form/SelectCountry";
import DatePicker from "../../utils/components/form/DatePicker";
import { useStore } from "../../context/stores/form/main";

export default function OccupationForm() {
  const { currentComponent, setCurrentComponent } = useStore();

  const [formData, setFormData] = useState({
    occupation: "",
    jobTitle: "",
    employerSchoolName: "",
    country: "",
    city: "",
    districtRegion: "",
    sinceYear: { year: "" },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentComponent(currentComponent + 1);
  };

  return (
    <div className="my-form">
      <form onSubmit={handleSubmit}>
        <section className="form-section">
          <div className="form-container">
            <label htmlFor="occupation">
              <span className="text-red-500 italic">*</span> Occupation
              (required)
            </label>
            <input
              type="text"
              name="occupation"
              placeholder="Enter your occupation"
              value={formData.occupation}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
        </section>

        <section className="form-section">
          <div className="form-container">
            <label htmlFor="jobTitle">
              <span className="text-red-500 italic">*</span> Job Title
              (required)
              <span className="text-red-500 italic">
                {" "}
                Select the option that best describes your job.
              </span>
            </label>
            <select
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
              className="input-field"
            >
              <option value="">Select job title</option>
              <option value="Announcers and other performers">
                Announcers and other performers
              </option>
              {/* Add other job title options here */}
            </select>
          </div>
        </section>

        <section className="form-section">
          <div className="form-container">
            <label htmlFor="employerSchoolName">
              <span className="text-red-500 italic">*</span> Name of
              Employer/School (required)
            </label>
            <input
              type="text"
              name="employerSchoolName"
              placeholder="Enter the name of your employer or school"
              value={formData.employerSchoolName}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div className="form-container">
            <label htmlFor="country">
              <span className="text-red-500 italic">*</span> Country (required)
              <span className="text-red-500 italic"> Please select</span>
            </label>
            <CountrySelect
              formData={formData}
              handleChange={handleChange}
              name="country"
            />
          </div>
        </section>

        <section className="form-section">
          <div className="form-container">
            <label htmlFor="city">
              <span className="text-red-500 italic">*</span> City (required)
            </label>
            <input
              type="text"
              name="city"
              placeholder="Enter city"
              value={formData.city}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div className="form-container">
            <label htmlFor="districtRegion">District/region</label>
            <input
              type="text"
              name="districtRegion"
              placeholder="Enter district/region"
              value={formData.districtRegion}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="form-container">
            <label htmlFor="sinceYear">
              <span className="text-red-500 italic">*</span> Since What Year?
              (required)
            </label>
            <DatePicker
              formData={formData}
              handleChange={handleChange}
              name="sinceYear"
              yearOnly={true}
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
