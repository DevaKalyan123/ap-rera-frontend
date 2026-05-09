import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Layout from "./layouts/layout";

import DbBase from "./pages/DbBase";

// pages
// import Home from "./pages/home";
import About from "./pages/About";
// import Aprea from "./pages/Aprea";
import Notifications from "./pages/Notification";
import Registration from "./pages/Registration";
import Reports from "./pages/Reports";
import Registered from "./pages/Registered";
import Judgements from "./pages/Judgement";
import KnowledgeHub from "./pages/KnowledgeHub";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";
import Apreat from "./pages/apreat";
import Recruitment from "./pages/recruitment";
import Rti from "./pages/rti";
import Promotregistration from "./pages/promotregistration";
import GuidelinesRegistration from "./pages/guidelinesRegistration";
import FeeCalculator from "./pages/feeCalculater";
import CidcandAPRERAJointNotifications from "./pages/CidcandAPRERAJointNotifications";
import Usermanual from "./pages/usermanual";
import VideoTutorial from "./pages/videoTutorial";
import MobileApp from "./pages/mobileapp";
import ProjectRegistration from "./pages/ProjectRegistration";
import Guidelines from "./pages/Guidelines";
import ProjectWizard from "./pages/ProjectWizard";
import Race from "./pages/Race";
import AdminChangeRequestDetail from "./pages/admin/AdminChangeRequestDetail.jsx";
import JudgementHub from "./pages/JudgementHub";
import PressRelease from "./pages/PressRelease";
import Testimonials from "./pages/Testimonials";
import GradingOfAgents from "./pages/GradingOfAgents";
import ChronologyOfEvents from "./pages/ChronologyOfEvents"
import AdvertisementGuidelines from "./pages/AdvertisementGuidelines";
import OurLeadership from "./pages/OurLeadership";
import Footer from "./components/Footer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import HyperlinkingPolicy from "./pages/HyperlinkingPolicy";
import CopyrightPolicy from "./pages/CopyrightPolicy";
import Disclaimer from "./pages/Disclaimer";
import Accessibility from "./pages/Accessibility";
import TermsConditions from "./pages/TermsConditions";
import RateWebsite from "./pages/RateWebsite";
import AgentRegistration from "./pages/AgentRegistration";
import Guidelines2 from "./pages/Guidelines2";
import AgentDetailNew from "./pages/AgentDetailNew";
import AgentDetailExisting from "./pages/AgentDetailExisting";
import ApplicantDetails from "./pages/ApplicantDetails";
import Aprera from "./pages/Aprea";
import Organogram from "./pages/organogram";
import OurServices from "./pages/ourservices";
import Statistics from "./pages/statistics";
import GOINotifications from "./pages/GOINotifications";
import GoapNotifications from "./pages/GoapNotifications";
import AuthorityNotifications from "./pages/AuthorityNotifications";
import Project from "./pages/projects";
import Agents from "./pages/Agents";
import ComplaintOrders from "./pages/ComplaintOrders";
import EvolutionOfRera from "./pages/evolutionofrera";
import AudioVisualGallery from "./pages/AudioVisualGallery";
import TaskVsTime from "./pages/taskvstime";
import VendorDataBase from "./pages/vendordatabase";
import Acf from "./pages/ACF";
import ComplaintRegistration from "./pages/complaintRegistration";
import GradingOfPromoters from "./pages/GradingOfPromotors";
import FormsDownload from "./pages/formsdownload";
import AgentUploadDocuments from "./pages/AgentUploadDocuments";
import Preview from "./pages/Preview";
import Payment from "./pages/Payment";
import ContactUs from "./pages/contactus";
import Promoter_Profile from "./pages/Promoter_Profile";
import ProjectDetails from "./pages/projectDetails";
import DevelopmentDetails from "./pages/DevelopmentDetails";
import AssociateDetails from "./pages/AssociateDetails";
import HomePage from "./pages/HomePage";
import BuildingInformationModelling from "./pages/BuildingInformationModelling";
import VRInnovation from "./pages/VRInnovation";
import RealTimeContextCapture from "./pages/RealTimeContextCapture";
import AnnouncementPopup from "./pages/AnnouncementPopup";
import ProjectUploadDocuments1 from "./pages/ProjectUploadDocuments1";
import { useEffect, useState } from "react";
import ProjectApplicationDetails from "./pages/projectapplicationdetails";
import ExtensionProcess from "./pages/ExtensionProcess";
import ExtensionPaymentPage from "./pages/ExtensionPaymentPage";
import Certificate from "./pages/Certificate";
import OTPLogin from "./pages/otplogin";
import InformProject from "./pages/InformProject";
import ProjectPreview from "./pages/ProjectPreview";
import AgentDashboard from "./pages/AgentDashboard";
import PaymentPage from "./pages/paymentpage";
import ProjectRegistrationExisting from "./pages/ProjectRegistrationExisting";
import PRExistingStarting from "./pages/PRExistingStarting";
import PRExistingtable from "./pages/PRExistingtable";
import ExistingDevelopmentDetails from "./pages/ExistingDevelopmentDetails";
import UploadDocumentsWithApi from "./pages/UploadDocumentsWithApi";
import ExistingProjectDetails from "./pages/ExistingProjectDetails";
// import AgentDetails from "./pages/AgentDetails"; 
// import AgentUploadDocuments from "./pages/AgentUploadDocuments";
import PreviewOther from "./pages/agentpreviewother";
import AgentPaymentpage from "./pages/Agentpayment";
import AgentUploadDocumentOtherthan from "./pages/AgentUploadDocumentOtherthan";
import AgentDetailsOther from "./pages/AgentDetails";
import ExistingAssociateDetails from "./pages/Existing_AssociateDetails";
import OtherthanIndividualDD from "./pages/OtherthanIndividualDD";
import OtherThanIndividual_ProjectPreview from "./pages/OtherThanIndividual_projectPreview";
import OtherThanIndividualProjectDetails from "./pages/OtherThanIndividualprojectDetails";
import OtherThanIndividualDevelopmentDetails from "./pages/other-than-individual_DevelopmentDetails";
import OtherThanIndividualAssociateDetails from "./pages/other-than-individual_AssociateDetails";
import OtherThanIndividualUploadDocument from "./pages/other-than-individual_UploadDocument";
import QuarterlyUpdate from "./pages/QuarterlyUpdate";
import QuarterlyUpdateExisting from "./pages/QuarterlyUpdateExisting";
import QuarterlyExistingtable from "./pages/QuarterlyExistingtable";
import { AgentFormProvider } from "./pages/AgentFormContext";
import ProjectBlockVillaDetails from "./pages/ProjectBlockVillaDetails";
import ChangeRequestForm from "./pages/ChangeRequestForm";
import ChangeRequestVerify from "./pages/ChangeRequestVerify";
import ProjectClosure from "./pages/ProjectClosure";
import ClosureProcess from "./pages/ClosureProcess";
import PromoterLogin from "./pages/PromoterLogin";
import PromoterData from "./pages/PromoterData";
import ClosureTable from "./pages/ClosureTable";

