//
import FirstForm from "../../../components/form/FirstForm";

export const sections = [
  { title: "Personal Information", component: <FirstForm /> },
  { title: "Applicant Status", component: <div>Applicant Status</div> },
  { title: "Passport Details", component: <div>Passport Details</div> },
  { title: "Residential Address", component: <div>Residential Address</div> },
  {
    title: "Employment Information",
    component: <div>Employment Information</div>,
  },
  {
    title: "Eligibility Questions",
    component: <div>Eligibility Questions</div>,
  },
  { title: "Travel Information", component: <div>Travel Information</div> },
  {
    title: "Consent and Declaration",
    component: <div>Consent and Declaration</div>,
  },
];
