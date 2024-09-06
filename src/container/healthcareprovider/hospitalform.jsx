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

function HospitalForm() {
    const { hospitalId } = useParams();
    const navigate = useNavigate();
    const [value, setValue] = useState();
    // const [title, setTitle] = useState("");
    // personal details
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [landlineNumber, setLandlineNumber] = useState("");
    const [clinicLandline, setClinicLandline] = useState("");
    const [polyclinicLandline, setPolyClinicLandline] = useState("");
    const [hospitalLandline, setHospitalLandline] = useState("");
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
    // healthcare provider details
    const [website, setWebsite] = useState("");
    const [description, setDescription] = useState("");
    const [opening_time, setOpeningTime] = useState("");
    const [closing_time, setClosingTime] = useState("");
    const [bussiness_contact, setBussinessContact] = useState("");
    const [services, setServices] = useState("");
    const [facilities, setFacilities] = useState("");
    const [is_24_hours, setIs24Hours] = useState(false);
    // images
    const [profileImage, setProfileImage] = useState(null);
    const [profileImagePreview, setProfileImagePreview] = useState(null);
    const [gfiles, setGFiles] = useState([]);
    const [gexistingFiles, setGExistingFiles] = useState([]);



    useEffect(() => {
        if (hospitalId) {
            const token = localStorage.getItem('token');
            axios.get(`https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/users/profile/${hospitalId}`, {
                headers: {
                    'x-access-token': token,
                }
            })
                .then((response) => {
                    // setTitle(response.data.personal_details.title || "");
                    // personal details
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
                    setProfileImage(response.data.personal_details.profile_image || null);
                    // healthcare provider details
                    setWebsite(response.data.healthcare_provider_details.website || "");
                    setDescription(response.data.healthcare_provider_details.description || "");
                    setOpeningTime(response.data.healthcare_provider_details.opening_time || "");
                    setClosingTime(response.data.healthcare_provider_details.closing_time || "");
                    setBussinessContact(response.data.healthcare_provider_details.bussiness_contact || "");
                    setServices(response.data.healthcare_provider_details.services || "");
                    setFacilities(response.data.healthcare_provider_details.facilities || "");
                    setIs24Hours(response.data.healthcare_provider_details.is_24_hours || false);
                    setGExistingFiles(response.data.healthcare_provider_details.image_gallery || []);
                    console.log(response);
                })
                .catch((error) => console.error(error.message));
        }
    }, [hospitalId, gender]);

    // gender
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

    // image gallery
    const handleGalleryChange = (fileItems) => {
        setGFiles(fileItems.map(fileItem => fileItem.file));
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
                axios.delete(`https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/user/profile/delete-file/${hospitalId}/${fileType}/${index}`, {
                    headers: {
                        'x-access-token': token,
                    }
                })
                    .then((response) => {
                        console.log(response)
                        setGExistingFiles(gexistingFiles.filter((_, i) => i !== index));
                        Swal.fire('Deleted!', 'The document has been deleted.', 'success');
                    })
                    .catch((error) => Swal.fire('Failed!', error.message, 'error'));
                console.log(fileType)
                console.log(`Deleting file at index ${index} of type ${fileType} for patient ${hospitalId}`);
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const patientData = new FormData();
        // patientData.append("city", city);
        // patientData.append("country", country);
        // patientData.append("title", title);

        // Personal Details
        patientData.append("phone[number]", phone.number);
        patientData.append("phone[countryCode]", phone.countryCode);
        patientData.append("phone[flag]", phone.flag);
        patientData.append("firstName", firstName);
        patientData.append("lastName", lastName);
        patientData.append("gender", selectedGender);
        patientData.append("cnic", cnic);
        patientData.append("dob", dob);
        patientData.append("address", address);
        patientData.append("landline_number", landlineNumber);
        patientData.append("clinic_landline", clinicLandline);
        patientData.append("polyclinic_landline", polyclinicLandline);
        patientData.append("hospital_landline", hospitalLandline);
        // healthcare provider details
        patientData.append("website", website);
        patientData.append("description", description);
        patientData.append("opening_time", opening_time);
        patientData.append("closing_time", closing_time);
        patientData.append("bussiness_contact", bussiness_contact);
        patientData.append("services", services);
        patientData.append("facilities", facilities);
        patientData.append("is_24_hours", is_24_hours ? true : false);
        gfiles.forEach((file) => {
            patientData.append('gallery', file);
        });
        if (profileImage) {
            patientData.append("profileImage", profileImage);
        }

        console.log(patientData);
        const token = localStorage.getItem('token');
        const url = hospitalId
            ? `https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/user/profile/edit/${hospitalId}`
            : `https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/user/profile/edit`;

        axios({
            method: hospitalId ? 'put' : 'post',
            url,
            data: patientData,
            headers: {
                'x-access-token': token,
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(() => {
                Swal.fire('Updated!', 'Hospital Data has been Updated.', 'success');
                navigate('/hospitaldetails');
            })
            .catch((error) => {
                Swal.fire('Failed!', error.message, 'error');
                console.error(error.message);
            });
    };


    return (
        <Fragment>
            <Pageheader currentpage="Edit Hospital Data" activepage="Form Elements" mainpage="Inputs" />
            <div className="grid grid-cols-12 gap-6 text-defaultsize">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <form onSubmit={handleSubmit}>
                            {/* personal detail */}
                            <div className="box-header">
                                <h5 className="box-title">Hospital Details</h5>
                            </div>
                            <div className="box-body">

                                <div className="grid grid-cols-12 sm:gap-6">
                                    {/* Title */}
                                    {/* <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-placeholder" className="form-label">Title</label>
                                        <input onChange={(e) => setTitle(e.target.value)} value={title}
                                            type="text" className="form-control" id="input-placeholder" placeholder="Enter Your Title" />
                                    </div> */}
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
                                            value={phone.number} // Update with fetched phone number
                                            onChange={(value) => setPhone((prev) => ({ ...prev, number: value }))}
                                            className="form-control" />
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
                            {/* healthcare_provider_details */}
                            <div className="box-header">
                                <h5 className="box-title">Healthcare Provider Details</h5>
                            </div>
                            <div className="box-body">

                                <div className="grid grid-cols-12 sm:gap-6">
                                    {/* Website*/}
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-placeholder" className="form-label">Website</label>
                                        <input onChange={(e) => setWebsite(e.target.value)} value={website}
                                            type="url" className="form-control" id="input-placeholder" placeholder="http://example.com" />
                                    </div>
                                    {/* Description */}
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-placeholder" className="form-label">Description</label>
                                        <textarea onChange={(e) => setDescription(e.target.value)} value={description}
                                            className="form-control" id="text-area" placeholder="Any description?" rows={1}></textarea>
                                    </div>
                                    {/* Opening Time */}
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-date" className="form-label">Opening Time</label>
                                        <input onChange={(e) => setOpeningTime(e.target.value)} value={opening_time}
                                            type="time" className="form-control" id="input-time" />
                                    </div>
                                    {/* Closing Time */}
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-date" className="form-label">Closing Time</label>
                                        <input onChange={(e) => setClosingTime(e.target.value)} value={closing_time}
                                            type="time" className="form-control" id="input-time" />
                                    </div>
                                    {/* Bussiness Contact */}
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-placeholder" className="form-label">Bussiness Contact</label>
                                        <input onChange={(e) => setBussinessContact(e.target.value)} value={bussiness_contact}
                                            type="number" className="form-control" id="input-placeholder" placeholder="7456092387475" />
                                    </div>
                                    {/* Services */}
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-number" className="form-label">Services</label>
                                        <input onChange={(e) => setServices(e.target.value)} value={services}
                                            type="text" className="form-control" id="input-number" placeholder="Your Services" />
                                    </div>
                                    {/* Facilities */}
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-placeholder" className="form-label">Facilities</label>
                                        <input onChange={(e) => setFacilities(e.target.value)} value={facilities}
                                            type="text" className="form-control" id="input-placeholder" placeholder="Any Facilities.." />
                                    </div>


                                </div>
                                <div className="grid grid-cols-12 sm:gap-6">
                                    <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                                        <div className="custom-toggle-switch flex items-center my-4">
                                            <span className="ms-3 mx-4">Opens 24hrs?</span>
                                            <input
                                                checked={is_24_hours}
                                                onChange={(e) => setIs24Hours(e.target.checked)}
                                                id="toggleswitchPrimary"
                                                name="toggleswitch001"
                                                type="checkbox"
                                            />
                                            <label htmlFor="toggleswitchPrimary" className="label-primary"></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* forms-images */}
                            <div className="box-header">
                                <h5 className="box-title">File Uploads</h5>
                            </div>
                            <div className="box-body">
                                <div className="grid grid-cols-12 sm:gap-6">
                                    {/* Image Gallery */}
                                    <div className="xl:col-span-6 lg:col-span-12 md:col-span-12 sm:col-span-12 col-span-12">
                                        <label htmlFor="input-file" className="form-label">Image Gallery</label>
                                        {/* component for new file uploads */}
                                        <FilePond
                                            files={gfiles}
                                            allowMultiple={true}
                                            maxFiles={5}
                                            onupdatefiles={handleGalleryChange}
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
                                            labelIdle='Maximum Files Five <br/> Drag & Drop your Images or <span class="filepond--label-action">Browse</span>'
                                        />
                                        {/*  component for existing file uploads */}
                                        {gexistingFiles.map((fileUrl, index) => (
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
                                                    onClick={() => handleDeleteFile(index, 'gallery')}
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

export default HospitalForm;
