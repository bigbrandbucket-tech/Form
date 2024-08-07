import React, { useEffect, useState } from "react";
import "../../styles/Forms.scss";
import { useStore } from "../../context/stores/form/main";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const information = `Information provided to IRCC is collected under the authority of the Immigration and Refugee Protection Act (IRPA) to determine admissibility to Canada.
Information provided may be shared with other Canadian government institutions such as, but not limited to, the Canada Border Services Agency (CBSA), the Royal Canadian Mounted Police (RCMP), the Canadian Security Intelligence Service (CSIS), the Department of Foreign Affairs, Trade and Development (DFATD), Employment and Social Development Canada (ESDC), the Canada Revenue Agency (CRA), provincial and territorial governments and foreign governments in accordance with subsection 8(2) of the Privacy Act.
Information may be disclosed to or validated with foreign governments, law enforcement bodies and detaining authorities with respect to the administration and enforcement of immigration legislation where such sharing of information may not put the individual and or his/her family at risk.
Information may also be systematically validated by other Canadian government institutions for the purposes of validating status and identity to administer their programs.

Where biometrics are provided as part of an application, the fingerprints collected will be stored and shared with the RCMP. The fingerprint record may also be disclosed to law enforcement agencies in Canada in accordance with subsection 13.11(1) of the Immigration and Refugee Protection Regulations. The information may be used to establish or verify the identity of a person in order to prevent, investigate or prosecute an offence under any law of Canada or a province. This information may also be used to establish or verify the identity of an individual whose identity cannot reasonably be otherwise established or verified because of physical or mental condition. Canada may also share immigration information related to biometric records with foreign governments with whom Canada has an agreement or arrangement.

Depending on the type of application made, the information you provided will be stored in one or more Personal Information Banks (PIB) pursuant to section 10(1) of Canada's Privacy Act. Individuals also have a right to protection and access to their personal information stored in each corresponding PIB under the Access to Information Act. Further details on the PIBs pertaining to IRCC's line of business and services and the Government of Canada's access to information and privacy programs are available at the Infosource website and through the IRCC Call Centre. Info Source is also available at public libraries across Canada.

Declaration of Applicant

I have read and understand the above declaration.

I declare that the information I have given in this application is truthful, complete and correct.

I understand that misrepresentation is an offence under section 127 of the Immigration and Refugee Protection Act and may result in a finding of inadmissibility to Canada or removal from Canada.

I agree that by typing my name and clicking sign, I am electronically signing my application.`;

export default function Consents() {
  const { currentComponent, setCurrentComponent } = useStore();
  const { currentState, setCurrentState } = useStore();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const [formData, setFormData] = useState(() => {
    const storedFormData = localStorage.getItem("formData");
    return storedFormData
      ? JSON.parse(storedFormData)
      : {
          additionalDetails: "",
          signature: "",
          consentDeclaration: false,
          agreePolicy: false,
          ip: "",
        };
  });

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  useEffect(() => {
    if (formData.additionalDetails !== currentState.additionalDetails) {
      console.log(currentState);
      setFormData({
        ...formData,
        additionalDetails: currentState.additionalDetails,
        signature: currentState.signature,
      });
    }
  }, [currentState.additionalDetails]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    fetchIp();

    const filteredData1 = Object.keys(currentState)
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
    const filteredData2 = Object.keys(formData)
      .filter((key) => key !== "consentDeclaration" && key !== "agreePolicy")
      .reduce((obj, key) => {
        obj[key] = formData[key];
        return obj;
      }, {});
    setLoading(true);
    localStorage.clear();
    const response = await axios
      .put(
        `https://form-backend-gamma.vercel.app/api/user/${currentState.ID}`,
        {
          ...filteredData2,
        }
      )
      .then(() => {
        setCurrentComponent(currentComponent + 1);
        navigate(`payment/${currentState.ID}`)
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
  const fetchIp = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://api.ipify.org?format=json");
      setFormData({ ...formData, ip: response.data.ip });
    } catch (error) {
      console.error("Error fetching the IP address:", error);
    }
    {
      setLoading(false);
    }
  };
  useEffect(() => {
    

    fetchIp();
  }, []);
  return (
    <div className="my-form">
      <form onSubmit={handleSubmit}>
        <section className="form-section">
          <div className="form-container">
            <label htmlFor="additionalDetails">
              Please briefly indicate if there are additional details pertinent
              to your application. For example, an urgent need to travel to
              Canada. Provide relevant details to avoid delays in the processing
              of your application.
            </label>
            <textarea
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={handleChange}
              className="input-field"
            />
          </div>
        </section>

        <section className="form-section">
          <div className="form-container">
            <label htmlFor="signature">
              <span className="text-red-500 italic">*</span> Signature of
              Applicant <span className="text-red-500 italic"> (required)</span>
            </label>
            <input
              type="text"
              name="signature"
              placeholder="Write Name as on Passport"
              value={formData.signature}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
        </section>

        <section className="form-section">
          <div className="form-container">
            <label htmlFor="consentDeclaration">
              <span className="text-red-500 italic">*</span> Consent and
              Declaration{" "}
              <span className="text-red-500 italic"> (required)</span>
            </label>
            <textarea
              name="consentDeclaration"
              value={information}
              onChange={handleChange}
              className="input-field"
              required
              rows={15}
            />
          </div>
        </section>

        <section className="form-section">
          <div className="form-container">
            <div className="checkbox-span">
              <input
                type="checkbox"
                name="agreePolicy"
                checked={formData.agreePolicy}
                onChange={handleChange}
                required
              />
              <label>
                <div className="text-[1rem]">
                  I Agree{" "}
                  <span className="text-red-500 underline">Privacy Policy</span>
                  ,{" "}
                  <span className="text-red-500 underline">
                    Terms and Conditions
                  </span>{" "}
                  &{" "}
                  <span className="text-red-500 underline">Refund Policy</span>
                </div>
                <span className="text-red-500 italic"> (required)</span>
              </label>
            </div>
          </div>
        </section>

        <div className="form-container items-end">
          <div className="flex justify-between w-full l370:flex-col l370:flex-col-reverse l370:gap-4">
            {/* <div className="">
              <button type="button" className="submit-button">
                Add another applicant
              </button>
            </div> */}

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
        </div>
      </form>
    </div>
  );
}
