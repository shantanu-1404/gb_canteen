import React from "react";
import ProjectCard from "../components/ProjectCard"; // Import the ProjectCard component
import Layout from "../container/layout";

const ProjectDashboard = () => {
  const projects = [
    {
      name: "Project Alpha",
      status: "Completed",
      client: "Client A",
      budget: "₹25482",
      progress: 100,
      startDate: "12th Dec, 2024",
      endDate: "22nd Feb, 2025",
      tasksCompleted: 182,
      totalTasks: 182,
    },
    {
      name: "Project Beta",
      status: "Ongoing",
      client: "Client B",
      budget: "₹15000",
      progress: 75,
      startDate: "10th Jan, 2025",
      endDate: "30th Mar, 2025",
      tasksCompleted: 136,
      totalTasks: 180,
    },
    {
      name: "Project Gamma",
      status: "Critical",
      client: "Client C",
      budget: "₹50000",
      progress: 45,
      startDate: "15th Feb, 2025",
      endDate: "30th Apr, 2025",
      tasksCompleted: 60,
      totalTasks: 120,
    },
    {
      name: "Project Delta",
      status: "Cancelled",
      client: "Client D",
      budget: "₹20000",
      progress: 0,
      startDate: "1st Mar, 2025",
      endDate: "30th Jun, 2025",
      tasksCompleted: 0,
      totalTasks: 0,
    },
  ];

  return (
    <Layout>
    <div className="row">
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
    </Layout>
  );
};

export default ProjectDashboard;
