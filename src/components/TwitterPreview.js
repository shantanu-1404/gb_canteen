import React, { useState } from "react";




const TwitterPreview = ({ fileData, captionText, buttonText, buttonUrl, buttonColor, selectedPosition }) => (

    <div className="post_card p-0 border flex-column">
        <div className="d-flex p-2 gap-1 align-items-center">
            <img className="p-0 profile-pic"
                src="https://storage.googleapis.com/sportzsaga_imgs/icons/67af0ef11bc4f_Frame 1171277437.svg" />

            <div className="col">
                <label className="m-0 d-flex align-items-center form-label">
                    X
                    <p style={{ fontSize: 12 }} className="m-0 form-label">@twitter</p>
                </label>
                <d className="m-0 font-12"
                    dangerouslySetInnerHTML={{ __html: captionText.replace(/\n/g, "<br/>") }} />
            </div>
            <div className="">
                <a><i className="bi p-1 bi-three-dots"></i></a>
            </div>
        </div>
        <div>
            {fileData.type.startsWith("image/") ? (
                <img className="post_img" src={URL.createObjectURL(fileData)} alt="Preview" />
            ) : fileData.type.startsWith("video/") ? (
                <video className="post_img w-100" controls>
                    <source src={URL.createObjectURL(fileData)} type={fileData.type} />
                </video>
            ) : null}
            <a
                href={buttonUrl}
                style={{ backgroundColor: buttonColor }}
                className="d-flex rounded-0 btn justify-content-between align-items-center">
                <div className="col">
                    <p className="text-start m-0" >{buttonUrl}</p>
                    <div style={{ textAlign: selectedPosition }}>{buttonText}</div>
                </div>
            </a>
        </div>
        <div className="d-flex p-3 pt-2 pb-2 gap-2 justify-content-between">

            <div className="d-flex align-items-center ">
                <i className="bi bi-chat-right"></i>
            </div>
            <div className="d-flex align-items-center ">
                <i className="bi bi-arrow-down-up"></i>
            </div>
            <div className="d-flex align-items-center ">
                <i className="bi bi-heart"></i>
            </div>
            <div className="d-flex align-items-center ">
                <i className="bi bi-box-arrow-up"></i>
            </div>
        </div>
    </div>
);

export default TwitterPreview;
