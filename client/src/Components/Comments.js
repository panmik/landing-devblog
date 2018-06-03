import React from 'react';
import PropTypes from 'prop-types';
import CommentThread from './CommentThread';
import ReplyContainer from './Reply';
import {sorByDateDescending} from '../Utilities';

/*<p className="text-centered">Leave a comment <i className="fa fa-comment-alt icon-sm"></i></p>*/
const Comments = ({comments, updateComments, articleUrl}) => {
    return (
        <div className="container-fluid comments-container">
            <CommentThread comments={comments/*.sort(sortbyDateDescending)*/} />
            <hr className="f80" />
            <ReplyContainer updateComments={updateComments} articleUrl={articleUrl} />
        </div>
    );
};
Comments.propTypes = {
    comments: PropTypes.array.isRequired,
    articleUrl: PropTypes.string.isRequired,
    updateComments: PropTypes.func.isRequired
};

export default Comments;
