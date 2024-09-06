import { Fragment, useState, } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const handleForgotPassword = (e) => {
        e.preventDefault()
        axios.post(' https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/forgot-password', { email })
            .then(response => {  
                alert('Password reset link has been sent to your email.');
                navigate('/login')
            })
            .catch(error => {
                console.error('Error sending reset link:', error);
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
                                            <label htmlFor="signup-firstname" className="form-label text-default">Your Email</label>
                                            <input type="email" className="form-control form-control-lg w-full !rounded-md"
                                                id="signup-firstname" placeholder="Your Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                       
                                       
                                        <div className="xl:col-span-12 col-span-12 grid mt-2">
                                            <button type="button" onClick={handleForgotPassword} className="ti-btn ti-btn-lg bg-primary text-white !font-medium dark:border-defaultborder/10">
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

export default ForgotPassword;
