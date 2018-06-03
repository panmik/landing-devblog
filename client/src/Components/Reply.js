import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updateUser, updateReply, updateRefs, addComment} from '../Actions';

class Reply extends React.Component {
    static propTypes = {
        articleUrl: PropTypes.string.isRequired,
        userName:  PropTypes.string.isRequired,
        setUserName: PropTypes.func.isRequired,
        reply: PropTypes.object.isRequired,
        updateReply: PropTypes.func.isRequired,
        setReplyRef: PropTypes.func.isRequired,
        updateComments: PropTypes.func.isRequired,
        addComment: PropTypes.func.isRequired
    };

    state = {
        text: '',
        msg: '',
        msgClass: 'warning'
    };

    textAreaRef = React.createRef();
    inputRef = React.createRef();

    componentDidMount() {
        this.props.setReplyRef(this.textAreaRef.current);
    }

    handleEditClick = () => {
        /*this.props.setUserName(this.state.userName);
        this.setState({usernameEditable: !this.state.usernameEditable});*/
        this.inputRef.current.focus();
    }

    setUserName = userName => {
        this.props.setUserName(userName);
    }

    handleCancelReplyTo = () => {
        this.props.updateReply({to: "author", threadPath: []});
        this.textAreaRef.current.focus();
    }

    handleAddComment = () => {
        if (this.props.userName.length < 3) {
            this.setState({msg: 'username must be at least 3 characters long', msgClass: 'warning'});
            return;
        }
        if (this.state.text.length < 3) {
            this.setState({msg: 'your comment must be at least 3 characters long', msgClass: 'warning'});
            return;
        }
        if (!this.props.articleUrl || !this.props.userName || !this.state.text || !this.props.reply.threadPath) {
            this.setState({msg: 'invalid reply', msgClass: 'danger'});
            return;
        }

        this.props.updateReply({text: this.state.text});

        const reply = {
            articleUrl: this.props.articleUrl,
            userName: this.props.userName,
            text: this.state.text,
            threadPath: this.props.reply.threadPath
        };
        this.props.addComment(reply)
        .then(res => {
            this.setState({text: '', usernameEditable: false});
            this.handleCancelReplyTo();
            this.setState({msg: 'comment added!', msgClass: 'primary'});
        })
        .catch(err => {
            console.error(err);
            this.setState({msg: "something went wrong", msgClass: 'danger'});
        });
    }

    render() {
        return (
            <div className="card card-comment">
                <div className="card-header">
                    {this.state.msg !== '' && (                
                        <p className='m-0 p-0'>
                            {`${this.state.msg}`}
                            <a className="btn btn-sm btn-link btn-text no-underline py-0 mb-0"
                                onClick={() => this.setState({msg:''})}>
                                x
                            </a>
                        </p>)}
                </div>
                
                <div className="card-body">       
                    <textarea className="form-control reply-text" value={this.state.text} placeholder='Leave a comment'
                         ref={this.textAreaRef} onChange={(e) => this.setState({text: e.target.value})}>
                    </textarea>
                </div>
                <div className="card-footer pb-0">
                    <div className="d-flex justify-content-between">
                        
                        <div className="d-flex">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"
                                        onClick={this.handleEditClick}>post as:</span>
                                </div>

                                <input ref={this.inputRef} type="text" className="form-control form-control-sm inp-group"
                                    placeholder="Username" onChange={(e) => this.setUserName(e.target.value)}
                                    value={this.props.userName} aria-label="Username" aria-describedby="basic-addon1" />
                                
                                {this.props.reply.threadPath.length > 0 && (
                                <div className="input-group-append">
                                    <span className="input-group-text"
                                        onClick={this.handleEditClick}>{`@ ${this.props.reply.to}`}</span>
                                </div>)}
                                
                            </div> 
                        </div>                        

                        <div className={""}>
                            <button className="btn btn-themed float-right" type="button" onClick={this.handleAddComment}
                                    disabled={this.state.text.length<1}>Comment</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }   
}

const mapStateToProps = state => {
    return {
        reply: state.reply,
        userName: state.user.name
    };
};
const mapPropsToDispatch = (dispatch, ownProps) => {
    return {
        setUserName: userName => dispatch(updateUser({name: userName})),
        updateReply: reply => dispatch(updateReply(reply)),
        setReplyRef: ref => dispatch(updateRefs({reply: ref})),
        addComment: reply => dispatch(addComment(reply, ownProps.articleUrl))
    };
};

export default connect(mapStateToProps, mapPropsToDispatch)(Reply);