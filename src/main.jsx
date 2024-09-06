import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Hrm from './container/controlpanel/controlpanel.jsx'

import Kanbanboard from './container/task/kanbanboard/kanbanboard.jsx'
import Taskdetails from './container/task/taskdetails/taskdetails.jsx'
import Inputs from './container/forms/formelements/inputs/inputs.jsx'
import Checkradios from './container/forms/formelements/checkradios/checkradios.jsx'
import Inputgroup from './container/forms/formelements/inputgroup/inputgroup.jsx'
import Formselect from './container/forms/formelements/formselect/formselect.jsx'
import Rangesliders from './container/forms/formelements/rangeslider/rangeslider.jsx'
// import Rangeslider from './container/forms/formelements/rangeslider/rangeslider.jsx'
import Fileuploads from './container/forms/formelements/fileuploads/fileuploads.jsx'
import Datetimepicker from './container/forms/formelements/datetimepicker/datetimepicker.jsx'
import Colorpicker from './container/forms/formelements/colorpicker/colorpicker.jsx'
import Formlayouts from './container/forms/formlayouts/formlayouts.jsx'
import Select2 from './container/forms/select2/select2.jsx'
import Validation from './container/forms/validation/validation.jsx'
import Fullacalendar from './container/apps/fullacalendar/fullacalendar.jsx'
import Gallery from './container/apps/gallery/gallery.jsx'
import Projectlist from './container/apps/projects/projectlist/projectlist.jsx'
import Projectoverview from './container/apps/projects/projectoverview/projectoverview.jsx'
import Createproject from './container/apps/projects/createproject/createproject.jsx'
import Jobdetails from './container/apps/jobs/jobdetails/jobdetails.jsx'
import Searchcompany from './container/apps/jobs/searchcompany/searchcompany.jsx'
import Searchjobs from './container/apps/jobs/searchjobs/searchjobs.jsx'
import Jobpost from './container/apps/jobs/jobpost/jobpost.jsx'
import Joblist from './container/apps/jobs/joblist/joblist.jsx'
import Searchcandidate from './container/apps/jobs/searchcandidate/searchcandidate.jsx'
import Candidatedetails from './container/apps/jobs/candidatedetails/candidatedetails.jsx'
import Marketplace from './container/apps/nft/marketplace/marketplace.jsx'
import Nftdetails from './container/apps/nft/nftdetails/nftdetails.jsx'
import Createnft from './container/apps/nft/createnft/createnft.jsx'
import Walletintegration from './container/apps/nft/walletintegration/walletintegration.jsx'
import Liveauction from './container/apps/nft/liveauction/liveauction.jsx'
import Contactscrm from './container/apps/crm/contactscrm/contactscrm.jsx'
import Companies from './container/apps/crm/companies/companies.jsx'
import Deals from './container/apps/crm/deals/deals.jsx'
import Leads from './container/apps/crm/leads/leads.jsx'
import Transactions from './container/apps/crypto/transactions/transactions.jsx'
import Currencyexchange from './container/apps/crypto/currencyexchange/currencyexchange.jsx'
import Buysell from './container/apps/crypto/buysell/buysell.jsx'
import Marketcap from './container/apps/crypto/marketcap/marketcap.jsx'
import Wallet from './container/apps/crypto/wallet/wallet.jsx'
import Tables from './container/tables/tables/tables.jsx'
import Gridjstables from './container/tables/gridjstables/gridjstables.jsx'
import Datatables from './container/tables/datatables/datatables.jsx'
import Icons from './container/icons/icons.jsx'
import './index.scss'
import Comingsoon from './container/authentication/comingsoon/comingsoon.jsx'
import Landing from './container/landing/landing.jsx'
import Jobslanding from './container/jobslanding/jobslanding.jsx'
import Undermaintanace from './container/authentication/undermaintanace/undermaintanace.jsx'
import Lockbasic from './container/authentication/lockscreen/lockbasic/lockbasic.jsx'
import Lockcover from './container/authentication/lockscreen/lockcover/lockcover.jsx'
import Resetbasic from './container/authentication/resetpassword/resetbasic/resetbasic.jsx'
import Resetcover from './container/authentication/resetpassword/resetcover/resetcover.jsx'
import Signupbasic from './container/authentication/signup/signupbasic/signupbasic.jsx'
import Signupcover from './container/authentication/signup/signupcover/signupcover.jsx'
import Signinbasic from './container/authentication/signin/signinbasic/signinbasic.jsx'
import Signincover from './container/authentication/signin/signincover/signincover.jsx'
import Twostepbasic from './container/authentication/twostepverification/twostepbasic/twostepbasic.jsx'
import Twostepcover from './container/authentication/twostepverification/twostepcover/twostepcover.jsx'
import Createbasic from './container/authentication/createpassword/basic/basic.jsx'
import Createcover from './container/authentication/createpassword/cover/cover.jsx'
import Authenticationlayout from './pages/authenticationlayout.jsx'
import Error401 from './container/error/401error/401error.jsx'
import Error404 from './container/error/404error/404error.jsx'
import Error500 from './container/error/500error/500error.jsx'
import Landinglayout from './pages/landinglayout.jsx'

