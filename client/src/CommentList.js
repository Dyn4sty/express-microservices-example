import React, { useState, useEffect } from "react";

import axios from "axios";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function getComments(postId) {
      try {
        const { data } = await axios.get(
          `http://localhost:4001/posts/${postId}/comments`
        );
        setComments(data);
      } catch (err) {
        console.log(err);
      }
    }
    getComments(postId);
  }, []);
  console.log(postId, comments);
  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });
  return <ul>{renderedComments}</ul>;
};

export default CommentList;
