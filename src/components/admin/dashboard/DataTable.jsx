import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";

import axios from "axios";
// import { countries } from "countries-list";
import { customCountries } from "../../../utils/countries";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import Box from "@mui/material/Box";
import { countries } from "countries-list";

export default function DataTable() {
  const columns = [
    { field: "ID", headerName: "Application Number", width: 150 },
    { field: "firstName", headerName: "First Name", width: 150 },
    // { field: 'middleName', headerName: 'Middle Name', width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "passportCountry",
      headerName: "Country Of Passport",
      width: 200,
      renderCell: (params) => <strong>{customCountries[params?.value]?.name}</strong>,
    },
    { field: "ip", headerName: "IP Address", width: 200 },
    { field: "INSERTDATE", headerName: "Date & Time", width: 200 },
    {
      field: "",
      headerName: "Actiom",
      width: 200,
      renderCell: (params) => (
        <button onClick={() => handleNavigate(params.row.ID)}>View PDF</button>
      ),
    },
    // { field: 'phoneNumberExt', headerName: 'Phone Ext', width: 100 },
    // { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
    // { field: 'dob', headerName: 'Date of Birth', width: 150 },
    // { field: 'gender', headerName: 'Gender', width: 100 },
    // { field: 'countryOfBirth', headerName: 'Country of Birth', width: 150 },
    // { field: 'cityOfBirth', headerName: 'City of Birth', width: 150 },
    // { field: 'maritalStatus', headerName: 'Marital Status', width: 120 },
    // { field: 'preferredLanguage', headerName: 'Preferred Language', width: 150 },
    // { field: 'applyingOnBehalf', headerName: 'Applying On Behalf', width: 150 },
    // { field: 'passportNumber', headerName: 'Passport Number', width: 150 },
    // { field: 'passportIssueDate', headerName: 'Passport Issue Date', width: 150 },
    // { field: 'passportExpiryDate', headerName: 'Passport Expiry Date', width: 150 }
  ];

  const [rows, setRows] = React.useState([]);

  const fetchApi = async () => {
    const resposne = await axios.get(
      "https://form-backend-gamma.vercel.app/api/get"
    );
    console.log(resposne);
    setRows(resposne.data);
  };

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
      page.drawText(title, {
        x: 50,
        y,
        size: 16,
        font: page.font,
        color: rgb(0, 0, 0),
      });

      return { page, y: y - 40 };
    };

    // Create and populate pages
    let { page: page1, y: y1 } = createPage("Personal Information");
    y1 = addText(page1, "Personal Details", "", y1);
    y1 -= 10;
    y1 = addText(page1, "First Name", data.firstName, y1);
    y1 = addText(page1, "Middle Name", data.middleName, y1);
    y1 = addText(page1, "Last Name", data.lastName, y1);
    y1 = addText(page1, "Email Address", data.emailAddress, y1);
    //   y1 = addText(page1, 'Email address (re-enter)', data.emailAddressReEnter, y1);
    y1 = addText(page1, "Phone", data.phone, y1);
    //   y1 = addText(page1, 'Phone (re-enter)', data.phoneReEnter, y1);
    y1 = addText(page1, "Date Of Birth", data.dateOfBirth, y1);
    y1 = addText(page1, "Gender", data.gender, y1);
    y1 = addText(page1, "Country Of Birth", data.countryOfBIrth, y1);
    y1 = addText(page1, "City Of Birth", data.cityOfBirth, y1);
    y1 = addText(page1, "Marital Status", data.maritalStatus, y1);
    y1 = addText(
      page1,
      "Preferred language to contact you",
      data.preferredLanguage,
      y1
    );
    y1 -= 10;
    //   let { page: page2, y: y2 } = createPage('Passport Details');
    y1 = addText(page1, "Passport Details", "", y1);
    y1 -= 10;
    y1 = addText(page1, "Passport No", data.passportNo, y1);
    y1 = addText(
      page1,
      "Passport number (re-enter)",
      data.passportNumberReEnter,
      y1
    );
    y1 = addText(page1, "Passport Issue Date", data.passportIssueDate, y1);
    y1 = addText(page1, "Passport Expiry Date", data.passportExpiryDate, y1);
    y1 = addText(
      page1,
      "Passport Country/Nationality",
      data.passportCountryNationality,
      y1
    );

    y1 -= 10;
    //   let { page: page3, y: y3 } = createPage('Residential Address');
    y1 = addText(page1, "Residential Address", "", y1);
    y1 -= 10;
    y1 = addText(page1, "Street Address/name", data.streetAddressName, y1);
    y1 = addText(
      page1,
      "Street/civic no. or house name",
      data.streetCivicNoHouseName,
      y1
    );
    y1 = addText(page1, "Apartment/unit number", data.apartmentUnitNumber, y1);
    y1 = addText(page1, "City/town", data.cityTown, y1);
    y1 = addText(page1, "District/region", data.districtRegion, y1);
    y1 = addText(page1, "Country", data.country, y1);

    let { page: page2, y: y2 } = createPage("Employment Information");
    y2 = addText(page2, "Occupation", data.occupation, y2);
    y2 = addText(page2, "Job Title", data.jobTitle, y2);
    y2 = addText(page2, "Name Of Employer", data.nameOfEmployer, y2);
    y2 = addText(page2, "Employer Country", data.employerCountry, y2);
    y2 = addText(page2, "Employer City", data.employerCity, y2);
    y2 = addText(
      page2,
      "Employer District/region",
      data.employerDistrictRegion,
      y2
    );
    y2 = addText(page2, "Since What Year", data.sinceWhatYear, y2);
    y2 -= 10;
    //   let { page: page5, y: y5 } = createPage('Eligibility Questions');
    y2 = addText(page2, "Eligibility Questions", "", y2);
    y2 -= 10;
    y2 = addText(
      page2,
      "* Have you ever been refused a visa or permit, denied entry to, or ordered to leave Canada \n or any other country/territory?",
      data.refusedVisa,
      y2
    );
    y2 -= 30;
    y2 = addText(
      page2,
      "* Have you ever committed, been arrested for, been charged with or convicted of any criminal \n offence in any country/territory?",
      data.criminalOffence,
      y2
    );
    y2 -= 30;
    y2 = addText(
      page2,
      "* In the past two years, were you diagnosed with tuberculosis or have you been in close \n contact with a person with tuberculosis?",
      data.tuberculosisDiagnosed,
      y2
    );
    y2 -= 30;
    y2 = addText(
      page2,
      "* Do you have one of these conditions?",
      data.healthCondition,
      y2
    );

    y2 -= 10;
    //   let { page: page6, y: y6 } = createPage('Travel Information');
    y2 = addText(page2, "Travel Information", "", y2);
    y2 -= 10;
    y2 = addText(
      page2,
      "Have you ever applied for or obtained a visa, an eTA or a permit to visit, live, work or study \n in Canada?",
      data.appliedForVisa,
      y2
    );
    y2 -= 20;
    y2 = addText(
      page2,
      "Do you know when you will travel to Canada?",
      data.knowTravelDate,
      y2
    );
    y2 = addText(
      page2,
      "When do you plan to travel to Canada?",
      data.travelDate,
      y2
    );
    y2 = addText(
      page2,
      "Time your flight to Canada will depart",
      data.travelTime.length
        ? JSON.parse(data.travelTime)[0] +
            ":" +
            JSON.parse(data.travelTime)[1] +
            " " +
            JSON.parse(data.travelTime)[2]
        : "",
      y2
    );
    y2 = addText(page2, "Are you traveling alone?", data.travelingAlone, y2);
    y2 = addText(
      page2,
      "How many members traveling with you?",
      data.travelingMembers,
      y2
    );
    y2 = addText(
      page2,
      "Do you have Additional nationalities?",
      data.additionalNationalities,
      y2
    );
    y2 -= 10;
    //   let { page: page7, y: y7 } = createPage('Consent and Declaration');
    y2 = addText(page2, "Consent and Declaration", "", y2);
    y2 -= 10;
    y2 = addText(
      page2,
      "* Please briefly indicate if there are additional details pertinent to your application.\n For example, an urgent need to travel to Canada. \n Provide relevant details to avoid delays in the processing of your application.",
      data.additionalDetails,
      y2
    );
    y2 -= 45;
    y2 = addText(page2, "Signature of Applicant \n", data.signature, y2);
    y2 -= 20;
    y2 = addText(
      page2,
      "Agree Privacy Policy, Terms and Conditions & Refund Policy",
      data.agreePrivacyPolicy,
      y2
    );
    y2 = addText(page2, "IP Address", data.ipAddress, y2);

    // Save the PDF to a blob
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });

    // Open the PDF in a new tab
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  const fetchID = async (id) => {
    const response = await axios.get(
      `https://form-backend-gamma.vercel.app/api/user/${id}`
    );
    console.log("called");

    handleGeneratePDF(response.data);
  };

  const handleGeneratePDF = async (pdfRows) => {
    console.log("rows", pdfRows);
    const data = {
      firstName: pdfRows.firstName,
      middleName: pdfRows.middleName,
      lastName: pdfRows.lastName,
      emailAddress: pdfRows.email,
      phone: pdfRows.phoneNumber,
      dateOfBirth: pdfRows.dob?.split('T')[0],
      gender: pdfRows.gender,
      countryOfBIrth: customCountries[pdfRows.countryOfBIrth]?.name,
      cityOfBirth: pdfRows.cityOfBirth,
      maritalStatus: pdfRows.martialStatus,
      preferredLanguage: pdfRows.preferredLanguage,
      applyingForYourselfOrSomeoneElse: pdfRows.applyingOnBehalf,
      passportNo: pdfRows.passportNumber,
      passportNumberReEnter: pdfRows.passportNumber,
      passportIssueDate: pdfRows.passportIssueDate?.split('T')[0],
      passportExpiryDate: pdfRows.passportExpiryDate?.split('T')[0],
      passportCountryNationality: customCountries[pdfRows.passportCountry]?.name,
      streetAddressName: pdfRows.streetName,
      streetCivicNoHouseName: pdfRows.houseNumber,
      apartmentUnitNumber: pdfRows.apartment,
      cityTown: pdfRows.city,
      districtRegion: pdfRows.district,
      country: pdfRows.country,
      occupation: pdfRows.occupation,
      jobTitle: pdfRows.job,
      nameOfEmployer: pdfRows.employer,
      employerCountry: pdfRows.countryOfJob,
      employerCity: pdfRows.cityOfJob,
      employerDistrictRegion: pdfRows.districtOfJob,
      sinceWhatYear: pdfRows.sinceYear,
      refusedVisa: pdfRows.refusedVisa,
      criminalOffence: pdfRows.criminalOffence,
      tuberculosisDiagnosed: pdfRows.tuberculosisDiagnosed || "No",
      healthCondition: pdfRows.healthCondition,
      appliedForVisa: pdfRows.appliedForVisa,
      knowTravelDate: pdfRows.knowTravelDate,
      travelDate: pdfRows.travelDate?.split('T')[0],
      travelTime: pdfRows.travelTime,
      travelingAlone: pdfRows.travelingAlone,
      travelingMembers: pdfRows.travelingMembers,
      additionalNationalities: pdfRows.additionalNationalities,
      additionalDetails: pdfRows.additionalDetails,
      signature: pdfRows.signature,
      agreePrivacyPolicy: "Accepted",
      ipAddress: pdfRows.ip,
    };

    generatePDF(data);
  };

  const handleNavigate = async (id) => {
    console.log("cal");
    fetchID(id);
  };

  React.useEffect(() => {
    fetchApi();
  }, []);

  return (
    <>
      <Box sx={{ height: 600, width: "100%" }}>
        {rows?.length && (
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(rows) => rows.ID}
            //   initialState={{
            //     pagination: {
            //       paginationModel: {
            //         pageSize: 10,
            //       },
            //     },
            //   }}
            checkboxSelection
          />
        )}
      </Box>
    </>
  );
}
