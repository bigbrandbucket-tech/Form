//
import FirstForm from "../../../components/form/FirstForm";
import SecondForm from "../../../components/form/SecondForm";
import ThirdForm from "../../../components/form/ThirdForm";
import AddressForm from "../../../components/form/ResidentialAddress";
import EmploymentInformation from "../../../components/form/EmploymentInformation";

export const sections = [
  { title: "Personal Information", component: <FirstForm /> },
  { title: "Applicant Status", component: <SecondForm /> },
  { title: "Passport Details", component: <ThirdForm /> },
  { title: "Residential Address", component: <AddressForm /> },
  { title: "Employment Information", component: <EmploymentInformation /> },
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
