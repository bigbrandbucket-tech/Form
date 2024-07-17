import React, { useEffect, useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import axios from 'axios';
import { countries } from 'countries-list';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { customCountries } from '../../../utils/countries';

const generatePDF = async (data) => {

 
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();


  // Function to add text to a page
  const addText = (page, title, value, y) => {
    const fontSize = 12;
    const font = page.font;
    page.drawText(`${title}: ${value}`, {
      x: 50,
      y,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
    return y - fontSize - 5; // Adjust y position for the next line
  };

  // Function to create a new page and add title
  const createPage = (title) => {
    const page = pdfDoc.addPage();
    const { height } = page.getSize();
    // page.font = pdfDoc.embedFont(StandardFonts.Helvetica);
    let y = height - 50;
    page.drawText(title, { x: 50, y, size: 16, font: page.font, color: rgb(0, 0, 0) });
    
    return { page, y: y - 40 };
  };

  // Create and populate pages
  let { page: page1, y: y1 } = createPage('Personal Information');
  y1 = addText(page1, 'Personal Details', '', y1);
  y1 -= 10;
  y1 = addText(page1, 'First Name', data.firstName, y1);
  y1 = addText(page1, 'Middle Name', data.middleName, y1);
  y1 = addText(page1, 'Last Name', data.lastName, y1);
  y1 = addText(page1, 'Email Address', data.emailAddress, y1);
//   y1 = addText(page1, 'Email address (re-enter)', data.emailAddressReEnter, y1);
  y1 = addText(page1, 'Phone', data.phone, y1);
//   y1 = addText(page1, 'Phone (re-enter)', data.phoneReEnter, y1);
  y1 = addText(page1, 'Date Of Birth', data.dateOfBirth, y1);
  y1 = addText(page1, 'Gender', data.gender, y1);
  y1 = addText(page1, 'Country Of Birth', data.countryOfBIrth, y1);
  y1 = addText(page1, 'City Of Birth', data.cityOfBirth, y1);
  y1 = addText(page1, 'Marital Status', data.maritalStatus, y1);
  y1 = addText(page1, 'Preferred language to contact you', data.preferredLanguage, y1);
  y1 -= 10;
//   let { page: page2, y: y2 } = createPage('Passport Details');
y1 = addText(page1, 'Applicant Status', '', y1);
y1 -= 10;
  y1 = addText(page1, 'Are you applying on behalf of someone?', data.applyingForYourselfOrSomeoneElse, y1);
  y1 = addText(page1, 'I am? ', data.iam, y1);
  y1 = addText(page1, 'Surname(s) / last name(s) ', data.applicantSurname, y1);
  y1 = addText(page1, 'Given name(s) / first name(s)', data.applicantGivenName, y1);
  y1 = addText(page1, ' Mailing address', data.applicantMailingAddress, y1);
  y1 = addText(page1, 'Phone Extension', data.applicantPhoneExt, y1);
  y1 = addText(page1, 'Phone Number', data.applicantPhone, y1);

  y1 = addText(page1, 'Passport Details', '', y1);
  y1 -= 10;
  y1 = addText(page1, 'Passport No', data.passportNo, y1);
  y1 = addText(page1, 'Passport number (re-enter)', data.passportNumberReEnter, y1);
  y1 = addText(page1, 'Passport Issue Date', data.passportIssueDate, y1);
  y1 = addText(page1, 'Passport Expiry Date', data.passportExpiryDate, y1);
  y1 = addText(page1, 'Passport Country/Nationality', customCountries[data.passportCountryNationality], y1);
  y1 = addText(page1, 'Taiwan Identification Number', data?.TIN || "Not Valid", y1);

  y1 -= 10;
//   let { page: page3, y: y3 } = createPage('Residential Address');
y1 = addText(page1, 'Residential Address', '', y1);
y1 -= 10;
  y1 = addText(page1, 'Street Address/name', data.streetAddressName, y1);
  y1 = addText(page1, 'Street/civic no. or house name', data.streetCivicNoHouseName, y1);
  y1 = addText(page1, 'Apartment/unit number', data.apartmentUnitNumber, y1);
  y1 = addText(page1, 'City/town', data.cityTown, y1);
  y1 = addText(page1, 'District/region', data.districtRegion, y1);
  y1 = addText(page1, 'Country', data.country, y1);

  let { page: page2, y: y2 } = createPage('Employment Information');
  y2 = addText(page2, 'Occupation', data.occupation, y2);
  y2 = addText(page2, 'Job Title', data.jobTitle, y2);
  y2 = addText(page2, 'Name Of Employer', data.nameOfEmployer, y2);
  y2 = addText(page2, 'Employer Country', data.employerCountry, y2);
  y2 = addText(page2, 'Employer City', data.employerCity, y2);
  y2 = addText(page2, 'Employer District/region', data.employerDistrictRegion, y2);
  y2 = addText(page2, 'Since What Year', data.sinceWhatYear, y2);
  y2 -= 10;
//   let { page: page5, y: y5 } = createPage('Eligibility Questions');
y2 = addText(page2, 'Eligibility Questions', '', y2);
y2 -= 10;
  y2 = addText(page2, '* Have you ever been refused a visa or permit, denied entry to, or ordered to leave Canada \n or any other country/territory?', data.refusedVisa, y2);
  y2 -= 30

  y2 = addText(page2, 'For each refusal, please indicate the country that refused you a visa or permit, or denied \n you entry, as well as the reasons provided to you by the country', data.refusedVisaTextArea, y2);
  y2 -= 30
  y2 = addText(page2, '* Have you ever committed, been arrested for, been charged with or convicted of any criminal \n offence in any country/territory?', data.criminalOffence, y2);
  y2 -= 30
  y2 = addText(page2, 'For each arrest, charge, or conviction, please indicate \n where (city, country), when (month/year), the nature of the offence, and the sentence.?', data.criminalOffenceTextArea, y2);
  y2 -= 30
  y2 = addText(page2, '* In the past two years, were you diagnosed with tuberculosis or have you been in close \n contact with a person with tuberculosis?', data.tuberculosisDiagnosis, y2);
  y2 -= 30
  y2 = addText(page2, 'Is your contact with tuberculosis the result of being a health care worker?', data.healthcareWorkerContact, y2);
  y2 -= 30
  y2 = addText(page2, 'Have you ever been diagnosed with tuberculosis?', data.tuberculosisDiagnosed, y2);
  y2 -= 30
  y2 = addText(page2, '* Do you have one of these conditions?', data.healthCondition, y2);

  y2 -= 10;
//   let { page: page6, y: y6 } = createPage('Travel Information');
y2 = addText(page2, 'Travel Information', '', y2);
y2 -= 10;
  y2 = addText(page2, 'Have you ever applied for or obtained a visa, an eTA or a permit to visit, live, work or study in Canada?', data.appliedForVisa, y2);
  y2 = addText(page2, 'Unique client identifier (UCI) / Previous Canadian visa, eTA or permit number', data.uciPreviousVisaNumber, y2);
  y2 = addText(page2, 'Do you know when you will travel to Canada?', data.knowTravelDate, y2);
  y2 = addText(page2, 'When do you plan to travel to Canada?', data.travelDate, y2);
  y2 = addText(page2, 'Time your flight to Canada will depart', data.travelTime, y2);
  y2 = addText(page2, 'Are you traveling alone?', data.travelingAlone, y2);
  y2 = addText(page2, 'How many members traveling with you?', data.travelingMembers, y2);
  y2 = addText(page2, 'Do you have Additional nationalities?', data.additionalNationalities, y2);
  y2 -= 10;
//   let { page: page7, y: y7 } = createPage('Consent and Declaration');
let { page: page3, y: y3 } = createPage('Consent and Declaration');
  y3 = addText(page3, '* Please briefly indicate if there are additional details pertinent to your application. For example, an urgent need to travel to Canada. Provide relevant details to avoid delays in the processing of your application.', data.additionalDetails, y3);
  y3 = addText(page3, 'Signature of Applicant \n', data.signature, y3);
  y3 -= 20;
  y3 = addText(page3, 'I Agree Privacy Policy, Terms and Conditions & Refund Policy', data.agreePrivacyPolicy, y3);
  y3 = addText(page3, 'IP Address', data.ipAddress, y3);

  // Save the PDF to a blob
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });

  // Open the PDF in a new tab
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
};

const PdfGen = () => {
    const navigate = useNavigate()
    const {state} = useLocation()
    const {id} = state
    const [rows, setRows] = useState([])
    const fetchID = async () => {
        const response = await axios.get(`https://form-backend-gamma.vercel.app/api/user/${id}`);
        setRows(response.data)
      }
    
      useEffect(() => {
        console.log('cal')
        fetchID();
        handleGeneratePDF()
      },[id])
    
  const handleGeneratePDF = () => {
    console.log('rows', rows)
    const data = {
        firstName: rows.firstName,
        middleName: rows.middleName,
        lastName: rows.lastName,
        emailAddress: rows.email,
        phone: rows.phoneNumber,
        dateOfBirth: rows.dob,
        gender: rows.gender,
        countryOfBIrth: customCountries[rows.countryOfBIrth],
        cityOfBirth: rows.cityOfBirth,
        maritalStatus: rows.martialStatus,
        preferredLanguage: rows.preferredLanguage,
        applyingForYourselfOrSomeoneElse: rows.applyingOnBehalf,
        iam: rows.iam,
        applicantSurname: rows.applicantSurname,
        applicantGivenName: rows.applicantGivenName,
        applicantMailingAddress: rows.applicantMailingAddress,
        applicantPhoneExt: rows.applicantPhoneExt,
        applicantPhone: rows.applicantPhone,
        passportNo: rows.passportNumber,
        passportNumberReEnter: rows.passportNumber,
        passportIssueDate: rows.passportIssueDate,
        passportExpiryDate: rows.passportExpiryDate,
        passportCountryNationality: countries[rows.passportCountry]?.name,
        streetAddressName: rows.streetName,
        streetCivicNoHouseName: rows.houseNumber,
        apartmentUnitNumber: rows.apartment,
        cityTown: rows.city,
        districtRegion: rows.district,
        country: customCountries[rows.country]?.name,
        occupation: rows.occupation,
        jobTitle: rows.job,
        nameOfEmployer: rows.employer,
        employerCountry: customCountries[rows.countryOfJob]?.name,
        employerCity: rows.cityOfJob,
        employerDistrictRegion: rows.districtOfJob,
        sinceWhatYear: rows.sinceYear,
        refusedVisa: rows.refusedVisa,
        refusedVisaTextArea:rows.refusedVisaTextArea,
        criminalOffence: rows.criminalOffence,
        criminalOffenceTextArea: rows.criminalOffenceTextArea,
        healthcareWorkerContact:data.healthcareWorkerContact, 
        tuberculosisDiagnosis:data.tuberculosisDiagnosis,
        tuberculosisDiagnosed: rows.tuberculosisDiagnosed,
        healthCondition: rows.healthCondition,
        appliedForVisa: rows.appliedForVisa,
        uciPreviousVisaNumber:rows.uciPreviousVisaNumber,
        knowTravelDate: rows.knowTravelDate,
        travelDate: rows.travelDate,
        travelTime: rows.travelTime,
        travelingAlone: rows.travelingAlone,
        travelingMembers: rows.travelingMembers,
        additionalNationalities: rows.additionalNationalities,
        additionalDetails: rows.additionalDetails,
        signature: rows.signature,
        agreePrivacyPolicy: "Accepted",
        ipAddress: rows.ip
      };
      

    generatePDF(data);
    navigate('/admin/travels')
  };

  return (
    <></>
    // <div>
    //   <button onClick={handleGeneratePDF}>Generate PDF</button>
    // </div>
  );
};

export default PdfGen;
