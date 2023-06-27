import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function CommentHotplace(props) {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedComment, setEditedComment] = useState('');

    const [visibleComments, setVisibleComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3; // 페이지당 댓글 수

    const commentList = props.message.hotplaceReviewDtos;

    const navigate = useNavigate();

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        if (comment.trim() !== '') {
            axios
                .post(`/board/restaurant/insert/${props.id}`, {
                    review: comment,
                    reviewImg: selectedImage,
                }, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                })
                .then((response) => {
                    const nickname = response.data.nickname;
                    // localStorage.setItem('nickname', nickname);
                    // 원하는 페이지로 리다이렉트
                    navigate(`/restaurant/${props.id}`);
                    window.location.reload();
                    console.log(response.data)
                })
                .catch((error) => {
                    // 로그인 에러 처리
                    console.log(error);
                    setError(true);
                    setErrorMessage('실패');
                });

            setComment('');
        }
    };

    const handleCommentDelete = (event, commentId) => {
        event.preventDefault();
        const nickname = localStorage.getItem('nickname');
        if (nickname) {
            // 로그인된 사용자와 댓글 작성자가 같을 때만 삭제 가능
            // 삭제 로직 추가
            axios
                .get(`/board/restaurant/delete/${commentId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                })
                .then((response) => {
                    // 삭제 성공 시 댓글 목록 갱신
                    // setComments(comments.filter((comment) => comment.id !== commentId));
                    console.log(response.data);
                    navigate(`/restaurant/${props.id}`);
                    window.location.reload();
                })
                .catch((error) => {
                    // 삭제 실패 처리
                    console.log(error);
                    setError(true);
                    setErrorMessage('삭제 실패');
                });
        }
    };

    const handleCommentEdit = (commentId) => {
        const nickname = localStorage.getItem('nickname');
        const commentToEdit = commentList.find((comment) => comment.user === nickname);
        if (commentToEdit) {
            setEditingCommentId(commentId);
            setEditedComment(commentToEdit.text);
        }
    };

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleCommentSave = (event, commentId) => {
        event.preventDefault();

        axios
            .post(`/board/restaurant/modify/${commentId}`, {
                    review: editedComment,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
            .then((response) => {
                // 원하는 페이지로 리다이렉트
                navigate(`/restaurant/${props.id}`);
                window.location.reload();
            })
            .catch((error) => {
                // 로그인 에러 처리
                console.log(error);
                console.log(editedComment)
            });
        // setComments(updatedComments);
        // setEditingCommentId(null);
        setEditedComment('');
    };

    useEffect(() => {
        if (commentList) {
            handleShowPageComments(1); // 첫 번째 페이지 댓글 표시
        }
    }, [commentList]);

    const handleShowPageComments = (pageNumber) => {
        const start = (pageNumber - 1) * pageSize;
        const end = start + pageSize;
        const sortedCommentList = [...commentList].reverse();
        setVisibleComments(sortedCommentList.slice(start, end));
        setCurrentPage(pageNumber);
    };

    return (
        <section className="mb-5">
            <div className="card bg-light">
                <div className="card-body">
                    {/* Comment form */}
                    <form className="mb-4" onSubmit={handleCommentSubmit}>
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
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                <button type="submit" className="btn btn-primary">
                                    Add Comment
                                </button>
                            </div>
                        </div>
                    </form>
                    {/* Comment with nested comments */}
                    {visibleComments.map((item) => (
                        <div className="d-flex mb-4" key={item.id}>
                            {/* Parent comment */}
                            <div className="ms-3">
                                <div className="fw-bold">{item.user}</div>
                                {editingCommentId === item.id ? (
                                    <form onSubmit={(event) => handleCommentSave(event, item.id)}>
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
                                        <div className="ms-3">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnUQ8ceiWfL7jF5wOXfmztiVHNvNh49Gie7eT1P8Z2&s" alt="Comment Image" />
                                            {item.review}
                                            {(item.user === localStorage.getItem('nickname'))&& (
                                                <>
                                                    <button
                                                        type="button"
                                                        className="btn btn-link text-primary btn-sm me-2"
                                                        onClick={(event) => handleCommentDelete(event, item.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-link text-primary btn-sm"
                                                        onClick={() => handleCommentEdit(item.id)}
                                                    >
                                                        Edit
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                    {/* Pagination */}
                    {commentList && commentList.length > pageSize && (
                        <nav>
                            <ul className="pagination">
                                {Array.from({ length: Math.ceil(commentList.length / pageSize) }, (_, index) => (
                                    <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index + 1}>
                                        <button className="page-link" onClick={() => handleShowPageComments(index + 1)}>
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    )}
                </div>
            </div>
        </section>
    );
}

export default CommentHotplace;
