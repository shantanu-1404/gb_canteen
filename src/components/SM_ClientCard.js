import React from "react";

const SM_ClientCard = ({ client }) => {
    const {
        client_name,
        status,
        industry,
        profiles_managed,
        last_activity,
        engagement_rate,
        team_members,
        total_tasks,
    } = client;

    let statusClass = status === "Active" ? "positive_garph" : "critical";

    return (
        <div className="col-md-6 col-lg-4">
            <div className="section_card flex-column p-3">
                <h6 className="card-title col-8">{client_name}</h6>

                <span className={`mb-3 badge ${statusClass}`}>{status}</span>

                <div className="row mb-3 align-items-center">
                    <strong className="col-md ">
                        <img
                            src="http://localhost/gb_canteen/svg/order_pending.svg"
                            alt="Wallet Icon"
                            style={{ width: "30px", marginRight: "10px" }}
                            className={`${statusClass === "cancelled" ? "grey" : ""}`} // Apply the grey image class for cancelled status
                        />Client -
                    </strong>
                    <d className={`col-md ${statusClass === "cancelled" ? "grey" : "pink"}`}>{client_name}</d>
                </div>

                <div className="row">
                    <strong className="col-md">Industry -</strong>
                    <p className="col-md">{industry}</p>
                </div>

                <div className="row">
                    <strong className="col-md">Profile Managed -</strong>
                    <p className="col-md">{profiles_managed}</p>
                </div>

                <div className="row">
                    <strong className="col-md">Last Activity -</strong>
                    <p className="col-md">{last_activity}</p>
                </div>

                <div className="row">
                    <strong className="col-md">Engagement Rate -</strong>
                    <p className="col-md">{engagement_rate}%</p>
                </div>

                <div className="row align-items-center">
                    <div className="customer_profiles col-md-7 d-flex align-items-center">
                        {team_members.slice(0, 3).map((member, user_id) => (
                            <img key={user_id} src={member.img} alt="profile" className="profile-pic" />
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

export default SM_ClientCard;
