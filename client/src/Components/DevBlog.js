import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Post from './Post';
import ArticleList from './ArticleList';


export default class DevBlog extends React.Component {
    render () {
        return (
            <React.Fragment>
            <Switch>
                <Route exact path={`${this.props.match.url}`} component={ArticleList} />
                <Route path={`${this.props.match.url}/:postUrl`} component={Post} />
            </Switch>
            </React.Fragment>
        );
    }
};