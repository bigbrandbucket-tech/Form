import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import * as React from "react";

import axios from "axios";
// import { countries } from "countries-list";
import { customCountries } from "../../../utils/countries";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import Box from "@mui/material/Box";
import { countries } from "countries-list";
import { useNavigate } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

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
      width: 300,
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
      headerName: "Action",
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

  const [selectedMonth, setSelectedMonth] = React.useState('');

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const filteredRows = rows.filter(row => {
    if (!selectedMonth) return true; // No filter applied

    const rowDate = new Date(row.INSERTDATE);
    const rowMonth = rowDate.toLocaleString('en-US', { month: 'long' }).toLowerCase();

    return rowMonth.includes(selectedMonth.toLowerCase());
  });

  const monthNames = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2000, i, 1); // Arbitrary year and day
    return date.toLocaleString('en-US', { month: 'long' });
  });

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
      page.drawText(`${title.toUpperCase()}: ${value}`, {
        x: 50,
        y,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
      });
      return y - fontSize - 5; // Adjust y position for the next line
    };

    const addTextIfExists = (page, label, value, y) => {
      if (value) {
        // const labelColor = rgb(1, 0, 0); // Red color
        // const fontSize = 12;
        // page.drawText(label, {
        //   x: 50,
        //   y,
        //   size:fontSize,
        //   color: labelColor,
        // });
        // page.drawText(value, {
        //   x: 190,
        //   y,
        //   size:fontSize,
        //   color: labelColor,
        // });
        // return y - fontSize - 5; 
      
        return addText(page, label, value, y);
      }
      return y; // Return the same y if value doesn't exist
    };

    const addText2 = (page, title, value, y) => {
      const fontSize = 16;
      const font = page.font;
      page.drawText(`${title}: ${value}`, {
        x: 220,
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
        x: 220,
        y,
        size: 16,
        font: page.font,
        color: rgb(0, 0, 0),
      });

      return { page, y: y - 40 };
    };

    // Create and populate pages
    let { page: page1, y: y1} = createPage("Personal Information");
    // y1 = addText2(page1, "Personal Details", "", y1);
    y1 -= 20;
    y1 = addTextIfExists(page1, "First Name", data.firstName, y1);
    y1 = addTextIfExists(page1, "Middle Name", data.middleName, y1);
    y1 = addTextIfExists(page1, "Last Name", data.lastName, y1);
    y1 = addTextIfExists(page1, "Email Address", data.emailAddress, y1);
    y1 = addTextIfExists(page1, "Phone Extension", data.phoneNumberExt, y1);
    //   y1 = addTextIfExists(page1, 'Email address (re-enter)', data.emailAddressReEnter, y1);
    y1 = addTextIfExists(page1, "Phone", data.phone, y1);
    //   y1 = addTextIfExists(page1, 'Phone (re-enter)', data.phoneReEnter, y1);
    y1 = addTextIfExists(page1, "Date Of Birth", data.dateOfBirth, y1);
    y1 = addTextIfExists(page1, "Gender", data.gender, y1);
    y1 = addTextIfExists(page1, "Country Of Birth", data.countryOfBIrth, y1);
    y1 = addTextIfExists(page1, "City Of Birth", data.cityOfBirth, y1);
    y1 = addTextIfExists(page1, "Marital Status", data.maritalStatus, y1);
    y1 = addTextIfExists(
      page1,
      "Preferred language to contact you",
      data.preferredLanguage,
      y1
    );
    y1 -= 20;
    y1 = addText2(page1, "Applicant Status", "", y1);
    y1 -= 20;
    y1 = addTextIfExists(
      page1,
      "Are you applying on behalf of someone?",
      data.applyingForYourselfOrSomeoneElse == 1 ? "Yes" : "No",
      y1
    );
    y1 = addTextIfExists(page1, "I am? ", data.iam, y1);
    y1 = addTextIfExists(
      page1,
      "Surname(s) / last name(s) ",
      data.applicantSurname,
      y1
    );
    y1 = addTextIfExists(
      page1,
      "Given name(s) / first name(s)",
      data.applicantGivenName,
      y1
    );
    y1 = addTextIfExists(page1, " Mailing address", data.applicantMailingAddress, y1);
    y1 = addTextIfExists(page1, "Phone Extension", data.applicantPhoneExt, y1);
    y1 = addTextIfExists(page1, "Phone Number", data.applicantPhone, y1);

    y1 -= 20;
    //   let { page: page2, y: y2 } = createPage('Passport Details');
    y1 = addText2(page1, "Passport Details", "", y1);
    y1 -= 20;
    y1 = addTextIfExists(page1, "Passport No", data.passportNo, y1);
    y1 = addTextIfExists(
      page1,
      "Passport number (re-enter)",
      data.passportNumberReEnter,
      y1
    );
    y1 = addTextIfExists(page1, "Passport Issue Date", data.passportIssueDate, y1);
    y1 = addTextIfExists(page1, "Passport Expiry Date", data.passportExpiryDate, y1);
    y1 = addTextIfExists(
      page1,
      "Passport Country/Nationality",
      data.passportCountryNationality,
      y1
    );

    y1 = addTextIfExists(page1, "Taiwan Identification Number", data?.TIN || "", y1);

    y1 -= 20;
    //   let { page: page3, y: y3 } = createPage('Residential Address');
    y1 = addText2(page1, "Residential Address", "", y1);
    y1 -= 20;
    y1 = addTextIfExists(page1, "Street Address/name", data.streetAddressName, y1);
    y1 = addTextIfExists(
      page1,
      "Street/civic no. or house name",
      data.streetCivicNoHouseName,
      y1
    );
    y1 = addTextIfExists(
      page1,
      "Apartment/unit number",
      data.apartmentUnitNumber || "",
      y1
    );
    y1 = addTextIfExists(page1, "City/town", data.cityTown || "", y1);
    y1 = addTextIfExists(page1, "District/region", data.districtRegion || "", y1);
    y1 = addTextIfExists(page1, "Country", data.country || "", y1);

    let { page: page2, y: y2 } = createPage("Employment Information");
    y2 = addTextIfExists(page2, "Occupation", data.occupation || "", y2);
    y2 = addTextIfExists(page2, "Job Title", data.jobTitle || "", y2);
    y2 = addTextIfExists(page2, "Name Of Employer", data.nameOfEmployer || "", y2);
    y2 = addTextIfExists(page2, "Employer Country", data.employerCountry || "", y2);
    y2 = addTextIfExists(page2, "Employer City", data.employerCity || "", y2);
    y2 = addTextIfExists(
      page2,
      "Employer District/region",
      data.employerDistrictRegion || "",
      y2
    );
    y2 = addTextIfExists(page2, "Since What Year", data.sinceWhatYear || "", y2);
    y2 -= 10;
    //   let { page: page5, y: y5 } = createPage('Eligibility Questions');
    y2 = addText2(page2, "Eligibility Questions", "", y2);
    y2 -= 10;
    y2 = addTextIfExists(
      page2,
      "* Have you ever been refused a visa or permit, denied entry to, \n or ordered to leave Canada  or any other country/territory?",
      data.refusedVisa,
      y2
    );
    y2 -= 50;

    y2 = addTextIfExists(
      page2,
      "* For each refusal, please indicate the country that \n refused you a visa or permit, or denied  you entry,\n  as well as the reasons provided to you by \n the country",
      data.refusedVisaTextArea,
      y2
    );
    y2 -= 70;
    y2 = addTextIfExists(
      page2,
      "* Have you ever committed, been arrested for, \n been charged with or convicted \n of any criminal  offence   in any country/territory?",
      data.criminalOffence,
      y2
    );
    y2 -= 50;
    y2 = addTextIfExists(
      page2,
      "* For each arrest, charge, or conviction,\n please indicate  where (city, country), when (month/year), \n  the nature of the offence, and the sentence.?",
      data.criminalOffenceTextArea,
      y2
    );
    y2 -= 50;
    y2 = addTextIfExists(
      page2,
      "* In the past two years, were you diagnosed with \n tuberculosis or have you been in close  contact with\n a person with tuberculosis?",
      data.tuberculosisDiagnosis,
      y2
    );
    y2 -= 50;
    y2 = addTextIfExists(
      page2,
      "Is your contact with tuberculosis the result of being a \n health care worker?",
      data.healthcareWorkerContact,
      y2
    );
    y2 -= 30;
    y2 = addTextIfExists(
      page2,
      "Have you ever been diagnosed with tuberculosis?",
      data.tuberculosisDiagnosed,
      y2
    );
    y2 -= 30;
    y2 = addTextIfExists(
      page2,
      "* Do you have one of these conditions?",
      data.healthCondition,
      y2
    );

    y2 -= 10;
    //   let { page: page6, y: y6 } = createPage('Travel Information');
    let { page: page3, y: y3 } = createPage("Travel Information");
    y3 -= 10;
    y3 = addTextIfExists(
      page3,
      "Have you ever applied for or obtained a visa,  \n an eTA or a permit to visit, live, work or study in Canada?",
      data.appliedForVisa,
      y3
    );
    y3 -= 30;
    y3 = addTextIfExists(
      page3,
      "UCI Number",
      data.uciPreviousVisaNumber,
      y3
    );
    
    y3 -= 10;
    y3 = addTextIfExists(
      page3,
      "Do you know when you will travel to Canada?",
      data.knowTravelDate,
      y3
    );
    y3 -= 10;
    y3 = addTextIfExists(
      page3,
      "When do you plan to travel to Canada?",
      data.travelDate,
      y3
    );
    y3 -= 10;
    y3 = addTextIfExists(
      page3,
      "Time your flight to Canada will depart",
      data.travelTime.length
        ? JSON.parse(data.travelTime)[0] +
            ":" +
            JSON.parse(data.travelTime)[1] +
            " " +
            JSON.parse(data.travelTime)[2]
        : "",
      y3
    );
    y3 -= 10;
    y3 = addTextIfExists(page3, "Are you traveling alone?", data.travelingAlone, y3);
    y3 -= 10;
    y3 = addTextIfExists(
      page3,
      "How many members traveling with you?",
      data.travelingMembers,
      y3
    );
    y3 -= 10;
    y3 = addTextIfExists(
      page3,
      "Do you have Additional nationalities?",
      data.additionalNationalities,
      y3
    );
    y3 -= 10;
    y3 = addTextIfExists(
      page3,
      "Indicate which countries/territories you are a citizen of",
      data.citizenship,
      y3
    );
    y3 -= 10;
    let { page: page4, y: y4 } = createPage("Consent and Declaration");
    // y3 = addTextIfExists(page4, "Consent and Declaration", "", y3);
    y4 -= 10;
    y4 = addTextIfExists(
      page4,
      "* Please briefly indicate if there are additional  details pertinent \n to your application. For example, an urgent need to \n travel to Canada. Provide relevant details to avoid \n  delays in the processing of your application.",
      data.additionalDetails,
      y4
    );
    y4 -= 85;
    y4 = addTextIfExists(page4, "Signature of Applicant \n", data.signature, y4);
    y4 -= 40;
    y4 = addTextIfExists(
      page4,
      "Agree Privacy Policy, Terms and Conditions & Refund Policy",
      data.agreePrivacyPolicy,
      y4
    );
    y4 -= 20;
    y4 = addTextIfExists(page4, "IP Address", data.ipAddress, y4);

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
    console.log("rows", countries[pdfRows.citizenship]?.name,);
    const data = {
      firstName: pdfRows.firstName,
      middleName: pdfRows.middleName,
      lastName: pdfRows.lastName,
      emailAddress: pdfRows.email,
      phone: pdfRows.phoneNumber,
      phoneNumberExt:pdfRows.phoneNumberExt,
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
      citizenship:countries[pdfRows.citizenship]?.name,
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
      uciPreviousVisaNumber: pdfRows.uciPreviousVisaNumber,
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
      <FormControl variant="outlined" style={{ marginBottom: '1rem', width: '200px' }}>
        <InputLabel id="select-month-label">Filter by Month</InputLabel>
        <Select
          labelId="select-month-label"
          value={selectedMonth}
          onChange={handleMonthChange}
          label="Filter by Month"
        >
          <MenuItem value="">All</MenuItem>
          {monthNames.map((month, index) => (
            <MenuItem key={index} value={month.toLowerCase()}>{month}</MenuItem>
          ))}
        </Select>
      </FormControl>
        {rows?.length && (
          <DataGrid
            rows={filteredRows}
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