import AgentRenewal from "./pages/AgentRenewal";
import RenewalUploadDocuments from "./pages/RenewalUploadDocuments";
import RenewalQueries from "./pages/RenewalQueries";
import RenewalPreview from "./pages/RenewalPreview";
import RenewalPayment from "./pages/RenewalPayment";
import RenewalStatus from "./pages/RenewalStatus";
import RenewalReceipt from "./pages/RenewalReceipt";
import "./styles/renewal.css";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRequests from "./pages/admin/AdminRequests";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminAgents from "./pages/admin/AdminAgents";
import AdminComplaints from "./pages/admin/AdminComplaints";
import AdminRenewal from "./pages/admin/adminRenewal.jsx";
import AdminRenewalList from "./pages/admin/AdminRenewalList";
import AdminRenewalDetail from "./pages/admin/AdminRenewalDetail";
import AdminLogin from "./pages/admin/AdminLogin";
import ApplyForRenewalOTP from "./pages/ApplyForRenewalOTP";
import RenewalNewCertificate from "./pages/RenewalNewCertificate.jsx";
import AgentChangeRequest1 from "./pages/agent_change_request_1";

import Agentchangerequest from "./pages/Agent_change_request2";
import AgentChangeRequestPayment from "./pages/AgentChangeRequestPayment";
import PromoterOtpLogin from "./pages/PromoterOtpLogin.jsx";
import Changerequest from "./pages/Changerequest.jsx";
import ChangeRequestProcess from "./pages/ChangeRequestProcess.jsx";
import AdminChangerRequestDetail from "./pages/admin/AdminChangeRequestDetail.jsx";
import AdminComplaintDetail from "./pages/admin/AdminComplaintDetail.jsx";
import ComplaintStatusForm from "./pages/ComplaintStatusForm.jsx";
import ComplaintDetails from "./pages/complaintDetails.jsx";
// import AdminComplaintDetails from "./pages/admin/admincomplaintsdetails.jsx";
import AdminComplaintsDetailss from "./pages/admin/admincomplaintsdetails.jsx";
import AdminProjectDetails from "./pages/admin/AdminProjectDetails";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminAgentChangeRequest from "./pages/admin/admin_agentchangerequest";



