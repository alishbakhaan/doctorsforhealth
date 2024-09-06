import  {  Fragment } from 'react';
import Pageheader from '../../../../components/common/pageheader/pageheader';
import EditorComponent from '../suneditordata';

import SunEditor from 'suneditor-react';


const Suneditors = () => {
  return(
  <Fragment>
                <Pageheader currentpage="Sun Editor" activepage="Form Editors" mainpage="Sun Editor" />
            <div className="grid grid-cols-12 gp-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Sun Editor
                            </div>
                        </div>
                        <div className="box-body">
                        <SunEditor />
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 gp-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                            Sun Editor With Image Upload
                            </div>
                        </div>
                        <div className="box-body">
                            <EditorComponent/>
                        </div>
                    </div>
                </div>
            </div>
  </Fragment>
);}

export default Suneditors;
