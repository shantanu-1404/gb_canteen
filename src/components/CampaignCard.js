import React from "react";

const CampaignCard = ({ campaign }) => {
    const { status, budget, spend, ctr } = campaign;

    return (
        <div className="col-md-6 col-lg-4">
            <div className="section_card flex-column">
                <h6 className="card-title col-8">Campaign Details</h6>

                <div className="row">
                    <strong className="col">Current Status - </strong>
                    <p className={`col ${status.toLowerCase()}`}>{status}</p>
                </div>
                <div className="row">
                    <strong className="col">Budget - </strong>
                    <p className="col">{budget.toLocaleString()}</p>
                </div>
                <div className="row">
                    <strong className="col">Spend - </strong>
                    <p className="col">{spend.toLocaleString()}</p>
                </div>
                <div className="row">
                    <strong className="col">CTR - </strong>
                    <p className="col">{ctr}%</p>
                </div>

                <div className="btn-sack-top">
                    <span></span>
                </div>
            </div>
        </div>
    );
};

export default CampaignCard;
