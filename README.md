Hospital Management Backend System
This project is a backend system that simulates a hospital organization. It uses an MSSQL database with stored procedures to handle key operations. Additionally, it automatically sends customized emails for events such as creating a new user, adding a new patient, scheduling an appointment, or recording a diagnosis.

HOW TO USE:
Clone or download the repository.
Navigate to the project folder.
Inside the API folder, run:
'npm install'
To start the API run:
'npm start'
Navigate to the BackgroundServices folder and repeat the installation:
'npm install'
To start the background services run:
'npm start'


Functionalities
User Management
Create Account:
Send a POST request to:
http://localhost:5000/api/users/signup
Include the following in the request body:

json
Copy code
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password123",
  "role": "user" // or "admin"
}


FUNCTIONALITIES:

USER MANAGEMENT-
  Create Account:
    Send a POST request to:
    http://localhost:5000/api/users/signup
    Include the following in the request body:
    json
    {
      "name": "User Name",
      "email": "user@example.com",
      "password": "password123",
      "role": "user" // or "admin"
    }

  Login:
    Send a POST request to:
    http://localhost:5000/api/users/signin
    Provide your email and password.
  
  Get All Users:
    Send a GET request to:
    http://localhost:5000/api/users/

  Delete User:
    Send a DELETE request to:
    http://localhost:5000/api/users/:id
    Replace :id with the ID of the user to delete.

    
PATIENT MANAGEMENT-
  Create New Patient:
    Send a POST request to:
    http://localhost:5000/api/patients/
    Include the following in the request body:
    json
    {
      "name": "Patient Name",
      "resident_area": "Area",
      "room_admitted": "Room Number",
      "admission_no": "Admission Number",
      "id_no": "ID Number",
      "email": "patient@example.com"
    }

  Get All Patients:
    Send a GET request to:
    http://localhost:5000/api/patients/

  Update Patient:
    Send a PUT request to:
    http://localhost:5000/api/patients/:id
    Replace :id with the patient ID and include the updated status in the request body:
    {
      "status": "Updated Status"
    }

  Delete Patient:
    Send a DELETE request to:
    http://localhost:5000/api/patients/:id
    Replace :id with the patient ID.


APPOINTMENT MANAGEMENT-
  Create Appointment:
    Send a POST request to:
    http://localhost:5000/api/appointments/
    Include the following in the request body:
    json
    {
      "patient_name": "Patient Name",
      "doctor_email": "doctor@example.com",
      "date": "YYYY-MM-DD",
      "patient_email": "patient@example.com"
    }


DIAGNOSIS MANAGEMENT-
  Create Diagnosis:
    Send a POST request to:
    http://localhost:5000/api/diagnosis/
    Include the following in the request body:
    json
    {
      "name_treatment": "Treatment Name",
      "drug_administered": "Drug Name",
      "doctor_name": "Doctor Name",
      "patient_email": "patient@example.com",
      "bill": "Amount",
      "date": "YYYY-MM-DD",
      "paid": false,
      "description": "Details",
      "patient_status": "Status"
    }

  Update Diagnosis:
    Send a POST request to:
    http://localhost:5000/api/diagnosis/:id
    Replace :id with the diagnosis ID. This updates the status to "paid."

  Get Diagnosis for a User:
    Send a POST request to:
    http://localhost:5000/api/diagnosis/user
    Retrieve all diagnoses related to a specific patient.
