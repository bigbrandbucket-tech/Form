import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import * as React from "react";

import axios from "axios";
// import { countries } from "countries-list";
import { customCountries } from "../../../utils/countries";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import Box from "@mui/material/Box";
import { countries } from "countries-list";
import { useNavigate } from "react-router-dom";

export default function DataTable() {

  const navigate = useNavigate()

  if(!localStorage.getItem('login')){
    console.log('under', localStorage.getItem('login'))
    navigate('/login')
  }
  const columns = [
    { field: "ID", headerName: "Application Number", width: 150 },
    {
      field: 'transactionID',
      headerName: 'Transaction ID',
      width: 200,
    },
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 200,
      renderCell: (params) =>
         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
     
    },
   
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "payment",
      headerName: "Payment",
      width: 200,
      renderCell: (params) =>
        params.value ? (
          <p style={{ color: "green" }}>Success</p>
        ) : (
          <p style={{ color: "red" }}>Pending</p>
        ),
    },
    {
      field: "passportCountry",
      headerName: "Country Of Passport",
      width: 200,
      renderCell: (params) => (
        <strong>{customCountries[params?.value]?.name}</strong>
      ),
    },
    { field: "ip", headerName: "IP Address", width: 200 },
    { 
      field: 'INSERTDATE', 
      headerName: 'Date & Time', 
      width: 200, 
      renderCell: (params) => {
        // Convert UTC string to Date object
        const utcDate = new Date(params.value);
        
        // Format date for display (e.g., in Australian Melbourne/Sydney time)
        const formattedDate = utcDate.toLocaleString('en-AU', {
          timeZone: 'Australia/Sydney', // Adjust timezone as needed
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
  
        return formattedDate;
      }
    },
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

    const addText2 = (page, title, value, y) => {
      const fontSize = 16;
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
    let { page: page1, y: y1} = createPage("Personal Information");
    y1 = addText2(page1, "Personal Details", "", y1);
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
    y1 = addText2(page1, "Applicant Status", "", y1);
    y1 -= 10;
    y1 = addText(
      page1,
      "Are you applying on behalf of someone?",
      data.applyingForYourselfOrSomeoneElse == 1 ? "Yes" : "No",
      y1
    );
    y1 = addText(page1, "I am? ", data.iam, y1);
    y1 = addText(
      page1,
      "Surname(s) / last name(s) ",
      data.applicantSurname,
      y1
    );
    y1 = addText(
      page1,
      "Given name(s) / first name(s)",
      data.applicantGivenName,
      y1
    );
    y1 = addText(page1, " Mailing address", data.applicantMailingAddress, y1);
    y1 = addText(page1, "Phone Extension", data.applicantPhoneExt, y1);
    y1 = addText(page1, "Phone Number", data.applicantPhone, y1);

    y1 -= 10;
    //   let { page: page2, y: y2 } = createPage('Passport Details');
    y1 = addText2(page1, "Passport Details", "", y1);
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

    y1 = addText(page1, "Taiwan Identification Number", data?.TIN || "", y1);

    y1 -= 10;
    //   let { page: page3, y: y3 } = createPage('Residential Address');
    y1 = addText2(page1, "Residential Address", "", y1);
    y1 -= 10;
    y1 = addText(page1, "Street Address/name", data.streetAddressName, y1);
    y1 = addText(
      page1,
      "Street/civic no. or house name",
      data.streetCivicNoHouseName,
      y1
    );
    y1 = addText(
      page1,
      "Apartment/unit number",
      data.apartmentUnitNumber || "",
      y1
    );
    y1 = addText(page1, "City/town", data.cityTown || "", y1);
    y1 = addText(page1, "District/region", data.districtRegion || "", y1);
    y1 = addText(page1, "Country", data.country || "", y1);

    let { page: page2, y: y2 } = createPage("Employment Information");
    y2 = addText(page2, "Occupation", data.occupation || "", y2);
    y2 = addText(page2, "Job Title", data.jobTitle || "", y2);
    y2 = addText(page2, "Name Of Employer", data.nameOfEmployer || "", y2);
    y2 = addText(page2, "Employer Country", data.employerCountry || "", y2);
    y2 = addText(page2, "Employer City", data.employerCity || "", y2);
    y2 = addText(
      page2,
      "Employer District/region",
      data.employerDistrictRegion || "",
      y2
    );
    y2 = addText(page2, "Since What Year", data.sinceWhatYear || "", y2);
    y2 -= 10;
    //   let { page: page5, y: y5 } = createPage('Eligibility Questions');
    y2 = addText2(page2, "Eligibility Questions", "", y2);
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
      "For each refusal, please indicate the country that refused you a visa or permit, or denied \n you entry, as well as the reasons provided to you by the country",
      data.refusedVisaTextArea,
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
      "For each arrest, charge, or conviction, please indicate \n where (city, country), when (month/year), the nature of the offence, and the sentence.?",
      data.criminalOffenceTextArea,
      y2
    );
    y2 -= 30;
    y2 = addText(
      page2,
      "* In the past two years, were you diagnosed with tuberculosis or have you been in close \n contact with a person with tuberculosis?",
      data.tuberculosisDiagnosis,
      y2
    );
    y2 -= 30;
    y2 = addText(
      page2,
      "Is your contact with tuberculosis the result of being a health care worker?",
      data.healthcareWorkerContact,
      y2
    );
    y2 -= 30;
    y2 = addText(
      page2,
      "Have you ever been diagnosed with tuberculosis?",
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
    y2 = addText2(page2, "Travel Information", "", y2);
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
    let { page: page3, y: y3 } = createPage("Consent and Declaration");
    // y2 = addText(page2, "Consent and Declaration", "", y2);
    y3 -= 10;
    y3 = addText(
      page3,
      "* Please briefly indicate if there are additional details pertinent to your application.\n For example, an urgent need to travel to Canada. \n Provide relevant details to avoid delays in the processing of your application.",
      data.additionalDetails,
      y3
    );
    y3 -= 45;
    y3 = addText(page3, "Signature of Applicant \n", data.signature, y3);
    y3 -= 20;
    y3 = addText(
      page3,
      "Agree Privacy Policy, Terms and Conditions & Refund Policy",
      data.agreePrivacyPolicy,
      y3
    );
    y3 = addText(page3, "IP Address", data.ipAddress, y3);

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
      dateOfBirth: pdfRows.dob?.split("T")[0],
      gender: pdfRows.gender,
      countryOfBIrth: countries[pdfRows.countryOfBIrth]?.name,
      cityOfBirth: pdfRows.cityOfBirth,
      maritalStatus: pdfRows.martialStatus,
      preferredLanguage: pdfRows.preferredLanguage,
      applyingForYourselfOrSomeoneElse: pdfRows.applyingOnBehalf,
      iam: pdfRows.iam,
      applicantSurname: pdfRows.applicantSurname,
      applicantGivenName: pdfRows.applicantGivenName,
      applicantMailingAddress: pdfRows.applicantMailingAddress,
      applicantPhoneExt: pdfRows.applicantPhoneExt,
      applicantPhone: pdfRows.applicantPhone,
      passportNo: pdfRows.passportNumber,
      passportNumberReEnter: pdfRows.passportNumber,
      passportIssueDate: pdfRows.passportIssueDate?.split("T")[0],
      passportExpiryDate: pdfRows.passportExpiryDate?.split("T")[0],
      passportCountryNationality:
        customCountries[pdfRows.passportCountry]?.name,
      streetAddressName: pdfRows.streetName,
      streetCivicNoHouseName: pdfRows.houseNumber,
      apartmentUnitNumber: pdfRows.apartment,
      cityTown: pdfRows.city,
      districtRegion: pdfRows.district,
      country: countries[pdfRows.country]?.name,
      occupation: pdfRows.occupation,
      jobTitle: pdfRows.job,
      nameOfEmployer: pdfRows.employer,
      employerCountry: countries[pdfRows.countryOfJob]?.name,
      employerCity: pdfRows.cityOfJob,
      employerDistrictRegion: pdfRows.districtOfJob,
      sinceWhatYear: pdfRows.sinceYear,
      refusedVisa: pdfRows.refusedVisa,
      refusedVisaTextArea: pdfRows.refusedVisaTextArea,
      criminalOffence: pdfRows.criminalOffence,
      criminalOffenceTextArea: pdfRows.criminalOffenceTextArea,
      healthcareWorkerContact: pdfRows.healthcareWorkerContact,
      tuberculosisDiagnosis: pdfRows.tuberculosisDiagnosis,
      tuberculosisDiagnosed: pdfRows.tuberculosisDiagnosed,
      appliedForVisa: pdfRows.appliedForVisa,
      knowTravelDate: pdfRows.knowTravelDate,
      travelDate: pdfRows.travelDate?.split("T")[0],
      travelTime: pdfRows.travelTime,
      travelingAlone: pdfRows.travelingAlone,
      travelingMembers: pdfRows.travelingMembers,
      additionalNationalities: pdfRows.additionalNationalities,
      additionalDetails: pdfRows.additionalDetails,
      signature: pdfRows.signature,
      agreePrivacyPolicy: "Accepted",
      TIN: pdfRows.TIN,
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
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
            sortModel={[
              {
                field: 'INSERTDATE',
                sort: 'desc', // 'asc' for ascending, 'desc' for descending
              },
            ]}
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
