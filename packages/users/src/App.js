import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './css/Style.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount () {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        
        axios.get('/api/user').then(res => {
            this.setState({ users: res.data });
            console.info(this.state.users);
        })
        .catch(error => {
            if (error.response.status === 401) this.props.history.push('/login');
            else console.error('Connot load app', error);
        });
    }

    logout () {
        localStorage.removeItem('jwtToken');
        window.location.reload();
    };

    render () {
        return (
            <div class="container">
                <div class="bcg-transparent">
                    {localStorage.getItem('jwtToken') && (
                        <button class="btn btn-primary" onClick={this.logout}>
                            Logout
                        </button>
                    )}
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title flex">
                            <div class="flex-1">Users</div>
                            <Link to="/create">
                                New<span class="glyphicon glyphicon-plus-sign margin-left-5" aria-hidden="true" />
                            </Link>
                        </h3>
                    </div>
                    <div class="panel-body">
                        <table class="table table-stripe">
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Biography</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.users.map(user => (
                                    <tr>
                                        <td> <Link to={`/show/${user._id}`}>{user.fname}</Link> </td>
                                        <td> <Link to={`/show/${user._id}`}>{user.lname}</Link> </td>
                                        <td> {user.biography} </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
