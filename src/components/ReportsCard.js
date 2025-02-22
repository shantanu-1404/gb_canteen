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
                    <strong className="col-md">Report Generated On:</strong><p className="col-md"> {new Date(date).toLocaleDateString()}</p>
                </div>
                <div className="row">
                    <strong className="col-md">Report Type:</strong> <p className="col-md"> {type}</p>
                </div>
                <div className="row">
                    <strong className="col-md">Last Update:</strong><p className="col-md"> {new Date(latestUpdate).toLocaleDateString()}</p>
                </div>
                <div className="row">
                    <strong className="col-md">Created By:</strong><p className="col-md"> {createdBy}</p>
                </div>
                <div className="row">
                    <strong className="col-md">Tags:</strong><p className="col-md">{tags.join(", ")}</p>
                </div>
                
                <div className="btn-sack-top">
                    <span></span>
                </div>
            </div>
        </div>
    );
};

export default ReportsCard;
