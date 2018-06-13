import React from 'react';
import PropTypes from 'prop-types';

const TextContent = ({body}) => {
    return (
        <div className="text-content">
            {body.map((elem, index) => {
                if (elem.options && elem.options.width) {
                    console.log(elem.content);
                }
                switch (elem.type) {
                    case 'paragraph': {
                        return <p className='paragraph-content' key={index}>{elem.content}</p>
                    }
                    case 'subheader': {
                        return <h3 className='subheader-content' key={index}>{elem.content}</h3>
                    }
                    case 'image-inline': {
                        return <img className='image-inline' key={index} width={elem.options ? elem.options.width || '600' : '600'} height='auto' src={elem.content} alt="" />
                    }
                    case 'image': {
                        return <img className={(elem.options && elem.options.width) ? 'image-center' : 'image-content'} width={elem.options && elem.options.width} height='auto' key={index} src={elem.content} alt="" />
                    }
                    default: {
                        return <p key={index}>???</p>
                    }
                }
            })}
        </div>
    );
};
TextContent.propTypes = {
    body: PropTypes.array.isRequired
};

export default TextContent;