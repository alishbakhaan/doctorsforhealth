import  { Fragment } from 'react';
import Pageheader from '../../components/common/pageheader/pageheader';
import {tabledata6} from '../../components/ui/data/tabledata';


const LabStatus = () => {
  return(
  <Fragment>
                <Pageheader currentpage="Lab Order Status" activepage="Tables" mainpage="Tables" />
            <div className="grid grid-cols-12 gap-6">
            <div className="xl:col-span-12 col-span-12">
                    <div title="Lab Status" customCardClass="custom box" code={tabledata6}>
                            <div className="table-responsive">
                                <table className="table whitespace-nowrap table-borderless min-w-full">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text-start">User Name</th>
                                            <th scope="col" className="text-start">Transaction Id</th>
                                            <th scope="col" className="text-start">Created</th>
                                            <th scope="col" className="text-start">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row" className="text-start">Harshrath</th>
                                            <td>#5182-3467</td>
                                            <td>24 May 2022</td>
                                            <td><span className="badge bg-primary text-white">Fixed</span></td>
                                        </tr>
                                        <tr>
                                            <th scope="row" className="text-start">Zozo Hadid</th>
                                            <td>#5182-3412</td>
                                            <td>02 July 2022</td>
                                            <td><span className="badge bg-warning  text-white">In Progress</span></td>
                                        </tr>
                                        <tr>
                                            <th scope="row" className="text-start">Martiana</th>
                                            <td>#5182-3423</td>
                                            <td>15 April 2022</td>
                                            <td><span className="badge bg-success  text-white">Completed</span></td>
                                        </tr>
                                        <tr>
                                            <th scope="row" className="text-start">Alex Carey</th>
                                            <td>#5182-3456</td>
                                            <td>17 March 2022</td>
                                            <td><span className="badge bg-danger  text-white">Pending</span></td>
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
export default LabStatus;
