import React from "react";
import "./CommentForm.css";
import Test from "./Test";

function Comment({ comment, onReply, replyCommentId }) {
    const handleReply = () => {
        onReply(comment.id);
    };

    return (
        <div className="comment">
            <p className="comment-text">{comment.text}</p>
            <button onClick={handleReply}>Reply</button>
            {replyCommentId === comment.id && <Test onComment={onReply} replyCommentId={comment.id} />}
            {comment.replies.map((reply) => (
                <Comment comment={reply} onReply={onReply} replyCommentId={replyCommentId} />
            ))}
        </div>
    );
}

export default Comment;
