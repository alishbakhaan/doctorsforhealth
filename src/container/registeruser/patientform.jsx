import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Pageheader from "../../components/common/pageheader/pageheader";
import Swal from "sweetalert2";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { MenuItem, Select } from "@mui/material";

function PatientForm() {
    const { patientId } = useParams();
    const navigate = useNavigate();
    const [value, setValue] = useState()
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    // const [title, setTitle] = useState("");
    const [gender, setGender] = useState([
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
    ]);
    const [selectedGender, setSelectedGender] = useState(null);
    const [cnic, setCNIC] = useState("");
    const [phone, setPhone] = useState({
        number: '',
        countryCode: '',
        flag: '',
    });
    const [dob, setDob] = useState("");
    const [address, setAddress] = useState("");
    // const [city, setCity] = useState("");
    // const [country, setCountry] = useState("");
    const [landlineNumber, setLandlineNumber] = useState("");
    const [clinicLandline, setClinicLandline] = useState("");
    const [polyclinicLandline, setPolyClinicLandline] = useState("");
    const [hospitalLandline, setHospitalLandline] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [profileImagePreview, setProfileImagePreview] = useState(null);

    useEffect(() => {
        if (patientId) {
            const token = localStorage.getItem('token');
            axios.get(`https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/users/profile/${patientId}`, {
                headers: {
                    'x-access-token': token,
                }
            })
                .then((response) => {
                    // const { firstName, lastName, title, gender, cnic, phone,
                    // dob, address, city, country, landline_number, clinic_landline,
                    // polyclinic_landline, hospital_landline, profile_image } = response.data;

                    setFirstName(response.data.personal_details.first_name || "");
                    setLastName(response.data.personal_details.last_name || "");
                    // setTitle(response.data.personal_details.title || "");
                    setSelectedGender(response.data.personal_details.gender || "");

                    setCNIC(response.data.personal_details.cnic || "");
                    setPhone(response.data.personal_details.phone || { number: '', countryCode: '', flag: '' });
                    setDob(response.data.personal_details.dob ? response.data.personal_details.dob.split('T')[0] : "");
                    setAddress(response.data.personal_details.address || "");
                    // setCity(response.data.personal_details.city || "");
                    // setCountry(response.data.personal_details.country || "");
                    setLandlineNumber(response.data.personal_details.landline_number || "");
                    setClinicLandline(response.data.personal_details.clinic_landline || "");
                    setPolyClinicLandline(response.data.personal_details.polyclinic_landline || "");
                    setHospitalLandline(response.data.personal_details.hospital_landline || "");
                    setProfileImage(response.data.personal_details.profile_image || null);
                    // console.log(response.data.personal_details);
                })
                .catch((error) => console.error(error.message));
        }
    }, [patientId, gender]);

    const handleGenderChange = (event) => {
        setSelectedGender(event.target.value);
        console.log(event.target.value)
    };

    useEffect(() => {
        // Cleanup function to revoke object URL
        return () => {
            if (profileImagePreview) {
                URL.revokeObjectURL(profileImagePreview);
            }
        };
    }, [profileImagePreview]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setProfileImage(file);
            setProfileImagePreview(fileURL);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        const patientData = new FormData();
        patientData.append("firstName", firstName);
        patientData.append("lastName", lastName);
        // patientData.append("title", title);
        patientData.append("gender", selectedGender);
        patientData.append("cnic", cnic);
        // patientData.append("phone[number]", phone.number);
        // patientData.append("phone[countryCode]", phone.countryCode);
        // patientData.append("phone[flag]", phone.flag);
        patientData.append("dob", dob);
        patientData.append("address", address);
        // patientData.append("city", city);
        // patientData.append("country", country);
        patientData.append("landline_number", landlineNumber);
        patientData.append("clinic_landline", clinicLandline);
        patientData.append("polyclinic_landline", polyclinicLandline);
        patientData.append("hospital_landline", hospitalLandline);
        if (profileImage) {
            patientData.append("profileImage", profileImage);
        }
        console.log(patientData);

        const token = localStorage.getItem('token');
        const url = patientId
            ? `https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/user/profile/edit/${patientId}`
            : `https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/user/profile/edit`;

        axios({
            method: patientId ? 'put' : 'post',
            url,
            data: patientData,
            headers: {
                'x-access-token': token,
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(() => {
                Swal.fire('Updated!', 'Patient Data has been Updated.', 'success');
                navigate('/patientdetails');
            })
            .catch((error) => {
                Swal.fire('Failed!', error.message, 'error');
                console.error(error.message);
            });
    };


    return (
        <Fragment>
            <Pageheader currentpage="Edit Patients Data" activepage="Form Elements" mainpage="Inputs" />
            <div className="grid grid-cols-12 gap-6 text-defaultsize">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">Update Form</h5>
                        </div>
                        <div className="box-body">
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-12 sm:gap-6">
                                    {/* First Name */}
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-placeholder" className="form-label">First Name</label>
                                        <input onChange={(e) => setFirstName(e.target.value)} value={firstName}
                                            type="text" className="form-control" id="input-placeholder" placeholder="Enter Your First Name" />
                                    </div>
                                    {/* Last Name */}
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-placeholder" className="form-label">Last Name</label>
                                        <input onChange={(e) => setLastName(e.target.value)} value={lastName}
                                            type="text" className="form-control" id="input-placeholder" placeholder="Enter Your Last Name" />
                                    </div>
                                    {/* Title */}
                                    {/* <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-placeholder" className="form-label">Title</label>
                                        <input onChange={(e) => setTitle(e.target.value)} value={title}
                                            type="text" className="form-control" id="input-placeholder" placeholder="Enter Your Title" />
                                    </div> */}
                                    {/* Gender */}
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-placeholder" className="form-label">Gender</label>
                                        <Select
                                            // labelId="gender-label"
                                            // id="gender-select"
                                            className="form-control"
                                            // id="select-beast-disabled"
                                            value={selectedGender}
                                            onChange={handleGenderChange}
                                            autoComplete="off"
                                            style={{ width: '100%', height: 'calc(1.5em + 0.75rem + 2px)', padding: '0.375rem 0.75rem' }}
                                        >
                                            <MenuItem value="">Select Your Gender</MenuItem>
                                            {gender.map((gender) => (
                                                <MenuItem key={gender.value} value={gender.value}>
                                                    {gender.label}
                                                </MenuItem>
                                            ))}
                                        </Select>

                                    </div>
                                    {/* CNIC */}
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-number" className="form-label">CNIC Number</label>
                                        <input onChange={(e) => setCNIC(e.target.value)} value={cnic}
                                            type="number" className="form-control" id="input-number" placeholder="42401-5188-512" />
                                    </div>
                                    {/* Phone Number */}
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="form-phone" className="form-label">Phone Number</label>
                                        <input onChange={(e) => setPhone(e.target.value)} value={phone.number}
                                            type="number" className="form-control" id="input-number" placeholder="42401-5188-512" />


                                    </div>
                                    {/* Date of Birth */}
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-date" className="form-label">Date of Birth</label>
                                        <input onChange={(e) => setDob(e.target.value)} value={dob}
                                            type="date" className="form-control" id="input-date" />
                                    </div>
                                    {/* Address */}
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-placeholder" className="form-label">Address</label>
                                        <input onChange={(e) => setAddress(e.target.value)} value={address}
                                            type="text" className="form-control" id="input-placeholder" placeholder="Enter Your Address" />
                                    </div>
                                    {/* City */}
                                    {/* <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-placeholder" className="form-label">City</label>
                                        <input onChange={(e) => setCity(e.target.value)} value={city}
                                            type="text" className="form-control" id="input-placeholder" placeholder="Enter Your City" />
                                    </div> */}
                                    {/* Country */}
                                    {/* <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-placeholder" className="form-label">Country</label>
                                        <input onChange={(e) => setCountry(e.target.value)} value={country}
                                            type="text" className="form-control" id="input-placeholder" placeholder="Enter Your Country" />
                                    </div> */}
                                    {/* Landline Number */}
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-number" className="form-label">Landline Number</label>
                                        <input onChange={(e) => setLandlineNumber(e.target.value)} value={landlineNumber}
                                            type="text" className="form-control" id="input-number" placeholder="Enter Landline Number" />
                                    </div>
                                    {/* Clinic Landline */}
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-number" className="form-label">Clinic Landline</label>
                                        <input onChange={(e) => setClinicLandline(e.target.value)} value={clinicLandline}
                                            type="text" className="form-control" id="input-number" placeholder="Enter Clinic Landline" />
                                    </div>
                                    {/* Polyclinic Landline */}
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-number" className="form-label">Polyclinic Landline</label>
                                        <input onChange={(e) => setPolyClinicLandline(e.target.value)} value={polyclinicLandline}
                                            type="text" className="form-control" id="input-number" placeholder="Enter Polyclinic Landline" />
                                    </div>
                                    {/* Hospital Landline */}
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-number" className="form-label">Hospital Landline</label>
                                        <input onChange={(e) => setHospitalLandline(e.target.value)} value={hospitalLandline}
                                            type="text" className="form-control" id="input-number" placeholder="Enter Hospital Landline" />
                                    </div>
                                    {/* Profile Image */}
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-file" className="form-label">Profile Image</label>
                                        <div className="flex">
                                       
                                            {profileImagePreview && (
                                                <img
                                                    src={profileImagePreview}
                                                    alt="Profile Preview"
                                                    className="w-14 h-14 object-cover rounded-full"
                                                />
                                            )}                             
                                            <input
                                                onChange={handleFileChange}
                                                type="file"
                                                className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/50
                                       file:border-0
                                      file:bg-light file:me-4
                                      file:py-3 file:px-4
                                      dark:file:bg-black/20 dark:file:text-white/50"
                                                id="input-file"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Submit Button */}
                                <button type="submit" className="ti-btn ti-btn-primary mt-4">Update </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default PatientForm;

