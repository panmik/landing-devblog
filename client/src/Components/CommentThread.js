import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updateReply} from '../Actions';

//============= SINGLE COMMENT ===============================
const Comment = ({_id, articleId, replies, date, text, userName,
                parentName, threadPath, replyRef, updateReply}) => {

    const depth = threadPath.length;
    const hasChildren = replies.length > 0;

    return (
        <div className="comment-tree">
            <div className="comment-container">
                <div className="card card-comment">
                    <div className="card-header">
                        <strong className="primary-text">{userName}</strong>
                        {(depth === 1 ? ' commented' : ' replied to ')}
                        {(depth !== 1 && <strong className="primary-text">{parentName}</strong>)}
                        {' on '} <div className='d-inline'>{new Date(date).toDateString().substring(4)}</div>

                        <div className="d-inline float-right py-0">
                            <button className="btn btn-sm btn-link btn-text no-underline py-0"
                                onClick={() => {
                                    updateReply({to: userName, threadPath: threadPath});
                                    replyRef.scrollTo();
                                    replyRef.focus();
                                }}>Reply</button>
                        </div>
                    </div>
                    <div className="card-body">
                        <p className="card-text">{text}</p>
                    </div>
                </div>
            </div>
            {hasChildren && <CommentThread comments={replies} parentName={userName} threadPath={threadPath} />}
        </div>
    );
};
Comment.propTypes = {
    _id: PropTypes.string.isRequired,       //-spread
    userName: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    replies: PropTypes.array.isRequired,
    threadPath: PropTypes.array.isRequired, //-thread
    parentName: PropTypes.string.isRequired,
    updateReply: PropTypes.func.isRequired, //-store
    replyRef: PropTypes.any
};
const CommentContainer = connect(
    state => ({
        replyRef: state.refs.reply
    }),
    dispatch => ({
        updateReply: reply => dispatch(updateReply(reply))
    })
)(Comment);

//========================= THREAD =====================================
const CommentThread = ({comments, parentName="author", threadPath=[]}) => {
    const o = 20;
    const d = 40;
    return (
        <div className="comment-thread" style={(threadPath.length !== 0 ?
            {left: `${d}px`, width: `calc(100% - ${d}px)`} : {left:`${o}px`, width: '100%'})}>
            {comments.map((comm, index) =>
                <CommentContainer key={comm._id} {...comm}
                    threadPath={threadPath.concat(index)} parentName={parentName} />
            )}
        </div>
    );
};
CommentThread.propTypes = {
    comments: PropTypes.array.isRequired,
    threadPath: PropTypes.array,
    parentName: PropTypes.string
};

export default CommentThread;