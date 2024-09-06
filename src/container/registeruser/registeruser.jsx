import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pageheader from '../../components/common/pageheader/pageheader';
import axios from 'axios';

const RegisterUser = () => {
    const [data, setData] = useState([]); 
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRole, setSelectedRole] = useState("");

    // Fetch user data from the API
    useEffect(() => {
        fetchUsers();
    }, []); 


    const fetchUsers = () => {
            axios.get(`https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/users`)
            .then(response => {
                console.log(response.data)
                setData(response.data);
            })
            .catch(error => console.error('Error fetching doctors:', error));
    };

    // Function to handle search
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    // Function to handle role selection
    const handleRoleSelection = (role) => {
        setSelectedRole(role);
    };

    
    // Filter users based on the search query
    const filteredUsers = data.filter(user => {
        const matchesSearch = (
            (user.username && user.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (user.mrNumber && user.mrNumber.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
            (user.gender && user.gender.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (user.firstName && user.firstName.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (user.lastName && user.lastName.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (user.role && user.role.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        const matchesRole = selectedRole ? user.role.toLowerCase() === selectedRole.toLowerCase() : true;
        return matchesSearch && matchesRole;
    });
    
    return (
        <Fragment>
            <Pageheader currentpage="Registered Users" activepage="Tables" mainpage="Grid Js" />
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header justify-between flex-wrap">
                            <div className="box-title">
                                Registered Users List
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <div className="me-3">
                                    <input className="ti-form-control form-control-sm"
                                        type="text" placeholder="Search Here" aria-label=".form-control-sm example"
                                        onChange={(e) => handleSearch(e.target.value)} />
                                </div>
                                <div className="hs-dropdown ti-dropdown">
                                    <Link to="#"
                                        className="ti-btn ti-btn-primary !bg-primary !text-white !py-1 !px-2 !text-[0.75rem] !m-0 !gap-0 !font-medium"
                                        aria-expanded="false">
                                        Sort By<i className="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
                                    </Link>
                                    <ul className="hs-dropdown-menu ti-dropdown-menu hidden" role="menu">
                                        <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                            to="#"
                                            onClick={() => handleRoleSelection('doctor')}>Doctor</Link></li>
                                        <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                            to="#"
                                            onClick={() => handleRoleSelection('patient')}>Patient</Link></li>
                                        <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                            to="#"
                                            onClick={() => handleRoleSelection('hospital')}>Hospital</Link></li>
                                          <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                            to="#"
                                            onClick={() => handleRoleSelection('allied_professional')}>Allied Professional</Link></li>
                                              <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                            to="#"
                                            onClick={() => handleRoleSelection('clinic')}>Clinic</Link></li>
                                              <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                            to="#"
                                            onClick={() => handleRoleSelection('diagnostic')}>Diagnostic</Link></li>    
                                              <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                            to="#"
                                            onClick={() => handleRoleSelection('pharmacy')}>Pharmacy</Link></li>    
                                              <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                            to="#"
                                            onClick={() => handleRoleSelection('cell therapy')}>Stem Cell Therapy</Link></li>    
                                              <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                            to="#"
                                            onClick={() => handleRoleSelection('hospital')}>Hospital</Link></li>    
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="table-responsive">
                                <table className="table table-hover whitespace-nowrap table-bordered min-w-full">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text-start">S.No</th>
                                            <th scope="col" className="text-start">MR.No</th>
                                            <th scope="col" className="text-start">Name</th>
                                            <th scope="col" className="text-start">Profile</th>
                                            <th scope="col" className="text-start">Mobile Number</th>
                                            <th scope="col" className="text-start">Gender</th>
                                            <th scope="col" className="text-start">Role</th>
                                  
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsers.length > 0 ? (
                                            filteredUsers.map((user, index) => (
                                                <tr className="border border-inherit border-solid hover:bg-gray-100 dark:border-defaultborder/10 dark:hover:bg-light" key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{user.mrNumber}</td>
                                                    <td>{user.firstName} {user.lastName}</td>
                                                    <td>
                                                        <div className="flex items-center leading-none">
                                                            <div className="me-2">
                                                                <span className="avatar avatar-md avatar-rounded">
                                                                    <img src={user.profileImage} alt="" />
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <span className="block font-semibold mb-1">{user.username}</span>
                                                                <span className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">{user.email}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {user.mobileNumber && user.mobileNumber.number}
                                                    </td>
                                                    <td>
                                                        {user.gender}
                                                    </td>
                                                    <td>
                                                        <span className={`badge bg-primary text-white`}>{user.role}</span>
                                                    </td>
                                                    
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="8" className="text-center text-red">No users found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="box-footer">
                            <div className="sm:flex items-center">
                                <div className="text-defaulttextcolor/70">
                                    Showing {filteredUsers.length} Entries <i className="bi bi-arrow-right ms-2 font-semibold"></i>
                                </div>
                                {/* <div className="ms-auto">
                                    <nav aria-label="Page navigation" className="pagination-style-4">
                                        <ul className="ti-pagination mb-0">
                                            <li className="page-item disabled">
                                                <Link className="page-link" to="#">
                                                    Prev
                                                </Link>
                                            </li>
                                            <li className="page-item"><Link className="page-link active" to="#">1</Link></li>
                                            <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                                            <li className="page-item">
                                                <Link className="page-link !text-primary" to="#">
                                                    next
                                                </Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default RegisterUser;