import ScrutinyProjectRegistration from "./pages/scrutiny/scrutiny_projectregistation";
import ScrutinyProjectRegistration_1 from "./pages/scrutiny/scrutiny_projectregistation_1";
import ScrutinyProjectRegistration_2 from "./pages/scrutiny/scrutiny_projectregistation_2";
import ScrutinyProjectRegistration_3 from "./pages/scrutiny/scrutiny_projectregistation_3";
import ScrutinyProjectRegistration_4 from "./pages/scrutiny/scrutiny_projectregistation_4";
import ScrutinyProjectRegistration_5 from "./pages/scrutiny/scrutiny_projectregistation_5";
import ScrutinyProjectRegistration_action from "./pages/scrutiny/scrutiny_projectregistation_action";
import AgentScrutinyRegistration from "./pages/agent_scrutiny/AgentScrutinyRegistration";
import AgentScrutinyRegistration_1 from "./pages/agent_scrutiny/AgentScrutinyRegistration_1";
import AgentScrutinyRegistration_2 from "./pages/agent_scrutiny/AgentScrutinyRegistration_2";
import AgentScrutinyRegistration_Action from "./pages/agent_scrutiny/AgentScrutinyRegistration_Action";
import ScrutinyDashboard from "./pages/scrutiny/ScrutinityDashboard.jsx";
import ScrutinyRegistration from "./pages/scrutiny/ScrutinyRegistration.jsx";
import ScrutinyFpmsDashboard from "./pages/scrutiny/ScrutinyFpmsDashboard.jsx";
import ScrutinyCreateFile from "./pages/scrutiny/ScrutinyCreateFile.jsx";
import ScrutinyViewFiles from "./pages/scrutiny/ScrutinyViewFiles.jsx";
import ScrutinyLayout from "./components/scrutiny/ScrutinyLayout.jsx";
import DepartmentLogin from "./pages/DepartmentLogin.jsx";
import Chatbot from "./components/Chatbot";
import AdminChangeRequestList from "./pages/admin/Adminchangerequestlist.jsx";
import UnregisterList from "./pages/scrutiny/Unregisterlist .jsx";
import UnregistrationProjectDetails from "./pages/scrutiny/Unregistrationprojectdetails.jsx";

