import React from "react";
import { useNavigate } from "react-router-dom";

const FormHeader = ({ title, backUrl = "/", closeUrl = "/" }) => {
    const navigate = useNavigate();

    return (
        <h3 className="d-flex justify-content-between align-items-center">
            <a onClick={() => navigate(backUrl)}>
                <i className="bi bi-arrow-left m-3"></i>
                {title}
            </a>
            <a onClick={() => navigate(closeUrl)}>
                <i className="bi bi-x-lg"></i>
            </a>
        </h3>
    );
};

export default FormHeader;
