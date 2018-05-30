import React from 'react';
import PropTypes from 'prop-types';

export default class Pager extends React.Component {
    static propTypes = {
        fetchPage: PropTypes.func.isRequired
    }

    state = {
        page: 1,
        pageCount: 2
    };

    setPage = (page) => {
        console.log("page:");
        console.log(page);
        console.log("----");
        const p = Math.min(Math.max(page, 1), this.state.pageCount);
        this.setState({page: p});
        this.props.fetchPage(p);
    }

    render() {
        return (
            <nav className="" aria-label="Page navigation">
                <ul className="pagination pager justify-content-center">
                    <li className={"page-item" + (this.state.page <= 1 && " disabled")}><a className="page-link"
                        href="javascript:void(0)" onClick={() => this.setPage(this.state.page-1)}>Previous</a>
                    </li>
                    {[...Array(this.state.pageCount).keys()].map(pageIndex => 
                    <li key={pageIndex+1} className={`page-item${this.state.page === pageIndex + 1 && ' active'}`}>
                        <a className="page-link" href="javascript:void(0)"
                        onClick={() => this.setPage(pageIndex+1)}>{pageIndex+1}</a>
                    </li>)}
                    <li className={"page-item "+ (this.state.page >= this.state.pageCount && " disabled")}>
                        <a className="page-link" to=""
                        href="javascript:void(0)" onClick={() => this.setPage(this.state.page+1)}>Next</a>
                    </li>
                </ul>
            </nav>
        );
    }
}