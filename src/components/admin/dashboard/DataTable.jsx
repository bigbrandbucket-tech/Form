import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import axios from "axios";
import { countries } from "countries-list";

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
    renderCell: (params) => <strong>{countries[params?.value]?.name}</strong>,
  },
  { field: 'ip', headerName: 'IP Address', width: 200 },
  { field: "INSERTDATE", headerName: "Date & Time", width: 200 },
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

export default function DataTable() {
  const [rows, setRows] = React.useState([]);

  const fetchApi = async () => {
    const resposne = await axios.get(
      "https://form-backend-gamma.vercel.app/api/get"
    );
    console.log(resposne);
    setRows(resposne.data);
  };

 
  React.useEffect(() => {
    fetchApi();
  }, []);

  console.log(rows);
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
