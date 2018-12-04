import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/Style.css';

class Create extends Component {
    constructor() {
        super();
        // There is an issue requiring `joi` so applying a workaround 
        // TODO: investigate an issue occur
        this.joi = require('joi');
        this.state = {
            error: '',
            user: {
                email: '',
                fname: '',
                lname: '',
                biography: '',
                password: '',
                confirm_pass: '',
                updated_date: ''
            }
        };
    }

    validate = () => {
        const Joi = this.joi;
        const validationSchema = Joi.object().keys({
            email: Joi.string().email({ minDomainAtoms: 2 }).required(),
            pass: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            confirm_pass: Joi.string().required(),
            fname: Joi.string().required(),
            lname: Joi.string().required(),            
        });

        const fieldStates = this.state.user;
        return Joi.validate({ 
            email: fieldStates.email, 
            pass: fieldStates.password, 
            confirm_pass: fieldStates.confirm_pass,
            fname: fieldStates.fname, 
            lname: fieldStates.lname
        }, validationSchema);
    };

    onChange = e => {
        const state = this.state;
        state.user[e.target.name] = e.target.value;
        this.setState(state);
    };

    onSubmit = e => {
        e.preventDefault();

        const { email, fname, lname, biography, password, confirm_pass } = this.state.user;
        const isInvalid = this.validate().error;
        
        // return error response if validation do not pass
        // TODO: add more user friendly messages
        let currentState = this.state;
        if (isInvalid || password !== confirm_pass) {
            currentState.error = isInvalid ? (isInvalid.details || []).reduce(function(memo, err) {
                return memo[err.key] = err.message;
            }, {}) : 'Passwords must match each other.';
            return this.setState(currentState);
        } 

        // register new user and return to users list page
        axios.post(
            '/api/auth/create', 
            { email, fname, lname, biography, password }
        ).then(() => this.props.history.push('/'));
    };

    render() {
        const { user, error } = this.state;
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title flex">
                            <span class="left flex-1">Create a user</span>
                            <span> 
                                <Link to="/">
                                    Users
                                    <span class="glyphicon glyphicon-th-list margin-left-5" aria-hidden="true" /> 
                                </Link>
                            </span>
                        </h3>
                    </div>
                    <div class="panel-body">
                        <form onSubmit={this.onSubmit}>

                            <div className={!!this.state.error ? 'error' : ''}>{error}</div>
                            
                            <div class="form-group">
                                <label for="email">* Email:</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    name="email" 
                                    value={user.email} 
                                    onChange={this.onChange} 
                                    placeholder="Email" />
                            </div>
                            <div class="form-group">
                                <label for="password">* Password:</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    name="password"
                                    value={user.password}
                                    onChange={this.onChange}
                                    placeholder="Password"
                                />
                            </div>
                            <div class="form-group">
                                <label for="password">* Confirm Password:</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    name="confirm_pass"
                                    value={user.confirm_pass}
                                    onChange={this.onChange}
                                    placeholder="Confirm password"
                                />
                            </div>
                            <hr/>
                            <div class="form-group">
                                <label for="fname">* First Name:</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    name="fname" 
                                    value={user.fname} 
                                    onChange={this.onChange} 
                                    placeholder="First Name" />
                            </div>
                            <div class="form-group">
                                <label for="lname">* Last Name:</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    name="lname" 
                                    value={user.lname} 
                                    onChange={this.onChange} 
                                    placeholder="Last Name" />
                            </div>
                            <div class="form-group">
                                <label for="biography">Biography:</label>
                                <textArea
                                    class="form-control"
                                    name="biography"
                                    onChange={this.onChange}
                                    placeholder="Biography"
                                    cols="80"
                                    rows="3">
                                    {user.biography}
                                </textArea>
                            </div>
                            <button type="submit" class="btn btn-default">
                                Create
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Create;
