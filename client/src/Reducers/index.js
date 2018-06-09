import {combineReducers} from 'redux';
import {types, componentStates} from '../Actions';
import {mergeAllowed, sortByDateDescending} from '../Utilities';

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

// helpful in debugging state changes
const reducerLogger = (context='reducer:') =>
    (items) => {
        console.log(context);
        for (const i of items) {
            console.log(i);
        }
        console.log('-------------');
    };

// for reducers that are simple assign/merge ops and match a single type
// could improve to account for more elaborate mutations
const commonReducer = (initialStateValue, matchedType, logger=null) => 
    (state=initialStateValue, action) => {
        if (action.type === matchedType) {   
            const newState = Array.isArray(action.value) ? action.value : mergeAllowed(state, action.value);
            logger && logger([state, action.value, newState]); 
            return newState;
        }
        return state;
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

const articlesReducer = (state=initialState.articles, action) => {
    switch (action.type) {
        case types.SET_ARTICLE_LIST: {
            if (!action.value.content || !action.value.page) {
                console.error("no content or page data in article list");
                return state;
            }
            const newArticleHeaders = action.value.content
                .filter(na => state.content.find(oa => oa.url === na.url) === undefined);

            if (newArticleHeaders.length === 0) {
                return state;
            }
            const page = parseInt(action.value.page, 10);
            return {
                ...state,
                loadedPages: state.loadedPages.includes(page) ?
                    state.loadedPages: state.loadedPages.concat(page).sort(),
                content: state.content.concat(newArticleHeaders)
            };
        }
        case types.SET_ARTICLE: {
            const cachedArticles = state.content;
            const articleHeaderIndex = state.content.findIndex(a => a.url === action.value.url);
            const fullArticle = {...action.value, full: true};

            //update existing incomplete entry
            if (articleHeaderIndex >= 0) {
                return {
                    ...state,
                    content: [...cachedArticles.slice(0, articleHeaderIndex), fullArticle,
                         ...cachedArticles.slice(articleHeaderIndex+1)]
                };
            }
            //add full article
            else {
                return {
                    ...state,
                    content: [...cachedArticles, fullArticle]
                };
            }
        }
        default: {
            return state;
        }
    }
};

export default combineReducers({
    user: commonReducer(initialState.user, types.UPDATE_USER, reducerLogger()),
    refs: commonReducer(initialState.refs, types.UPDATE_REFS),
    componentStates: componentStatesReducer,
    articles: articlesReducer,
    comments: commonReducer(initialState.comments, types.SET_COMMENTS, reducerLogger("in comments reducer:")),
    reply: commonReducer(initialState.reply, types.UPDATE_REPLY),
});
