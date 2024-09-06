import React, { Fragment, useEffect, useState } from 'react';
import Pageheader from '../../components/common/pageheader/pageheader';
import { Select, MenuItem, FormControl, InputLabel, Checkbox, Button, Snackbar } from '@mui/material';
import axios from 'axios';
import { Alert } from '@mui/material';

const GroupPermission = () => {
  const [groupId, setGroup] = useState('');
  const [groups, setGroups] = useState([]);
  const [fields, setFields] = useState([]);
  const [permissions, setPermissions] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get("https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/groups",
      {
        headers: {
            'x-access-token': token,
        }
      }
    )
      .then(response => {
        const groupOptions = response.data.map(group => ({
          value: group._id,
          label: group.name,
        }));
        setGroups(groupOptions);
      })
      .catch(() => setError("Error fetching groups"));

    fetchFields();
  }, []);

  const fetchFields = () => {
    const token = localStorage.getItem('token');
    axios.get('https://dfhapi.doctorsforhealth.co.uk/api/v2/getModels',
      {
        headers: {
            'x-access-token': token,
        }
    }
    )
      .then(response => setFields(response.data.models))
      .catch(() => setError('Error fetching fields'));
  };

  const handleChange = (event) => {
    const selectedGroupId = event.target.value;
    setGroup(selectedGroupId);

    const token = localStorage.getItem('token');
    axios.get(`https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/Permissions?groupId=${selectedGroupId}`,
      {
        headers: {
            'x-access-token': token,
        }
    }
    )
      .then(response => {
        const permissionsMap = response.data.reduce((acc, permission) => {
          acc[permission.modelName] = {
            read: permission.read || false,
            insert: permission.insert || false,
            update: permission.update || false,
            delete: permission.delete || false,
          };
          return acc;
        }, {});
        setPermissions(permissionsMap);
      })
      .catch(() => setError('Error fetching permissions'));
  };
  //console
