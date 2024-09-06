import { Fragment, useState } from 'react';
import Pageheader from '../../components/common/pageheader/pageheader';
import { layout1 } from '../../components/ui/data/formsdata';
import { registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation);
import { tabledata2 } from '../../components/ui/data/tabledata';
import { Table1data } from './tablesdata';
import { Link } from 'react-router-dom';

const Speciality = () => {


  return (
    <Fragment>
      <Pageheader currentpage="Add Speciality" activepage="Forms" mainpage="Select2" />
      <div className="grid grid-cols-12 gap-x-2">

        <div className="xl:col-span-6 col-span-12">
          <div title="Vertical Forms" code={layout1}>
            <div className="mb-4">
              <label htmlFor="form-text" className="form-label !text-[.875rem] text-black">Enter name</label>
              <input type="text" className="form-control" id="form-text" placeholder="" />
            </div>

            <div className="col-span-12 lg:col-span-6 ">

              <label htmlFor="form-text" className="form-label !text-[.875rem] text-black">Enter name</label>
              <div className="box">
                <label htmlFor="file-input" className="sr-only">Choose file</label>
                <input type="file" name="file-input" id="file-input" className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/50
                                       file:border-0
                                      file:bg-light file:me-4
                                      file:py-3 file:px-4
                                      dark:file:bg-black/20 dark:file:text-white/50"/>
              </div>

            </div>

            <button className="ti-btn ti-btn-primary-full" type="submit">Submit</button>
          </div>



        </div>

      </div>

      <div className="xl:col-span-6 col-span-12">
        <div title="Bordered Tables" code={tabledata2} customCardClass="custom box">
          <div className="table-responsive">
            <table className="table whitespace-nowrap table-bordered min-w-full">
              <thead>
                <tr className="border-b border-defaultborder">

                  <th scope="col" className="text-start">Email</th>
                  <th scope="col" className="text-start">Action</th>
                </tr>
              </thead>
              <tbody>
                {Table1data.map((idx) => (
                  <tr className="border-b border-defaultborder" key={Math.random()}>


                    <td>{idx.mail}</td>
                    <td>
                      <div className="hstack gap-2 flex-wrap">
                        <Link aria-label="anchor" to="#" className="text-info text-[.875rem] leading-none"><i
                          className="ri-edit-line"></i></Link>
                        <Link aria-label="anchor" to="#" className="text-danger text-[.875rem] leading-none ms-1"><i
                          className="ri-delete-bin-5-line"></i></Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Speciality;
