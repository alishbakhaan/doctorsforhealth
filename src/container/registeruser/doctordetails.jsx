import { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Pageheader from '../../components/common/pageheader/pageheader';
import axios from 'axios';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';

const DoctorDetails = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState(null); // Store selected doctor details here
    const navigate = useNavigate();

    useEffect(() => {
        fetchDoctor();
    }, []);

    const fetchDoctor = () => {
        const token = localStorage.getItem('token');
        axios.get(`https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/user/role/doctor`,{
            headers: {
                'x-access-token': token,
            }
        })
            .then(response => {
                setData(response.data.users || []);
            })
            .catch(error => console.error('Error fetching doctors:', error));
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const filteredDoctor = data.filter(users =>
        (users.username && users.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (users.gender && users.gender.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (users.firstName && users.firstName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (users.lastName && users.lastName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (users.role && users.role.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (users.email && users.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const deleteDoctor = (id) => {
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
            axios.delete(`https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/user/${id}`)
                .then(() => {
                    setData(data.filter(users => users._id !== id));
                    Swal.fire('Deleted!', 'Doctor has been deleted.', 'success');
                })
                .catch(error => {
                    console.error('Error deleting users:', error);
                    Swal.fire('Failed!', 'Failed to delete the Doctor. Please try again.', 'error');
                });
        }
    });
    };

    // doctor profile details
    const viewDoctorProfile = (userId) => {
        // console.log(userId)
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
        const downloadFile = async (url, filename) => {
            try {
                
                const response = await fetch(url);
                const blob = await response.blob();         
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href); // Free up memory
            } catch (error) {
                console.error(`Error downloading the file: ${filename}`, error);
            }
        };
    
        if (selectedDoctor) {
            // Profile image
            if (selectedDoctor.personal_details?.profile_image) {
                await downloadFile(selectedDoctor.personal_details.profile_image, 'profile_image.jpg');
            }
    
            // Cover letter (CV)
            if (selectedDoctor.professional_details?.cv) {
                await downloadFile(selectedDoctor.professional_details.cv, 'cover_letter.jpg');
            }
    
            // Degree
            if (selectedDoctor.professional_details?.degree) {
                await downloadFile(selectedDoctor.professional_details.degree, 'degree.jpg');
            }
    
            // Certificate
            if (selectedDoctor.professional_details?.certificate) {
                await downloadFile(selectedDoctor.professional_details.certificate, 'certificate.jpg');
            }

            // Signature
            if (selectedDoctor.professional_details?.signature) {
                await downloadFile(selectedDoctor.professional_details.signature, 'signature.jpg');
            }
        } else {
            console.error('Doctor details are not available');
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

        // Add Professional Details
        doc.setFontSize(16);
        doc.text('Professional Details', 10, 150);
        doc.setFontSize(12);
        doc.text(`Time Zone: ${selectedDoctor?.professional_details?.time_zone || "Not Available"}`, 10, 160);
        doc.text(`Speciality: ${selectedDoctor?.professional_details?.specialty || "Not Available"}`, 10, 170);
        doc.text(`Spoken Language: ${selectedDoctor?.professional_details?.spoken_language || "Not Available"}`, 10, 180);
        doc.text(`Awards: ${selectedDoctor?.professional_details?.awards || "Not Available"}`, 10, 190);
        doc.text(`Membership: ${selectedDoctor?.professional_details?.professional_memberships || "Not Available"}`, 10, 200);
        doc.text(`Registration: ${selectedDoctor?.professional_details?.professional_registration || "Not Available"}`, 10, 210);
        doc.text(`Number: ${selectedDoctor?.professional_details?.licence_register_number || "Not Available"}`, 10, 220);
        doc.text(`Start Date: ${selectedDoctor?.professional_details?.licence_start_date || "Not Available"}`, 10, 230);
        doc.text(`End Date: ${selectedDoctor?.professional_details?.licence_end_date || "Not Available"}`, 10, 240);
        doc.text(`About Yourself: ${selectedDoctor?.professional_details?.about_yourself || "Not Available"}`, 10, 250);
        doc.text(`Youtube Link: ${selectedDoctor?.professional_details?.youtube_link || "Not Available"}`, 10, 260);
        doc.text(`Specialization: ${selectedDoctor?.professional_details?.specialization || "Not Available"}`, 10, 270);
        doc.text(`Experience: ${selectedDoctor?.professional_details?.experience || "Not Available"}`, 10, 280);

        // Save the PDF
        doc.save('DoctorDetails.pdf');
    };

    return (
        <Fragment>
            <Pageheader currentpage="Doctor Details" activepage="Tables" mainpage="Grid Js" />

            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
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
                                                <img src={selectedDoctor.personal_details.profile_image} alt="img" className="!w-full" />
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
                        {/* Modal */}
                        {selectedDoctor ? (
                            <>
                                <div id="hs2-vertically-centered-scrollable-modal" className="hs-overlay hidden ti-modal">
                                    <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] flex items-center">
                                        <div className="max-h-full overflow-hidden ti-modal-content">
                                            <div className="ti-modal-header">
                                                <h6 className="modal-title" id="staticBackdropLabel3">Degree</h6>
                                                <button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#hs2-vertically-centered-scrollable-modal">
                                                    <span className="sr-only">Close</span>
                                                    <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="ti-modal-body">
                                                <img src={selectedDoctor?.professional_details?.degree || "Not Available"} alt="degree" className="!w-full" />
                                            </div>
                                            <div className="ti-modal-footer">
                                                <button type="button" className="hs-dropdown-toggle ti-btn ti-btn-secondary-full" data-hs-overlay="#hs2-vertically-centered-scrollable-modal">
                                                    Close
                                                </button>
                                                <button onClick={downloadImage} className=" ti-btn  ti-btn-primary-full dark:border-defaulttextcolor/10 me-2 whitespace-nowrap">
                                                    Download<i className="bi bi-download me-1"></i> </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (<></>)}
                        {/* end */}
                        {/* Modal */}
                        {selectedDoctor ? (
                            <>
                                <div id="hs3-vertically-centered-scrollable-modal" className="hs-overlay hidden ti-modal">
                                    <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] flex items-center">
                                        <div className="max-h-full overflow-hidden ti-modal-content">
                                            <div className="ti-modal-header">
                                                <h6 className="modal-title" id="staticBackdropLabel3"> E-Signature   </h6>
                                                <button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#hs3-vertically-centered-scrollable-modal">
                                                    <span className="sr-only">Close</span>
                                                    <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="ti-modal-body">
                                                <img src={selectedDoctor?.professional_details?.signature || "Not Available"} alt="signature" className="!w-full" />
                                            </div>
                                            <div className="ti-modal-footer">
                                                <button type="button" className="hs-dropdown-toggle ti-btn ti-btn-secondary-full" data-hs-overlay="#hs3-vertically-centered-scrollable-modal">
                                                    Close
                                                </button>
                                                <button onClick={downloadImage} className=" ti-btn  ti-btn-primary-full dark:border-defaulttextcolor/10 me-2 whitespace-nowrap">
                                                    Download<i className="bi bi-download me-1"></i>  </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (<></>)}
                        {/* end */}
                        {/* Modal */}
                        {selectedDoctor ? (
                            <>
                                <div id="hs4-vertically-centered-scrollable-modal" className="hs-overlay hidden ti-modal">
                                    <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] flex items-center">
                                        <div className="max-h-full overflow-hidden ti-modal-content">
                                            <div className="ti-modal-header">
                                                <h6 className="modal-title" id="staticBackdropLabel3"> Certificate   </h6>
                                                <button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#hs4-vertically-centered-scrollable-modal">
                                                    <span className="sr-only">Close</span>
                                                    <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="ti-modal-body">
                                                <img src={selectedDoctor?.professional_details?.certificate || "Not Available"} alt="certificate" className="!w-full" />
                                            </div>
                                            <div className="ti-modal-footer">
                                                <button type="button" className="hs-dropdown-toggle ti-btn ti-btn-secondary-full" data-hs-overlay="#hs4-vertically-centered-scrollable-modal">
                                                    Close
                                                </button>
                                                <button onClick={downloadImage} className=" ti-btn  ti-btn-primary-full dark:border-defaulttextcolor/10 me-2 whitespace-nowrap">
                                                    Download <i className="bi bi-download me-1"></i> </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (<></>)}
                        {/* end */}
                        {/* coverletter */}
                        {selectedDoctor ? (
                            <>
                                <div id="hs5-vertically-centered-scrollable-modal" className="hs-overlay hidden ti-modal">
                                    <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] flex items-center">
                                        <div className="max-h-full overflow-hidden ti-modal-content">
                                            <div className="ti-modal-header">
                                                <h6 className="modal-title" id="staticBackdropLabel3"> Cover Letter </h6>
                                                <button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#hs5-vertically-centered-scrollable-modal">
                                                    <span className="sr-only">Close</span>
                                                    <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="ti-modal-body">
                                                {selectedDoctor?.professional_details?.cv ? (
                                                    <img src={selectedDoctor.professional_details.cv} alt="Cover Letter" className="!w-full" />
                                                ) : (
                                                    <p>No cover letter available.</p>
                                                )}
                                            </div>
                                            <div className="ti-modal-footer">
                                                <button type="button" className="hs-dropdown-toggle ti-btn ti-btn-secondary-full" data-hs-overlay="#hs5-vertically-centered-scrollable-modal">
                                                    Close
                                                </button>
                                                <button onClick={downloadImage} className=" ti-btn  ti-btn-primary-full dark:border-defaulttextcolor/10 me-2 whitespace-nowrap" >
                                                    Download<i className="bi bi-download me-1"></i> </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (<></>)}
                        {/* end */}
                        <div className="box-header justify-between flex-wrap">
                            <div className="box-title">
                                Doctor Details List
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <div className="me-3">
                                    <input className="ti-form-control form-control-sm"
                                        type="text" placeholder="Search Here" aria-label=".form-control-sm example"
                                        onChange={(e) => handleSearch(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="table-responsive">
                                <table className="table table-hover whitespace-nowrap table-bordered min-w-full">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text-start">S.No</th>
                                            <th scope="col" className="text-start">UserName</th>
                                            <th scope="col" className="text-start">Profile</th>
                                            <th scope="col" className="text-start">Mobile Number</th>
                                            <th scope="col" className="text-start">Gender</th>
                                            <th scope="col" className="text-start">Role</th>
                                            <th scope="col" className="text-start">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredDoctor.length > 0 ? (
                                            filteredDoctor.map((users, index) => (
                                                <tr key={index} className="border border-inherit border-solid hover:bg-gray-100 dark:border-defaultborder/10 dark:hover:bg-light">
                                                    <td>{index + 1}</td>
                                                    <td>{users.username}</td>
                                                    <td>
                                                        <div className="flex items-center leading-none">
                                                            <div className="me-2">
                                                                <span className="avatar avatar-md avatar-rounded">
                                                                    <img src={users.profileImage} alt="" />
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <span className="block font-semibold mb-1">{users.firstName} {users.lastName}</span>
                                                                <span className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">{users.email}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{users.mobileNumber.number}</td>
                                                    <td>{users.gender}</td>
                                                    <td><span className={`badge bg-primary text-white`}>{users.role}</span></td>
                                                    <td>
                                                        <div className="flex flex-row items-center !gap-2 text-[0.9375rem]">
                                                            {/*  */}
                                                            <i className="ri-eye-line ti-btn ti-btn-icon ti-btn-wave !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-primary/10 text-primary hover:bg-primary hover:text-white hover:border-primary" data-hs-overlay="#hs-overlay-example" onClick={() => viewDoctorProfile(users._id)}> </i>
                                                            <div id="hs-overlay-example" className="hs-overlay hidden ti-offcanvas ti-offcanvas-left !z-[105]" tabIndex={-1}>
                                                                {selectedDoctor ? (
                                                                    <>
                                                                        <div className="ti-offcanvas-header">
                                                                            <h6 className="ti-offcanvas-title">
                                                                                Doctor Profile View
                                                                            </h6>
                                                                            <button type="button" className="ti-btn flex-shrink-0 p-0 transition-none text-gray-500 hover:text-gray-700 focus:ring-gray-400 focus:ring-offset-white dark:text-[#8c9097] dark:text-white/50 dark:hover:text-white/80 dark:focus:ring-white/10 dark:focus:ring-offset-white/10" data-hs-overlay="#hs-overlay-example">
                                                                                <span className="sr-only">Close modal</span>
                                                                                <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"></path>
                                                                                </svg>
                                                                            </button>
                                                                        </div>
                                                                        <div className="ti-offcanvas-body !h-[90%] !p-0">
                                                                            <div>
                                                                                <ul className="list-group list-group-flush mb-0">
                                                                                    <li className="list-group-item">
                                                                                        <div className="box custom-box box-bg-primary">
                                                                                            <div className="box-body">
                                                                                                <div className="flex items-center w-full">
                                                                                                    <div className="me-2">
                                                                                                        <span className="avatar">
                                                                                                            <img src={selectedDoctor.personal_details.profile_image} alt="img" className="!rounded-full" />
                                                                                                        </span>
                                                                                                    </div>
                                                                                                    <div className="">
                                                                                                        <div className="text-[0.9375rem] font-semibold text-white">{selectedDoctor.personal_details.first_name}{selectedDoctor.personal_details.last_name}</div>
                                                                                                        <p className="mb-0 text-white opacity-[0.7] text-[0.75rem]">{selectedDoctor.personal_details.title} </p>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="flex items-center">
                                                                                            <div className="flex-grow">
                                                                                                {/* Personal Details */}
                                                                                                <div className="box-header justify-between flex-wrap"><div className="box-title">Personal Details:</div></div>
                                                                                                <p className="font-semibold mb-0">First Name </p>
                                                                                                <span className="text-[1rem] text-[#8c9097] dark:text-white/50">{selectedDoctor?.personal_details?.first_name || "Not Available"}</span>
                                                                                                <p className="font-semibold mb-0"> Last Name</p>
                                                                                                <span className="text-[1rem] text-[#8c9097] dark:text-white/50">{selectedDoctor?.personal_details?.last_name || "Not Available"}</span>
                                                                                                <p className="font-semibold mb-0"> Title</p>
                                                                                                <span className="text-[1rem] text-[#8c9097] dark:text-white/50">{selectedDoctor?.personal_details?.title || "Not Available"}</span>
                                                                                                <p className="font-semibold mb-0"> Date of Birth</p>
                                                                                                <span className="text-[1rem] text-[#8c9097] dark:text-white/50">{selectedDoctor?.personal_details?.dob || "Not Available"}</span>
                                                                                                <p className="font-semibold mb-0"> Gender </p>
                                                                                                <span className="text-[1rem] text-[#8c9097] dark:text-white/50">{selectedDoctor?.personal_details?.gender || "Not Available"}</span>
                                                                                                <p className="font-semibold mb-0"> CNIC No.</p>
                                                                                                <span className="text-[1rem] text-[#8c9097] dark:text-white/50">{selectedDoctor?.personal_details?.cnic || "Not Available"}</span>
                                                                                                <p className="font-semibold mb-0"> Phone Number</p>
                                                                                                <span className="text-[1rem] text-[#8c9097] dark:text-white/50">{selectedDoctor?.personal_details?.phone.number || "Not Available"}</span>
                                                                                                <p className="font-semibold mb-0"> Landline Number</p>
                                                                                                <span className="text-[1rem] text-[#8c9097] dark:text-white/50">{selectedDoctor?.personal_details?.landline_number || "Not Available"}</span>
                                                                                                <p className="font-semibold mb-0"> Clinic Number</p>
                                                                                                <span className="text-[1rem] text-[#8c9097] dark:text-white/50">{selectedDoctor?.personal_details?.clinic_landline || "Not Available"}</span>
                                                                                                <p className="font-semibold mb-0"> Polyclinic Number</p>
                                                                                                <span className="text-[1rem] text-[#8c9097] dark:text-white/50">{selectedDoctor?.personal_details?.polyclinic_landlinee || "Not Available"}</span>
                                                                                                <p className="font-semibold mb-0"> Hospital Landline Number</p>
                                                                                                <span className="text-[1rem] text-[#8c9097] dark:text-white/50">{selectedDoctor?.personal_details?.hospital_landline || "Not Available"}</span>
                                                                                                <p className="font-semibold mb-0"> Country</p>
                                                                                                <span className="text-[1rem] text-[#8c9097] dark:text-white/50">{selectedDoctor?.personal_details?.country || "Not Available"}</span>
                                                                                                <p className="font-semibold mb-0"> City</p>
                                                                                                <span className="text-[1rem] text-[#8c9097] dark:text-white/50">{selectedDoctor?.personal_details?.city || "Not Available"}</span>
                                                                                                <p className="font-semibold mb-0"> Address</p>
                                                                                                <span className="text-[1rem] text-[#8c9097] dark:text-white/50">{selectedDoctor?.personal_details?.address || "Not Available"}</span>

                                                                                                {/* Professional Details */}
                                                                                                <div className="box-header justify-between flex-wrap"><div className="box-title">Professional Details:</div></div>

                                                                                                <p className="font-semibold mb-0"> Time Zone</p>
                                                                                                <span className="text-[1rem] text-[#8c9097] dark:text-white/50">{selectedDoctor?.professional_details?.time_zone || "Not Available"}</span>
                                                                                                <p className="font-semibold mb-0"> Speciality</p>
                                                                                                <span className="text-[1rem] text-[#8c9097] dark:text-white/50">{selectedDoctor?.professional_details?.specialty || "Not Available"}</span>
                                                                                                <p className="font-semibold mb-0"> Spoken Language</p>
                                                                                                <span className="text-[1rem] text-[#8c9097] dark:text-white/50">{selectedDoctor?.professional_details?.spoken_language || "Not Available"}</span>
                                                                                                <p className="font-semibold mb-0"> Awards</p>
                                                                                                <span className="text-[1rem] text-[#8c9097] dark:text-white/50">{selectedDoctor?.professional_details?.awards || "Not Available"}</span>
                                                                                                <p className="font-semibold mb-0"> Professional Membership</p>
                                                                                                <span className="text-[1rem] text-[#8c9097] dark:text-white/50">{selectedDoctor?.professional_details?.professional_memberships || "Not Available"}</span>
                                                                                                <p className="font-semibold mb-0"> Professional Registration</p>
                                                                                                <span className="text-[1rem] text-[#8c9097] dark:text-white/50">{selectedDoctor?.professional_details?.professional_registration || "Not Available"}</span>
                                                                                                <p className="font-semibold mb-0"> Register Number</p>
                                                                                                <span className="text-[1rem] text-[#8c9097] dark:text-white/50">{selectedDoctor?.professional_details?.licence_register_number || "Not Available"}</span>
                                                                                                <p className="font-semibold mb-0"> Start Date</p>
                                                                                                <span className="text-[1rem] text-[#8c9097] dark:text-white/50">{selectedDoctor?.professional_details?.licence_start_date || "Not Available"}</span>
                                                                                                <p className="font-semibold mb-0"> End Date</p>
                                                                                                <span className="text-[1rem] text-[#8c9097] dark:text-white/50">{selectedDoctor?.professional_details?.licence_end_date || "Not Available"}</span>
                                                                                                <p className="font-semibold mb-0"> About Yourself</p>
                                                                                                <span className="text-[1rem] text-[#8c9097] dark:text-white/50">{selectedDoctor?.professional_details?.about_yourself || "Not Available"}</span>
                                                                                                <p className="font-semibold mb-0"> Youtube Link</p>
                                                                                                <span className="text-[1rem] text-[#8c9097] dark:text-white/50">{selectedDoctor?.professional_details?.youtube_link || "Not Available"}</span>
                                                                                                <br />
                                                                                                <span className="text-[1rem] text-[#8c9097] dark:text-white/50">
                                                                                                    <button onClick={saveAsPDF} className="my-4 ti-btn  ti-btn-primary-full dark:border-defaulttextcolor/10 me-2 whitespace-nowrap">Download<i className="bi bi-download me-1"></i> </button>
                                                                                                </span>
                                                                                                {/*Degree Professional Details  */}

                                                                                                <div className="box-header justify-between flex-wrap"><div className="box-title">Further Professional Details:</div></div>
                                                                                                <p className="font-semibold mb-0"> Profile</p>
                                                                                                <Link to="#" className="hs-dropdown-toggle text-center text-primary" data-hs-overlay="#hs1-vertically-centered-scrollable-modal">Click Here<i className="bi bi-box-arrow-up-right text-[0.625rem] ms-2 align-middle"></i></Link>
                                                                                                <p className="font-semibold mb-0"> Degree</p>
                                                                                                <Link to="#" className="hs-dropdown-toggle text-center text-primary" data-hs-overlay="#hs2-vertically-centered-scrollable-modal">Click Here<i className="bi bi-box-arrow-up-right text-[0.625rem] ms-2 align-middle"></i></Link>
                                                                                                <p className="font-semibold mb-0"> Cover Letter</p>
                                                                                                <Link to="#" className="hs-dropdown-toggle text-center text-primary" data-hs-overlay="#hs5-vertically-centered-scrollable-modal">Click Here<i className="bi bi-box-arrow-up-right text-[0.625rem] ms-2 align-middle"></i></Link>
                                                                                                <p className="font-semibold mb-0"> Signature</p>
                                                                                                <Link to="#" className="hs-dropdown-toggle text-center text-primary" data-hs-overlay="#hs3-vertically-centered-scrollable-modal">Click Here<i className="bi bi-box-arrow-up-right text-[0.625rem] ms-2 align-middle"></i></Link>
                                                                                                <p className="font-semibold mb-0"> Certificate</p>
                                                                                                <Link to="#" className="hs-dropdown-toggle text-center text-primary" data-hs-overlay="#hs4-vertically-centered-scrollable-modal">Click Here<i className="bi bi-box-arrow-up-right text-[0.625rem] ms-2 align-middle"></i></Link>
                                                                                            </div>
                                                                                        </div>

                                                                                    </li>

                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    <div>Check Your Connection..</div>
                                                                )}
                                                            </div>

                                                            <Link aria-label="anchor"  className="ti-btn ti-btn-icon ti-btn-wave !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-info/10 text-info hover:bg-info hover:text-white hover:border-info"
                                                                 to={`/doctorform/${users._id}`}><i className="ri-pencil-line"></i></Link>
                                                            <Link aria-label="anchor" to="#" className="ti-btn ti-btn-icon ti-btn-wave !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-danger/10 text-danger hover:bg-danger hover:text-white hover:border-danger"
                                                                onClick={() => deleteDoctor(users._id)}><i className="ri-delete-bin-line"></i></Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="text-center text-red">No users found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default DoctorDetails;
