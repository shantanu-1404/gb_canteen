import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SocialMedia from './container/SocialMedia';
import Homepage from './container/Homepage';
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
import AddNewInventoryTransfer from "./container/AddNewInventoryTransfer";
import ReceiveItems from "./container/Receive_Items";
import Order from './container/Order';
import AddNewOrder from './container/AddNewOrder';
import DraftOrder from './container/DraftOrder';
import AbandonOrder from './container/AbandonOrder';
import Shipment from './container/Shipment.js';
import CuisinesLocation from "./container/Cuisines_and_Location.js"
import ManageCuisine from './container/Manage_cuisine.js';
import AddNewCuisine from './container/AddNewCuisine';
import ManageLocation from './container/Manage_Location.js';
import StoreProfiles from './container/Store_profiles.js';
import StoreMenu from './container/StoreMenu.js';
import SubscriptionPlan from './container/SubscriptionPlan.js';
import Subscriber from './container/Subscriber.js';
import AddNewLocation from "./container/AddNewLocation.js";
import StoreManagement from "./container/StoreManagement.js";
import AddNewDish from "./container/AddNewDish.js"







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
        <Route path="/order" element={<Order/>} />
        <Route path="/add-order" element={<AddNewOrder/>} />
        <Route path="/order/draft" element={<DraftOrder/>} />
        <Route path="/order/abandon" element={<AbandonOrder/>} />
        <Route path="/order/shipment" element={<Shipment/>} />
        <Route path="/search" element={<Index />} />
        <Route path="/notification" element={<Index />} />
        <Route path="/profile" element={<Index />} />
        <Route path="/add-inventory_transfer" element={<AddNewInventoryTransfer/>} />
        <Route path="/receive_items" element={<ReceiveItems/>} />
        <Route path="/cuisine_location" element={<CuisinesLocation/>} />
        <Route path="/manage_cuisine" element={< ManageCuisine/>} />
        <Route path="/manage_location" element={< ManageLocation/>} />
        <Route path="/add-cuisine" element={<AddNewCuisine/>} />
        <Route path="/store_profiles" element={<StoreProfiles/>} />
        <Route path="/store_menu" element={<StoreMenu/>} />
        <Route path="/subscription_plan" element={<SubscriptionPlan/>} />
        <Route path="/subscriber" element={<Subscriber/>} />
        <Route path="/add-location" element={<AddNewLocation/>} />
        <Route path="/store-management" element={<StoreManagement/>} />
        <Route path="/add-dish" element={<AddNewDish/>} />
        


      </Routes>
    </Router>


  );
};

export default App;
