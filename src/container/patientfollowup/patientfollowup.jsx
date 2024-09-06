import  {  Fragment } from 'react';
import Pageheader from '../../components/common/pageheader/pageheader';
import { Grid } from 'gridjs-react';
import { Data } from '../tables/gridjstables/gridjsdata';

const PatientFollowup = () => {
  return (
    <Fragment>
    <>
          <Pageheader currentpage="" activepage="Tables" mainpage="Grid Js" />
          <div className="grid grid-cols-12 gap-6">
              <div className="xl:col-span-12 col-span-12">
                  <div className="box custom-box">
                      <div className="box-header">
                          <div className="box-title">
                          Patient FollowUp
                          </div>
                      </div>
                      <div className="box-body">
                          <div id="grid-search">
                              <div className='table-responsive'>

                          <Grid
                                  data={Data}
                                  search={true}
                                  columns={['Date', 'Name', 'EMail', 'Id', 'Price', 'Quantity', 'Total']} pagination={{
                                      limit: 5,
                                  }} />
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          </>
          </Fragment>
  )
}

export default PatientFollowup