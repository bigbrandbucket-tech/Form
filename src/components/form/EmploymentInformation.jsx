import React, { useEffect, useState } from "react";
import "../../styles/Forms.scss";
import { CountrySelect } from "../../utils/components/form/SelectCountry";
import DatePicker from "../../utils/components/form/DatePicker";
import {
  employementInformationFormData,
  useStore,
} from "../../context/stores/form/main";
import axios from "axios";

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

const occupationJobTitle = {
  "": [],
  "Please Select": [],
  "Art, culture, recreation and sport occupations": [
    "Announcers and other performers",
    "Athletes, coaches, referees and related occupations",
    "Creative and performing artists",
    "Creative designers and craftspersons",
    "Librarian, archivist, conservator or curator",
    "Photographers, graphic arts technicians, technical and coordinating occupations in motion pictures, broadcasting and the performing arts",
    "Technical occupations in libraries, public archives, museums and art galleries",
    "Writing, translating and related communications professionals",
  ],
  "Business, finance and administration occupations": [
    "Administrative and regulatory occupations",
    "Administrative services supervisors",
    "Auditors, accountants and investment professionals",
    "Court reporters, transcriptionists, records management technicians and statistical officers",
    "Finance, insurance and related business administrative occupations",
    "Financial, insurance and related administrative support workers",
    "General office workers",
    "Human resources and business service professionals",
    "Library, correspondence and other clerks",
    "Mail and message distribution occupations",
    "Office administrative assistants - general, legal and medical",
    "Office equipment operators",
    "Supply chain logistics, tracking and scheduling coordination occupations",
  ],
  "Education, law and social, community and government services occupations": [
    "College and other vocational instructors",
    "Home care providers and educational support occupations",
    "Judges, lawyers and notaries",
    "Legal and public protection support occupations",
    "Occupations in front-line public protection services",
    "Paraprofessional occupations in legal, social, community and education services",
    "Policy and program researchers, consultants and officers",
    "Secondary and elementary school teachers and educational counsellors",
    "Social and community service professionals",
    "University professors and post-secondary assistants",
  ],
  "Health occupations": [
    "Assisting occupations in support of health services",
    "Medical technologists and technicians",
    "Optometrists, chiropractors, other health diagnosing and treating professionals",
    "Other technical occupations in health care",
    "Pharmacists, dieticians and nutritionists",
    "Physicians, dentists and veterinarians",
    "Professional occupations in nursing",
    "Technical occupations in dental health care",
    "Therapy and assessment professionals",
  ],
  Homemaker: [],
  "Management occupations": [
    "Administrative services managers",
    "Corporate sales managers",
    "Legislators and senior management, including political officials",
    "Managers in agriculture, horticulture and aquaculture",
    "Managers in art, culture, recreation and sport",
    "Managers in communication",
    "Managers in construction, facility operation and maintenance",
    "Managers in customer and personal services",
    "Managers in education and social and community services",
    "Managers in engineering, architecture, science and information systems",
    "Managers in financial and business services",
    "Managers in food service and accommodation",
    "Managers in health care",
    "Managers in manufacturing and utilities",
    "Managers in natural resources production and fishing",
    "Managers in public administration",
    "Managers in public protection services",
    "Managers in transportation",
    "Retail and wholesale trade managers",
  ],
  "Manufacturing and utilities occupations": [
    "Central control and process operators in processing and manufacturing",
    "Labourers in processing, manufacturing and utilities",
    "Machine operators and related workers in chemical, plastic and rubber processing",
    "Machine operators and related workers in food, beverage and associated products processing",
    "Machine operators and related workers in mineral and metal products processing and manufacturing",
    "Machine operators and related workers in pulp and paper production and wood processing and manufacturing",
    "Machine operators and related workers in textile, fabric, fur and leather products processing and manufacturing",
    "Mechanical, electrical and electronics assemblers",
    "Other assembly and related occupations",
    "Printing equipment operators and related occupations",
    "Supervisors in assembly and fabrication",
    "Supervisors in processing and manufacturing occupations",
    "Utilities equipment operators and controllers",
  ],
  "Military/armed forces": [
    "Aerospace Control Officer",
    "Aerospace Control Operator",
    "Aerospace Engineering Officer",
    "Aerospace Telecommunication and Information Systems Technician",
    "Air Combat Systems Officer",
    "Aircraft Structures Technician",
    "Armour Officer",
    "Armoured Soldier",
    "Artillery Officer",
    "Artillery Soldier - Field",
    "Artillery Soldier Air Defence",
    "Aviation Systems Technician",
    "Avionics Systems Technician",
    "Biomedical Electronics Technologist",
    "Boatswain",
    "Chaplain",
    "Combat Engineer",
    "Communications and Electronics Engineering (Air) Officer",
    "Communicator Research Operator",
    "Construction Technician",
  ],
  "Natural and applied sciences and related occupations": [
    "Architects, urban planners and land surveyors",
    "Civil, mechanical, electrical and chemical engineers",
    "Computer and information systems professionals",
    "Life science professionals",
    "Mathematicians, statisticians and actuaries",
    "Other engineers",
    "Other technical inspectors and regulatory officers",
    "Physical science professionals",
    "Technical occupations in architecture, drafting, surveying, geomatics and meteorology",
    "Technical occupations in civil, mechanical and industrial engineering",
    "Technical occupations in computer and information systems",
    "Technical occupations in electronics and electrical engineering",
    "Technical occupations in life sciences",
    "Technical occupations in physical science",
    "Transportation officers and controllers",
  ],
  "Natural resources, agriculture and related production occupations": [
    "Agriculture and horticulture workers",
    "Contractors and supervisors in agriculture, horticulture and related operations and services",
    "Contractors and supervisors in mining, oil and gas",
    "Fishing vessel masters and fishermen/fisherwomen",
    "Harvesting, landscaping and natural resources labourers",
    "Logging and forestry workers",
    "Logging machinery operators",
    "Mine service workers and operators in oil and gas drilling",
    "Other workers in fishing and trapping and hunting occupations",
    "Supervisors, logging and forestry",
    "Underground miners, oil and gas drillers and related occupations",
  ],
  Retired: [],
  "Sales and service occupations": [
    "Butchers and bakers",
    "Cashiers",
    "Chefs and cooks",
    "Cleaners",
    "Customer and information services representatives",
    "Food counter attendants, kitchen helpers and related support occupations",
    "Insurance, real estate and financial sales occupations",
    "Occupations in food and beverage services",
    "Occupations in travel and accommodation",
    "Other occupations in personal services",
    "Other sales support and related occupations",
    "Other service support and related occupations",
    "Retail sales supervisors",
    "Retail salespersons",
    "Sales and account representatives",
    "Security guards and related security service occupations",
    "Service supervisors",
    "Specialized occupations in personal and customer services",
    "Support occupations in accommodation, travel and amusement services",
    "Technical sales specialists in wholesale trade and retail and wholesale buyers",
  ],
  Student: [],
  "Trades, transport and equipment operators and related occupations": [
    "Automotive service technicians",
    "Carpenters and cabinetmakers",
    "Contractors and supervisors in industrial, electrical and construction trades and related workers",
    "Contractors and supervisors in maintenance trades and heavy equipment and transport operators",
    "Crane operators, drillers and blasters",
    "Electrical trades and electrical power line and telecommunications workers",
    "Heavy equipment operators",
    "Longshore workers and material handlers",
    "Machinery and transportation equipment mechanics",
    "Machining, metal forming, shaping and erecting trades",
    "Masonry and plastering trades",
    "Motor vehicle and transit drivers",
    "Other construction trades",
    "Other installers, repairers and servicers",
    "Other mechanics and related repairers",
    "Other transport equipment operators and related maintenance workers",
    "Plumbers, pipefitters and gas fitters",
    "Printing press operators, other trades and related occupations",
    "Public works and other labourers",
  ],
  Unemployed: [],
};

