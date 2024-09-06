import  {  Fragment } from 'react';
import Pageheader from '../../components/common/pageheader/pageheader';
import Showcode from '../../components/ui/showcode/showcode';
import { layout1, layout10, layout11, layout2, layout3, layout4, layout5, layout6, layout7, layout8, layout9 } from '../../components/ui/data/formsdata';
const CashbackOffer = () =>{
  return (
  <Fragment>
      <>
            <Pageheader currentpage="Send Email" activepage="Tables" mainpage="Grid Js" />
            <div className="grid grid-cols-12 gap-6">
            <div className="xl:col-span-6 col-span-12">
                    <div title="Vertical Forms" code={layout1}>
                        <div className="mb-4">
                            <label htmlFor="form-text" className="form-label !text-[.875rem] text-black">Enter name</label>
                            <input type="text" className="form-control" id="form-text" placeholder="" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="form-password" className="form-label text-[.875rem] text-black">Enter
                                Password</label>
                            <input type="password" className="form-control" id="form-password" placeholder="" />
                        </div>
                        <div className="form-check mb-4">
                            <input className="form-check-input" type="checkbox" defaultValue="" id="invalidCheck"
                                required />
                            <label className="form-check-label" htmlFor="invalidCheck">
                                Accept Policy
                            </label>
                        </div>
                        <button className="ti-btn ti-btn-primary-full" type="submit">Submit</button>
                    </div>
            </div>
            </div>
            </>
  </Fragment>
);}

export default CashbackOffer;


