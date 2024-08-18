import { Avatar } from "antd";
import React from "react";
import './css/whoToFollow.css'


const WhoToFollow = ({ data, handleFollow, handleUnfollow}) => {

  const { id, username, isFollowing } = data;


  return (
    <div className="follow-content">
      <Avatar
        size={40}
        // round={true}
        src={data?.photoURL}
      />
      <div className="info">
        <h3>{truncate(String(data?.name), 15)}</h3>
        <span>@{String(data?.email).split("@")[0]}</span>
      </div>

      {isFollowing ? (
        <button onClick={() => handleUnfollow(data?.id)}>Unfollow</button>
      ) : (
        <button onClick={() => handleFollow(data?.id)}>Follow</button>
      )}

      {/*<button
        style={{
          marginLeft: "auto",
        }}
      >
        Follow
      </button>*/}
    </div>
  );
};

export default WhoToFollow;


export function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}