import React, { Fragment, useEffect, useState } from 'react'
import Pageheader from '../../components/common/pageheader/pageheader'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';

const DoctorProfile = () => {
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const { doctorId } = useParams();

    useEffect(() => {
        if (doctorId) {
            viewDoctorProfile(doctorId);
        }
    }, [doctorId]);

    const viewDoctorProfile = (userId) => {
        const token = localStorage.getItem('token');
        axios.get(`https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/users/profile/${userId}`,{
            headers: {
                'x-access-token': token,
            }
        })
            .then(response => {
                console.log('Doctor profile data:', response.data);
                setSelectedDoctor(response.data);
            })
            .catch(error => {
                console.error('Error fetching doctor profile:', error);
                alert('Failed to fetch doctor profile. Please try again.');
            });
    };


    // save into jpg
    const downloadImage = async () => {
        if (selectedDoctor && selectedDoctor.personal_details && selectedDoctor.personal_details.profile_image) {
            const imageUrl = selectedDoctor.personal_details.profile_image;
            const filename = 'profile.jpg';

            try {
                // Fetch the image as a blob
                const response = await fetch(imageUrl);
                const blob = await response.blob();

                // Create a temporary link element
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = filename;

                // Append the link to the body
                document.body.appendChild(link);

                // Trigger the download
                link.click();

                // Clean up
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href); // Free up memory
            } catch (error) {
                console.error('Error downloading the image:', error);
            }
        } else {
            console.error('Image source is not available');
        }
    };

    // save into pdf 
    const saveAsPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(16);

        // Add Personal Details
        doc.text('Personal Details', 10, 10);
        doc.setFontSize(12);
        doc.text(`Name: ${selectedDoctor?.personal_details?.first_name || "Not Available"} ${selectedDoctor?.personal_details?.last_name || "Not Available"}`, 10, 20);
        doc.text(`Gender: ${selectedDoctor?.personal_details?.gender || "Not Available"}`, 10, 30);
        doc.text(`DOB: ${selectedDoctor?.personal_details?.dob || "Not Available"}`, 10, 40);
        doc.text(`Address: ${selectedDoctor?.personal_details?.address || "Not Available"}`, 10, 50);
        doc.text(`City: ${selectedDoctor?.personal_details?.city || "Not Available"}`, 10, 60);
        doc.text(`Country: ${selectedDoctor?.personal_details?.country || "Not Available"}`, 10, 70);
        doc.text(`Phone: ${selectedDoctor?.personal_details?.phone.number || "Not Available"}`, 10, 80);
        doc.text(`Landline Number: ${selectedDoctor?.personal_details?.landline_number || "Not Available"}`, 10, 90);
        doc.text(`Clinic Landline: ${selectedDoctor?.personal_details?.clinic_landline || "Not Available"}`, 10, 100);
        doc.text(`PolyClinic Landline: ${selectedDoctor?.personal_details?.polyclinic_landline || "Not Available"}`, 10, 110);
        doc.text(`Hospital Landline: ${selectedDoctor?.personal_details?.hospital_landline || "Not Available"}`, 10, 120);
        doc.text(`CNIC Number: ${selectedDoctor?.personal_details?.cnic || "Not Available"}`, 10, 130);
        doc.text(`Title: ${selectedDoctor?.personal_details?.title || "Not Available"}`, 10, 140);

        // Save the PDF
        doc.save('PatientDetails.pdf');
    };

    return (
        <Fragment>
            <Pageheader currentpage="Patient Profile View" activepage="Pages" mainpage="Profile" />
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-4 xl:col-span-12 col-span-12">
                    <div className="box overflow-hidden">
                        <div className="box-body !p-0">
                            <div className="sm:flex items-start p-6      main-profile-cover">
                                <div>

                                    {selectedDoctor?.personal_details?.profile_image && (
                                        <span className="avatar avatar-rounded online me-4">
                                            <img src={selectedDoctor.personal_details.profile_image} alt="Profile" />
                                        </span>
                                    )}
                                </div>
                                <div className="flex-grow main-profile-info">
                                    <div className="flex items-center !justify-between">
                                        <h6 className="font-semibold mb-1 text-white text-[1rem]">Json Taylor</h6>
                                        <button onClick={saveAsPDF} className="ti-btn ti-btn-light dark:border-defaulttextcolor/10 me-2 whitespace-nowrap">
                                            Download<i className="bi bi-download me-1"></i> </button>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-12 gap-6">
                                <div className="xl:col-span-12 col-span-12">
                                    <div className="box">
                                        <div className="box-header">
                                            <div className="box-title">
                                                Personal Info
                                            </div>
                                        </div>

                                        <div title="Table Group Divideres" customCardClass="custom box">
                                            <div className="table-responsive">
                                                {selectedDoctor ? (
                                                    <>
                                                        <table className="table whitespace-nowrap min-w-full ">
                                                            <tbody className="table-group-divider dark:border-defaultborder/10">
                                                                <tr className="border-b border-defaultborder">
                                                                    <td>Profile Pic:</td>
                                                                    <td><Link to="#" className="hs-dropdown-toggle text-center text-primary"
                                                                    data-hs-overlay="#hs1-vertically-centered-scrollable-modal">Click Here
                                                                    <i className="bi bi-box-arrow-up-right text-[0.625rem] ms-2 align-middle"></i></Link> </td>
                                                                    <td className="me-2 font-semibold">First Name:</td>
                                                                    <td>{selectedDoctor?.personal_details?.first_name || "Not Available"}</td>
                                                                    <td>Last Name:</td>
                                                                    <td>{selectedDoctor?.personal_details?.last_name || "Not Available"}</td>


                                                                </tr>
                                                                <tr className="border-b border-defaultborder">
                                                                    <td>Date of Birth:</td>
                                                                    <td>{selectedDoctor?.personal_details?.dob || "Not Available"}</td>
                                                                    <td>Gender:</td>
                                                                    <td>{selectedDoctor?.personal_details?.gender || "Not Available"}</td>
                                                                    <td>CNIC:</td>
                                                                    <td>{selectedDoctor?.personal_details?.cnic || "Not Available"}</td>


                                                                </tr>
                                                                <tr className="border-b border-defaultborder">
                                                                    <td>Phone Number:</td>
                                                                    <td>{selectedDoctor?.personal_details?.phone.number || "Not Available"}</td>
                                                                    <td>Landline Number:</td>
                                                                    <td>{selectedDoctor?.personal_details?.landline_number || "Not Available"}</td>
                                                                    <td>Clinic Landline:</td>
                                                                    <td>{selectedDoctor?.personal_details?.clinic_landline || "Not Available"}</td>

                                                                </tr>
                                                                <tr className="border-b border-defaultborder">
                                                                    <td>Polyclicnic Landline:</td>
                                                                    <td>{selectedDoctor?.personal_details?.polyclinic_landlinee || "Not Available"}</td>
                                                                    <td>Hospital Landline:</td>
                                                                    <td>{selectedDoctor?.personal_details?.hospital_landline || "Not Available"}</td>
                                                                    <td>Country:</td>
                                                                    <td>{selectedDoctor?.personal_details?.country || "Not Available"}</td>
                                                                   
                                                                </tr>
                                                                <tr className="border-b border-defaultborder">
                                                                     <td>City:</td>
                                                                    <td>{selectedDoctor?.personal_details?.city || "Not Available"}</td>
                                                                    <td>Address:</td>
                                                                    <td>{selectedDoctor?.personal_details?.address || "Not Available"}</td>

                                                                </tr>

                                                            </tbody>
                                                        </table>
                                                    </>
                                                ) : (
                                                    <div>Check Your Connection..</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Modal */}
                    {selectedDoctor ? (
                        <>
                            <div id="hs1-vertically-centered-scrollable-modal" className="hs-overlay hidden ti-modal">
                                <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] flex items-center">
                                    <div className="max-h-full overflow-hidden ti-modal-content">
                                        <div className="ti-modal-header">
                                            <h6 className="modal-title" id="staticBackdropLabel3"> Profile Picture </h6>
                                            <button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#hs1-vertically-centered-scrollable-modal">
                                                <span className="sr-only">Close</span>
                                                <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="ti-modal-body">
                                        <div className="flex flex-row items-center">
                                            <img src={selectedDoctor.personal_details.profile_image} alt="img" className="!w-[50%] !h-[50%] object-cover" />
                                        </div>
                                        </div>
                                        <div className="ti-modal-footer">
                                            <button type="button" className="hs-dropdown-toggle ti-btn ti-btn-secondary-full" data-hs-overlay="#hs1-vertically-centered-scrollable-modal">
                                                Close
                                            </button>
                                            <button onClick={downloadImage} className=" ti-btn  ti-btn-primary-full dark:border-defaulttextcolor/10 me-2 whitespace-nowrap" >
                                                Download  <i className="bi bi-download me-1"></i>  </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (<></>)}
                    {/* end */}
                </div>
            </div>
        </Fragment>
    )
}

export default DoctorProfile