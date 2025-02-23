import React from "react";


import wallet from "../assets/svg/wallet.svg";
import client from "../assets/svg/client.svg";

const SM_ProjectCard = ({ project }) => {
    const {
        project_name,
        status,
        client_name,
        budget,
        progress,
        start_date,
        end_date,
        total_tasks,
        team_members
    } = project;

    let statusClass = "";
    let progressColor = "";

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
            <div className="section_card flex-column p-3">
                <h6 className="card-title col-8">{project_name}</h6>

                <span className={`mb-3 badge ${statusClass}`}>{status}</span>

                <div className="row mb-1 align-items-center">
                    <strong className="col-md ">
                        <img
                            src={wallet}
                            alt="Wallet Icon"
                            style={{ width: "30px", marginRight: "10px" }}
                            className={`${statusClass === "cancelled" ? "grey" : ""}`} // Apply the grey image class for cancelled status
                        />Client -
                    </strong>
                    <d className={`col-md ${statusClass === "cancelled" ? "grey" : "pink"}`}>{client_name}</d>
                </div>

                <div className="row">
                    <strong className="col-md">
                        <img
                            src={client}
                            alt="Return Icon"
                            style={{ width: "30px", marginRight: "10px" }}
                            className={`${statusClass === "cancelled" ? "grey" : ""}`} // Apply the grey image class for cancelled status
                        />Budget -
                    </strong>
                    <p className="col-md" style={{ color: "#253154" }}>₹{budget.toLocaleString()}</p>
                </div>

                <div className="row">
                    <strong className="col-md-9">Progress - </strong>
                    <p className="col-md text-end m-0">{progress}%</p>
                </div>

                <div className="progress m-0 mb-3 col-md">
                    <div
                        className="progress-bar"
                        style={{ width: `${progress}%`, backgroundColor: progressColor }}
                    />
                </div>

                <div className="row">
                    <strong className="col-md">Start Date - </strong>
                    <p className="col-md">{start_date}</p>
                </div>
                <div className="row">
                    <strong className="col-md">End Date - </strong>
                    <p className="col-md">{end_date}</p>
                </div>

                <div className="row align-items-center">
                    <div className="customer_profiles col-md-7 d-flex align-items-center">
                        {team_members.slice(0, 3).map((member, user_id) => (
                            <img key={user_id} src={member.image} alt="profile" className="profile-pic" />
                        ))}
                        <div className="profile-count">{team_members.length}</div>
                    </div>

                    <div className="col-md d-flex align-items-center justify-content-end">
                        <i className="bi bi-list-check task-icon" style={{ fontSize: "25px" }}></i>
                        <p style={{ marginTop: "12px" }}>{total_tasks} Tasks</p>
                    </div>
                </div>

                <div className="btn-sack-top">
                    <span></span>
                </div>
            </div>
        </div>
    );
};

export default SM_ProjectCard;
