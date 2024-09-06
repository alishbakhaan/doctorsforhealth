import  {  Fragment, useState } from 'react';
import Pageheader from '../../../components/common/pageheader/pageheader';
import { BasicTable, ResponsiveDataTable } from './datatablesdata';




const Datatables = () => {

  return(
  <Fragment>
      <>
      <Pageheader currentpage="Data Tables" activepage="Tables" mainpage="Data Tables" />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Basic DataTable</h5>
            </div>
            <div className="box-body">
              <div className="overflow-hidden">
                <BasicTable/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Responsive DataTable</h5>
            </div>
            <div className="box-body space-y-3">
              <div className="overflow-hidden">
                <div id="reactivity-table" className="ti-custom-table ti-striped-table ti-custom-table-hover">
                <ResponsiveDataTable/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  </Fragment>
);}

export default Datatables;
