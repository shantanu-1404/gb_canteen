import React from "react";

const ProjectCard = ({ project }) => {
  const {
    name,
    status,
    client,
    budget,
    progress,
    startDate,
    endDate,
    tasksCompleted,
    totalTasks,
  } = project;

  let statusClass = "";
  let progressColor = "";

  // Conditional styling based on project status
  switch (status) {
    case "Completed":
      statusClass = "positive_garph";
      progressColor = "#73AF00";
      break;
    case "Ongoing":
      statusClass = "ongoing";
      progressColor = "#1CC3ED";
      break;
    case "Critical":
      statusClass = "critical";
      progressColor = "#ED231C";
      break;
    case "Cancelled":
      statusClass = "cancelled";
      progressColor = "#868686";
      break;
    default:
      statusClass = "ongoing";
      progressColor = "#1CC3ED";
  }

  return (
    <div className="col-md-6 col-lg-4">
      <div className="section_card flex-column">
        <h6 className="card-title col-8">{name}</h6>

        {/* Status Badge */}
        <span className={` mb-3 badge ${statusClass}`}>{status}</span>

        <div className="row">
          <strong className="col-md custom-font-size">
            <img
              src="http://localhost/gb_canteen/svg/order_pending.svg"
              alt="Wallet Icon"
              style={{ width: "30px", marginRight: "10px" }}
              className={`${statusClass === "cancelled" ? "grey" : ""}`} // Apply the grey image class for cancelled status
            />
            Client -
          </strong>
          <d
            className={`col-md client-name ${statusClass === "cancelled" ? "grey" : "pink"
              }`}
          >
            {client}
          </d>
        </div>

        <div className="row">
          <strong
            className={`col-md custom-font-size`} // Apply the custom class for font size
          >
            <img
              src="http://localhost/gb_canteen/svg/wallet.svg"
              alt="Return Icon"
              style={{ width: "30px", marginRight: "10px" }}
              className={`${statusClass === "cancelled" ? "grey" : ""}`} // Apply the grey image class for cancelled status
            />
            Budget -
          </strong>
          <p className="col-md budget custom-font-size" style={{ color: "#253154" }}>
            {budget.toLocaleString()}
          </p>
        </div>

        <div className="row">
          <strong className="col-md-10 no-bold">Progress - </strong>
          <p className="col-md-2">{progress}%</p>
        </div>

        <div className="progress col-md">
          <div
            className="progress-bar"
            style={{ width: `${progress}%`, backgroundColor: progressColor }}
          ></div>
        </div>

        <div className="row">
          <strong className="col-md no-bold">Start Date - </strong>
          <p className="col-md">{startDate}</p>
        </div>
        <div className="row">
          <strong className="col-md no-bold">End Date - </strong>
          <p className="col-md">{endDate}</p>
        </div>

        <div className="row align-items-center">
          <div className="customer_profiles col-md-8 d-flex align-items-center">
            {/* Profile images */}
            <img className="profile-pic" alt="profile" />
            <img className="profile-pic" alt="profile" />
            <img className="profile-pic" alt="profile" />
            <div className="profile-count">27</div>
          </div>

          {/* Task Icon and Total Tasks */}
          <div className="col-md-4 d-flex align-items-center justify-content-end">
            <i
              className="bi bi-list-check task-icon"
              style={{ marginRight: "5px", fontSize: "25px" }}
            ></i>
            <p style={{ marginTop: "12px" }}>{totalTasks}Tasks</p>
          </div>
        </div>
        <div className="btn-sack-top">
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
