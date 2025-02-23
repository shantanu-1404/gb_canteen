import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './container/layout';
import LeftView from './container/leftview';
import Header from './container/header';
import Homepage from './container/homepage';
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
      <Route path="/" element={<Index />} />    
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


      <Route path="/container/layout" element={<Layout />} />    
      <Route path="/container/leftview" element={<LeftView />} />   
      <Route path="/container/header" element={<Header />} />
      <Route path="/container/homepage" element={<Homepage />} /> 
      <Route path="/components/word_limit_textarea" element={<WordLimit />} />  
      <Route path="/components/table" element={<Table />} /> 
      <Route path="/components/Metrics" element={<MetricCard />} /> 
      <Route path="/components/Searchbar" element={<SearchBar />} />  
      <Route path="/components/Filter" element={<Filter />} /> 
      <Route path="/components/Gridview" element={<GridView />} /> 
      <Route path="/components/DataTable" element={<DataTable />} />
      <Route path="/components/ProjectDashboard" element={<ProjectCard />} />
   

      </Routes>
    </Router>

    
  );
};

export default App;