//// new imports for mis reports
import MisReports from './pages/MisReports';
import R1_1_Report from './pages/R1_1_Report';
import AgentStatusReport from './pages/AgentStatusReport';
import ApartmentsReport from './pages/ApartmentsReport';
import CommercialReport from './pages/CommercialReport';
import MixedReport from './pages/MixedReport';
import LayoutForPlotsReport from './pages/LayoutForPlotsReport';
import LayoutForPlotsBuildingsReport from './pages/LayoutForPlotsBuildingsReport';
import ApprovedProjectReport from './pages/ApprovedProjectReport';
import ApprovedAgentReport from './pages/ApprovedAgentReport';
import ApcrdaReport from './pages/ApcrdaReport';
import UdaReport from './pages/UdaReport';
import UlbReport from './pages/UlbReport';
import DtcpReport from './pages/DtcpReport';
import OfficerPendingReport from './pages/OfficerPendingReport';
import ApprovedProjectReportSheet from './pages/ApprovedProjectReportSheet';
import R9_2_Report from './pages/R9_2_Report';
import R9_3_Report from './pages/R9_3_Report';
import DistrictFinancialAgentReport from './pages/DistrictFinancialAgentReport';
import DistrictFinancialProjectReport from './pages/DistrictFinancialProjectReport';
import ExemptionFileUpload from "./pages/exemption.jsx";
import R15_2 from './pages/R15_2';
import R17_1 from './pages/R17_1';
import R17_2 from './pages/R17_2';
import R20_1 from './pages/R20_1';
import R20_2 from './pages/R20_2';
import R20_3 from './pages/R20_3';
import R21_2 from './pages/R21_2';
import R22_2 from './pages/R22_2';
import R23_1 from './pages/R23_1';
import R24_1 from './pages/R24_1';
import R1_3 from './pages/R1_3';
import R2_1 from './pages/R2_1';
import R2_2 from './pages/R2_2';
import R2_3 from './pages/R2_3';
import R3_2 from './pages/R3_2';
import R3_3 from './pages/R3_3';
import R6_1 from './pages/R6_1';
import R6_2_1 from './pages/R6_2_1';
import R6_2_2 from './pages/R6_2_2';
import R6_2_3 from './pages/R6_2_3';
import R6_3 from './pages/R6_3';
import R7_1 from './pages/R7_1';
import R7_3 from './pages/R7_3';
import R7_2 from './pages/R7_2';
import R8_1 from './pages/R8_1';
import R8_2 from './pages/R8_2';
import R10_1 from './pages/R10_1';
import R10_2 from './pages/R10_2';
import R10_3 from './pages/R10_3';
import R11_1 from './pages/R11_1';
import R13_1 from './pages/R13_1';
import R13_2 from './pages/R13_2';
import R13_3 from './pages/R13_3';
import R13_4 from './pages/R13_4';
import R14_1 from './pages/R14_1';
import R14_2 from './pages/R14_2';
import R14_3 from './pages/R14_3';
import R18_1 from './pages/R18_1';
import R18_2 from './pages/R18_2';
import R16_1 from './pages/R16_1';
import R12_1 from './pages/R12_1';
import R12_2 from './pages/R12_2';
import R12_3 from './pages/R12_3';
import R12_4 from './pages/R12_4';
import R25_1 from "./pages/R25_1";
import R25_2 from "./pages/R25-2";
import R25_3 from "./pages/R25_3";
import R15_1 from "./pages/R15_1";
import R19_1 from "./pages/R19_1";
import FPMSLayout from "./pages/scrutiny/FPMSLayout.jsx";


