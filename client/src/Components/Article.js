import React from 'react';
import PropTypes from 'prop-types';
import TextContent from './TextContent';

const Article = ({url, title, intro, date, tags, body}) => {
    return (
        <React.Fragment>
            <h2 className="">{title}</h2> 
            <p className="secondary-text">{tags.join(', ')}</p>    
            <TextContent body={body} />
            <hr/>
        </React.Fragment>
    );
};
Article.propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    intro: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    tags: PropTypes.array.isRequired,
    body: PropTypes.array.isRequired
};

export default Article;