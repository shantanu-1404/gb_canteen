import React from "react";

const ReportsCard = ({ report }) => {
    const { title, status, date, type, latestUpdate, createdBy, tags } = report;

    return (
        <div className="col-md-6 col-lg-4">
            <div className="section_card flex-column p-3">
                <h6 className="card-title col-8">{title}</h6>

                {/* Status Badge */}
                <div className="mb-2">
                    <span className={`badge ${status === "Completed" ? "positive_garph" : "pending"}`}>
                        {status}
                    </span>
                </div>

                {/* Report Details */}
                <div className="row">
                    <strong className="col">Report Generated On:</strong><p className="col"> {new Date(date).toLocaleDateString()}</p>
                </div>
                <div className="row">
                    <strong className="col">Report Type:</strong> <p className="col"> {type}</p>
                </div>
                <div className="row">
                    <strong className="col">Last Update:</strong><p className="col"> {new Date(latestUpdate).toLocaleDateString()}</p>
                </div>
                <div className="row">
                    <strong className="col">Created By:</strong><p className="col"> {createdBy}</p>
                </div>
                <div className="row">
                    <strong className="col">Tags:</strong><p className="col">{tags.join(", ")}</p>
                </div>
                
                <div className="btn-sack-top">
                    <span></span>
                </div>
            </div>
        </div>
    );
};

export default ReportsCard;