console.log(permissions);

  const handlePermissionChange = (modelName, action, checked) => {
    setPermissions(prevPermissions => ({
      ...prevPermissions,
      [modelName]: {
        ...prevPermissions[modelName],
        [action]: checked,
      },
    }));
  };

  const handleApplyPolicy = () => {
    const completePermissions = Object.entries(permissions).reduce((acc, [modelName, actions]) => {
      acc[modelName] = {
        read: actions.read || false,
        insert: actions.insert || false,
        update: actions.update || false,
        delete: actions.delete || false,
      };
      return acc;
    }, {});

    const permissionsToUpdate = Object.entries(completePermissions).map(([modelName, actions]) => ({
      ...actions,
      groupId,
      modelName,
    }));

console.log('Group ID:', groupId);
console.log('Permissions to Update:', permissionsToUpdate);
    // Batch update permissions
    const token = localStorage.getItem('token');
    axios.post('https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/add/Permission', { permissions: permissionsToUpdate },
      {
        headers: {
            'x-access-token': token,
        }
    }
    )
    .then(() => {Swal.fire('Applied!', 'Permissions Applied successfully', 'success');})
      .catch(() => setError('Error Apply permissions'));
  };

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <Fragment>
      <Pageheader currentpage="Permission Model" activepage="Tables" mainpage="Grid Js" />
      <div className="grid grid-cols-12 gap-6">
        <div className="xl:col-span-12 col-span-12">
          <div className="box custom-box">
            <div className="box-header">
              <div className="box-title">
                Choose which Group You want to select?
              </div>
            </div>
            <div className="box-body">
              <FormControl fullWidth>
                <InputLabel id="group-select-label">Select Group</InputLabel>
                <Select
                  labelId="group-select-label"
                  id="group-select"
                  value={groupId}
                  onChange={handleChange}
                  label="Select Group"
                  required
                >
                  {groups.map((group) => (
                    <MenuItem key={group.value} value={group.value}>
                      {group.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="box-header">
              <div className="box-title">
                Choose Which Policy You want to apply?
              </div>
            </div>
            <div title="Bordered Tables">
              <div className="table-responsive">
                <table className="table whitespace-nowrap table-bordered min-w-full">
                  <thead>
                    <tr className="border-b border-defaultborder">
                      <th scope="col" className="text-start">S.no</th>
                      <th scope="col" className="text-start">Fields</th>
                      <th scope="col" className="text-start">Read</th>
                      <th scope="col" className="text-start">Insert</th>
                      <th scope="col" className="text-start">Update</th>
                      <th scope="col" className="text-start">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fields.map((field, index) => (
                      <tr key={index} className="border-b border-defaultborder">
                        <td>{index + 1}</td>
                        <td>{field}</td>
                        <td>
                          <Checkbox
                            checked={permissions[field]?.read || false}
                            onChange={(e) => handlePermissionChange(field, 'read', e.target.checked)}
                          />
                        </td>
                        <td>
                          <Checkbox
                            checked={permissions[field]?.insert || false}
                            onChange={(e) => handlePermissionChange(field, 'insert', e.target.checked)}
                          />
                        </td>
                        <td>
                          <Checkbox
                            checked={permissions[field]?.update || false}
                            onChange={(e) => handlePermissionChange(field, 'update', e.target.checked)}
                          />
                        </td>
                        <td>
                          <Checkbox
                            checked={permissions[field]?.delete || false}
                            onChange={(e) => handlePermissionChange(field, 'delete', e.target.checked)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="box-body">
              {/* <Button
                variant="contained"
                color="primary"
                onClick={handleApplyPolicy}
              >
                Apply Policy
              </Button> */}
              <button className="ti-btn ti-btn-primary !bg-primary !text-white !font-medium" 
              type="submit" value="Login"  onClick={handleApplyPolicy}>Apply Policy</button>
            </div>
          </div>
        </div>
      </div>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          {error}
        </Alert>
      </Snackbar>
      <Snackbar open={!!success} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          {success}
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default GroupPermission;






// import React, { Fragment, useEffect, useState } from 'react';
// import Pageheader from '../../components/common/pageheader/pageheader';
// import { Select, MenuItem, FormControl, InputLabel, Checkbox } from '@mui/material';
// import axios from 'axios';

// const GroupPermission = () => {
//   const [groupId, setGroup] = useState('');
//   const [groups, setGroups] = useState([]);
//   const [fields, setFields] = useState([]);
//   const [permissions, setPermissions] = useState({});

//   useEffect(() => {
//     // Fetching groups
//     axios.get("http://192.168.100.116:3000/api/v2/DoctorforHealth/groups")
//       .then(response => {
//         const groupOptions = response.data.map(group => ({
//           value: group._id,
//           label: group.name,
//         }));
//         setGroups(groupOptions);
//       })
//       .catch(error => console.error("Error fetching groups:", error));
//   }, []);

    
// // fetching fields
//   useEffect(() => {
//     fetchFields();
//   }, []);

//   const fetchFields = () => {
//     axios.get('http://192.168.100.116:3000/api/v2/getModels')
//       .then(response => setFields(response.data.models))
//       .catch(error => console.error('Error fetching fields:', error));
//   };

//   // dropdown fumction
//   const handleChange = (event) => {
//     const selectedGroupId = event.target.value;
//     setGroup(selectedGroupId);
//   };

//   // Handle permission change (view, create, update, delete)
//   const handlePermissionChange = (fieldName, action, checked) => {
//     const existingPermission = permissions[fieldName] || {};
//     const updatedPermission = { ...existingPermission, [action]: checked };

//     setPermissions((prevPermissions) => ({
//       ...prevPermissions,
//       [fieldName]: updatedPermission,
//     }));

//     // Update or create the permission in the backend
//     if (existingPermission._id) {
//       // Update existing permission
//       axios.put(`http://localhost:3000/api/v2/DoctorforHealth/Permission/${existingPermission._id}`, updatedPermission)
//         .then(() => {
//           alert('Permission updated successfully');
//         })
//         .catch(error => console.error('Error updating permission:', error));
//     } else {
//       // Create new permission
//       axios.post('http://localhost:3000/api/v2/DoctorforHealth/add/Permission', {
//         groupId,
//         fieldName,
//         ...updatedPermission,
//       })
//         .then((response) => {
//           setPermissions((prevPermissions) => ({
//             ...prevPermissions,
//             [fieldName]: { ...updatedPermission, _id: response.data._id },
//           }));
//           alert('Permission created successfully');
//         })
//         .catch(error => console.error('Error creating permission:', error));
//     }
//   };

//   const handleDeletePermission = (fieldName) => {
//     const permissionId = permissions[fieldName]?._id;

//     if (permissionId) {
//       axios.delete(`http://localhost:3000/api/v2/DoctorforHealth/Permission/${permissionId}`)
//         .then(() => {
//           setPermissions((prevPermissions) => {
//             const updatedPermissions = { ...prevPermissions };
//             delete updatedPermissions[fieldName];
//             return updatedPermissions;
//           });
//           alert('Permission deleted successfully');
//         })
//         .catch(error => console.error('Error deleting permission:', error));
//     }
//   };

//   return (
//     <Fragment>
//       <Pageheader currentpage="Permission Model" activepage="Tables" mainpage="Grid Js" />
//       <div className="grid grid-cols-12 gap-6">
//         <div className="xl:col-span-12 col-span-12">
//           <div className="box custom-box">
//             <div className="box-header">
//               <div className="box-title">
//                 Choose which Group You want to select?
//               </div>
//             </div>
//             <div className="box-body">
//               <FormControl fullWidth>
//                 <InputLabel id="group-select-label">Select Group</InputLabel>
//                 <Select
//                   labelId="group-select-label"
//                   id="group-select"
//                   value={groupId}
//                   onChange={handleChange}
//                   label="Select Group"
//                   required
//                 >
//                   {groups.map((group) => (
//                     <MenuItem key={group.value} value={group.value}>
//                       {group.label}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </div>

//             <div className="box-header">
//               <div className="box-title">
//                 Choose Which Policy You want to apply?
//               </div>
//             </div>
//             <div title="Bordered Tables">
//               <div className="table-responsive">
//                 <table className="table whitespace-nowrap table-bordered min-w-full">
//                   <thead>
//                     <tr className="border-b border-defaultborder">
//                       <th scope="col" className="text-start">S.no</th>
//                       <th scope="col" className="text-start">Fields</th>
//                       <th scope="col" className="text-start">View</th>
//                       <th scope="col" className="text-start">Create</th>
//                       <th scope="col" className="text-start">Update</th>
//                       <th scope="col" className="text-start">Delete</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {fields.map((field, index) => (
//                       <tr key={index} className="border-b border-defaultborder">
//                         <td>{index + 1}</td>
//                         <td>{field}</td>
//                         <td>
//                           <Checkbox
//                             checked={permissions[field]?.view || false}
//                             onChange={(e) => handlePermissionChange(field, 'view', e.target.checked)}
//                           />
//                         </td>
//                         <td>
//                           <Checkbox
//                             checked={permissions[field]?.create || false}
//                             onChange={(e) => handlePermissionChange(field, 'create', e.target.checked)}
//                           />
//                         </td>
//                         <td>
//                           <Checkbox
//                             checked={permissions[field]?.update || false}
//                             onChange={(e) => handlePermissionChange(field, 'update', e.target.checked)}
//                           />
//                         </td>
//                         <td>
//                           <Checkbox
//                             checked={permissions[field]?.delete || false}
//                             onChange={(e) => handlePermissionChange(field, 'delete', e.target.checked)}
//                           />
//                         </td>
                        
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//             <div className="box-body">
//               <button className="ti-btn ti-btn-primary-full" type="submit">Apply Policy</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default GroupPermission;

