import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const columns = [
  { field: "id", headerName: "Sr No.", width: 80 },
  { field: "requestId", headerName: "Request Id", width: 120 },
  { field: "mainSessionId", headerName: "Main Session Id", width: 150 },
  { field: "fullName", headerName: "Full Name", width: 150 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "phone", headerName: "Phone", width: 120 },
  { field: "status", headerName: "Status", width: 100 },
  { field: "transactionId", headerName: "Transaction ID", width: 150 },
  { field: "requestedDatetime", headerName: "Requested Datetime", width: 200 },
  {
    field: "actions",
    headerName: "Actions",
    width: 120,
    renderCell: (params) => (
      <div className="h-full flex">
        <div className="flex justify-between items-center gap-2">
          <VisibilityIcon />
          <DeleteIcon />
          <PictureAsPdfIcon />
        </div>
      </div>
    ),
  },
];

const rows = [
  {
    id: 1,
    requestId: "123",
    mainSessionId: "MS123",
    fullName: "Jon Snow",
    email: "jon@example.com",
    phone: "1234567890",
    status: "Pending",
    transactionId: "T123",
    requestedDatetime: "2024-04-11 10:00:00",
  },
  {
    id: 2,
    requestId: "456",
    mainSessionId: "MS456",
    fullName: "Cersei Lannister",
    email: "cersei@example.com",
    phone: "9876543210",
    status: "Approved",
    transactionId: "T456",
    requestedDatetime: "2024-04-10 15:30:00",
  },
  // Add 20 more rows
  {
    id: 3,
    requestId: "789",
    mainSessionId: "MS789",
    fullName: "Daenerys Targaryen",
    email: "daenerys@example.com",
    phone: "5555555555",
    status: "Pending",
    transactionId: "T789",
    requestedDatetime: "2024-04-09 08:45:00",
  },
  {
    id: 4,
    requestId: "101112",
    mainSessionId: "MS101112",
    fullName: "Tyrion Lannister",
    email: "tyrion@example.com",
    phone: "1112223333",
    status: "Approved",
    transactionId: "T101112",
    requestedDatetime: "2024-04-08 11:20:00",
  },
  {
    id: 5,
    requestId: "131415",
    mainSessionId: "MS131415",
    fullName: "Arya Stark",
    email: "arya@example.com",
    phone: "4444444444",
    status: "Pending",
    transactionId: "T131415",
    requestedDatetime: "2024-04-07 14:55:00",
  },
  {
    id: 6,
    requestId: "161718",
    mainSessionId: "MS161718",
    fullName: "Sansa Stark",
    email: "sansa@example.com",
    phone: "9999999999",
    status: "Approved",
    transactionId: "T161718",
    requestedDatetime: "2024-04-06 17:30:00",
  },
  {
    id: 7,
    requestId: "192021",
    mainSessionId: "MS192021",
    fullName: "Bran Stark",
    email: "bran@example.com",
    phone: "7777777777",
    status: "Pending",
    transactionId: "T192021",
    requestedDatetime: "2024-04-05 20:05:00",
  },
  {
    id: 8,
    requestId: "222324",
    mainSessionId: "MS222324",
    fullName: "Robb Stark",
    email: "robb@example.com",
    phone: "8888888888",
    status: "Approved",
    transactionId: "T222324",
    requestedDatetime: "2024-04-04 23:40:00",
  },
  {
    id: 9,
    requestId: "252627",
    mainSessionId: "MS252627",
    fullName: "Jaime Lannister",
    email: "jaime@example.com",
    phone: "6666666666",
    status: "Pending",
    transactionId: "T252627",
    requestedDatetime: "2024-04-03 06:15:00",
  },
  {
    id: 10,
    requestId: "282930",
    mainSessionId: "MS282930",
    fullName: "Joffrey Baratheon",
    email: "joffrey@example.com",
    phone: "3333333333",
    status: "Approved",
    transactionId: "T282930",
    requestedDatetime: "2024-04-02 09:50:00",
  },

  // Add 10 more rows with similar structure
];

export default function DataTable() {
  return (
    <>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          //   initialState={{
          //     pagination: {
          //       paginationModel: {
          //         pageSize: 10,
          //       },
          //     },
          //   }}
          checkboxSelection
          disableRowSelectionOnClic
        />
      </Box>
    </>
  );
}
