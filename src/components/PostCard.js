import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css"; // Ensure Bootstrap Icons are available

const PostCard = ({ post }) => {
    const { user_profile, username, post_url, publish_at, like, comment, share, save, platform } = post;

    return (
        <div className="col-md-6 col-lg-3">
            <div className="post_card p-0 border flex-column">
                {/* User Info */}
                <div className="d-flex p-2 gap-1">
                    <img className="profile-pic" src={user_profile} alt={username} />

                    <div className="col">
                        <label className="form-label">{username}</label>
                        <p className="font-12">Published - {publish_at}</p>
                    </div>

                    {/* Social Media Icons */}
                    <div className="col-2">
                        {platform.includes("facebook") && <i className="bi bi-facebook"></i>}
                        {platform.includes("instagram") && <i className="bi bi-instagram"></i>}
                    </div>
                </div>

                {/* Post Image */}
                <div>
                    <img className="post_img" src={post_url} alt="Post" />
                </div>

                {/* Post Interactions */}
                <div className="d-flex p-3 pt-2 pb-2 gap-3">
                    <div className="d-flex align-items-center flex-column">
                        <i className="bi bi-heart"></i>
                        {like}
                    </div>
                    <div className="d-flex align-items-center flex-column">
                        <i className="bi bi-chat-right"></i>
                        {comment}
                    </div>
                    <div className="d-flex align-items-center flex-column">
                        <i className="bi bi-send"></i>
                        {share}
                    </div>
                    <div className="d-flex align-items-center flex-column">
                        <i className="bi bi-bookmark"></i>
                        {save}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
