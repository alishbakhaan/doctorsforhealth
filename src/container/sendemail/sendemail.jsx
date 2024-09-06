import { Fragment } from 'react';
import Pageheader from '../../components/common/pageheader/pageheader';
import Showcode from '../../components/ui/showcode/showcode';
import { layout1, layout10, layout11, layout2, layout3, layout4, layout5, layout6, layout7, layout8, layout9 } from '../../components/ui/data/formsdata';
import { Multipleselectdata, Multipleselectdata1, Optionwithnosearch, SingleGroup, basicselect, defaultselect, multiDropdownSelect, singleselect } from '../forms/formelements/formselect/formselectdata';
import Select from 'react-select';

const SendEmail = () => {
    return (
        <Fragment>
            <>
                <Pageheader currentpage="Cashback Offer" activepage="Tables" mainpage="Grid Js" />
                <div className="box">
                    < div className="box-body">
                        <div className="grid grid-cols-12 gap-6">

                            <div className="xl:col-span-8 col-span-12">
                                <div title="Vertical Forms" code={layout1}>
                                    <div className="mb-4">
                                        <label htmlFor="form-text" className="form-label !text-[.875rem] text-black">Enter name</label>
                                        <input type="text" className="form-control" id="form-text" placeholder="" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="form-password" className="form-label text-[.875rem] text-black">Enter
                                            message</label>
                                        <input type="password" className="form-control" id="form-password" placeholder="" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-12 md:col-span-6 xl:!col-span-4">
                                <label htmlFor="hs-select-label" className="ti-form-select rounded-sm !py-2 ">Label</label>
                                <Select classNamePrefix='react-select' id='react-select-3-live-region' options={defaultselect} placeholder='Open this select menu' />

                                <label htmlFor="hs-select-label" className="ti-form-select rounded-sm !py-2 ">Label</label>
                                <Select classNamePrefix='react-select' id='react-select-3-live-region' options={defaultselect} placeholder='Open this select menu' />

                                <div className="xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                              
                                <input type="button" className="form-control ti-btn !text-white !bg-primary" id="input-button" defaultValue="Button" />
                            </div>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        </Fragment>
    );
}

export default SendEmail;


