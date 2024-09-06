import {  Fragment, useEffect, useState } from 'react';
import { connect } from "react-redux";
import { ThemeChanger } from "../redux/action";
import { Link, useNavigate } from 'react-router-dom';
import { LocalStorageBackup } from '../components/common/switcher/switcherdata/switcherdata';
import Swal from 'sweetalert2';


const Login = ({ThemeChanger}) => {
    const [identifier, setidentifier] = useState('')
	const [password, setPassword] = useState('')
    const [passwordshow1, setpasswordshow1] = useState(false);
    const [err, setError] = useState("");

    async function loginUser(event) {
		event.preventDefault();

		setError('');
	
		try {
			const response = await fetch(' https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth/user/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					identifier,
					password,
				}),
			});
	
			if (!response.ok) {
				// Handle non-200 responses
				const errorData = await response.json();
				setError(errorData.message || 'Login failed. Please try again.');
				return;
			}
	
			const data = await response.json();
            console.log(data);
			if (data.accessToken) {
				localStorage.setItem('token', data.accessToken);
				Swal.fire('Login!', 'You are Logged In Sucessfully', 'success');
				window.location.href = '/controlpanel';
               
			} else {
				setError('Please check your username and password');
			}
            // save user
            if(data) {
                localStorage.setItem("user" , JSON.stringify(data.user))
            }
            else{
                setError('please check your console')
            }
            
		} catch (error) {
			setError('An unexpected error occurred. Please try again.');
		}

	}

    
    useEffect(() => {
        LocalStorageBackup(ThemeChanger);
    }, []);

    return (
        <Fragment>
            <div className="container">
                <div className="flex justify-center authentication authentication-basic items-center h-full text-defaultsize text-defaulttextcolor">
                    <div className="grid grid-cols-12">
                        <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-3 sm:col-span-2"></div>
                        <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-8 col-span-12">
                           
						<div className="box !p-[3rem]">
                                <div className="box-body" role="tabpanel" id="pills-with-brand-color-01" aria-labelledby="pills-with-brand-color-item-1">
                                    <p className="h5 font-semibold mb-2 text-center">Sign In</p>
                                  
                                    {err && <div className="alert-danger px-4 py-3 shadow-md mb-2" role="alert">
                                        <div className="flex">
                                            <div className="py-1">
                                            </div>
                                            <div>{err}</div>
                                        </div>
                                    </div>}
                                    <form onSubmit={loginUser}>
                                    <div className="grid grid-cols-12 gap-y-4">
                                      
                                        <div className="xl:col-span-12 col-span-12">
                                            <label htmlFor="signin-username" className="form-label text-default">Email</label>
                                            <input type="email" name="email" className="form-control form-control-lg w-full !rounded-md" onChange={(e) => setidentifier(e.target.value)} value={identifier}
                                                id="signin-username" placeholder="user name" />
                                        </div>
                                        <div className="xl:col-span-12 col-span-12 mb-2">
                                            <label htmlFor="signin-password" className="form-label text-default block">Password
                                            <Link to='/forgotpassword' className="float-end text-danger">
                                            Forget password ?
                                            </Link>
                                            </label>
                                            <div className="input-group">
                                                <input type={passwordshow1 ? 'text' : 'password'} className="form-control form-control-lg !rounded-s-md"
                                                    name="password"
                                                    placeholder="password" value={password}
                                                    onChange={(e) => setPassword(e.target.value)} />
                                                <button
                                                    onClick={() => setpasswordshow1(!passwordshow1)}
                                                    aria-label="button" className="ti-btn ti-btn-light !rounded-s-none !mb-0" type="button" id="button-addon2"><i className={`${passwordshow1 ? 'ri-eye-line' : 'ri-eye-off-line'} align-middle`}></i></button>
                                            </div>
                                            <div className="mt-2">
                                                <div className="form-check !ps-0">
                                                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                    <label className="form-check-label text-[#8c9097] dark:text-white/50 font-normal" htmlFor="defaultCheck1">
                                                        Remember password ?
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="xl:col-span-12 col-span-12 grid mt-2">
                                            <button className="ti-btn ti-btn-primary !bg-primary !text-white !font-medium"
                                                type="submit" value="Login">Sign In</button>
                                        </div>
                                        
                                    </div>
                                    </form>
                                    <div className="text-center">
                                        <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mt-4">Dont have an account? <Link to='/signup' className="text-primary">Sign Up</Link></p>
                                    </div>
                                 
                                
                                </div>
                             </div>
                           
                        </div>
                        <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-3 sm:col-span-2"></div>
                    </div>
                </div>
            </div>
        </Fragment>

    )
};

const mapStateToProps = (state) => ({
    local_varaiable: state
});

export default connect(mapStateToProps, { ThemeChanger })(Login);
