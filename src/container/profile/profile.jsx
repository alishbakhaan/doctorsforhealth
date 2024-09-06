import  {  Fragment, useEffect, useState } from 'react';
import Pageheader from '../../components/common/pageheader/pageheader';

import face9 from "../../assets/images/faces/9.jpg";
import axios from 'axios';




const Profile = () => {


    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://192.168.100.116:3000/api/v2/DoctorforHealth/user/profile', {
            headers: {
                'x-access-token': token,
            }
        })
            .then(response => {
                console.log(data);
                setData(response.data);
            })
            .catch(error => console.error('Error fetching profile:', error));
    }, []);


  return(
  <Fragment>
      <Pageheader currentpage="Profile" activepage="Pages" mainpage="Profile" />
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-12 xl:col-span-12 col-span-12">
                    <div className="box overflow-hidden">
                        <div className="box-body !p-0">
                            <div className="sm:flex items-start p-6      main-profile-cover">
                                <div>
                                    <span className="avatar avatar-xxl avatar-rounded online me-4">
                                        <img src={face9} alt="" />
                                    </span>
                                </div>
                                <div className="flex-grow main-profile-info">
                                    <div className="flex items-center !justify-between">
                                        <h6 className="font-semibold mb-1 text-white text-[1rem]"></h6>
                                        <button type="button" className="ti-btn ti-btn-light !font-medium !gap-0">Logout</button>
                                    </div>
                                    <p className="mb-1 !text-white  opacity-[0.7]">Chief Executive Officer (C.E.O)</p>
                                    <p className="text-[0.75rem] text-white mb-6 opacity-[0.5]">
                                        <span className="me-4 inline-flex"><i className="ri-building-line me-1 align-middle"></i>Georgia</span>
                                        <span className="inline-flex"><i className="ri-map-pin-line me-1 align-middle"></i>Washington D.C</span>
                                    </p>
                               
                                </div>
                            </div>                                                                       
                        </div>
                    </div>
                </div>
             
            </div>
  </Fragment>
);}

export default Profile;
