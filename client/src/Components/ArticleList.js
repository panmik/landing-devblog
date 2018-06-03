import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchArticleList, componentStates} from '../Actions';
import Error from './Error';
import Loading from './Loading';
import ArticleCard from './ArticleCard';
import Pager from './Pager';

class ArticleList extends React.Component {
    static propTypes = {
        articles: PropTypes.array.isRequired,
        loadedPages: PropTypes.array.isRequired,
        articleListState: PropTypes.string.isRequired
    }

    state = {
        page: 1,
        articlesPerPage: 5
    }

    componentDidMount() {
        this.fetchArticleListAndUpdatePage(this.state.page);
    }

    fetchArticleListAndUpdatePage = (page) => {
        this.setState({page});
        this.props.fetchArticleList(page);
    }

    render () {
        const loadedArticlesBeforeCurrentPage =
            this.props.loadedPages.findIndex(p => p === this.state.page) * this.state.articlesPerPage;

        return (
            <React.Fragment>
                {this.props.articleListState === componentStates.LOADED && loadedArticlesBeforeCurrentPage >= 0 &&    
                <div className="card-columns">
                    {this.props.articles
                        .slice(loadedArticlesBeforeCurrentPage, loadedArticlesBeforeCurrentPage + this.state.articlesPerPage)
                        .map(a => <ArticleCard key={a.url} {...a} toLink={`${this.props.match.url}/${a.url}`} />)}
                </div>
                }
                {this.props.articleListState === componentStates.ERROR && <Error />}
                {this.props.articleListState === componentStates.LOADING && <Loading />}
                <Pager fetchPage={this.fetchArticleListAndUpdatePage} />
            </React.Fragment>
        );
    }
};

export default connect(state => ({
        articles: state.articles.content,
        loadedPages: state.articles.loadedPages,
        articleListState: state.componentStates.articleList
    }), dispatch => ({      
        fetchArticleList: (page) => dispatch(fetchArticleList(page))
    })
)(ArticleList);