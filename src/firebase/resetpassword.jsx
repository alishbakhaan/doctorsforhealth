import React, { Fragment, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const {token} = useParams()
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();
    // const params = useParams();
    // console.log(params.token);
  
    const handleResetPassword = (e) => {
        e.preventDefault();
     axios.post(`http://192.168.100.116:3000/api/v2/DoctorforHealth/reset-password/${token}`, { newPassword })
        .then(response => {
            alert('Password has been reset successfully.');
            navigate('/login')
        })
        .catch(error => {
            console.error('Error resetting password:', error);
        });
    };


    return (
        <Fragment>
            <div className="container">
                <div className="flex justify-center authentication authentication-basic items-center h-full text-defaultsize text-defaulttextcolor">
                    <div className="grid grid-cols-12">
                        <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-3 sm:col-span-2"></div>
                        <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-8 col-span-12">
                            <div className="box">
                                <div className="box-body !p-[3rem]">
                                    <p className="h5 font-semibold mb-2 text-center">Forget Password?</p>
                                    <p className="mb-4 text-[#8c9097] dark:text-white/50 opacity-[0.7] font-normal text-center"> Join us again by
                                        Reset Your Password</p>
                                    <div className="grid grid-cols-12 gap-y-4">
                                        <div className="xl:col-span-12 col-span-12">
                                           
                                            <input
                                                type="password"
                                                placeholder="New Password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                            />
                                        </div>


                                        <div className="xl:col-span-12 col-span-12 grid mt-2">
                                            <button type="button" className="ti-btn ti-btn-lg bg-primary text-white !font-medium dark:border-defaultborder/10" onClick={handleResetPassword}>
                                                Reset Password
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mt-4">Remember Your Password? <Link
                                            to='/login' className="text-primary">Sign In</Link></p>
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

export default ResetPassword;
  // <div>
        //     <input 
        //         type="password" 
        //         placeholder="New Password" 
        //         value={newPassword} 
        //         onChange={(e) => setNewPassword(e.target.value)} 
        //     />
        //     <input 
        //         type="password" 
        //         placeholder="Confirm Password" 
        //         value={confirmPassword} 
        //         onChange={(e) => setConfirmPassword(e.target.value)} 
        //     />
        //     <button onClick={handleResetPassword}>Set New Password</button>
        // </div>

          // const [confirmPassword, setConfirmPassword] = useState('');

    // const handleResetPassword = () => {
    //     if (newPassword !== confirmPassword) {
    //         alert("Passwords do not match!");
    //         return;
    //     }

    // axios.post(`http://192.168.100.116:3000/api/v2/DoctorforHealth/reset-password/${token}`, { newPassword })
    //     .then(response => {
    //         alert('Password has been reset successfully.');
    //     })
    //     .catch(error => {
    //         console.error('Error resetting password:', error);
    //     });
    // };