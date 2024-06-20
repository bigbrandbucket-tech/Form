import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      currentComponent: 0,
      setCurrentComponent: (index) =>
        set(() => {
          return { currentComponent: index };
        }),
      currentState: [],
      setCurrentState: (index) =>
        set(() => {
          return { currentState: index };
        }),
    }),
    {
      name: "useStore",
      getStorage: () => localStorage,
    }
  )
);

export const firstFormData = create(
  persist(
    (set) => ({
      formData: {
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        emailConfirm: "",
        phoneCode: "",
        phoneNumber: "",
        phoneConfirm: "",
        phoneNumberExt: "+91",
        countryOfBIrth: "",
        cityOfBirth: "",
        martialStatus: "",
        preferredLanguage: "",
        gender: "",
        dob: {
          year: "",
          month: "",
          day: "",
        },
      },
      setFormData: (data) => set({ formData: data }),
    }),
    {
      name: "first-form-data",
      getStorage: () => localStorage,
    }
  )
);

export const applicationStatusFormData = create(
  persist(
    (set) => ({
      formData: {
        applyingOnBehalf: "0",
        iam: "",
        applicantSurname: "",
        applicantGivenName: "",
        applicantMailingAddress: "",
        applicantPhoneExt: "+91",
        applicantPhone: "",
        declaration: "",
        authorization: "",
      },
      setFormData: (data) => set({ formData: data }),
    }),
    {
      name: "applicationStatusFormData",
      getStorage: () => localStorage,
    }
  )
);

export const passportDetailsFormData = create(
  persist(
    (set) => ({
      passportData: {
        passportNumber: "",
        passportNumberReenter: "",
        passportIssueDate: { year: "", month: "", day: "" },
        passportExpiryDate: { year: "", month: "", day: "" },
        passportCountry: "",
      },
      setPassportData: (data) => set({ passportData: data }),
    }),
    {
      name: "passportDetailsFormData",
      getStorage: () => localStorage,
    }
  )
);

export const residentialAddressFormData = create(
  persist(
    (set) => ({
      formData: {
        streetName: "",
        houseNumber: "",
        apartment: "",
        city: "",
        district: "",
        country: "",
      },
      setFormData: (data) => set({ formData: data }),
    }),
    {
      name: "residentialAddressFormData",
      getStorage: () => localStorage,
    }
  )
);

export const employementInformationFormData = create(
  persist(
    (set) => ({
      formData: {
        occupation: "",
        job: "",
        employer: "",
        countryOfJob: "",
        cityOfJob: "",
        districtOfJob: "",
        sinceYear: { year: "" },
      },
      setFormData: (data) => set({ formData: data }),
    }),
    {
      name: "employementInformationFormData",
      getStorage: () => localStorage,
    }
  )
);

export const eligibityFormData = create(
  persist(
    (set) => ({
      formData: {
        refusedVisa: "",
        refusedVisaTextArea: "",
        criminalOffence: "",
        criminalOffenceTextArea: "",
        tuberculosisDiagnosis: "",
        healthcareWorkerContact: "",
        healthCondition: "",
        tuberculosisDiagnosed: "", // New field for subquestion
      },
      setFormData: (data) => set({ formData: data }),
    }),
    {
      name: "eligibityFormData",
      getStorage: () => localStorage,
    }
  )
);

export const travelInformationFormData = create(
  persist(
    (set) => ({
      formData: {
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
      },
      setFormData: (data) => set({ formData: data }),
    }),
    {
      name: "ttttravelInformationFormData",
      getStorage: () => localStorage,
    }
  )
);
