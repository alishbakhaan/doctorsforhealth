import React, { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Pageheader from '../../components/common/pageheader/pageheader';
import axios from 'axios';
import Swal from 'sweetalert2';
// import { config } from '../../constants';

const ViewMember = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate(); 

    // Fetch member data from the API
    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/admin/get-all-members', 
            {
                headers: {
                    'x-access-token': token,
                }
            }
        )
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching members:', error)
                Swal.fire('Failed!', 'Error fetching members. Please try again.', 'error');
            });
    }, []);

    // Function to handle search
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    // Delete member by ID
    const deleteMember = (id) => {
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
            axios.delete(`https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/admin/delete-member/${id}`)
                .then(() => {
                    setData(data.filter(member => member._id !== id));
                    Swal.fire('Deleted!', 'Member has been deleted.', 'success');
                })
                .catch(error => {
                    console.error('Error deleting member:', error);
                    Swal.fire('Failed!', 'Failed to Delete the Member. Please try again.', 'error');
                });
        }
    });
    };

    
    // Filtered members based on search query
    const filteredMembers = data.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Fragment>
            <Pageheader currentpage="Member List" activepage="Tables" mainpage="Grid Js" />
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header justify-between flex-wrap">
                            <div className="box-title">
                                View Member List
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <div className="me-3">
                                    <input
                                        className="ti-form-control form-control-sm"
                                        type="text"
                                        placeholder="Search Here"
                                        aria-label=".form-control-sm example"
                                        onChange={(e) => handleSearch(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="box-body">
                            <button onClick={() => navigate('/memberform')} className="ti-btn ti-btn-primary-full">
                                Add Member
                            </button>
                            <div className="table-responsive">
                                <table className="table table-hover whitespace-nowrap table-bordered min-w-full">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text-start">S.No</th>
                                            <th scope="col" className="text-start">Name</th>
                                            <th scope="col" className="text-start">Email</th>
                                            <th scope="col" className="text-start">Phone</th>
                                            <th scope="col" className="text-start">Group</th>
                                            <th scope="col" className="text-start">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredMembers.map((member, index) => (
                                            <tr  key={member._id} className="border border-inherit border-solid hover:bg-gray-100 dark:border-defaultborder/10 dark:hover:bg-light">
                                                <td>{index + 1}</td>
                                                <td>{member.name}</td>
                                                <td>{member.email}</td>
                                                <td>{member.phone}</td>
                                                <td>{member.group?.name || 'No Group'}</td>
                                                <td>
                                                    <div className="flex flex-row items-center !gap-2 text-[0.9375rem]">
                                                        <Link
                                                           to={`/memberform/${member._id}`}
                                                            className="ti-btn ti-btn-icon ti-btn-wave !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-info/10 text-info hover:bg-info hover:text-white hover:border-info"
                                                        >
                                                            <i className="ri-pencil-line"></i>
                                                        </Link>
                                                        <Link
                                                            onClick={() => deleteMember(member._id)}
                                                            className="ti-btn ti-btn-icon ti-btn-wave !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-danger/10 text-danger hover:bg-danger hover:text-white hover:border-danger"
                                                        >
                                                            <i className="ri-delete-bin-line"></i>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {filteredMembers.length === 0 && (
                                            <tr>
                                                <td colSpan="7" className="text-center text-red">No members found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="box-footer">
                            <div className="sm:flex items-center">
                                <div className="text-defaulttextcolor/70">
                                    Showing {filteredMembers.length} Entries <i className="bi bi-arrow-right ms-2 font-semibold"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ViewMember;
