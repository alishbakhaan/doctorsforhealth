import { Fragment, useState } from 'react';
import Pageheader from '../../components/common/pageheader/pageheader';
import { BasicTable, ResponsiveDataTable } from '../tables/datatables/datatablesdata';
import { layout1, layout10, layout11, layout2, layout3, layout4, layout5, layout6, layout7, layout8, layout9 } from '../../components/ui/data/formsdata';

const Language = () => {


    return (
        <Fragment>
            <Pageheader currentpage="Add Language" activepage="Forms" mainpage="Select2" />
            <div className="grid grid-cols-12 gap-x-2">

            <div className="xl:col-span-6 col-span-12">
                    <div title="Vertical Forms" code={layout1}>
                        <div className="mb-4">
                            <label htmlFor="form-text" className="form-label !text-[.875rem] text-black">Enter name</label>
                            <input type="text" className="form-control" id="form-text" placeholder="" />
                        </div>
                        <button className="ti-btn ti-btn-primary-full" type="submit">Submit</button>
                    </div>
                </div>


            </div>

            <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Language List</h5>
            </div>
            <div className="box-body">
              <div className="overflow-hidden">
                <BasicTable/>
              </div>
            </div>
          </div>
        </div>
        </Fragment>
    );
}

export default Language;
