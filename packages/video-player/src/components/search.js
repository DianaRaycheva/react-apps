import React, { Component } from 'react';

export default class SearchBar extends Component {
    constructor (props) {
        super(props);
        this.state = {
            term: '',
        };
    }

    onSearchTermChange (term) {
        this.setState({ term });
        this.props.onSearchTermChange(term);
    }

    render () {
        return ( 
            <div className="row">
                <div className="col-sm-6 col-sm-offset-3">
                    <div id="search-container"> 
                        <div className="input-group stylish-input-group">

                            <input 
                                type="text" 
                                className="form-control"  
                                placeholder="Search" 
                                onChange={ e => this.onSearchTermChange(e.target.value) }/>

                            <span className="input-group-addon">
                                <button type="submit">
                                    <span className="glyphicon glyphicon-search"></span>
                                </button>  
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}