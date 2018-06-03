import axios from 'axios';
import {getPropertyByDotNotation} from '../Utilities';

const componentStates = {
    NOT_MOUNTED: 'NOT_MOUNTED',
    INIT: 'INIT',
    LOADING: 'LOADING',
    LOADED: 'LOADED',
    ERROR: 'ERROR'
};

const types = {
    UPDATE_USER: 'UPDATE_USER',
    UPDATE_REFS: 'UPDATE_REFS',
    SET_COMPONENT_STATE: 'SET_COMPONENT_STATE',
    UPDATE_REPLY: 'UPDATE_REPLY',
    SET_ARTICLE_LIST: 'SET_ARTICLE_LIST',
    SET_ARTICLE: 'SET_ARTICLE',
    SET_COMMENTS: 'SET_COMMENTS',
    ADD_COMMENT: 'ADD_COMMENT'
};

const actionCreator = (type, value=null, id=null, parentId=null) => ({type, value, id, parentId});

//-----------------------------------------------------------

const setComponentState = (componentState, componentId) =>
    actionCreator(types.SET_COMPONENT_STATE, componentState, componentId);


const fetchDataWithLoadingAndError = (url, componentId, handleResponseActionCreator, cacheFieldName=null, cacheUrl=null) => {
    return (dispatch, getState) => {
        dispatch(setComponentState(componentStates.LOADING, componentId));

        //do not dispatch if cached
        if (cacheFieldName && cacheUrl) {
            const cachedObj = getPropertyByDotNotation(getState(), cacheFieldName).find(co => co.url === cacheUrl);
            if (cachedObj && cachedObj.full) {
                return "is cached";
            }
        }

        return axios.get(url)
        .then(res => {
            dispatch(handleResponseActionCreator(res.data));
            dispatch(setComponentState(componentStates.LOADED, componentId));
            return "fetch data ok!";
        })
        .catch(err => {
            console.log(`ERROR fetching from "${url}"`);
            dispatch(setComponentState(componentStates.ERROR, componentId));
        });
    };
};

/* update* receives object, set* a field value, add* takes either, fetch calls api */
const updateReply = reply => actionCreator(types.UPDATE_REPLY, reply);
const updateRefs = refs => actionCreator(types.UPDATE_REFS, refs);
const updateUser = user => actionCreator(types.UPDATE_USER, user);

const setArticleList = articleListData => actionCreator(types.SET_ARTICLE_LIST, articleListData);
const setArticle = article => actionCreator(types.SET_ARTICLE, article);
const setComments = comments => actionCreator(types.SET_COMMENTS, comments);

const fetchArticleList = (page) => 
    fetchDataWithLoadingAndError(`/articles?page=${page}`, 'articleList', setArticleList);
const fetchArticle = postUrl =>
    fetchDataWithLoadingAndError(`/articles/${postUrl}`, 'article', setArticle, 'articles.content', postUrl);
const fetchComments = postUrl =>
    fetchDataWithLoadingAndError(`/comments/${postUrl}`, 'comments', setComments);

const addComment = (reply, postUrl) => {
    return dispatch => {
        return axios.post('/comments', reply)
        .then(res => {
            return dispatch(fetchComments(postUrl));
        })
        .catch(err => {
            throw new Error(err.response.data);
        });
    }
};

export {
    types, componentStates,
    updateUser, updateRefs, updateReply,
    fetchArticleList, fetchArticle, fetchComments,
    addComment
};
