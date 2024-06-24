import React, { useEffect, useState } from "react";
import "../../styles/Forms.scss";
import { CountrySelect } from "../../utils/components/form/SelectCountry";
import {
  useStore,
  residentialAddressFormData,
} from "../../context/stores/form/main";
import axios from "axios";

export default function AddressForm() {
  const { currentComponent, setCurrentComponent } = useStore();
  const { currentState, setCurrentState } = useStore();

  const { formData, setFormData } = residentialAddressFormData();

  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    await setCurrentState({ ...currentState, ...formData });
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (formData.streetName !== currentState.streetName) {
      console.log("current", currentState);
      setFormData({
        streetName: currentState.streetName,
        houseNumber: currentState.houseNumber,
        apartment: currentState.apartment,
        city: currentState.city,
        district: currentState.district,
        country: currentState.country,
      });
    }
  }, [currentState.streetName]);

  const handleSubmit = async (e) => {
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
    e.preventDefault();
    setLoading(true);
    const response = await axios
      .put(
        `https://form-backend-gamma.vercel.app/api/user/${currentState.ID}`,
        {
          ...filteredData,
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
            <label htmlFor="streetName">
              <span className="text-red-500 italic">*</span> Street address/name
              <span className="text-red-500 italic"> (required)</span>
            </label>
            <input
              type="text"
              name="streetName"
              placeholder="Enter street address/name"
              value={formData.streetName}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div className="form-container">
            <label htmlFor="houseNumber">
              <span className="text-red-500 italic">*</span> Street/civic no. or
              house name
              <span className="text-red-500 italic"> (required)</span>
            </label>
            <input
              type="text"
              name="houseNumber"
              placeholder="Enter street/civic no. or house name"
              value={formData.houseNumber}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
        </section>

        <section className="form-section">
          <div className="form-container">
            <label htmlFor="apartment">Apartment/unit number (optional)</label>
            <input
              type="text"
              name="apartment"
              placeholder="Enter apartment/unit number"
              value={formData.apartment}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="form-container">
            <label htmlFor="city">
              <span className="text-red-500 italic">*</span> City/town
              <span className="text-red-500 italic"> (required)</span>
            </label>
            <input
              type="text"
              name="city"
              placeholder="Enter city/town"
              value={formData.city}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
        </section>

        <section className="form-section">
          <div className="form-container">
            <label htmlFor="district">District/region (optional)</label>
            <input
              type="text"
              name="district"
              placeholder="Enter district/region"
              value={formData.district}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="form-container">
            <label htmlFor="country">
              <span className="text-red-500 italic">*</span> Country
              <span className="text-red-500 italic"> (required)</span>
              Please select
            </label>
            <CountrySelect
              formData={formData}
              handleChange={handleChange}
              name="country"
            />
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
