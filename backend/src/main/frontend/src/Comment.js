import React, {useEffect, useState} from 'react';

function Comment(props) {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedComment, setEditedComment] = useState('');

    const commentList = props.message.restaurantReviewDtos;

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        if (comment.trim() !== '') {
            const newComment = {
                id: comments.length + 1,
                text: comment,
                commenter: 'Your Name',
            };
            setComments([...comments, newComment]);
            setComment('');
        }
    };

    const handleCommentDelete = (commentId) => {
        setComments(comments.filter((comment) => comment.id !== commentId));
    };

    const handleCommentEdit = (commentId) => {
        const commentToEdit = comments.find((comment) => comment.id === commentId);
        if (commentToEdit) {
            setEditingCommentId(commentId);
            setEditedComment(commentToEdit.text);
        }
    };

    const handleCommentSave = (event, commentId) => {
        event.preventDefault();
        const updatedComments = comments.map((comment) => {
            if (comment.id === commentId) {
                return {...comment, text: editedComment};
            }
            return comment;
        });
        setComments(updatedComments);
        setEditingCommentId(null);
        setEditedComment('');
    };

    return (
        <section className="mb-5">
            <div className="card bg-light">
                <div className="card-body">
                    {/* Comment form */}
                    <form className="mb-4">
                        <div className="row">
                            <div className="col-lg-6">
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    placeholder="Join the discussion and leave a comment!"
                                    value={comment}
                                    onChange={handleCommentChange}
                                />
                            </div>
                            <div className="col-lg-6 d-flex align-items-end">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleCommentSubmit}
                                >
                                    Add Comment
                                </button>
                            </div>
                        </div>
                    </form>
                    {/*{commentList && commentList.map((item) => (*/}
                    {/*   <div key={item.user}>*/}
                    {/*       <div>{item.user}</div>*/}
                    {/*       <div>{item.review}</div>*/}
                    {/*   </div>*/}
                    {/*))}*/}
                    {/* Comment with nested comments*/}
                    {commentList && commentList.map((item) => (
                        <div className="d-flex mb-4" key={item.user}>
                            {/* Parent comment */}
                            <div className="flex-shrink-0">
                                <img
                                    className="rounded-circle"
                                    src="https://dummyimage.com/50x50/ced4da/6c757d.jpg"
                                    alt="..."
                                />
                            </div>
                            <div className="ms-3">
                                <div className="fw-bold">{item.user}</div>
                                {editingCommentId === comment.id ? (
                                    <form onSubmit={(event) => handleCommentSave(event, comment.id)}>
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            value={editedComment}
                                            onChange={(event) => setEditedComment(event.target.value)}
                                        />
                                        <button type="submit" className="btn btn-primary btn-sm me-2">
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary btn-sm"
                                            onClick={() => {
                                                setEditingCommentId(null);
                                                setEditedComment('');
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </form>
                                ) : (
                                    <>
                                        {item.review}
                                        <button
                                            type="button"
                                            className="btn btn-link text-primary btn-sm me-2"
                                            onClick={() => handleCommentDelete(comment.id)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-link text-primary btn-sm"
                                            onClick={() => handleCommentEdit(comment.id)}
                                        >
                                            Edit
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Comment;
