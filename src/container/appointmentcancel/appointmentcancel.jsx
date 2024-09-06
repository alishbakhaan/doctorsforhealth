import  {  Fragment } from 'react';
import Pageheader from '../../components/common/pageheader/pageheader';
import { Grid } from 'gridjs-react';
import {Data1} from './gridjsdata';

const AppointmentCancel = () =>{
  return (
  <Fragment>
      <>
            <Pageheader currentpage="" activepage="Tables" mainpage="Grid Js" />
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">
                                Appointment Cancel Request
                            </div>
                        </div>
                        <div className="box-body">
                            <div id="grid-loading">
                                <div className='table-responsive'>
                            <Grid
                                    data={Data1}
                                    sort={true}
                                    search={true}
                                    columns={['Date', 'Name', 'EMail', 'Id', 'Price', 'Quantity', 'Total']} pagination={{
                                        limit: 5,
                                    }}
                                    loading={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
  </Fragment>
);}

export default AppointmentCancel;
