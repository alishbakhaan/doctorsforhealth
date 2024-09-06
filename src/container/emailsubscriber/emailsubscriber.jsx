import { Fragment, useState } from 'react';
import Pageheader from '../../components/common/pageheader/pageheader';
import { BasicTable, ResponsiveDataTable } from '../tables/datatables/datatablesdata';
import { layout1, layout10, layout11, layout2, layout3, layout4, layout5, layout6, layout7, layout8, layout9 } from '../../components/ui/data/formsdata';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation);
import { Uploader } from 'uploader';
import { UploadButton } from 'react-uploader';

const EmailSubscriber = () => {


  return (
    <Fragment>
      <Pageheader currentpage="Email Subscriber" activepage="Forms" mainpage="Select2" />


      <div className="col-span-12">
        <div className="box">
          <div className="box-header">
            <h5 className="box-title">Email Subscriber</h5>
          </div>
          <div className="box-body">
            <div className="overflow-hidden">
              <BasicTable />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default EmailSubscriber;
