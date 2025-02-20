import React, { useState } from "react";




const YouTubePreview = ({ fileData, captionText, buttonText, buttonUrl, buttonColor, selectedPosition }) => (

    <div className="post_card p-0 border flex-column">
        <div>
            {fileData.type.startsWith("image/") ? (
                <img className="post_img rounded-top" src={URL.createObjectURL(fileData)} alt="Preview" />
            ) : fileData.type.startsWith("video/") ? (
                <video className="post_img w-100" controls>
                    <source src={URL.createObjectURL(fileData)} type={fileData.type} />
                </video>
            ) : null}
        </div>
        <div className="d-flex p-2 gap-1 align-items-center">
            <img class="p-0 profile-pic"
                src="https://storage.googleapis.com/sportzsaga_imgs/icons/67af0d9b0a93f_Frame%201171277433.svg" />

            <div className="col">
                <label className="m-0 form-label"
                    dangerouslySetInnerHTML={{ __html: captionText.replace(/\n/g, "<br/>") }} />
                <p className="m-0 font-12">Youtube</p>
            </div>
            <div>
                <a><i className="bi p-1 bi-three-dots"></i></a>
            </div>
        </div>
    </div>
);

export default YouTubePreview;
