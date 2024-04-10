import React, { useState } from "react";
import "../../styles/Forms.scss";
import { CountrySelect } from "../../utils/components/form/SelectCountry";
import { useStore } from "../../context/stores/form/main";

export default function AddressForm() {
  const { currentComponent, setCurrentComponent } = useStore();

  const [formData, setFormData] = useState({
    streetAddress: "",
    streetCivicNo: "",
    apartmentUnitNo: "",
    cityTown: "",
    districtRegion: "",
    country: "",
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
            <label htmlFor="streetAddress">
              <span className="text-red-500 italic">*</span> Street address/name
              <span className="text-red-500 italic"> (required)</span>
            </label>
            <input
              type="text"
              name="streetAddress"
              placeholder="Enter street address/name"
              value={formData.streetAddress}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div className="form-container">
            <label htmlFor="streetCivicNo">
              <span className="text-red-500 italic">*</span> Street/civic no. or
              house name
              <span className="text-red-500 italic"> (required)</span>
            </label>
            <input
              type="text"
              name="streetCivicNo"
              placeholder="Enter street/civic no. or house name"
              value={formData.streetCivicNo}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
        </section>

        <section className="form-section">
          <div className="form-container">
            <label htmlFor="apartmentUnitNo">
              Apartment/unit number (optional)
            </label>
            <input
              type="text"
              name="apartmentUnitNo"
              placeholder="Enter apartment/unit number"
              value={formData.apartmentUnitNo}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="form-container">
            <label htmlFor="cityTown">
              <span className="text-red-500 italic">*</span> City/town
              <span className="text-red-500 italic"> (required)</span>
            </label>
            <input
              type="text"
              name="cityTown"
              placeholder="Enter city/town"
              value={formData.cityTown}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
        </section>

        <section className="form-section">
          <div className="form-container">
            <label htmlFor="districtRegion">District/region (optional)</label>
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
