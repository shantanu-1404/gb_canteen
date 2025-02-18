import React, { useState } from "react";


const InstagramPreview = ({ fileData, captionText, buttonText, buttonUrl, buttonColor, selectedPosition }) => (

    <div className="post_card p-0 border flex-column">
        <div className="d-flex p-2 gap-1 align-items-center">
            <img className="p-0 profile-pic"
                src="https://storage.googleapis.com/sportzsaga_imgs/icons/67af0d9b59e66_Frame 1171277431.svg" />

            <div className="col">
                <label className="m-0 form-label">Instagram</label>
                <p className="m-0 font-12">Here is Preview</p>
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
            {buttonText &&
                <a style={{ backgroundColor: buttonColor }}
                    href={buttonUrl}
                    className="d-flex rounded-0 btn justify-content-between align-items-center">
                    <div
                        style={{ textAlign: selectedPosition }}
                        className="col">
                        {buttonText}
                    </div>
                    <i className="bi bi-chevron-right"></i>
                </a>
            }

        </div>
        <div className="d-flex p-3 pt-2 pb-2 gap-3 justify-content-between">
            <div className="d-flex gap-3">
                <div className="d-flex align-items-center flex-column">
                    <i className="bi bi-heart"></i>
                </div>
                <div className="d-flex align-items-center flex-column">
                    <i className="bi bi-chat-right"></i>
                </div>
                <div className="d-flex align-items-center flex-column">
                    <i className="bi bi-send"></i>
                </div>
            </div>

            <div className="d-flex align-items-center flex-column">
                <i className="bi bi-bookmark"></i>
            </div>
        </div>
        <div className="d-flex p-2 font-12 pt-0 align-items-center"
            dangerouslySetInnerHTML={{ __html: captionText.replace(/\n/g, "<br/>") }} />
    </div>

);

export default InstagramPreview;
