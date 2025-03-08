import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './container/layout';
import LeftView from './container/leftview';
import Header from './container/header';
import Homepage from './container/Homepage';
import SocialMedia from './container/SocialMedia';
import AddNewPost from './container/AddNewPost';
import Index from './container/Index';
import AddNewCampaign from './container/AddNewCampaign';
import Reports from "./container/Reports";
import AddReport from "./container/AddReport";
import SM_Project from "./container/SM_Project";
import SM_Clients from "./container/SM_Clients";
import AddNewProject from "./container/AddNewProject"
import AddNewClient from "./container/AddNewClient"
import Analytics from "./container/Analytics"
import AddSubsection from "./container/test";
import AddNewBlogs from './container/AddNewBlogs';
import AddNewProduct from './container/AddNewProduct';
import Blogs from './container/Blogs';
import Products from './container/Products';
import Collections from './container/Collections';
import AddNewCollection from './container/AddNewCollection';
import OnlineStore from './container/OnlineStore';
import Preferences from "./container/OS-Preferences";
import VendorOnboarding from "./container/VendorOnboarding";
import AddNewVendor from './container/AddNewVendor';
import InventoryManagement from './container/InventoryManagement';
import GiftCrads from './container/GiftCards';
import AddNewGiftCard from './container/AddNewGiftCard';
import PurchaseOrder from './container/PurchaseOrder';
import AddNewPurchaseOrder from "./container/AddNewPurchaseOrder";
import Transfer from './container/Transfer';




import WordLimit from './components/word_limit_textarea';
import Table from './components/Table';
import MetricCard from './components/MetricCard';
import SearchBar from './components/Searchbar';
import Filter from './components/Filter';
import GridView from './components/Gridview';
import DataTable from "./components/DataTable";
import ProjectCard from "./components/ProjectDashboard"



const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/gb_canteen" element={<Index />} />
        <Route path="/social-media" element={<SocialMedia />} />
        <Route path="/social-media/reports" element={<Reports />} />
        <Route path="/social-media/analytics" element={<Analytics />} />
        <Route path="/social-media/projects" element={<SM_Project />} />
        <Route path="/social-media/clients" element={<SM_Clients />} />
        <Route path="/add-post" element={<AddNewPost />} />
        <Route path="/add-campaign" element={<AddNewCampaign />} />
        <Route path="/add-report" element={<AddReport />} />
        <Route path="/add-project" element={<AddNewProject />} />
        <Route path="/add-client" element={<AddNewClient />} />
        <Route path="/add-blogs" element={<AddNewBlogs />} />
        <Route path="/container/test" element={<AddSubsection />} />
        <Route path="/blogs" element={<Blogs />} />       
        <Route path="/onlinestore" element={<OnlineStore/>} />
        <Route path="/os-preferences" element={<Preferences/>} />
        <Route path="/vendoronboarding" element={<VendorOnboarding/>} />
        <Route path="/add-vendor" element={<AddNewVendor/>} />
        <Route path="/add-product" element={<AddNewProduct />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/collections" element={<Collections />} />
        <Route path="/add-collections" element={<AddNewCollection/>} />
        <Route path="/products/inventory-management" element={<InventoryManagement/>} />
        <Route path="/products/giftcards" element={<GiftCrads/>} />
        <Route path="/add-giftcards" element={<AddNewGiftCard/>} />
        <Route path="/products/purchase_order" element={<PurchaseOrder/>} />
        <Route path="/add-purchase_order" element={<AddNewPurchaseOrder/>} />
        <Route path="/products/transfer" element={<Transfer/>} />
        <Route path="/search" element={<Index />} />
        <Route path="/notification" element={<Index />} />
        <Route path="/profile" element={<Index />} />


      </Routes>
    </Router>


  );
};

export default App;
