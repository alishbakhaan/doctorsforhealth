import  { Fragment } from 'react';
import Pageheader from '../../components/common/pageheader/pageheader';
import { Link } from 'react-router-dom';
import {tabledata28} from '../../components/ui/data/tabledata';


const PharmacyOrder = () => {
  return(
  <Fragment>
                <Pageheader currentpage="Pharmacy Order" activepage="Tables" mainpage="Tables" />
                <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-12 col-span-12">
                    <div title="" code={tabledata28} customCardClass="custom box">
                            <div className="table-responsive">
                                <table className="table whitespace-nowrap table-sm min-w-full">
                                    <thead>
                                        <tr className="border-b border-defaultborder">
                                            <th scope="col" className="text-start">Invoice</th>
                                            <th scope="col" className="text-start">Created Date</th>
                                            <th scope="col" className="text-start">Status</th>
                                            <th scope="col" className="text-start">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-defaultborder">
                                            <th scope="row" className="text-start">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" defaultValue="" id="checkebox-sm" defaultChecked />
                                                    <label className="form-check-label" htmlFor="checkebox-sm">
                                                        Zelensky
                                                    </label>
                                                </div>
                                            </th>
                                            <td>25-Apr-2021</td>
                                            <td><span className="badge bg-success/10 text-succes">Paid</span></td>
                                            <td>
                                                <div className="hstack flex gap-3 text-[.9375rem]">
                                                    <Link aria-label="anchor" to="#" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light"><i className="ri-download-2-line"></i></Link>
                                                    <Link aria-label="anchor" to="#" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light"><i className="ri-edit-line"></i></Link>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-defaultborder">
                                            <th scope="row" className="text-start">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" defaultValue="" id="checkebox-sm1" />
                                                    <label className="form-check-label" htmlFor="checkebox-sm1">
                                                        Kim Jong
                                                    </label>
                                                </div>
                                            </th>
                                            <td>29-April-2022</td>
                                            <td><span className="badge bg-danger/10 text-danger">Pending</span></td>
                                            <td>
                                                <div className="hstack flex gap-3 text-[.9375rem]">
                                                    <Link aria-label="anchor" to="#" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light"><i className="ri-download-2-line"></i></Link>
                                                    <Link aria-label="anchor" to="#" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light"><i className="ri-edit-line"></i></Link>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-defaultborder">
                                            <th scope="row" className="text-start">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" defaultValue="" id="checkebox-sm2" />
                                                    <label className="form-check-label" htmlFor="checkebox-sm2">
                                                        Obana
                                                    </label>
                                                </div>
                                            </th>
                                            <td>30-Nov-2022</td>
                                            <td><span className="badge bg-success/10 text-success">Paid</span></td>
                                            <td>
                                                <div className="hstack flex gap-3 text-[.9375rem]">
                                                    <Link aria-label="anchor" to="#" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light"><i className="ri-download-2-line"></i></Link>
                                                    <Link aria-label="anchor" to="#" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light"><i className="ri-edit-line"></i></Link>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-defaultborder">
                                            <th scope="row" className="text-start">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" defaultValue="" id="checkebox-sm3" />
                                                    <label className="form-check-label" htmlFor="checkebox-sm3">
                                                        Sean Paul
                                                    </label>
                                                </div>
                                            </th>
                                            <td>01-Jan-2022</td>
                                            <td><span className="badge bg-success/10 text-success">Paid</span></td>
                                            <td>
                                                <div className="hstack flex gap-3 text-[.9375rem]">
                                                    <Link aria-label="anchor" to="#" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light"><i className="ri-download-2-line"></i></Link>
                                                    <Link aria-label="anchor" to="#" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light"><i className="ri-edit-line"></i></Link>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-defaultborder">
                                            <th scope="row" className="text-start">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" defaultValue="" id="checkebox-sm4" />
                                                    <label className="form-check-label" htmlFor="checkebox-sm4">
                                                        Karizma
                                                    </label>
                                                </div>
                                            </th>
                                            <td>14-Feb-2022</td>
                                            <td><span className="badge bg-danger/10 text-danger">Pending</span></td>
                                            <td>
                                                <div className="hstack flex gap-3 text-[.9375rem]">
                                                    <Link aria-label="anchor" to="#" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light"><i className="ri-download-2-line"></i></Link>
                                                    <Link aria-label="anchor" to="#" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light"><i className="ri-edit-line"></i></Link>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                </div>
               
            </div>
  </Fragment>
);
}
export default PharmacyOrder;
