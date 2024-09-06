import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Pageheader from '../../components/common/pageheader/pageheader';
import Swal from 'sweetalert2';

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const navigate = useNavigate();

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = () => {
    const token = localStorage.getItem('token');
    axios.get('https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/groups',
      {
        headers: {
            'x-access-token': token,
        }
    }
    )
      .then(response => setGroups(response.data))
      .catch(error => console.error('Error fetching groups:', error));
  };

  const handleDelete = (id) => {
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
    axios.delete(`https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/group/${id}`)
      .then(() => {
        setGroups(groups.filter(group => group._id !== id));
        Swal.fire('Deleted!', 'Group has been deleted.', 'success');
      })
      .catch(error => console.error('Error deleting group:', error));
  };
  });
};

  // Function to handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Filtered groups based on search query
  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Pageheader currentpage="Group List" activepage="Tables" mainpage="Grid Js" />
      <div className="xl:col-span-6 col-span-12">
        <div className="box custom-box">
          <div className="box-header">
            <div className="box-title">
              View List
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
            <button onClick={() => navigate('/groupform')} className="ti-btn ti-btn-primary-full">
              Add Group
            </button>
            <div title="Bordered Tables">
              <div className="table-responsive">
                <table className="table whitespace-nowrap table-bordered min-w-full">
                  <thead>
                    <tr className="border-b border-defaultborder">
                    <th scope="col" className="text-start">S.No</th>
                      <th scope="col" className="text-start">Group Name</th>
                      <th scope="col" className="text-start">Description</th>
                      <th scope="col" className="text-start">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredGroups.map((group, index) => (
                      <tr className="border-b border-defaultborder" key={group._id}>
                        <td>{index + 1}</td>
                        <td>{group.name}</td>
                        <td>{group.description}</td>
                        <td>
                          <div className="flex flex-row items-center !gap-2 text-[0.9375rem]">
                            <Link aria-label="anchor" to={`/groupform/${group._id}`}   className="ti-btn ti-btn-icon ti-btn-wave !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-info/10 text-info hover:bg-info hover:text-white hover:border-info">
                              <i className="ri-edit-line"></i>
                            </Link>
                            <Link aria-label="anchor" to="#"  className="ti-btn ti-btn-icon ti-btn-wave !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-danger/10 text-danger hover:bg-danger hover:text-white hover:border-danger">
                              <i className="ri-delete-bin-5-line" onClick={() => handleDelete(group._id)}></i>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredGroups.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center text-red">No groups found.</td>
                  </tr>
                )}
              </div>
            </div>
          </div>
          <div className="box-footer">
            <div className="sm:flex items-center">
              <div className="text-defaulttextcolor/70">
                Showing {filteredGroups.length} Entries <i className="bi bi-arrow-right ms-2 font-semibold"></i>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupList;
