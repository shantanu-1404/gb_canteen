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
import NewProject from "./container/AddNewProject"
import NewClient from "./container/AddNewClient"



import WordLimit from './components/word_limit_textarea';
import Table from './components/Table';
import MetricCard from './components/MetricCard';
import SearchBar from './components/Searchbar';
import Filter from './components/Filter';
import GridView from './components/Gridview';
import DataTable from "./components/DataTable";
import UTMTrackingChart from "./components/Graphs";
import ProjectCard from "./components/ProjectDashboard"



const App = () => {
  
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Index />} />    
      <Route path="/social-media" element={<SocialMedia />} />    
      <Route path="/social-media/reports" element={<Reports />} />    
      <Route path="/social-media/projects" element={<SM_Project />} />    
      <Route path="/add-post" element={<AddNewPost />} />    
      <Route path="/add-campaign" element={<AddNewCampaign />} />    
      <Route path="/add-report" element={<AddReport />} />    
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
      <Route path="/components/Graphs" element={<UTMTrackingChart />} />
      <Route path="/components/ProjectDashboard" element={<ProjectCard />} />
      <Route path="/container/AddNewProject" element={<NewProject />} />
      <Route path="/container/AddNewClient" element={<NewClient />} />
   

      </Routes>
    </Router>

    
  );
};

export default App;
