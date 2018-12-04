import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    if (!localStorage.getItem('jwtToken')) return this.props.history.push('/login');
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

    axios.get(`/api/user/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ 
          user: res.data[0] || {} 
        });
        console.log(this.state.user);
      });
  }

  onChange = (e) => {
    const state = this.state.user
    state[e.target.name] = e.target.value;
    this.setState({user:state});
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { fname, lname, biography, email } = this.state.user;

    // TODO: add fields validation here as well
    // Edit selected user by id and show his details
    axios.put(
      `/api/user/${this.props.match.params.id}`, 
      { fname, lname, biography, email }
    ).then(() => this.props.history.push(`/show/${this.props.match.params.id}`))
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT USER
            </h3>
          </div>
          <div class="panel-body">
            <h4>
              <Link to={`/show/${this.state.user._id}`}>
                <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> 
                Users List
              </Link>
            </h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="fname">First Name:</label>
                <input 
                  type="text" 
                  class="form-control" 
                  name="fname" 
                  value={this.state.user.fname} 
                  onChange={this.onChange} 
                  placeholder="First Name" />
              </div>
              <div class="form-group">
                <label for="lname">Last Name:</label>
                <input 
                  type="text" 
                  class="form-control" 
                  name="lname" 
                  value={this.state.user.lname} 
                  onChange={this.onChange} 
                  placeholder="Last Name" />
              </div>
              <div class="form-group">
                <label for="email">Email Address:</label>
                <input 
                  class="form-control" 
                  name="email" 
                  disabled 
                  placeholder={this.state.user.email}/>
              </div>
              <div class="form-group">
                <label for="biography">Biography:</label>
                <textarea 
                  rows="4" 
                  class="form-control" 
                  name="biography" 
                  value={this.state.user.biography} 
                  onChange={this.onChange} 
                  placeholder="Biography"></textarea>
              </div>
              <button type="submit" class="btn btn-default">Edit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
