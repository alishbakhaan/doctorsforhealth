import  {  Fragment, useState } from 'react';
import Pageheader from '../../components/common/pageheader/pageheader';
import { Link } from 'react-router-dom';
import { Billssummary, JobsSummary, Performancebycategory } from './hrmdata';

const Hrm = () => {
    const [Data, setData] = useState(Billssummary);

    const userdata = [];

    const myfunction = (idx) => {
        let Data;
        for (Data of Billssummary) {
            if (Data.name[0] == " ") {
                Data.name = Data.name.trim();
            }
            if (Data.name.toLowerCase().includes(idx.toLowerCase())) {
                if (Data.name.toLowerCase().startsWith(idx.toLowerCase())) {
                    userdata.push(Data);
                }
            }

        }
        setData(userdata);
    };
  return(
  <Fragment>
    <Pageheader currentpage="Control Panel" activepage="Dashboards" mainpage="Control Panel" />
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-12 xl:col-span-12 col-span-12">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xxl:col-span-4 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <div className="box hrm-main-card primary">
                                <div className="box-body">
                                    <div className="flex items-start">
                                        <div className="me-4">
                                            <span className="avatar bg-primary !text-white">
                                                <i className="ri-team-line text-[1.125rem]"></i>
                                            </span>
                                        </div>
                                        <div className="flex-grow">
                                            <span className="font-semibold text-[#8c9097] dark:text-white/50 block mb-1">Total Patient</span>
                                            <h5 className="font-semibold mb-1 text-[1.25rem]">22,124</h5>
                                            <p className="mb-0">
                                                <span className="badge bg-primary/10 text-primary">This Month</span>
                                            </p>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xxl:col-span-4 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <div className="box hrm-main-card secondary">
                                <div className="box-body">
                                    <div className="flex items-start">
                                        <div className="me-4">
                                            <span className="avatar bg-secondary !text-white">
                                                <i className="bx bx-table text-[1.125rem]"></i>
                                            </span>
                                        </div>
                                        <div className="flex-grow">
                                            <span className="font-semibold text-[#8c9097] dark:text-white/50 block mb-1">Total Appointment</span>
                                            <h5 className="font-semibold mb-1 text-[1.25rem]">528</h5>
                                            <p className="mb-0">
                                                <span className="badge bg-secondary/10 text-secondary">This Month</span>
                                            </p>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xxl:col-span-4 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <div className="box  hrm-main-card warning">
                                <div className="box-body">
                                    <div className="flex items-start">
                                        <div className="me-4">
                                            <span className="avatar bg-warning !text-white">
                                                <i className="ri-contacts-line text-[1.125rem]"></i>
                                            </span>
                                        </div>
                                        <div className="flex-grow">
                                            <span className="font-semibold text-[#8c9097] dark:text-white/50 block mb-1">Total Doctors</span>
                                            <h5 className="font-semibold mb-1 text-[1.25rem]">8,289</h5>
                                            <p className="mb-0">
                                                <span className="badge bg-warning/10 text-warning">This Month</span>
                                            </p>
                                        </div>
                                      
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xxl:col-span-4 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <div className="box hrm-main-card warning">
                                <div className="box-body">
                                    <div className="flex items-start">
                                        <div className="me-4">
                                            <span className="avatar bg-warning !text-white">
                                                <i className="las la-tv text-[1.125rem]"></i>
                                            </span>
                                        </div>
                                        <div className="flex-grow">
                                            <span className="font-semibold text-[#8c9097] dark:text-white/50 block mb-1">Total FaceToFace Appointments</span>
                                            <h5 className="font-semibold mb-1 text-[1.25rem]">1,453</h5>
                                            <p className="mb-0">
                                                <span className="badge bg-danger/10 text-warning">This Month</span>
                                            </p>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xxl:col-span-4 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <div className="box hrm-main-card primary">
                                <div className="box-body">
                                    <div className="flex items-start">
                                        <div className="me-4">
                                            <span className="avatar bg-primary !text-white">
                                                <i className="bx bx-receipt text-[1.125rem]"></i>
                                            </span>
                                        </div>
                                        <div className="flex-grow">
                                            <span className="font-semibold text-[#8c9097] dark:text-white/50 block mb-1">Total Second Openions</span>
                                            <h5 className="font-semibold mb-1 text-[1.25rem]">22,124</h5>
                                            <p className="mb-0">
                                                <span className="badge bg-primary/10 text-primary">This Month</span>
                                            </p>
                                        </div>
                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xxl:col-span-4 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <div className="box hrm-main-card secondary">
                                <div className="box-body">
                                    <div className="flex items-start">
                                        <div className="me-4">
                                            <span className="avatar bg-secondary !text-white">
                                                <i className="bi bi-cash-coin text-[1.125rem]"></i>
                                            </span>
                                        </div>
                                        <div className="flex-grow">
                                            <span className="font-semibold text-[#8c9097] dark:text-white/50 block mb-1">Total Discount Coupons</span>
                                            <h5 className="font-semibold mb-1 text-[1.25rem]">528</h5>
                                            <p className="mb-0">
                                                <span className="badge bg-secondary/10 text-secondary">This Month</span>
                                            </p>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xxl:col-span-4 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <div className="box  hrm-main-card secondary">
                                <div className="box-body">
                                    <div className="flex items-start">
                                        <div className="me-4">
                                            <span className="avatar bg-secondary !text-white">
                                                <i className="ri-service-line text-[1.125rem]"></i>
                                            </span>
                                        </div>
                                        <div className="flex-grow">
                                            <span className="font-semibold text-[#8c9097] dark:text-white/50 block mb-1">Allied Health Care Providers</span>
                                            <h5 className="font-semibold mb-1 text-[1.25rem]">8,289</h5>
                                            <p className="mb-0">
                                                <span className="badge bg-warning/10 text-secondary">This Month</span>
                                            </p>
                                        </div>
                                     
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xxl:col-span-4 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <div className="box hrm-main-card warning">
                                <div className="box-body">
                                    <div className="flex items-start">
                                        <div className="me-4">
                                            <span className="avatar bg-warning !text-white">
                                                <i className="bx bx-medal text-[1.125rem]"></i>
                                            </span>
                                        </div>
                                        <div className="flex-grow">
                                            <span className="font-semibold text-[#8c9097] dark:text-white/50 block mb-1">Total Number Specialty</span>
                                            <h5 className="font-semibold mb-1 text-[1.25rem]">1,453</h5>
                                            <p className="mb-0">
                                                <span className="badge bg-danger/10 text-warning">This Month</span>
                                            </p>
                                        </div>
                                      
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xxl:col-span-4 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                            <div className="box hrm-main-card danger">
                                <div className="box-body">
                                    <div className="flex items-start">
                                        <div className="me-4">
                                            <span className="avatar bg-danger !text-white">
                                                <i className="fe fe-alert-triangle text-[1.125rem]"></i>
                                            </span>
                                        </div>
                                        <div className="flex-grow">
                                            <span className="font-semibold text-[#8c9097] dark:text-white/50 block mb-1">Total Cancellation Request</span>
                                            <h5 className="font-semibold mb-1 text-[1.25rem]">1,453</h5>
                                            <p className="mb-0">
                                                <span className="badge bg-danger/10 text-danger">This Month</span>
                                            </p>
                                        </div>
                                      
                                    </div>
                                </div>
                            </div>
                        </div>
                      
                    </div>
                </div>
                
                  <div className="xl:col-span-12 col-span-12">
                                    <div className="box">
                                        <div className="box-header">
                                            <div className="box-title">
                                                Discover
                                            </div>
                                        </div>
                                        <div className="box-body">
                                            <div className="grid grid-cols-12 md:gap-y-0 gap-y-4">
                                                <div className="xxl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-2 col-span-4 text-center">
                                                    <Link aria-label="anchor" to="#" className="ti-btn ti-btn-info !border-0 !px-6 !py-4 leading-none rounded">
                                                        <i className="bi bi-cash-coin text-[1.375rem]"></i>
                                                    </Link>
                                                    <Link to="#" className="block pt-2 text-[#8c9097] dark:text-white/50 font-semibold">Bills</Link>
                                                </div>
                                                <div className="xxl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-2 col-span-4 text-center">
                                                    <Link aria-label="anchor" to="#" className="ti-btn ti-btn-primary !border-0 !px-6 !py-4 leading-none rounded">
                                                        <i className="bi bi-shop-window text-[1.375rem]"></i>
                                                    </Link>
                                                    <Link to="#" className="block pt-2 text-[#8c9097] dark:text-white/50 font-semibold">Shopping</Link>
                                                </div>
                                                <div className="xxl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-2 col-span-4 text-center">
                                                    <Link aria-label="anchor" to="#" className="ti-btn ti-btn-warning !border-0 !px-6 !py-4 leading-none rounded">
                                                        <i className="bi bi-compass text-[1.375rem]"></i>
                                                    </Link>
                                                    <Link to="#" className="block pt-2 text-[#8c9097] dark:text-white/50 font-semibold">Travel</Link>
                                                </div>
                                                <div className="xxl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-2 col-span-4 text-center">
                                                    <Link aria-label="anchor" to="#" className="ti-btn ti-btn-secondary !border-0 !px-6 !py-4 leading-none rounded">
                                                        <i className="bi bi-gift text-[1.375rem]"></i>
                                                    </Link>
                                                    <Link to="#" className="block pt-2 text-[#8c9097] dark:text-white/50 font-semibold">Food</Link>
                                                </div>
                                                <div className="xxl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-2 col-span-4 text-center">
                                                    <Link aria-label="anchor" to="#" className="ti-btn ti-btn-danger !border-0 !px-6 !py-4 leading-none rounded">
                                                        <i className="bi bi-currency-bitcoin text-[1.375rem]"></i>
                                                    </Link>
                                                    <Link to="#" className="block pt-2 text-[#8c9097] dark:text-white/50 font-semibold">Stocks</Link>
                                                </div>
                                                <div className="xxl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-2 col-span-4 text-center">
                                                    <Link aria-label="anchor" to="#" className="ti-btn ti-btn-light !border-0 !px-6 !py-4 leading-none rounded">
                                                        <i className="bi bi-three-dots text-[1.375rem]"></i>
                                                    </Link>
                                                    <Link to="#" className="block pt-2 text-[#8c9097] dark:text-white/50 font-semibold">Others</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                  </div>

            </div>
          
           
  </Fragment>
);}

export default Hrm;
