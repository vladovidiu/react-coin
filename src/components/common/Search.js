import React from 'react';
import { withRouter } from 'react-router-dom';

import Loading from './Loading';

import { API_URL } from '../../config';
import { handleResponse } from '../../helpers';
import './Search.css';

class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            searchResults: [],
            searchQuery: '',
            loading: false,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const { value: searchQuery } = event.target;
        this.setState({
            searchQuery,
            loading: true,
        });

        if (!searchQuery) {
            this.setState({
                loading: false,
            });
            return '';
        }

        fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
            .then(handleResponse)
            .then(response => {
                this.setState({
                    searchResults: response,
                    loading: false,
                });
            });
    }

    handleRedirect(currencyId) {
        this.setState({
            searchQuery: '',
            searchResults: [],
        });

        const { history } = this.props;
        history.push(`/currency/${currencyId}`);
    }

    renderSearchResults() {
        const { searchResults, searchQuery, loading } = this.state;

        if (!searchQuery) return '';

        if (searchResults.length > 0) {
            return (
                <div className="Search-result-container">
                    {searchResults.map(result => (
                        <div
                            className="Search-result"
                            key={result.id}
                            onClick={() => this.handleRedirect(result.id)}
                        >
                            {result.name} ({result.symbol})
                        </div>
                    ))}
                </div>
            );
        }

        if (!loading) {
            return (
                <div className="Search-result-container">
                    <div className="Search-no-result">No results found.</div>
                </div>
            );
        }
    }

    render() {
        const { loading, searchQuery } = this.state;
        return (
            <div className="Search">
                <span className="Search-icon" />
                <input
                    className="Search-input"
                    type="text"
                    placeholder="Currency Name"
                    value={searchQuery}
                    onChange={this.handleChange}
                />
                {loading && (
                    <div className="Search-loading">
                        <Loading width="12px" height="12px" />
                    </div>
                )}

                {this.renderSearchResults()}
            </div>
        );
    }
}

export default withRouter(Search);
