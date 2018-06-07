import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const ArticleCard = ({title, thumbnail, toLink, intro, date}) => {
    console.log(thumbnail);
    return (
        <div key={toLink} className="card">
            {title.substr(0,4) !== "Deve" &&
            <img className="card-img-top" src={thumbnail ? thumbnail : "/images/placeholder.png"} alt="article thumbnail" />}
            <div className="card-body">
                <Link to={toLink}>
                    <h5 className="card-title">{title}</h5>
                </Link>
                <p className="card-text">{intro}</p>
            </div>
            <div className="card-footer">
                <small className="secondary-text">
                    {`last updated on ${new Date(date).toDateString().substr(4)}`}
                </small>
            </div>
        </div> 
    );
};
ArticleCard.propTypes = {
    toLink: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    intro: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired
};

export default ArticleCard;