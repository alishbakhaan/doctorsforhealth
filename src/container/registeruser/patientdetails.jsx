
import { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Pageheader from '../../components/common/pageheader/pageheader';
import axios from 'axios';
import Swal from 'sweetalert2';

const PatientDetails = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const [isDeleteDisabled, setIsDeleteDisabled] = useState(true);
    const [selectedalluser, setSelectedalluser] = useState([]);
    const [selecteduser, setSelecteduser] = useState([]);
    useEffect(() => {
        fetchPatient();
    }, []);

    const fetchPatient = () => {
        axios.get(`https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/user/role/patient`)
            .then(response => {
                const updatedData = response.data.users.map(user => ({ ...user, isChecked: false }));
                setData(updatedData);
                // setData(response.data.users || []);
            })
            .catch(error => {
                console.error('Error fetching doctors:', error)
                Swal.fire('Failed!', 'Failed to Fetch the Patient. Please try again.', 'error');
            });
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const filteredPatient = data.filter(users =>
        (users.username && users.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (users.mrNumber && users.mrNumber.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
        (users.gender && users.gender.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (users.firstName && users.firstName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (users.lastName && users.lastName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (users.role && users.role.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (users.email && users.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const deletePatient = (id) => {
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
                        Swal.fire('Deleted!', 'Patient has been deleted.', 'success');
                    })
                    .catch(error => {
                        console.error('Error deleting users:', error);
                        Swal.fire('Failed!', 'Failed to delete the Patient. Please try again.', 'error');
                    });
            }
        });
    };

    const handleChange = (checked) => {
      if (checked){
      setSelectedalluser(data.map(user=>user._id))
      }else{
      setSelectedalluser([]);
      }
    };

    const handleCheckChange = (checked, id)=>{
        if(checked){
            setSelecteduser([...selecteduser,id])
        }else{
          setSelecteduser(selecteduser.filter(user=>user!==id))
        }
    }
    console.log(selectedalluser);

    // const checkIfAnySelected = (data) => {
    //     const anyChecked = data.some(user => user.isChecked);
    //     setIsDeleteDisabled(!anyChecked); 
    // };
        // console.log(user._id);

      // Handle Delete All
    const handleAllDelete = () => {
        const selectedPatients = data.filter(user => user.isChecked);

        if (selectedPatients.length === 0) {
            Swal.fire('Warning', 'Please select at least one checkbox', 'warning');
            return;
        }

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
                const deletePromises = selectedPatients.map(user =>
                    axios.delete(`https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/user/${user._id}`)
                );

                Promise.all(deletePromises)
                    .then(() => {
                        const remainingData = data.filter(user => !user.isChecked);
                        setData(remainingData);
                        Swal.fire('Deleted!', 'Selected patients have been deleted.', 'success');
                    })
                    .catch(error => {
                        console.error('Error deleting patients:', error);
                        Swal.fire('Failed!', 'Failed to delete the selected patients. Please try again.', 'error');
                    });
            }
        });
    };
  
    return (
        <Fragment>
            <Pageheader currentpage="Patient Details" activepage="Tables" mainpage="Grid Js" />

            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">                      
                        <div className="box-header justify-between flex-wrap">
                            <div className="box-title">
                                Patient Details List
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <div className="me-3">
                                    <input className="ti-form-control form-control-sm"
                                        type="text" placeholder="Search Here" aria-label=".form-control-sm example"
                                        onChange={(e) => handleSearch(e.target.value)} />
                                </div>
                                <div className="me-3">  
                                <Link aria-label="anchor" to="#" className="ti-btn ti-btn-danger !bg-danger !text-white !py-1 !px-2 !text-[0.75rem] !m-0 !gap-0 !font-medium"
                                onClick={handleAllDelete} disabled={isDeleteDisabled}>Delete</Link>                         
                              
                                </div>
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="table-responsive">
                                <table className="table table-hover whitespace-nowrap table-bordered min-w-full">
                                    <thead>
                                        <tr>
                                        <th className="task-checkbox">
                                        <input className="form-check-input" type="checkbox" name="allselect"
                                         checked={data.length === selectedalluser.length}
                                         onChange={(e)=>handleChange(e.target.checked)} />
                                       </th>
                                           <th scope="col" className="text-start">S.No</th>
                                           <th scope="col" className="text-start">Mr.No</th>
                                           <th scope="col" className="text-start">UserName</th>
                                           <th scope="col" className="text-start">Profile</th>
                                           <th scope="col" className="text-start">Mobile Number</th>
                                           <th scope="col" className="text-start">Gender</th>
                                           <th scope="col" className="text-start">Role</th>
                                           <th scope="col" className="text-start">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredPatient.length > 0 ? (
                                            filteredPatient.map((users, index) => (
                                                <tr key={index} className="border border-inherit border-solid hover:bg-gray-100 
                                                dark:border-defaultborder/10 dark:hover:bg-light">
                                                    <td className="task-checkbox">
                                                    <input className="form-check-input" type="checkbox"
                                                            name={users._id}
                                                            checked={users.isChecked || false}
                                                            onChange={(e)=>handleCheckChange(e.target.checked)} />
                                                    </td>
                                                    <td>{index + 1}</td>
                                                    <td>{users.mrNumber}</td>
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
                                                    <td> <div className="flex flex-row items-center !gap-2 text-[0.9375rem]"> 
                                                        <Link aria-label="anchor" to={`/patientform/${users._id}`} className="ti-btn ti-btn-icon ti-btn-wave !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-info/10 text-info hover:bg-info hover:text-white hover:border-info"
                                                              ><i className="ri-pencil-line"></i></Link>
                                                        <Link aria-label="anchor" to="#" className="ti-btn ti-btn-icon ti-btn-wave !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-danger/10 text-danger hover:bg-danger hover:text-white hover:border-danger"
                                                                onClick={() => deletePatient(users._id)}><i className="ri-delete-bin-line"></i></Link>
                                                        <Link aria-label="anchor" to={`/patientprofile/${users._id}`} className="ti-btn ti-btn-icon ti-btn-wave !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-primary/10 text-primary hover:bg-primary hover:text-white hover:border-primary"
                                                              ><i className="ri-eye-line"></i></Link>
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
                                {filteredPatient.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="text-center text-red">No users found.</td>
                                    </tr>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default PatientDetails;

