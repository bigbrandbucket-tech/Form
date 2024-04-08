import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const occupationOptions = [
    "Please Select",
    "Art, culture, recreation and sport occupations",
    "Business, finance and administration occupations",
    "Education, law and social, community and government services occupations",
    "Health occupations",
    "Homemaker",
    "Management occupations",
    "Manufacturing and utilities occupations",
    "Military/armed forces",
    "Natural and applied sciences and related occupations",
    "Natural resources, agriculture and related production occupations",
    "Retired",
    "Sales and service occupations",
    "Student",
    "Trades, transport and equipment operators and related occupations",
    "Unemployed",
  ];

  return (
    <div className="my-form">
      <form onSubmit={handleSubmit}>
        <section className="form-section">
          <div className="form-container">
            <label htmlFor="occupation">
              <span className="text-red-500 italic">*</span> Occupation
              <span className="text-red-500 italic"> (required)</span>
            </label>
            <select
              type="text"
              name="occupation"
              placeholder="Enter your occupation"
              value={formData.occupation}
              onChange={handleChange}
              required
              className="input-field"
            >
              {occupationOptions.map((option, index) => (
                <option key={index} value={index === 0 ? "" : option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </section>

        {["Unemployed", "Retired", "Homemaker"].includes(
          formData.occupation
        ) ? null : (
          <>
            <section className="form-section">
              <div className="form-container">
                <label htmlFor="jobTitle">
                  <span className="text-red-500 italic">*</span> Job Title
                  <span className="text-red-500 italic"> (required)</span>
                  <h1 className="my-2 font-semibold text-[1.08rem]">
                    Select the option that best describes your job.
                  </h1>
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
                  Employer/School
                  <span className="text-red-500 italic"> (required)</span>
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
                  <span className="text-red-500 italic">*</span> Country
                  <span className="text-red-500 italic"> (required)</span>
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
                  <span className="text-red-500 italic">*</span> City
                  <span className="text-red-500 italic"> (required)</span>
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
                  <span className="text-red-500 italic">*</span> Since What
                  Year?
                  <span className="text-red-500 italic"> (required)</span>
                </label>
                <DatePicker
                  formData={formData}
                  handleChange={handleChange}
                  name="sinceYear"
                  yearOnly={true}
                />
              </div>
            </section>
          </>
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
