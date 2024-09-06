import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Pageheader from "../../components/common/pageheader/pageheader";
import Swal from "sweetalert2";
import { MenuItem, Select } from "@mui/material";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview);

function DoctorForm() {
    const { patientId } = useParams();
    const navigate = useNavigate();
    const [value, setValue] = useState();
    // personal details
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

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
    // const [title, setTitle] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [landlineNumber, setLandlineNumber] = useState("");
    const [clinicLandline, setClinicLandline] = useState("");
    const [polyclinicLandline, setPolyClinicLandline] = useState("");
    const [hospitalLandline, setHospitalLandline] = useState("");
    // professional details
    const [specialty, setSpecialty] = useState("");
    const [spoken_language, setSpokenLanguage] = useState("");
    const [professional_memberships, setProfessionalmemberships] = useState("");
    const [professional_registration, setProfessionalregistration] = useState("");
    const [licence_register_number, setLicenceregisternumber] = useState("");
    const [licence_start_date, setLicencestartdate] = useState("");
    const [licence_end_date, setLicenceenddate] = useState("");
    const [about_yourself, setAboutYourself] = useState("");
    const [youtube_link, setYoutubeLink] = useState("");
    // images
    const [dfiles, setDFiles] = useState([]);
    const [cfiles, setCFiles] = useState([]);
    const [existingFiles, setExistingFiles] = useState([]);
    const [cexistingFiles, setCExistingFiles] = useState([]);
    const [profileImage, setProfileImage] = useState(null);
    const [profileImagePreview, setProfileImagePreview] = useState(null);
    const [cv, setCV] = useState(null);
    const [signature, setSign] = useState(null);


    useEffect(() => {
        if (patientId) {
            const token = localStorage.getItem('token');
            axios.get(`https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/users/profile/${patientId}`, {
                headers: {
                    'x-access-token': token,
                }
            })
                .then((response) => {
                    // setTitle(response.data.personal_details.title || "");
                    setCity(response.data.personal_details.city || "");
                    setCountry(response.data.personal_details.country || "");
                    setFirstName(response.data.personal_details.first_name || "");
                    setLastName(response.data.personal_details.last_name || "");
                    setSelectedGender(response.data.personal_details.gender || "");
                    setCNIC(response.data.personal_details.cnic || "");
                    setPhone(response.data.personal_details.phone || { number: '', countryCode: '', flag: '' });
                    setDob(response.data.personal_details.dob ? response.data.personal_details.dob.split('T')[0] : "");
                    setAddress(response.data.personal_details.address || "");
                    setLandlineNumber(response.data.personal_details.landline_number || "");
                    setClinicLandline(response.data.personal_details.clinic_landline || "");
                    setPolyClinicLandline(response.data.personal_details.polyclinic_landline || "");
                    setHospitalLandline(response.data.personal_details.hospital_landline || "");
                    // professional details
                    setSpecialty(response.data.professional_details.specialty || "");
                    setSpokenLanguage(response.data.professional_details.spoken_language || "");
                    setProfessionalmemberships(response.data.professional_details.professional_memberships || "");
                    setProfessionalregistration(response.data.professional_details.professional_registration || "");
                    setLicenceregisternumber(response.data.professional_details.licence_register_number || "");
                    setLicencestartdate(response.data.professional_details.licence_start_date ? response.data.professional_details.licence_start_date.split('T')[0] : "");
                    setLicenceenddate(response.data.professional_details.licence_end_date ? response.data.professional_details.licence_end_date.split('T')[0] : "");
                    setAboutYourself(response.data.professional_details.about_yourself || "");
                    setYoutubeLink(response.data.professional_details.youtube_link || "");
                    // setProfileImage(response.data.personal_details.profileImage || null);
                    // setCV(response.data.professional_details.cv || null);
                    // setSign(response.data.professional_details.signature || null);
                    setExistingFiles(response.data.professional_details.degree || []);
                    setCExistingFiles(response.data.professional_details.certificate || []);
                    console.log(response);
                })
                .catch((error) => console.error(error.message));
        }
    }, [patientId, gender]);


    const handleGenderChange = (event) => {
        setSelectedGender(event.target.value);
        console.log(event.target.value)
    };


    // profileImage
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setProfileImage(file);
            setProfileImagePreview(fileURL);
        }
    };
    useEffect(() => {
        return () => {
            if (profileImagePreview) {
                URL.revokeObjectURL(profileImagePreview);
            }
        };
    }, [profileImagePreview]);
    // cv
    const handleCVChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCV(file);
        }
    };
    // Signature
    const handleSignChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSign(file);
        }
    };
    // degree
    const handleDegreeChange = (fileItems) => {
        setDFiles(fileItems.map(fileItem => fileItem.file));
    };
    // certificate
    const handleCertificateChange = (fileItems) => {
        setCFiles(fileItems.map(fileItem => fileItem.file));
    };

    const handleDeleteFile = (index, fileType) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Remove'
        }).then((result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem('token');
                axios.delete(`https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/user/profile/delete-file/${patientId}/${fileType}/${index}`, {
                    headers: {
                        'x-access-token': token,
                    }
                })
                    .then((response) => {
                        console.log(response)
                        setExistingFiles(existingFiles.filter((_, i) => i !== index));
                        setCExistingFiles(cexistingFiles.filter((_, i) => i !== index));
                        Swal.fire('Deleted!', 'The document has been deleted.', 'success');
                    })
                    .catch((error) => Swal.fire('Failed!', error.message, 'error'));
                console.log(fileType)
                console.log(`Deleting file at index ${index} of type ${fileType} for patient ${patientId}`);
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const patientData = new FormData();
        patientData.append("city", city);
        patientData.append("country", country);
        // patientData.append("title", title);
        patientData.append("firstName", firstName);
        patientData.append("lastName", lastName);
        patientData.append("gender", selectedGender);
        patientData.append("cnic", cnic);
        // patientData.append("phone[number]", phone.number);
        // patientData.append("phone[countryCode]", phone.countryCode);
        // patientData.append("phone[flag]", phone.flag);
        patientData.append("dob", dob);
        patientData.append("address", address);
        patientData.append("landline_number", landlineNumber);
        patientData.append("clinic_landline", clinicLandline);
        patientData.append("polyclinic_landline", polyclinicLandline);
        patientData.append("hospital_landline", hospitalLandline);
        // professional details
        patientData.append("specialty", specialty);
        patientData.append("spoken_language", spoken_language);
        patientData.append("professional_memberships", professional_memberships);
        patientData.append("professional_registration", professional_registration);
        patientData.append("licence_register_number", licence_register_number);
        patientData.append("licence_start_date", licence_start_date);
        patientData.append("licence_end_date", licence_end_date);
        patientData.append("about_yourself", about_yourself);
        patientData.append("youtube_link", youtube_link);
        dfiles.forEach((file) => {
            patientData.append('degree', file);
        });
        cfiles.forEach((file) => {
            patientData.append('certificate', file);
        });
        if (profileImage) {
            patientData.append("profileImage", profileImage);
        }
        if (cv) {
            patientData.append("cv", cv);
        }
        if (signature) {
            patientData.append("signature", signature);
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
                Swal.fire('Updated!', 'Doctor Data has been Updated.', 'success');
                navigate('/doctordetails');
            })
            .catch((error) => {
                Swal.fire('Failed!', error.message, 'error');
                console.error(error.message);
            });
    };


    return (
        <Fragment>
            <Pageheader currentpage="Edit Doctors Data" activepage="Form Elements" mainpage="Inputs" />
            <div className="grid grid-cols-12 gap-6 text-defaultsize">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <form onSubmit={handleSubmit}>
                            {/* personal detail */}
                            <div className="box-header">
                                <h5 className="box-title">Personal Details</h5>
                            </div>
                            <div className="box-body">

                                <div className="grid grid-cols-12 sm:gap-6">
                                    {/* Title */}
                                    {/* <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-placeholder" className="form-label">Title</label>
                                        <input onChange={(e) => setTitle(e.target.value)} value={title}
                                            type="text" className="form-control" id="input-placeholder" placeholder="Enter Your Title" />
                                    </div> */}

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
                                    {/* Date of Birth */}
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-date" className="form-label">Date of Birth</label>
                                        <input onChange={(e) => setDob(e.target.value)} value={dob}
                                            type="date" className="form-control" id="input-date" />
                                    </div>

                                    {/* CNIC */}
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-number" className="form-label">CNIC Number</label>
                                        <input onChange={(e) => setCNIC(e.target.value)} value={cnic}
                                            type="number" className="form-control" id="input-number" placeholder="42401-5188-512" />
                                    </div>
                                    {/* Gender */}
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="gender-select" className="form-label">Gender</label>
                                        <Select
                                            className="form-control"
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
                                    {/* Phone Number */}
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="form-phone" className="form-label">Phone Number</label>
                                        <PhoneInput
                                            placeholder="Enter phone number"
                                            value={value}
                                            onChange={setValue} className="form-control" />
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
                                    {/* Address */}
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-placeholder" className="form-label">Address</label>
                                        <input onChange={(e) => setAddress(e.target.value)} value={address}
                                            type="text" className="form-control" id="input-placeholder" placeholder="Enter Your Address" />
                                    </div>

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

                                </div>
                            </div>
                            {/* professional detail */}
                            <div className="box-header">
                                <h5 className="box-title">Professional Details</h5>
                            </div>
                            <div className="box-body">

                                <div className="grid grid-cols-12 sm:gap-6">
                                    {/* Speciality*/}
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-placeholder" className="form-label">Speciality</label>
                                        <input onChange={(e) => setSpecialty(e.target.value)} value={specialty}
                                            type="text" className="form-control" id="input-placeholder" placeholder="Your Speciality" />
                                    </div>
                                    {/* Spoken Language */}
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-placeholder" className="form-label">Spoken Language</label>
                                        <input onChange={(e) => setSpokenLanguage(e.target.value)} value={spoken_language}
                                            type="text" className="form-control" id="input-placeholder" placeholder="Your Mother Tongue" />
                                    </div>
                                    {/* licence_start_date */}
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-date" className="form-label">Liscensce StartDate</label>
                                        <input onChange={(e) => setLicencestartdate(e.target.value)} value={licence_start_date}
                                            type="date" className="form-control" id="input-date" />
                                    </div>
                                    {/* licence_end_date */}
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-date" className="form-label"> Liscensce EndDate</label>
                                        <input onChange={(e) => setLicenceenddate(e.target.value)} value={licence_end_date}
                                            type="date" className="form-control" id="input-date" />
                                    </div>
                                    {/* licence_register_number */}
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-placeholder" className="form-label">Liscensce Register Number</label>
                                        <input onChange={(e) => setLicenceregisternumber(e.target.value)} value={licence_register_number}
                                            type="text" className="form-control" id="input-placeholder" placeholder="7456092387475" />
                                    </div>
                                    {/* professional_memberships */}
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-number" className="form-label">Professional Memberships</label>
                                        <input onChange={(e) => setProfessionalmemberships(e.target.value)} value={professional_memberships}
                                            type="text" className="form-control" id="input-number" placeholder="99823551887512" />
                                    </div>
                                    {/* professional_registration */}
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-placeholder" className="form-label">Professional Registration</label>
                                        <input onChange={(e) => setProfessionalregistration(e.target.value)} value={professional_registration}
                                            type="text" className="form-control" id="input-placeholder" placeholder="42401-5188-512" />
                                    </div>
                                    {/* Youtube Link */}
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-placeholder" className="form-label">Youtube Link</label>
                                        <input onChange={(e) => setYoutubeLink(e.target.value)} value={youtube_link}
                                            type="url" className="form-control" id="input-placeholder" placeholder="http://example.com" />
                                    </div>
                                    {/* About Yourself */}
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-number" className="form-label">About Yourself</label>
                                        <textarea onChange={(e) => setAboutYourself(e.target.value)} value={about_yourself} className="form-control" id="text-area" placeholder="what's describes you best?" rows={1}></textarea>
                                    </div>
                                </div>
                            </div>
                            {/* forms-images */}
                            <div className="box-header">
                                <h5 className="box-title">File Uploads: (Profile Image, Degree, CoverLetter, Certificate, Signature)</h5>
                            </div>
                            <div className="box-body">
                                <div className="grid grid-cols-12 sm:gap-6">
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
                                                id="input-file"
                                                className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/50
                                       file:border-0
                                      file:bg-light file:me-4
                                      file:py-3 file:px-4
                                      dark:file:bg-black/20 dark:file:text-white/50"
                                            />

                                        </div>
                                    </div>
                                    {/* CV */}
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-file" className="form-label">Cover Letter</label>
                                        <div className="flex">
                                            <input
                                                onChange={handleCVChange}
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
                                    {/* Signature */}
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-file" className="form-label">Signature</label>
                                        <div className="flex">
                                            <input
                                                onChange={handleSignChange}
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
                                    {/* Certificate */}
                                    <div className="xl:col-span-6 lg:col-span-12 md:col-span-12 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-file" className="form-label">Certificate</label>
                                        {/* component for new file uploads */}
                                        <FilePond
                                            files={cfiles}
                                            allowMultiple={true}
                                            maxFiles={5}
                                            onupdatefiles={handleCertificateChange}
                                            acceptedFileTypes={[
                                                'image/*',
                                                'application/pdf',
                                                'text/plain',
                                                'application/msword',
                                                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                                                'application/vnd.ms-excel',
                                                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                                'application/vnd.ms-powerpoint',
                                                'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                                                'application/zip',
                                                'application/x-rar-compressed',
                                                'application/x-tar',
                                                'application/x-7z-compressed',
                                                'text/html',
                                                'text/css',
                                                'application/javascript'
                                            ]}
                                            labelIdle='Maximum Files Five <br/> Drag & Drop your certificate or <span class="filepond--label-action">Browse</span>'
                                        />
                                        {/*  component for existing file uploads */}
                                        {cexistingFiles.map((fileUrl, index) => (
                                            <div
                                                key={index}
                                                className="xl:col-span-6 lg:col-span-6 md:col-span-12 sm:col-span-12 col-span-12 relative"
                                            >
                                                {/* Check if it's an image file */}
                                                {fileUrl.endsWith('.png') || fileUrl.endsWith('.jpg') || fileUrl.endsWith('.jpeg') ? (
                                                    <img
                                                        src={fileUrl}
                                                        alt="Preview"
                                                        className="w-full h-14 object-cover rounded-md bg-primary"
                                                    />
                                                ) : (
                                                    <div className="w-full h-14 rounded-md bg-primary text-white flex items-center justify-center">
                                                        <span className="mx-4">{fileUrl.split('/').pop()}</span>
                                                    </div>
                                                )}

                                                {/* Delete Button with Overlay */}
                                                <Link
                                                    aria-label="anchor"
                                                    to="#"
                                                    className=" ti-btn-wave !gap-0 !m-0 text-[1rem] text-danger  hover:text-white absolute top-3 right-2 z-10"
                                                    onClick={() => handleDeleteFile(index, 'certificate')}
                                                >
                                                    <i className="ri-delete-bin-line"></i>
                                                </Link>
                                            </div>
                                        ))}

                                    </div>
                                    {/* degree */}
                                    <div className="xl:col-span-6 lg:col-span-12 md:col-span-12 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-file" className="form-label">Degree</label>
                                        {/* component for new file uploads */}
                                        <FilePond
                                            files={dfiles}
                                            allowMultiple={true}
                                            maxFiles={5}
                                            onupdatefiles={handleDegreeChange}
                                            acceptedFileTypes={[
                                                'image/*',
                                                'application/pdf',
                                                'text/plain',
                                                'application/msword',
                                                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                                                'application/vnd.ms-excel',
                                                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                                'application/vnd.ms-powerpoint',
                                                'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                                                'application/zip',
                                                'application/x-rar-compressed',
                                                'application/x-tar',
                                                'application/x-7z-compressed',
                                                'text/html',
                                                'text/css',
                                                'application/javascript'
                                            ]}
                                            labelIdle='Maximum Files Five <br/> Drag & Drop your Degree or <span class="filepond--label-action">Browse</span>'
                                        />
                                        {/*  component for existing file uploads */}
                                        {existingFiles.map((fileUrl, index) => (
                                            <div
                                                key={index}
                                                className="xl:col-span-6 lg:col-span-6 md:col-span-12 sm:col-span-12 col-span-12 relative"
                                            >
                                                {/* Check if it's an image file */}
                                                {fileUrl.endsWith('.png') || fileUrl.endsWith('.jpg') || fileUrl.endsWith('.jpeg') ? (
                                                    <img
                                                        src={fileUrl}
                                                        alt="Preview"
                                                        className="w-full h-14 object-cover rounded-md bg-primary"
                                                    />
                                                ) : (
                                                    <div className="w-full h-14 rounded-md bg-primary text-white flex items-center justify-center">
                                                        <span className="mx-4">{fileUrl.split('/').pop()}</span>
                                                    </div>
                                                )}

                                                {/* Delete Button with Overlay */}
                                                <Link
                                                    aria-label="anchor"
                                                    to="#"
                                                    className=" ti-btn-wave !gap-0 !m-0 text-[1rem] text-danger  hover:text-white absolute top-3 right-2 z-10"
                                                    onClick={() => handleDeleteFile(index, 'degree')}
                                                >
                                                    <i className="ri-delete-bin-line"></i>
                                                </Link>
                                            </div>
                                        ))}

                                    </div>

                                </div>
                                {/* Submit Button */}
                                <button type="submit" className="ti-btn ti-btn-primary mt-4">Update </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default DoctorForm;
