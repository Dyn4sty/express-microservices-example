import React, { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState("");
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
        content,
      });
    } catch (err) {
      console.log("Error", err);
    }
    setContent("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            className="form-control"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Create Comment</button>
      </form>
    </div>
  );
};

export default CommentCreate;
