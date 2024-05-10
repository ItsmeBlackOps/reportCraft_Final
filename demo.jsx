import React, { useState, useEffect } from "react";
import "./../App.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { MenuItem } from "@mui/material";
import TaskList from "./DataSources/CandidateData";
import { useAuth } from "../utils/AuthContent";

const StyledQuickFilterInsideOfGrid = () => {
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState("");
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    InterviewSchedule: "",
    candidateName: "",
    comments: "",
    company: "",
    date: new Date().toISOString().substr(0, 10),
    employmentType: "",
    followUp2: "",
    followUp3: "",
    followUp4: "",
    interview: "",
    location: "",
    position: "",
    qcStatus: "",
    rate: "",
    recruiterName: user.name,
    sourceOfSubmission: "",
    status: "",
    submission: "",
    vendorContact: "",
    vendorName: "",
  });
  const [submissionOrInterview, setSubmissionOrInterview] = useState("");

  useEffect(() => {
    // Fetch data here if needed
  }, []);

  const handleDataReceived = (jsonData) => {
    setData(jsonData);
  };

  const handleSelectChange = (event) => {
    const selectedUserName = event.target.value;
    setSelectedUser(selectedUserName);
    setFormData((prevFormData) => ({
      ...prevFormData,
      candidateName: selectedUserName,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    // Send form data to server
    fetch("https://qxz2pcz7-3000.inc1.devtunnels.ms/addData", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  const handleSubmissionOrInterviewChange = (event) => {
    const selectedOption = event.target.value;
    setSubmissionOrInterview(selectedOption);
    setFormData((prevFormData) => ({
      ...prevFormData,
      interview: selectedOption === "Interview" ? "" : prevFormData.interview, // Reset interview date if submission selected
    }));
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "90%" },
        marginTop: "64px",
      }}
      autoComplete="off"
    >
      <div>
        <TextField
          label="Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleInputChange}
          variant="standard"
          InputLabelProps={{
            shrink: true,
          }}
          disabled
        />

        <TextField
          fullWidth
          select
          label="Select User"
          id="user-select"
          name="candidateName"
          value={selectedUser}
          onChange={handleSelectChange}
          required
        >
          {data.map((user, index) => (
            <MenuItem key={index} value={user.name}>
              {user.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Submission or Interview"
          name="submissionOrInterview"
          value={submissionOrInterview}
          onChange={handleSubmissionOrInterviewChange}
          variant="standard"
        >
          <MenuItem value="Submission">Submission</MenuItem>
          <MenuItem value="Interview">Interview</MenuItem>
        </TextField>

        {submissionOrInterview === "Interview" && (
          <TextField
            label="Interview Schedule"
            name="InterviewSchedule"
            type="date"
            value={formData.InterviewSchedule}
            onChange={handleInputChange}
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}

        <TaskList onDataReceived={handleDataReceived} />

        <TextField
          required
          label="Company"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          variant="standard"
        />
        <TextField
          label="Employment Type"
          name="employmentType"
          value={formData.employmentType}
          onChange={handleInputChange}
          variant="standard"
        >
          <MenuItem value="Full-Time">Full-time</MenuItem>
          <MenuItem value="W2">W2</MenuItem>
          <MenuItem value="C2C">C2C</MenuItem>
        </TextField>
        
        {/* Render other fields based on submissionOrInterview state */}
        {submissionOrInterview === "Submission" && (
          <>
            <TextField
              label="Source of Submission"
              name="sourceOfSubmission"
              value={formData.sourceOfSubmission}
              onChange={handleInputChange}
              variant="standard"
            />
            <TextField
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              variant="standard"
            />
            <TextField
              label="Submission"
              name="submission"
              value={formData.submission}
              onChange={handleInputChange}
              variant="standard"
            />
            <TextField
              label="Vendor Contact"
              name="vendorContact"
              value={formData.vendorContact}
              onChange={handleInputChange}
              variant="standard"
            />
            <TextField
              label="Vendor Name"
              name="vendorName"
              value={formData.vendorName}
              onChange={handleInputChange}
              variant="standard"
            />
          </>
        )}

      </div>
      <TextField
        label="Comments"
        name="comments"
        value={formData.comments}
        onChange={handleInputChange}
        variant="standard"
      />
      <TextField
        label="Follow Up 2"
        name="followUp2"
        value={formData.followUp2}
        onChange={handleInputChange}
        variant="standard"
      />
      <TextField
        label="Follow Up 3"
        name="followUp3"
        value={formData.followUp3}
        onChange={handleInputChange}
        variant="standard"
      />
      <TextField
        label="Follow Up 4"
        name="followUp4"
        value={formData.followUp4}
        onChange={handleInputChange}
        variant="standard"
      />

      <div>
        <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </div>
    </Box>
  );
};

export default StyledQuickFilterInsideOfGrid;