import Auth from './firebase/auth.jsx'
import Login from './firebase/login.jsx'
import Signup from './firebase/signup.jsx'
import ScrollToTop from './components/ui/scrolltotop.jsx'
import Suneditors from './container/forms/formeditors/suneditors/suneditors.jsx'
import AdminAccountlist from './container/adminaccount/adminaccountlist.jsx'
import PatientDetails from './container/registeruser/patientdetails.jsx'
import PatientFollowup from './container/patientfollowup/patientfollowup.jsx'
import DoctorDetails from './container/registeruser/doctordetails.jsx'
import LabTest from './container/labtest/labtest.jsx'
import LabStatus from './container/labstatus/labstatus.jsx'
import PharmacyOrder from './container/pharmacyorder/pharmacyorder.jsx'
import PharmacyOrderStatus from './container/pharmacyorderstatus/pharmacyorderstatus.jsx'
import AppointmentList from './container/appointmentlist/appointmentlist.jsx'
import Appointment from './container/FacetoFaceAppointment/Appointment.jsx'
import AppointmentCancel from './container/appointmentcancel/appointmentcancel.jsx'
import Reviews from './container/reviews/reviews.jsx'
import Profile from './container/profile/profile.jsx'
import ListHealthCareRoles from './container/healthcareroles/listhealthcareroles.jsx'
import AddHealthCareRoles from './container/healthcareroles/addhealthcareroles.jsx'
import HealthCareMember from './container/healthcaremember/healthcaremember.jsx'
import SecondOpnionForm from './container/opinionform/opinionform.jsx'
import AddPackages from './container/discountpackages/addpackages.jsx'
import PackageList from './container/discountpackages/packageslist.jsx'
import CashbackOffer from './container/cashbackoffer/cashbackoffer.jsx'
import FinancialReport from './container/financialreport/financialreport.jsx'
import  Language  from './container/language/language.jsx'
import SendEmail from './container/sendemail/sendemail.jsx'
import Speciality from './container/speciality/speciality.jsx'
import EmailSubscriber from './container/emailsubscriber/emailsubscriber.jsx'
import GroupList from './container/group/grouplist.jsx'
import GroupForm from './container/group/groupform.jsx'
import AddMember from './container/member/memberform.jsx'
import ViewMember from './container/member/memberlist.jsx'
import ForgotPassword from './firebase/forgotpassword.jsx'
import ResetPassword from './firebase/resetpassword.jsx'
import GroupPermission from './container/group/grouppermission.jsx'
import RegisterUser from './container/registeruser/registeruser.jsx'
import TermsCondition from './container/terms&condition/termscondition.jsx'
import HospitalDetails from './container/healthcareprovider/hospitaldetails.jsx'
import PharmacyDetails from './container/healthcareprovider/pharmacydetails.jsx'
import ClinicDetails from './container/healthcareprovider/clinicdetails.jsx'
import DiagnosticDetails from './container/healthcareprovider/diagnosticdetails.jsx'
import StemTherapyDetails from './container/healthcareprovider/stemcelltherapy.jsx'
import Allied from './container/healthcareprovider/allied.jsx'
import PatientForm from './container/registeruser/patientform.jsx'
import DoctorForm from './container/registeruser/doctorform.jsx'
import HospitalForm from './container/healthcareprovider/hospitalform.jsx'
import PatientProfile from './container/registeruser/patientprofile.jsx'
import DoctorProfile from './container/registeruser/doctorprofile.jsx'
// import DoctorForm from './container/registeruser/doctorform.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <BrowserRouter>
      <React.Suspense>
        <ScrollToTop/>
        <Routes>
          <Route path='' element={<Auth />}>
            <Route index element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} /> 
            <Route path='/forgotpassword' element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Route>
          
          <Route path='' element={<App />}>
       
            <Route path='/controlpanel' element={<Hrm />} />
            <Route path='/adminaccount' element={<AdminAccountlist />} />
            <Route path='/reviews' element={<Reviews />} />
            <Route path='/profile' element={<Profile />} />
            {/* update form */}
            <Route path='/patientform/:patientId' element={<PatientForm />} />
            <Route path='/patientprofile/:patientId' element={<PatientProfile />} />
            <Route path='/doctorform/:patientId' element={<DoctorForm/>} />
            <Route path='/doctorprofile/:doctorId' element={<DoctorProfile/>} />
            <Route path='/hospitalform/:hospitalId' element={<HospitalForm/>} />

            <Route path='kanbanboard' element={<Kanbanboard />} />
            <Route path='appointmentlist' element={<AppointmentList />} />
            <Route path='appointment' element={<Appointment />} />
            <Route path='appointmentcancel' element={<AppointmentCancel />} />
            <Route path='taskdetails' element={<Taskdetails />} />
            <Route path='/grouppermission' element={<GroupPermission />} />
            <Route path='/grouplist' element={<GroupList />} />
            <Route path='/groupform' element={<GroupForm />} />
            <Route path="/groupform/:groupId" element={<GroupForm />} />
            <Route path="/memberform/:id" element={<AddMember />} />
            <Route path='/memberform' element={<AddMember />} />
            <Route path='/memberlist' element={<ViewMember />} />
            <Route path='/registeruser' element={<RegisterUser />} />
            <Route path='/doctordetails' element={<DoctorDetails />} />
            <Route path='/patientdetails' element={<PatientDetails />} />
            <Route path='/pharmacydetails' element={<PharmacyDetails />} />
            <Route path='/clinicdetails' element={<ClinicDetails />} />
            <Route path='/hospitaldetails' element={<HospitalDetails />} />
            <Route path='/diagnosticdetails' element={<DiagnosticDetails />} />
            <Route path='/stemcelltherapydetails' element={<StemTherapyDetails />} />
            <Route path='/allied' element={<Allied />} />
           <Route path='/termscondition' element={<TermsCondition />} />
            <Route path='/listhealthcareroles' element={<ListHealthCareRoles />} />
            <Route path='/addhealthcareroles' element={<AddHealthCareRoles />} />
            <Route path='/healthcaremember' element={<HealthCareMember />} />
            <Route path='/secondopnionform' element={<SecondOpnionForm />} />
            <Route path='/addpackages' element={<AddPackages />} />
            <Route path='/packagelist' element={<PackageList />} />
            <Route path='/cashback' element={<CashbackOffer />} />
            <Route path='/financialreport' element={<FinancialReport />} />
            <Route path='/language' element={<Language />} />
            <Route path='/email' element={<SendEmail />} />
            <Route path='/speciality' element={<Speciality />} />
            <Route path='/emailsubscriber' element={<EmailSubscriber />} />

            <Route path='inputs' element={<Inputs />} />
            <Route path='checksradios' element={<Checkradios />} />
            <Route path='inputgroup' element={<Inputgroup />} />
            <Route path='formselect' element={<Formselect />} />
            <Route path='rangeslider' element={<Rangesliders />} />
            <Route path='fileuploads' element={<Fileuploads />} />
            <Route path='datetimepicker' element={<Datetimepicker />} />
            <Route path='colorpickers' element={<Colorpicker />} />

            <Route path='formlayouts' element={<Formlayouts />} />
            <Route path='validation' element={<Validation />} />
            <Route path='select2' element={<Select2 />} />

            <Route path='formeditor/suneditors' element={<Suneditors/>} />

           

            <Route path='fullcalendar' element={<Fullacalendar />} />
            <Route path='gallery' element={<Gallery />} />

            <Route path='projects/projectslist' element={<Projectlist />} />
            <Route path='projects/projectoverview' element={<Projectoverview />} />
            <Route path='projects/createproject' element={<Createproject />} />

            <Route path='jobs/jobdetails' element={<Jobdetails />} />
            <Route path='jobs/searchcompany' element={<Searchcompany />} />
            <Route path='jobs/searchjobs' element={<Searchjobs />} />
            <Route path='jobs/jobpost' element={<Jobpost />} />
            <Route path='jobs/jobslist' element={<Joblist />} />
            <Route path='jobs/searchcandidate' element={<Searchcandidate />} />
            <Route path='jobs/candidatedetails' element={<Candidatedetails />} />

            <Route path='nft/marketplace' element={<Marketplace />} />
            <Route path='nft/nftdetails' element={<Nftdetails />} />
            <Route path='nft/createnft' element={<Createnft />} />
            <Route path='nft/walletintegration' element={<Walletintegration />} />
            <Route path='nft/liveauction' element={<Liveauction />} />

            <Route path='crm/crmcontacts' element={<Contactscrm />} />
            <Route path='crm/companies' element={<Companies />} />
            <Route path='crm/deals' element={<Deals />} />
            <Route path='crm/leads' element={<Leads />} />

            <Route path='crypto/transactions' element={<Transactions />} />
            <Route path='crypto/currencyexchange' element={<Currencyexchange />} />
            <Route path='crypto/buysell' element={<Buysell />} />
            <Route path='crypto/marketcap' element={<Marketcap />} />
            <Route path='crypto/wallet' element={<Wallet />} />

            <Route path='tables' element={<Tables />} />
            <Route path='doctordetails' element={<DoctorDetails />} />
            <Route path='labtest' element={<LabTest />} />
            <Route path='labstatus' element={<LabStatus />} />
            <Route path='pharmacyorder' element={<PharmacyOrder />} />
            <Route path='pharmacyorderstatus' element={<PharmacyOrderStatus />} />
            <Route path='patientdetails' element={<PatientDetails />} />
            <Route path='patientfollowup' element={<PatientFollowup />} />
            <Route path='gridjstables' element={<Gridjstables />} />
            <Route path='datatables' element={<Datatables />} />


            <Route path='/icons' element={<Icons />} />

          </Route>
          <Route path='' element={<Authenticationlayout />}>
            <Route path='comingsoon' element={<Comingsoon />} />
            <Route path='createpassword/basic' element={<Createbasic />} />
            <Route path='createpassword/cover' element={<Createcover />} />

            <Route path='lockbasic/lockbasic' element={<Lockbasic />} />
            <Route path='lockcover/lockcover' element={<Lockcover />} />

            <Route path='resetpassword/resetbasic' element={<Resetbasic />} />
            <Route path='resetpassword/resetcover' element={<Resetcover />} />

            <Route path='signup/signupbasic' element={<Signupbasic />} />
            <Route path='signup/signupcover' element={<Signupcover />} />

            <Route path='signin/signinbasic' element={<Signinbasic />} />
            <Route path='signin/signincover' element={<Signincover />} />

            <Route path='twostepverification/twostepbasic' element={<Twostepbasic />} />
            <Route path='twostepverification/twostepcover' element={<Twostepcover />} />

            <Route path='undermaintenance' element={<Undermaintanace />} />

            <Route path='401error' element={<Error401 />} />
            <Route path='404error' element={<Error404 />} />
            <Route path='500error' element={<Error500 />} />
          </Route>
          <Route path='' element={<Landinglayout />}>
            <Route path='/landing' element={<Landing />} />
            <Route path='/jobslanding' element={<Jobslanding />} />
          </Route>
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  </React.Fragment>
)
