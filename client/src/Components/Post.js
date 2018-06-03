import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { componentStates, fetchArticle, fetchComments } from '../Actions';
import Article from './Article';
import Comments from './Comments';
import Error from './Error';
import Loading from './Loading';

class Post extends React.Component {
    static propTypes = {
        articleState: PropTypes.string.isRequired,
        commentsState: PropTypes.string.isRequired,
        article: PropTypes.object,
        comments: PropTypes.array.isRequired
    };

    componentDidMount() {
        this.props.fetchArticle();
        this.props.fetchComments();
    }

    render() {
        if (this.props.article && this.props.article.full) {
            return (
                <React.Fragment>
                    <Article {...this.props.article} />
                    <Comments comments={this.props.comments} updateComments={this.props.fetchComments}
                                articleUrl={this.props.article.url} />
                </React.Fragment>     
            );
        }
        return this.props.articleState === componentStates.ERROR ? <Error /> : <Loading />;
    } ;
};

export default connect((state, ownProps) => ({
    article: state.articles.content.find(a => a.url === ownProps.match.params.postUrl),
    comments: state.comments,
    articleState: state.componentStates.article,
    commentsState: state.componentStates.comments
}), (dispatch, ownProps) => ({
    fetchArticle: () => dispatch(fetchArticle(ownProps.match.params.postUrl)),
    fetchComments: () => dispatch(fetchComments(ownProps.match.params.postUrl))
})
)(Post);