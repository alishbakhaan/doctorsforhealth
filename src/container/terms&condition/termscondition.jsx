import React, { Fragment, useEffect, useState } from 'react';
import SunEditor from 'suneditor-react';
import Pageheader from '../../components/common/pageheader/pageheader';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const TermsCondition = () => {
    const [data, setData] = useState([]);
    const [editId, setEditId] = useState(null);
    const [content, setContent] = useState('');
    const [version, setVersion] = useState(''); 
   
    
    useEffect(() => {
        fetchTerms();
    }, []);

    const fetchTerms = () => {
        axios.get('https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/terms-condition')
            .then(response => {
                setData(response.data);
            })
            .catch(error => console.error('Error fetching terms:', error));
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
            axios.delete(`https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/terms-condition/${id}`)
                .then(() => {
                    setData(data.filter(term => term._id !== id));
                    Swal.fire('Deleted!', 'Your term has been deleted.', 'success');
                })
                .catch(error => {
                    console.error('Error deleting terms:', error);
                    Swal.fire('Failed!', 'Failed to delete the term. Please try again.', 'error');
                });
        }
    });
    };

    const handleEdit = (term) => {
        setEditId(term._id);
        setContent(term.content);
        setVersion(term.version); 
    };

    const handleSave = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const plainTextContent = doc.body.textContent || "";

    const payload = { content: plainTextContent, version };

        if (editId) {
            axios.put(`https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/terms-condition/${editId}`, payload)
                .then(() => {
                    fetchTerms();
                    setEditId(null);
                    setContent('');
                    setVersion(''); 
                    Swal.fire('Updated!', 'Your term has been Updated.', 'success');
                })
                .catch(error => {
                    console.error('Error updating terms:', error);
                    alert('Failed to update the Statement. Please try again.');
                });
        } else {
            axios.post('https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/add/terms-condition', payload)
                .then(() => {
                    fetchTerms();
                    setContent('');
                    setVersion(''); 
                    Swal.fire('Added!', 'Your term has been Added.', 'success');
                })
                .catch(error => {
                    console.error('Error adding terms:', error);
                    alert('Failed to add the Statement. Please try again.');
                });
        }
    };

    return (
        <Fragment>
            <Pageheader currentpage="Terms & Condition" activepage="termscondition" mainpage="Grid Js" />
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="xl:col-span-12 col-span-12 mb-4">
                        <div id="project-description-editor" className="my-4">
                            <SunEditor 
                                setContents={content}
                                onChange={setContent}
                            />
                            <input
                                type="text"
                                className="form-control mt-4"
                                placeholder="Version"
                                value={version}
                                onChange={(e) => setVersion(e.target.value)}
                            />
                            <button className="ti-btn ti-btn-primary-full my-4" onClick={handleSave}>
                                {editId ? 'Update' : 'Add'} Statement
                            </button>
                        </div>

                        <div className="box">
                            <div className="box-header justify-between flex-wrap">
                                <div className="box-title">Terms and Condition List</div>
                            </div>
                            <div className="box-body">
                                <div className="table-responsive">
                                    <table className="table table-hover whitespace-nowrap table-bordered min-w-full">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="text-start">S.No</th>
                                                <th scope="col" colSpan="3" className="text-start">Terms & Condition</th>
                                                <th scope="col" className="text-start">Version</th>
                                                <th scope="col" className="text-start">Created At</th>
                                                <th scope="col" className="text-start">Updated At</th>
                                                <th scope="col" className="text-start">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((term, index) => (
                                                <tr className="border border-inherit border-solid hover:bg-gray-100 dark:border-defaultborder/10 dark:hover:bg-light" key={term._id}>
                                                    <td>{index + 1}</td>
                                                    <td style={{ whiteSpace: 'normal', wordWrap: 'break-word' }} colSpan="3">{term.content}</td>
                                                    <td>{term.version}</td>
                                                    <td>{new Date(term.createdAt).toLocaleDateString()}</td>
                                                    <td>{new Date(term.updatedAt).toLocaleDateString()}</td>
                                                    <td>
                                                        <div className="flex flex-row items-center !gap-2 text-[0.9375rem]">
                                                            <Link to="#" className="ti-btn ti-btn-icon ti-btn-wave !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-info/10 text-info hover:bg-info hover:text-white hover:border-info" onClick={() => handleEdit(term)}>
                                                                <i className="ri-pencil-line"></i>
                                                            </Link>
                                                            <Link to="#" className="ti-btn ti-btn-icon ti-btn-wave !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-danger/10 text-danger hover:bg-danger hover:text-white hover:border-danger" onClick={() => handleDelete(term._id)}>
                                                                <i className="ri-delete-bin-line"></i>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="box-footer">
                                <div className="sm:flex items-center">
                                    <div className="text-defaulttextcolor/70">
                                        Showing {data.length} Entries
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default TermsCondition;
