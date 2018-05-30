import {combineReducers} from 'redux';
import {types, componentStates} from '../Actions/actions.js';
import {mergeAllowed, sortbyDateDescending} from '../Utilities/utilities.js';

let initialState =  {
    user: {
        name: 'guest' + Math.floor(Math.random() * 9999).toString(),
        history: []
    },
    refs: {
        reply: null
    },
    componentStates: {
        articleList: componentStates.INIT,
        article: componentStates.INIT,
        comments: componentStates.INIT
    },
    comments: [],
    articles: {
        loadedPages: [],
        content: []
    },
    reply: {
        threadPath: [],
        to: 'author',
        text: ''
    }
};

const commonReducer = (state, action, type, isObject) => {
    if (action.type === type) {
        return isObject ? mergeAllowed(state, action.value) : action.value;
    }
    return state;
};

const userReducer = (state=initialState.user, action) => {
    switch (action.type) {
        case types.UPDATE_USER: {
            return Object.assign({}, state, action.value);
        }
        default: {
            return state;
        }
    }
};

const componentStatesReducer = (state=initialState.componentStates, action) => {
    switch (action.type) {
        case types.SET_COMPONENT_STATE: {
            return Object.assign({}, state, {[action.id]: action.value});
        }
        default: {
            return state;
        }
    }
}

const refsReducer = (state=initialState.refs, action) => {
    switch (action.type) {
        case types.UPDATE_REFS: {
            return mergeAllowed(state, action.value);
        }
        default: {
            return state;
        }
    }
};

const articlesReducer = (state=initialState.articles, action) => {
    switch (action.type) {
        case types.SET_ARTICLE_LIST: {
            if (!action.value.content || !action.value.page) {
                console.log("no content or page data in article list");
                return state;
            }
            const newArticleHeaders = action.value.content
                .filter(na => 
                    state.content.find(oa => oa.url === na.url) === undefined
                );
            if (newArticleHeaders.length === 0) {
                return state;
            }
            const page = parseInt(action.value.page, 10);
            return {
                ...state,
                loadedPages: state.loadedPages.includes(page) ?
                    state.loadedPages: state.loadedPages.concat(page).sort(),
                content: state.content.concat(newArticleHeaders).sort(sortbyDateDescending)
            };
        }
        case types.SET_ARTICLE: {
            const oldArticles = state.content;
            const articleHeaderIndex = state.content.findIndex(a => a.url === action.value.url);
            console.log(`header index: ${articleHeaderIndex}`);
            const fullArticle = {...action.value, full: true};
            
            console.log(fullArticle);
            //update existing incomplete entry
            if (articleHeaderIndex >= 0) {
                console.log("updating header");
                return {
                    ...state,
                    content: [...oldArticles.slice(0, articleHeaderIndex), fullArticle,
                         ...oldArticles.slice(articleHeaderIndex+1)]
                };
            }
            //add full article
            else {
                console.log("adding article");
                return {
                    ...state,
                    content: [...oldArticles, fullArticle]
                };
            }
        }
        default: {
            return state;
        }
    }
};

const commentsReducer = (state=initialState.comments, action) => {
    switch (action.type) {
        case types.SET_COMMENTS: {
            return action.value;
        }
        default: {
            return state;
        }
    }
};
  
const replyReducer = (state=initialState.reply, action) => {
    switch (action.type) {
        case types.UPDATE_REPLY: {
            return mergeAllowed(state, action.value);
       }
        default: {
            return state;
        }
    }
}

export default combineReducers({
    user: userReducer,
    refs: refsReducer,
    componentStates: componentStatesReducer,
    articles: articlesReducer,
    comments: commentsReducer,
    reply: replyReducer
});
