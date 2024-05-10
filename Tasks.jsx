import React, { useState, useEffect } from 'react';
import { Portal } from '@mui/base/Portal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { DataGrid, GridToolbarQuickFilter, GridToolbar } from '@mui/x-data-grid';
import TaskList from "./DataSources/TasksData";

function MyCustomToolbar(props) {
  return (
    <React.Fragment>
      <Portal container={() => document.getElementById('filter-panel')}>
        <GridToolbarQuickFilter />
      </Portal>
      <GridToolbar {...props} />
    </React.Fragment>
  );
}

export default function QuickFilterOutsideOfGrid() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const onDataReceived = (data) => {
    setTasks(data); // Fixed typo here
    setLoading(false);
  };

  // Removed the unnecessary useEffect hook

  const columns = [
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'candidateName', headerName: 'Candidate Name', width: 200 },
    { field: 'recruiterName', headerName: 'Recruiter Name', width: 200 },
    { field: 'company', headerName: 'Company', width: 200 },
    { field: 'employmentType', headerName: 'Employment Type', width: 150 },
    { field: 'interview', headerName: 'InterviewOrSubmission', width: 150 },
    { field: 'interviewSchedule', headerName: 'Interview Schedule', width: 200 },
    { field: 'location', headerName: 'Location', width: 150 },
    { field: 'position', headerName: 'Position', width: 200 },
    { field: 'rate', headerName: 'Rate', width: 100 },
    { field: 'sourceOfSubmission', headerName: 'Source Of Submission', width: 200 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'vendorContact', headerName: 'Vendor Contact', width: 200 },
    { field: 'vendorName', headerName: 'Vendor Name', width: 200 },
    { field: 'comments', headerName: 'Comments', width: 200 },
    { field: 'qcStatus', headerName: 'QC Status', width: 150 },
    { field: 'followUp2', headerName: 'Follow Up 2', width: 200 },
    { field: 'followUp3', headerName: 'Follow Up 3', width: 200 },
    { field: 'followUp4', headerName: 'Follow Up 4', width: 200 },
  ];
    return (
    <Grid container spacing={2} sx={{marginTop: "64px",}}>
      <Grid item>
        <Box id="filter-panel" />
      </Grid>
      <Grid item style={{ height: 800, width: '100%' }} >
        <DataGrid
          rows={tasks}
          columns={columns}
          slots={{
            toolbar: MyCustomToolbar,
          }}
          initialState={{
            filter: {
              filterModel: {
                items: [],
                quickFilterExcludeHiddenColumns: true,
              },
            },
          }}
        />
      </Grid>
      <div>
        {/* Render TaskList component and pass onDataReceived as a prop */}
        <TaskList onDataReceived={onDataReceived} />
      </div>
    </Grid>
  );
}
