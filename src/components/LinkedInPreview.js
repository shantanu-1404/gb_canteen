import React, { useState } from "react";



const LinkedInPreview = ({ fileData, captionText, buttonText, buttonUrl, buttonColor, selectedPosition }) => (

    <div className="post_card p-0 border flex-column">
        <div className="d-flex p-2 gap-1 align-items-center">
            <img className="p-0 rounded-1 profile-pic"
                src="https://storage.googleapis.com/sportzsaga_imgs/icons/67af0d9b9e088_Frame 1171277432.svg" />

            <div className="col">
                <label className="m-0 form-label">Linkedin</label>
                <p className="m-0 font-12">Here is Preview</p>
            </div>
            <div className="">
                <a><i className="bi p-1 bi-three-dots"></i></a>
            </div>
        </div>
        <div className="d-flex p-2 font-12 pt-0 align-items-center"
            dangerouslySetInnerHTML={{ __html: captionText.replace(/\n/g, "<br/>") }} />
        <div>
            {fileData.type.startsWith("image/") ? (
                <img className="post_img" src={URL.createObjectURL(fileData)} alt="Preview" />
            ) : fileData.type.startsWith("video/") ? (
                <video className="post_img w-100" controls>
                    <source src={URL.createObjectURL(fileData)} type={fileData.type} />
                </video>
            ) : null}
            {buttonText &&
                <a
                    href={buttonUrl}
                    style={{ backgroundColor: buttonColor }}
                    className="d-flex btn rounded-0 justify-content-between align-items-center" >
                    <div className="col">
                        <p className="text-start m-0" >{buttonUrl}</p>
                        <div style={{ textAlign: selectedPosition }}>{buttonText}</div>
                    </div>
                    <small>
                        <span className="p-1 btn-outline-primary rounded-pill border">Learn More</span>
                    </small>
                </a>
            }
        </div>
        <div className="d-flex p-3 pt-2 pb-2 gap-3 justify-content-between">
            <div class="d-flex align-items-center ">
                <i class="bi bi-hand-thumbs-up"></i>Like
            </div>
            <div class="d-flex align-items-center ">
                <i class="bi bi-chat-square-text"></i>Comment
            </div>
            <div class="d-flex align-items-center ">
                <i class="bi bi-reply"></i>Share
            </div>
            <div class="d-flex align-items-center ">
                <i class="bi bi-send"></i>Send
            </div>
        </div>
    </div>
);


export default LinkedInPreview;
