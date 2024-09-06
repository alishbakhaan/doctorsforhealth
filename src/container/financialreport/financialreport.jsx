import { Fragment, useState } from 'react';
import Pageheader from '../../components/common/pageheader/pageheader';
import Select from 'react-select';
import { Selectmaxoption, Selectoption1, Selectoption2, Selectoption3, Selectoption4, Selectoption5 } from './financialdata';
import DatePicker from 'react-datepicker';
import { BasicTable, ResponsiveDataTable } from '../tables/datatables/datatablesdata';



const FinancialReport = () => {
    const [selectedOptions, setSelectedOptions] = useState(null);

    const handleSelectChange = (selected) => {
        // Define your maximum selection limit (e.g., 2 in this example)
        const maxSelections = 3;

        if (selected && selected.length <= maxSelections) {
            setSelectedOptions(selected);
        }
    };

    const [singleSelectValue, setSingleSelectValue] = useState(null);
    const [multiSelectValue, setMultiSelectValue] = useState([]);
    const [isSelectDisabled, setSelectDisabled] = useState(false);

    const options = [
        { value: 's-1', label: 'Selection-1' },
        { value: 's-2', label: 'Selection-2' },
        { value: 's-3', label: 'Selection-3' },
        { value: 's-4', label: 'Selection-4' },
        { value: 's-5', label: 'Selection-5' },
    ];

    const handleSingleSelectChange = (selectedOption) => {
        setSingleSelectValue(selectedOption);
    };

    const handleMultiSelectChange = (selectedOptions) => {
        setMultiSelectValue(selectedOptions);
    };

    const disableSelect = () => {
        setSelectDisabled(true);
    };

    const enableSelect = () => {
        setSelectDisabled(false);
    };
    const [files, setFiles] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [startDate1, setStartDate1] = useState(new Date());

    const handleDateChange = (date) => {
        // Ensure date is defined before setting it
        if (date) {
            setStartDate(date);
        }
    };
    const handleDateChange1 = (date1) => {
        // Ensure date is defined before setting it
        if (date1) {
            setStartDate1(date1);
        }
    };

    return (
        <Fragment>
            <Pageheader currentpage="Financial Report" activepage="Forms" mainpage="Select2" />
            <div className="grid grid-cols-12 gap-x-2">

                <div className="xl:col-span-3 col-span-12">
                    <div className="box-body">
                        <Select name="state" options={Selectoption1} className="js-example-basic-single w-full" isSearchable
                            menuPlacement='auto' classNamePrefix="Select2" defaultValue={[Selectoption1[0]]}
                        />
                    </div>
                </div>

                <div className="xl:col-span-3 col-span-12">
                    <div className="box-body">
                        <Select name="state" options={Selectoption1} className="js-example-basic-single w-full" isSearchable
                            menuPlacement='auto' classNamePrefix="Select2" defaultValue={[Selectoption1[0]]}
                        />
                    </div>
                </div>

                <div className="xl:col-span-2 col-span-12">
                    <div className="box-body">
                        <Select name="state" options={Selectoption1} className="js-example-basic-single w-full" isSearchable
                            menuPlacement='auto' classNamePrefix="Select2" defaultValue={[Selectoption1[0]]}
                        />
                    </div>
                </div>


                <div className="xl:col-span-3 col-span-12">
                    <div className="box-body">
                        <div className="form-group">
                            <div className="input-group !flex-nowrap">
                                <div className="input-group-text text-muted"> <i className="ri-calendar-line"></i> </div>
                                <DatePicker selected={startDate}
                                    placeholderText='Choose date and time'
                                    onChange={handleDateChange}
                                    timeInputLabel="Time:"
                                    dateFormat="MM/dd/yyyy h:mm aa"
                                    showTimeInput
                                />
                            </div>
                        </div>
                    </div>
                </div>


                <div className="xl:col-span-1 col-span-12">
                    <div className="box-body">
                        <button className="ti-btn ti-btn-primary-full" type="submit">filter</button>
                    </div>
                </div>


            </div>

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
        </Fragment>
    );
}

export default FinancialReport;
