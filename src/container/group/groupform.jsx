import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Pageheader from "../../components/common/pageheader/pageheader";
import Swal from "sweetalert2";

function GroupForm() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (groupId) {
      const token = localStorage.getItem('token');
      axios.get(`https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/group/${groupId}`,
        {
          headers: {
              'x-access-token': token,
          }
      }
      )
        .then((response) => {
          const { name, description } = response.data;
          setName(name);
          setDescription(description);
        })
        .catch((error) => alert(error.message));
    }

    // Fetch all groups to check for duplicates
    const token = localStorage.getItem('token');
    axios.get("https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/groups", 
      {
        headers: {
            'x-access-token': token,
        }
      }
      )
      .then((response) => setGroups(response.data))
      .catch((error) => {
        console.error("Error fetching groups:", error)
        Swal.fire('Failed!', 'Failed to Fetch the Groups. Please try again.', 'error');
      });
  }, [groupId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const groupData = { name, description };

    const duplicateGroup = groups.find((group) => group.name.toLowerCase() === name.toLowerCase());

    if (duplicateGroup) {
      Swal.fire('Failed!', 'A group with the same name already exists. Please choose a different name.', 'error');
      return;
    }

    if (groupId) {
      const token = localStorage.getItem('token');
      axios.put(`https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/group/${groupId}`, groupData,
        {
          headers: {
              'x-access-token': token,
          }
        }
      )
        .then(() => {
          Swal.fire('Updated!', 'Your Group has been Updated.', 'success');
          navigate('/grouplist');
        })
        .catch((error) => alert(error.message));
    } else {
      const token = localStorage.getItem('token');
      axios.post("https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/group", groupData,
        {
          headers: {
              'x-access-token': token,
          }
        }
      )
        .then(() => {
          Swal.fire('Added!', 'Your Group has been Added.', 'success');
          navigate('/grouplist');
        })
        .catch((error) => Swal.fire(error.message));
    }
  };

  return (
    <Fragment>
      <Pageheader currentpage="Group Form" activepage="Tables" mainpage="Grid Js" />
      <div className="grid grid-cols-12 gap-6">
        <div className="xl:col-span-6 col-span-12">
          <div className="box custom-box">
            <div className="box-header">
              <div className="box-title">
                {groupId ? "Edit Group" : "Add Group"}
              </div>
            </div>
            <div className="box-body">
              <div title="Vertical Forms">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="form-text" className="form-label !text-[.875rem] text-black">Enter Group Name</label>
                    <input
                    placeholder="Enter Group Name"
                      className="form-control"
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="form-password" className="form-label text-[.875rem] text-black">Enter Description</label>
                    <input
                    placeholder="Enter Any Message/Desription reletd to group..."
                      className="form-control"
                      type="text"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      required
                    />
                  </div>

                  <div className="form-check mb-4">
                    <input className="form-check-input" type="checkbox" id="invalidCheck" required />
                    <label className="form-check-label" htmlFor="invalidCheck">
                      Accept Policy
                    </label>
                  </div>
                  <button className="ti-btn ti-btn-primary-full" type="submit">
                    {groupId ? "Update Group" : "Add Group"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Permissions */}

     
    </Fragment>
  );
}

export default GroupForm;