function App() {
  const [showPopup, setShowPopup] = useState(false);

  // ✅ Show popup automatically on first load
  useEffect(() => {
    setTimeout(() => {
      setShowPopup(true);
    }, 800);
  }, []);
  return (
    <BrowserRouter>
      <AgentFormProvider>
        {/* ✅ Popup should be OUTSIDE Routes */}
        {showPopup && <AnnouncementPopup onClose={() => setShowPopup(false)} />}
        <Layout>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="about" element={<About />} />
            {/* <Route path="apreat" element={<Aprea />} /> */}
            <Route path="notifications" element={<Notifications />} />
            <Route path="registration" element={<Registration />} />
            <Route path="reports" element={<Reports />} />
            <Route path="registered" element={<Registered />} />
            <Route path="judgements" element={<Judgements />} />
            <Route path="knowledge-hub" element={<KnowledgeHub />} />
            <Route path="login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/apreat" element={<Apreat />} />
            <Route path="/recruitment" element={<Recruitment />} />
            <Route path="/rti" element={<Rti />} />
            <Route path="/promotregistration" element={<Promotregistration />} />
            <Route path="/guidelinesRegistration" element={<GuidelinesRegistration />} />
            <Route path="/feecalculater" element={<FeeCalculator />} />
            <Route path="/cidcandaprerajoint" element={<CidcandAPRERAJointNotifications />} />
            <Route path="/usermanual" element={<Usermanual />} />
            <Route path="/videoTutorial" element={<VideoTutorial />} />
            <Route path="/mobileapp" element={<MobileApp />} />
            <Route path="/project-registration" element={<ProjectWizard />} />
            <Route path="/guidelines" element={<Guidelines />} />
            <Route path="/project-registration-wizard" element={<ProjectWizard />} />
            <Route path="/race" element={<Race />} />
            <Route path="/JudgementHub" element={<JudgementHub />} />
            <Route path="/PressRelease" element={<PressRelease />} />
            <Route path="/Testimonials" element={<Testimonials />} />
            <Route path="/GradingOfAgents" element={<GradingOfAgents />} />
            <Route path="/ChronologyOfEvents" element={<ChronologyOfEvents />} />
            <Route path="/AdvertisementGuidelines" element={<AdvertisementGuidelines />} />
            <Route path="/our-leadership" element={<OurLeadership />} />
            <Route path="/contact-us/aprera" element={<ContactUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/hyperlinking-policy" element={<HyperlinkingPolicy />} />
            <Route path="/copyrightPolicy" element={< CopyrightPolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/termsConditions" element={< TermsConditions />} />
            <Route path="/rateWebsite" element={<RateWebsite />} />
            <Route path="/agent-registration" element={<AgentRegistration />} />
            <Route path="/Guidelines" element={<Guidelines />} />
            <Route path="/agent-detail-new" element={<AgentDetailNew />} />
            <Route path="/agent-detail-existing" element={<AgentDetailExisting />} />
            <Route path="/applicant-details" element={<ApplicantDetails />} />
            <Route path="/aprera" element={<Aprera />} />
            <Route path="/organogram" element={<Organogram />} />
            <Route path="/ourservices" element={<OurServices />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/goinotifications" element={<GOINotifications />} />
            <Route path="/goapnotifications" element={<GoapNotifications />} />
            <Route path="/authoritynotifications" element={<AuthorityNotifications />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/registered/projects" element={<Project />} />
            <Route path="/complaint-orders" element={<ComplaintOrders />} />
            <Route path="evolutionofrera" element={<EvolutionOfRera />} />
            <Route path="taskvstime" element={<TaskVsTime />} />
            <Route path="vendordatabase" element={<VendorDataBase />} />
            <Route path="gradingofpromotors" element={<GradingOfPromoters />} />
            <Route path="ACF" element={<Acf />} />
            <Route path="AudioVisualGallery" element={<AudioVisualGallery />} />
            <Route path="/complaintregistration" element={<ComplaintRegistration />} />
            <Route path="/formsdownload" element={<FormsDownload />} />
            <Route path="/promoter-profile" element={<Promoter_Profile />} />
            <Route path="/project-Details" element={<ProjectDetails />} />
            <Route path="/Development-Details" element={<DevelopmentDetails />} />
            <Route
              path="project-upload-documents"
              element={<ProjectUploadDocuments1 />}
            />
            <Route path="preview" element={<ProjectPreview />} />
            <Route path="/Associate-Details" element={<AssociateDetails />} />
            <Route path="/agent-upload-documents" element={<AgentUploadDocuments />} />
            <Route path="/agent-preview" element={<Preview />} />
            <Route path="/agent-payment" element={<Payment />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/bim" element={<BuildingInformationModelling />} />
            <Route path="/vr" element={<VRInnovation />} />
            <Route path="/rtc" element={<RealTimeContextCapture />} />
            <Route path="/projectapplicationdetails" element={<ProjectApplicationDetails />} />
            <Route path="/extensionprocess" element={<ExtensionProcess />} />
            <Route path="/extensionpaymentpage" element={<ExtensionPaymentPage />} />
            <Route path="/certificate" element={<Certificate />} />
            <Route path="/otplogin" element={<OTPLogin />} />
            <Route path="/InformProject" element={<InformProject />} />
            <Route path="/agent-dashboard" element={<AgentDashboard />} />
            <Route path="/paymentpage" element={<PaymentPage />} />
            <Route path="/projectregistrationexisting" element={<ProjectRegistrationExisting />} />
            <Route path="/prexisting" element={<PRExistingStarting />} />
            <Route path="/prexistingtable" element={<PRExistingtable />} />
            <Route path="/existing-development-details" element={<ExistingDevelopmentDetails />} />
            <Route path="/AgentDetails" element={<AgentDetailsOther />} />
            <Route path="/AgentUploadDocumentotherthan" element={<AgentUploadDocumentOtherthan />} />
            <Route path="/preview-other" element={<PreviewOther />} />
            <Route path="/agent-paymentpage" element={<AgentPaymentpage />} />
            <Route path="/existing-associate-details" element={<ExistingAssociateDetails />} />
            <Route path="/otherthanindividualdd" element={<OtherthanIndividualDD />} />
            <Route path="/existing-development-details-upload-docs/:id" element={<UploadDocumentsWithApi />} />
            <Route path="/existing-project-details" element={<ExistingProjectDetails />} />
            <Route path="/other-than-individual-project-details" element={<OtherThanIndividualProjectDetails />} />
            <Route path="/othertheninduvidual-preview" element={<OtherThanIndividual_ProjectPreview />} />
            <Route path="/other-than-individual-development-details" element={<OtherThanIndividualDevelopmentDetails />} />
            <Route path="/other-than-individual-associate-details" element={<OtherThanIndividualAssociateDetails />} />
            <Route path="/other-than-individual-upload-documents" element={<OtherThanIndividualUploadDocument />} />
            <Route path="/quarterlyupdateexisting" element={<QuarterlyUpdateExisting />} />
            <Route path="/quarterlyexistingtable" element={<QuarterlyExistingtable />} />
            <Route path="/quarterlyupdate" element={<QuarterlyUpdate />} />
            <Route path="/project-blockvilla-details" element={<ProjectBlockVillaDetails />} />
            <Route path="/changerequest" element={<ChangeRequestForm />} />
            <Route path="/changerequestverify" element={<ChangeRequestVerify />} />
            <Route path="/project-closure" element={<ProjectClosure />} />
            <Route path="/closureprocess" element={<ClosureProcess />} />
            <Route path="/promoter" element={<PromoterLogin />} />
            <Route path="/promoterData" element={<PromoterData />} />
            <Route path="/closure" element={<ClosureTable />} />

            <Route path="/" element={<HomePage />} />
            <Route path="/agent-renewal" element={<AgentRenewal />} />

            <Route path="/renewal/upload/:renewalId" element={<RenewalUploadDocuments />} />
            <Route path="/renewal/queries/:renewalId" element={<RenewalQueries />} />
            <Route path="/renewal/preview/:renewalId" element={<RenewalPreview />} />
            <Route path="/renewal/payment/:renewalId" element={<RenewalPayment />} />

            <Route path="/renewal/status" element={<RenewalStatus />} />

            <Route path="/renewal/receipt/:renewalId" element={<RenewalReceipt />} />
            // Admin Dashboard
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            // Admin Requests
            <Route
              path="/admin/requests"
              element={
                <ProtectedRoute>
                  <AdminRequests />
                </ProtectedRoute>
              }
            />
            // Admin Projects
            <Route
              path="/admin/projects"
              element={
                <ProtectedRoute>
                  <AdminProjects />
                </ProtectedRoute>
              }
            />
            <Route path="/admin/agents" element={<AdminAgents />} />
            // Admin Complaints
            <Route
              path="/admin/complaints"
              element={
                <ProtectedRoute>
                  <AdminComplaints />
                </ProtectedRoute>
              }
            />
            // Admin Complaint Detail
            <Route
              path="/admin/complaint/:id"
              element={
                <ProtectedRoute>
                  <AdminComplaintDetail />
                </ProtectedRoute>
              }
            />
            <Route path="/admin/complaintdetails" element={<AdminComplaintsDetailss />} />
            <Route path="/complaintstatus" element={<ComplaintStatusForm />} />
            // Admin Renewal Dashboard
            <Route
              path="/admin/renewal"
              element={
                <ProtectedRoute>
                  <AdminRenewal />
                </ProtectedRoute>
              }
            />
            // Admin Renewal List
            <Route
              path="/admin/renewals/:status"
              element={
                <ProtectedRoute>
                  <AdminRenewalList />
                </ProtectedRoute>
              }
            />
// Admin Renewal Detail
            <Route
              path="/admin/renewal/:id"
              element={
                <ProtectedRoute>
                  <AdminRenewalDetail />
                </ProtectedRoute>
              }
            />
            <Route path="/admin/renewal/:id" element={<AdminRenewalDetail />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/apply-for-renewal-otp" element={<ApplyForRenewalOTP />} />
            <Route path="/renewal/certificate/:renewalId" element={<RenewalNewCertificate />} />
            <Route path="/promoter-otp-login" element={<PromoterOtpLogin />} />

// Admin Change Requests List
            <Route
              path="/admin/change-requests"
              element={
                <ProtectedRoute>
                  <AdminChangeRequestList />
                </ProtectedRoute>
              }
            />
            // Admin Change Request Detail
            <Route
              path="/admin/change-request/:id"
              element={
                <ProtectedRoute>
                  <AdminChangeRequestDetail />
                </ProtectedRoute>
              }
            />

            <Route
              path="/agent_change_request_1"
              element={<AgentChangeRequest1 />}
            />
            <Route path="/Agentchangerequest2" element={<Agentchangerequest />} />
            <Route
              path="/agent-change-request-payment"
              element={<AgentChangeRequestPayment />}
            />
            <Route path="/ChangeRequestProcess" element={<ChangeRequestProcess />} />
            <Route path="/Changerequest1" element={<Changerequest />} />
            <Route path="/admin/project/:id" element={<AdminProjectDetails />} />
            <Route path="/admin/agent-change-request" element={<AdminAgentChangeRequest />} />

            <Route path="/scrutiny/scrutiny-engineer" element={<ScrutinyDashboard />} />
<Route path="/planning/planning-dashboard" element={<ScrutinyDashboard />} />
<Route path="/legal/legal-dashboard" element={<ScrutinyDashboard />} />
<Route path="/audit/audit-dashboard" element={<ScrutinyDashboard />} />
<Route path="/verification/verification-dashboard" element={<ScrutinyDashboard />} />
<Route path="/ad/ad-dashboard" element={<ScrutinyDashboard />} />
<Route path="/dd/dd-dashboard" element={<ScrutinyDashboard />} />
<Route path="/it/it-dashboard" element={<ScrutinyDashboard />} />
            <Route path="/scrutiny/scrutiny-registration" element={<ScrutinyRegistration />} />
            {/* <Route path="/scrutiny/scrutiny-fpms" element={<ScrutinyFpmsDashboard/>} /> */}
            <Route path="/scrutiny/project-registration" element={<ScrutinyProjectRegistration />} />
            <Route path="/scrutiny/project-registration_1" element={<ScrutinyProjectRegistration_1 />} />
            <Route path="/scrutiny/project-registration_2" element={<ScrutinyProjectRegistration_2 />} />
            <Route path="/scrutiny/project-registration_3" element={<ScrutinyProjectRegistration_3 />} />
            <Route path="/scrutiny/project-registration_4" element={<ScrutinyProjectRegistration_4 />} />
            <Route path="/scrutiny/project-registration_5" element={<ScrutinyProjectRegistration_5 />} />
            <Route path="/scrutiny/project-registration_action" element={<ScrutinyProjectRegistration_action />} />

            {/* Agent Scrutiny */}
            <Route path="/agent-scrutiny/registrations" element={<AgentScrutinyRegistration />} />
            <Route path="/agent-scrutiny/registration_1" element={<AgentScrutinyRegistration_1 />} />
            <Route path="/agent-scrutiny/registration_2" element={<AgentScrutinyRegistration_2 />} />
            <Route path="/agent-scrutiny/registration_action" element={<AgentScrutinyRegistration_Action />} />

<Route path="/fpms" element={<FPMSLayout />}>
  <Route path="dashboard" element={<ScrutinyFpmsDashboard />} />
  <Route path="create-files" element={<ScrutinyCreateFile />} />
  <Route path="view-files" element={<ScrutinyViewFiles />} />
</Route>
            <Route path="/department" element={<DepartmentLogin />} />
            <Route path="/UnregisterList" element={<UnregisterList />} />
  <Route path="/scrutiny/project-unregistered/:id" element={<UnregistrationProjectDetails />} />
  <Route path="/extensionprocess" element={<ExtensionProcess />} />

            <Route path="/mis-reports" element={<MisReports />} />
             <Route path="/reports/R1.1" element={<R1_1_Report />} />
             <Route path="/reports/R1.2" element={<AgentStatusReport />} />
             <Route path="/reports/R3.1" element={<ApartmentsReport />} />
             <Route path="/reports/R3.4" element={<CommercialReport />} />
             <Route path="/reports/R3.5" element={<MixedReport />} />
             <Route path="/reports/R3.6" element={<LayoutForPlotsReport />} />
             <Route path="/reports/R3.7" element={<LayoutForPlotsBuildingsReport />} />
             <Route path="/reports/R4.1" element={<ApprovedProjectReport />} />
             <Route path="/reports/R4.2" element={<ApprovedAgentReport />} />
             <Route path="/reports/R5.1" element={<ApcrdaReport />} />
             <Route path="/reports/R5.2" element={<UdaReport />} />
             <Route path="/reports/R5.3" element={<UlbReport />} />
             <Route path="/reports/R5.4" element={<DtcpReport />} />
             <Route path="/reports/R6.4" element={<OfficerPendingReport />} />
             <Route path="/reports/approved-detailed" element={<ApprovedProjectReportSheet />} />
             <Route path="/reports/R9.2" element={<R9_2_Report />} />
             <Route path="/reports/R9.3" element={<R9_3_Report />} />
             <Route path="/reports/R13.5" element={<DistrictFinancialAgentReport />} />
             <Route path="/reports/R13.6" element={<DistrictFinancialProjectReport />} />
             <Route path="/reports/R15.2" element={<R15_2 />} />
             <Route path="/reports/R17.1" element={<R17_1 />} />
             <Route path="/reports/R17.2" element={<R17_2 />} />
             <Route path="/reports/R20.1" element={<R20_1 />} />
             <Route path="/reports/R20.2" element={<R20_2 />} />
             <Route path="/reports/R20.3" element={<R20_3 />} />
             <Route path="/reports/R21.2" element={<R21_2 />} />
             <Route path="/reports/R22.2" element={<R22_2 />} />
             <Route path="/reports/R23.1" element={<R23_1 />} />
             <Route path="/reports/R24.1" element={<R24_1 />} />
             <Route path="/reports/R1.3" element={<R1_3 />} />
             <Route path="/reports/R2.1" element={<R2_1 />} />
             <Route path="/reports/R2.2" element={<R2_2 />} />
             <Route path="/reports/R2.3" element={<R2_3 />} />
             <Route path="/reports/R3.2" element={<R3_2 />} />
             <Route path="/reports/R3.3" element={<R3_3 />} />
             <Route path="/reports/R6.1" element={<R6_1 />} />
             <Route path="/reports/R6.2.1" element={<R6_2_1 />} />
             <Route path="/reports/R6.2.2" element={<R6_2_2 />} />
             <Route path="/reports/R6.2.3" element={<R6_2_3 />} />
             <Route path="/reports/R6.3" element={<R6_3 />} />
             <Route path="/reports/R7.3" element={<R7_3 />} />
             <Route path="/reports/R7.2" element={<R7_2 />} />
             <Route path="/reports/R7.1" element={<R7_1 />} />
             <Route path="/reports/R8.1" element={<R8_1 />} />
             <Route path="/reports/R8.2" element={<R8_2 />} />
             <Route path="/reports/R10.2" element={<R10_2 />} />
             <Route path="/reports/R10.3" element={<R10_3 />} />
             <Route path="/reports/R11.1" element={<R11_1 />} />
             <Route path="/reports/R10.1" element={<R10_1 />} />
             <Route path="/reports/R13.1" element={<R13_1 />} />
             <Route path="/reports/R13.2" element={<R13_2 />} />
             <Route path="/reports/R13.4" element={<R13_4 />} />
             <Route path="/reports/R13.3" element={<R13_3 />} />
             <Route path="/reports/R14.1" element={<R14_1 />} />
             <Route path="/reports/R14.2" element={<R14_2 />} />
             <Route path="/reports/R14.3" element={<R14_3 />} />
             <Route path="/reports/R18.1" element={<R18_1 />} />
             <Route path="/reports/R18.2" element={<R18_2 />} />
             <Route path="/reports/R16.1" element={<R16_1 />} />
             <Route path="/reports/R12.1" element={<R12_1 />} />
             <Route path="/reports/R12.2" element={<R12_2 />} />
             <Route path="/reports/R12.3" element={<R12_3 />} />
             <Route path="/reports/R12.4" element={<R12_4 />} />
             <Route path="/reports/R25.1" element={<R25_1 />} />
             <Route path="/reports/R25.2" element={<R25_2 />} />
             <Route path="/reports/R25.3" element={<R25_3 />} />
             <Route path="/reports/R15.1" element={<R15_1 />} />
             <Route path="/reports/R19.1" element={<R19_1 />} />
             <Route path="/dbbase" element={<DbBase />} />

          </Routes>
          <Chatbot />
        </Layout></AgentFormProvider>
    </BrowserRouter>
  );
}

export default App;