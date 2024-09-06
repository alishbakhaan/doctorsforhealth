import  { Fragment } from 'react';
import Pageheader from '../../components/common/pageheader/pageheader';
import { tablehead } from './tablesdata';

import {  tabledata21 } from '../../components/ui/data/tabledata';


const LabTest = () => {
  return(
  <Fragment>
                <Pageheader currentpage="Lab For Test" activepage="Tables" mainpage="Tables" />
            <div className="grid grid-cols-12 gap-6">
            <div className="xl:col-span-12 col-span-12">
                    <div title="Lab Test"  code={tabledata21} 
                            customcardclass="custom box">
                            <div className="table-responsive">
                                <table className="table whitespace-nowrap min-w-full">
                                    <thead className="bg-info/10">
                                        <tr className="border-b border-defaultborder">
                                            <th scope="col" className="text-start">User Name</th>
                                            <th scope="col" className="text-start">Transaction Id</th>
                                            <th scope="col" className="text-start">Created</th>
                                            <th scope="col" className="text-start">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {tablehead.map((idx) => (
                                            <tr key={Math.random()} className="border-b border-defaultborder">
                                                <th scope="row"  className="text-start">{idx.name}</th>
                                                <td>{idx.text}</td>
                                                <td>{idx.date}</td>
                                                <td>
                                                <button type="button" className={`ti-btn !py-1 !px-2 !text-[0.75rem] ti-btn-${idx.color}`}>{idx.btn}</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                </div>
            </div>
  </Fragment>
);
}
export default LabTest;
