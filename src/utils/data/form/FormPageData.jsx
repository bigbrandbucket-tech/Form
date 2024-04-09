//
import FirstForm from "../../../components/form/FirstForm";
import SecondForm from "../../../components/form/SecondForm";
import ThirdForm from "../../../components/form/ThirdForm";
import AddressForm from "../../../components/form/ResidentialAddress";
import EmploymentInformation from "../../../components/form/EmploymentInformation";
import Eligibility from "../../../components/form/Eligibility";

export const sections = [
  { title: "Personal Information", component: <FirstForm /> },
  { title: "Applicant Status", component: <SecondForm /> },
  { title: "Passport Details", component: <ThirdForm /> },
  { title: "Residential Address", component: <AddressForm /> },
  { title: "Employment Information", component: <EmploymentInformation /> },
  { title: "Eligibility Questions", component: <Eligibility /> },
  { title: "Travel Information", component: <></> },
  { title: "Consent and Declaration", component: <></> },
];
