import React, { useState } from "react";
import Comment from "./Comment";
import "./CommentForm.css";

function Test() {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [replyCommentId, setReplyCommentId] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!commentText.trim()) return;
        const newComment = {
            id: comments.length + 1,
            text: commentText,
            replies: [],
        };
        if (replyCommentId !== null) {
            const parentCommentIndex = comments.findIndex((comment) => comment.id === replyCommentId);
            const parentComment = comments[parentCommentIndex];
            const updatedParentComment = {
                ...parentComment,
                replies: [...parentComment.replies, newComment],
            };
            setComments([
                ...comments.slice(0, parentCommentIndex),
                updatedParentComment,
                ...comments.slice(parentCommentIndex + 1),
            ]);
        } else {
            setComments([...comments, newComment]);
        }
        setCommentText("");
        setReplyCommentId(null);
    };

    const handleCommentTextChange = (event) => {
        setCommentText(event.target.value);
    };

    const handleReply = (commentId) => {
        setReplyCommentId(commentId);
    };

    return (
        <div className="comment-form">
            <h2>Comments</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="commentText">Leave a comment:</label>
                    <textarea id="commentText" value={commentText} onChange={handleCommentTextChange} />
                </div>
                <button type="submit">Submit</button>
            </form>
            {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} onReply={handleReply} replyCommentId={replyCommentId} />
            ))}
        </div>
    );
}

export default Test;
