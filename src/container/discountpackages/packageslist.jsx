import  {  Fragment, useState } from 'react';
import Pageheader from '../../components/common/pageheader/pageheader';
import { Link } from 'react-router-dom';
import { Historydata, TransactionsStatistics } from './packagelistdata';
import CountUp from 'react-countup';




const PackageList = () => {
    const [manageInvoiceData, setManageInvoiceData] = useState([...Historydata]);
    const handleDelete = (idToRemove) => {
        const updatedInvoiceData = manageInvoiceData.filter((item) => item.id !== idToRemove);
        setManageInvoiceData(updatedInvoiceData);
    };
  return(
  <Fragment>
     <Pageheader currentpage="" activepage="Crypto" mainpage="Transactions" />
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header justify-between">
                            <div className="box-title">
                                Package List
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <div>
                                    <input className="form-control form-control-sm" type="text" placeholder="Search Here" aria-label=".form-control-sm example" />
                                </div>
                                <div className="ti-dropdown hs-dropdown">
                                    <Link to="#" className="ti-btn ti-btn-primary-full !py-1 !px-2 !text-[0.75rem] waves-effect waves-light" aria-expanded="false">
                                        Sort By<i className="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
                                    </Link>
                                    <ul className="hs-dropdown-menu ti-dropdown-menu hidden" role="menu">
                                        <li><Link className="ti-dropdown-item" to="#">New</Link></li>
                                        <li><Link className="ti-dropdown-item" to="#">This Week</Link></li>
                                        <li><Link className="ti-dropdown-item" to="#">This Month</Link></li>
                                        <li><Link className="ti-dropdown-item" to="#">This Year</Link></li>
                                    </ul>
                                </div>
                                <div>
                                    <button type="button" className="ti-btn ti-btn-secondary-full !py-1 !px-2 !text-[0.75rem] btn-wave">View All</button>
                                </div>
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="table-responsive">
                                <table className="table whitespace-nowrap table-bordered min-w-full">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col" className="text-start">Sender</th>
                                            <th scope="col" className="text-start">Transaction Hash</th>
                                            <th scope="col" className="text-start">Coin</th>
                                            <th scope="col" className="text-start">Date</th>
                                            <th scope="col" className="text-start">Amount</th>
                                            <th scope="col" className="text-start">Receiver</th>
                                            <th scope="col" className="text-start">Status</th>
                                            <th scope="col" className="text-start">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {manageInvoiceData.map((idx) =>(
                                        <tr className="border border-defaultborder transaction" key={Math.random()}>
                                            <td>
                                                <span className="avatar avatar-sm avatar-rounded bg-light">
                                                    <i className={`ti ti-arrow-narrow-${idx.class} text-${idx.color1} font-semibold text-[1rem]`}></i>
                                                </span>
                                            </td>
                                            <td>
                                                <div className="flex items-center gap-2">
                                                    <span className="avatar avatar-xs avatar-rounded">
                                                        <img src={idx.src1} alt="" />
                                                    </span>
                                                    <div className="font-semibold">{idx.name}</div>
                                                </div>
                                            </td>
                                            <td>
                                                <span>#{idx.cell}</span>
                                            </td>
                                            <td>
                                                <div className="flex items-center gap-2">
                                                    <span className="avatar avatar-xs avatar-rounded">
                                                        <img src={idx.src2} alt="" />
                                                    </span>
                                                    <div className="font-semibold">{idx.coin}</div>
                                                </div>
                                            </td>
                                            <td>
                                                <span>{idx.date}</span>
                                            </td>
                                            <td>
                                                <span className={`text-${idx.color1}`}>{idx.amount}</span>
                                            </td>
                                            <td>
                                                <span>{idx.text1}</span>
                                            </td>
                                            <td>
                                                <span className={`badge bg-${idx.color2}/10 text-${idx.color2}`}>{idx.text2}</span>
                                            </td>
                                            <td>
                                                <div className='space-x-2 rtl:space-x-reverse'>
                                                    <div className="hs-tooltip ti-main-tooltip">
                                                        <button type="button" className="hs-tooltip-toggle ti-btn ti-btn-primary ti-btn-sm">
                                                            <span><i className="ri-download-2-line"></i></span>
                                                            <span
                                                                className="hs-tooltip-content  ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm "
                                                                role="tooltip">
                                                                Download
                                                            </span>
                                                        </button>
                                                    </div>
                                                    <div className="hs-tooltip ti-main-tooltip">
                                                        <button type="button" className="hs-tooltip-toggle ti-btn ti-btn-danger ms-1 ti-btn-sm transaction-delete-btn" onClick={() => handleDelete(idx.id)}>
                                                            <span><i className="ri-delete-bin-5-line"></i></span>
                                                            <span
                                                                className="hs-tooltip-content  ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm "
                                                                role="tooltip">
                                                                Delete
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="box-footer">
                            <nav aria-label="Page navigation">
                                <ul className="ti-pagination sm:ltr:float-right sm:rtl:float-left justify-center mb-4">
                                    <li className="page-item disabled"><Link className="page-link px-3 py-[0.375rem]" to="#">Previous</Link></li>
                                    <li className="page-item"><Link className="page-link px-3 py-[0.375rem] active" to="#">1</Link></li>
                                    <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">2</Link></li>
                                    <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">3</Link></li>
                                    <li className="page-item"><Link className="page-link px-3 py-[0.375rem]" to="#">Next</Link></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            
            </div>
  </Fragment>
);}

export default PackageList;
