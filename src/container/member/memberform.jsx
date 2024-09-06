import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import Pageheader from "../../components/common/pageheader/pageheader";
import Select from 'react-select';
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

function AddMember() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordshow1, setpasswordshow1] = useState(false);
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [groupId, setGroup] = useState(null);
  const [groups, setGroups] = useState([]);
  // const [errorMessage, setErrorMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [groupError, setGroupError] = useState("");

  useEffect(() => {
    (() => {
      const token = localStorage.getItem('token');
      axios.get(`https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/admin/get-member-by-id/${id}`,
        {
          headers: {
            'x-access-token': token,
          }
        }
      )

        .then(response => {
          console.log(response.data)
          const member = response.data;
          setName(member.name);
          setEmail(member.email);
          setPhone(member.phone.replace(countryCode, ""));
          setCountryCode(member.phone.slice(0, member.phone.indexOf(phone)));
          const groupOptions = response.data.map(group => ({
            value: group._id,
            label: group.name,
          }));

          setGroups(groupOptions);
          // Set the groupId using the fetched group data
          const memberGroup = groupOptions.find(g => g.value === member.groupId);
          setGroup(memberGroup);
        })
        .catch(error => console.error("Error fetching member details:", error));
    })();
  }, [id])

  console.log(id)

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    axios.get("https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/groups", {
      headers: {
        'x-access-token': token,
      }
    })
      .then(response => {
        const groupOptions = response.data.map(group => ({
          value: group._id,
          label: group.name,
        }));
        setGroups(groupOptions);
  
        if (id) {
          axios.get(`https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/admin/get-member/${id}`, {
            headers: {
              'x-access-token': token,
            }
          })
            .then(response => {
              if (response.data) {
              const member = response.data;
              setName(member.name);
              setEmail(member.email);
              setPhone(member.phone.replace(countryCode, ""));  
              setCountryCode(member.phone.slice(0, member.phone.indexOf(phone)));
              
              const memberGroup = groupOptions.find(g => g.value === member.groupId);
              setGroup(memberGroup);
              }else{
                console.error("Member not found");
              }
            })
            .catch(error => console.error("Error fetching member details", error));
        }
      })
      .catch(error => console.error("Error fetching groups:", error));
  }, [id, countryCode, phone]);

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,}$/;
    return passwordPattern.test(password);
  };

  const validatePhone = (phone) => {
    const phonePattern = /^\d{10,14}$/;
    return phonePattern.test(phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Invalid email format.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 5 characters long, include an uppercase letter and a number.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!validatePhone(phone)) {
      setPhoneError("Invalid phone number.");
      valid = false;
    } else {
      setPhoneError("");
    }

    if (!groupId) {
      setGroupError("Please select a group.");
      valid = false;
    } else {
      setGroupError("");
    }

    if (!valid) {
      return;
    }

    const memberData = { name, email, password, phone: `${countryCode}${phone}`, groupId: groupId.value };

    if (id) {
      // Update existing member
      const token = localStorage.getItem('token');
      axios.put(`https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/admin/update-member/${id}`, memberData,
        {
          headers: {
            'x-access-token': token,
          }
        }
      )
        .then(() => {
          Swal.fire('Updated!', 'Member details updated successfully.', 'success');
          navigate('/memberlist');
        })
        .catch((error) => {
          console.error("Error updating member:", error);
          Swal.fire('Failed!', 'Failed to update the Member. Please try again.', 'error');
        });
    } else {
      // Add new member
      const token = localStorage.getItem('token');
      axios.post("https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/admin/create-member", memberData,
        {
          headers: {
            'x-access-token': token,
          }
        }
      )
        .then(() => {
          setName("");
          setEmail("");
          setPassword("");
          setPhone("");
          setCountryCode("+1");
          setGroup(null);
          Swal.fire('Added!', 'Member added successfully.', 'success');
          navigate('/memberlist');
        })
        .catch((error) => {
          console.error("Error adding member:", error);
          Swal.fire('Failed!', 'Failed to add the Member. Please try again.', 'error');
        });
    }
  };

  const countryCodeOptions = [
    { value: '+1', label: ' +1 USA' },
    { value: '+44', label: '+44 UK' },
    { value: '+91', label: '+91 India' },
    { value: '+92', label: '+92 Pak' },
  ];

  return (
    <Fragment>
      <Pageheader currentpage={id ? "Edit Member" : "Add Member"} activepage="Tables" mainpage="Grid Js" />
      <div className="grid grid-cols-12 gap-6">
        <div className="xl:col-span-6 col-span-12">
          <div className="box custom-box">
            <div className="box-header">
              <div className="box-title">
                {id ? "Edit Member" : "Add Member"}
              </div>
            </div>
            <div className="box-body">
              <div title="Vertical Forms">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="form-text" className="form-label !text-[.875rem] text-black">Enter name</label>
                    <input
                      placeholder="Enter Name"
                      className="form-control"
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      required
                    />
                    {nameError && <p className="text-red">{nameError}</p>}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="form-text" className="form-label !text-[.875rem] text-black">Enter email</label>
                    <input
                      placeholder="abc@gmail.com"
                      className="form-control"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                    />
                    {emailError && <p className="text-red">{emailError}</p>}
                  </div>
                  {!id && (
                    <div className="mb-4">
                      <label htmlFor="form-password" className="form-label text-[.875rem] text-black">Enter Password</label>
                      <div className="input-group">
                        <input
                          type={passwordshow1 ? 'text' : 'password'}
                          placeholder="Example123"
                          className="form-control form-control-lg !rounded-s-md"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          required
                        />
                        <button
                          onClick={() => setpasswordshow1(!passwordshow1)}
                          aria-label="button"
                          className="ti-btn ti-btn-light !rounded-s-none !mb-0"
                          type="button"
                          id="button-addon2"
                        >
                          <i className={`${passwordshow1 ? 'ri-eye-line' : 'ri-eye-off-line'} align-middle`}></i>
                        </button>
                      </div>
                      {passwordError && <p className="text-red">{passwordError}</p>}
                    </div>
                  )}
                  <div className="mb-4">
                    <label htmlFor="form-phone" className="form-label text-[.875rem] text-black">Enter phone</label>
                    <div className="flex">
                      <Select
                        name="countryCode"
                        options={countryCodeOptions}
                        className="mr-2"
                        onChange={(selectedOption) => setCountryCode(selectedOption.value)}
                        value={countryCodeOptions.find(option => option.value === countryCode)}
                        menuPlacement='auto'
                        classNamePrefix="CountryCode"
                        required
                      />
                      <input
                        className="form-control"
                        type="tel"
                        placeholder="1234567890"
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                        required
                      />
                    </div>
                    {phoneError && <p className="text-red">{phoneError}</p>}
                  </div>
                  {!id && (
                  <div className="mb-4">
                    <label htmlFor="form-group" className="form-label text-[.875rem] text-black">Select Group</label>
                    <Select
                      name="groupId"
                      options={groups}
                      onChange={(selectedOption) => setGroup(selectedOption)}
                      value={groupId}
                      required
                    />
                    {groupError && <p className="text-red">{groupError}</p>}
                  </div>
                  )}
                  <button type="submit" className="ti-btn ti-btn-primary">
                    {id ? "Update" : "Add"} Member
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default AddMember;
