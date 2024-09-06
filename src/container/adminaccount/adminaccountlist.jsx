import  {  Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Billssummary } from '../controlpanel/hrmdata';

const AdminAccountlist = () => {
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
<div className="grid grid-cols-12 gap-x-6">
<div className="xl:col-span-12 col-span-12">
    <div className="box">
        <div className="box-header justify-between flex-wrap">
            <div className="box-title">
            Admin Account List
            </div>
            <div className="flex flex-wrap gap-2">
                <div className="me-3">
                    <input className="ti-form-control form-control-sm"
                     type="text" placeholder="Search Here" aria-label=".form-control-sm example"
                     onChange={(ele) => { myfunction(ele.target.value); }} />
                </div>
                <div className="hs-dropdown ti-dropdown">
                    <Link to="#"
                        className="ti-btn ti-btn-primary !bg-primary !text-white !py-1 !px-2 !text-[0.75rem] !m-0 !gap-0 !font-medium"
                        aria-expanded="false">
                        Sort By<i className="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
                    </Link>
                    <ul className="hs-dropdown-menu ti-dropdown-menu hidden" role="menu">
                        <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                            to="#">New</Link></li>
                        <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                            to="#">Popular</Link></li>
                        <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                            to="#">Relevant</Link></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="box-body">
            <div className="table-responsive">
                <table className="table table-hover whitespace-nowrap table-bordered min-w-full">
                    <thead>
                        <tr>
                            <th scope="col" className="text-start">S.No</th>
                            <th scope="col" className="text-start">Invoice ID</th>
                            <th scope="col" className="text-start">Client</th>
                            <th scope="col" className="text-start">Due Date</th>
                            <th scope="col" className="text-start">Status</th>
                            <th scope="col" className="text-start">Amount</th>
                            <th scope="col" className="text-start">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Data.map((idx)=>(
                        <tr className="border border-inherit border-solid hover:bg-gray-100 dark:border-defaultborder/10 dark:hover:bg-light" key={Math.random()}>
                            <td>{idx.id}</td>
                            <td>{idx.invoiceid}</td>
                            <td>
                                <div className="flex items-center leading-none">
                                    <div className="me-2">
                                        <span className="avatar avatar-md avatar-rounded">
                                            <img src={idx.src} alt="" />
                                        </span>
                                    </div>
                                    <div>
                                        <span className="block font-semibold mb-1">{idx.name}</span>
                                        <span className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">{idx.mail}</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {idx.duedate}
                            </td>
                            <td>
                                <span className={`badge bg-${idx.color} text-white`}>{idx.status}</span>
                            </td>
                            <td>
                                {idx.amount}
                            </td>
                            <td>
                                <div className="flex flex-row items-center !gap-2 text-[0.9375rem]">
                                    <Link aria-label="anchor" to="#"
                                        className="ti-btn ti-btn-icon ti-btn-wave !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-info/10 text-info hover:bg-info hover:text-white hover:border-info"><i
                                            className="ri-pencil-line"></i></Link>
                                    <Link aria-label="anchor" to="#"
                                        className="ti-btn ti-btn-icon ti-btn-wave !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-danger/10 text-danger hover:bg-danger hover:text-white hover:border-danger"><i
                                            className="ri-delete-bin-line"></i></Link>
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
                    Showing 5 Entries <i className="bi bi-arrow-right ms-2 font-semibold"></i>
                </div>
                <div className="ms-auto">
                    <nav aria-label="Page navigation" className="pagination-style-4">
                        <ul className="ti-pagination mb-0">
                            <li className="page-item disabled">
                                <Link className="page-link" to="#">
                                    Prev
                                </Link>
                            </li>
                            <li className="page-item"><Link className="page-link active" to="#">1</Link></li>
                            <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                            <li className="page-item">
                                <Link className="page-link !text-primary" to="#">
                                    next
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
  </Fragment>
);}

export default AdminAccountlist;