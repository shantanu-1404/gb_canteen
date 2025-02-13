import React from "react";

const CampaignCard = ({ campaign }) => {
    const { status, budget, spend, ctr } = campaign;

    return (
        <div className="col-md-6 col-lg-4">
            <div className="section_card flex-column">
                <h6 className="card-title col-8">Campaign Details</h6>

                <div className="row">
                    <strong className="col-md">Current Status - </strong>
                    <p className={`col-md ${status.toLowerCase()}`}>{status}</p>
                </div>
                <div className="row">
                    <strong className="col-md">Budget - </strong>
                    <p className="col-md">{budget.toLocaleString()}</p>
                </div>
                <div className="row">
                    <strong className="col-md">Spend - </strong>
                    <p className="col-md">{spend.toLocaleString()}</p>
                </div>
                <div className="row">
                    <strong className="col-md">CTR - </strong>
                    <p className="col-md">{ctr}%</p>
                </div>

                <div className="btn-sack-top">
                    <span></span>
                </div>
            </div>
        </div>
    );
};

export default CampaignCard;
