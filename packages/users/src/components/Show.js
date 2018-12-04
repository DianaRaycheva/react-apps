import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount () {
    if (!localStorage.getItem('jwtToken')) return this.props.history.push('/login');
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

    axios.get(`/api/user/${this.props.match.params.id}`)
      .then(res => 
        this.setState({ user: res.data[0] || {} })
      ).catch(e => console.error('Cannot show user.', e));
  }

  delete (id) {
    //TODO: add a check if user is trying to delete himself and return
    console.log('Deleting user with ID:', id);
    axios.delete(`/api/user/${id}`)
    .then(() => this.props.history.push('/'));
  }

  render () {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title flex">
                <span class="left flex-1">{this.state.user.fname} {this.state.user.lname}</span>
                <span> 
                    <Link to="/">
                        Users
                        <span class="glyphicon glyphicon-th-list margin-left-5" aria-hidden="true" /> 
                    </Link>
                </span>
            </h3>           
          </div>
          <div class="panel-body">
            <table class="table table-bordered">
              <tbody>
                <tr>
                  <th scope="row">First Name</th>
                  <td>{this.state.user.fname}</td> 
                </tr>
                <tr>
                  <th scope="row">Last Name</th>
                  <td>{this.state.user.lname}</td>
                </tr>
                <tr>
                  <th scope="row">Email</th>
                  <td>{this.state.user.email}</td>
                </tr>
                <tr>
                  <th scope="row">Biography</th>
                  <td>{this.state.user.biography}</td>
                </tr>
              </tbody>
            </table>
            
            <button onClick={this.delete.bind(this, this.state.user._id)} class="btn btn-danger left">Delete</button>
            <Link to={`/edit/${this.state.user._id}`} class="btn btn-success left">Edit</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