export default function OccupationForm() {
  const { currentComponent, setCurrentComponent } = useStore();
  const { currentState, setCurrentState } = useStore();

  const { formData, setFormData } = employementInformationFormData();

  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    await setCurrentState({ ...currentState, ...formData });
    setFormData({ ...formData, [name]: value });
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

    console.log(currentState);
    setLoading(true);
    const response = await axios
      .put(
        `https://form-backend-gamma.vercel.app/api/user/${currentState.ID}`,
        {
          ...filteredData,
          sinceYear: formData.sinceYear.year,
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
        setLoading(true);
      });
  };

  useEffect(() => {
    if (formData.occupation !== currentState.occupation) {
      setFormData({
        occupation: currentState.occupation,
        job: currentState.job,
        employer: currentState.employer,
        countryOfJob: currentState.countryOfJob,
        cityOfJob: currentState.cityOfJob,
        districtOfJob: currentState.districtOfJob,
        sinceYear: { year: currentState.sinceYear },
      });
    }
  }, [currentState.occupation]);

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
            {["Student"].includes(formData.occupation) ? null : (
              <>
                <section className="form-section">
                  <div className="form-container">
                    <label htmlFor="job">
                      <span className="text-red-500 italic">*</span> Job Title
                      <span className="text-red-500 italic"> (required)</span>
                      <h1 className="my-2 font-semibold text-[1.08rem]">
                        Select the option that best describes your job.
                      </h1>
                    </label>
                    <select
                      name="job"
                      value={formData.job}
                      onChange={handleChange}
                      required
                      className="input-field"
                    >
                      <option value="">Select job title</option>
                      {occupationJobTitle[formData?.occupation]?.map((job) => (
                        <>
                          <option value={job}>{job}</option>
                        </>
                      ))}
                      {/* Add other job title options here */}
                    </select>
                  </div>
                </section>
              </>
            )}

            <section className="form-section">
              <div className="form-container">
                <label htmlFor="employer">
                  <span className="text-red-500 italic">*</span> Name of
                  Employer/School
                  <span className="text-red-500 italic"> (required)</span>
                </label>
                <input
                  type="text"
                  name="employer"
                  placeholder="Enter the name of your employer or school"
                  value={formData.employer}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              <div className="form-container">
                <label htmlFor="countryOfJob">
                  <span className="text-red-500 italic">*</span> countryOfJob
                  <span className="text-red-500 italic"> (required)</span>
                  <span className="text-red-500 italic"> Please select</span>
                </label>
                <CountrySelect
                  formData={formData}
                  handleChange={handleChange}
                  name="countryOfJob"
                />
              </div>
            </section>

            <section className="form-section">
              <div className="form-container">
                <label htmlFor="cityOfJob">
                  <span className="text-red-500 italic">*</span> City of Job
                  <span className="text-red-500 italic"> (required)</span>
                </label>
                <input
                  type="text"
                  name="cityOfJob"
                  placeholder="Enter cityOfJob"
                  value={formData.cityOfJob}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              <div className="form-container">
                <label htmlFor="districtOfJob">District/region</label>
                <input
                  type="text"
                  name="districtOfJob"
                  placeholder="Enter district/region"
                  value={formData.districtOfJob}
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
