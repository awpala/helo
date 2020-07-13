import React, {Component} from 'react';
import axios from 'axios';

class Auth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    // Event Handlers
    handleInput = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleLogin = () => {
        const {username, password} = this.state;
        axios.post('api/login', {username, password})
        .then(res => {
            // this.props.getUser(res.data)
            this.props.history.push('/dash');
        })
        .catch(err => console.log(err));

    }

    handleRegister = () => {
        const {username, password} = this.state;
        axios.post('api/register', {username, password})
        .then(res => {
            // this.props.getUser(res.data);
            this.props.history.push('/dash');
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <h1>Helo</h1>
                <p>Username:</p>
                <input
                    type='text'
                    value={this.state.username}
                    name='username'
                    placeholder='Enter Username'
                    onChange={e => this.handleInput(e)}
                />
                <p>Password:</p>
                <input
                    type='password'
                    value={this.state.password}
                    name='password'
                    placeholder='Enter Password'
                    onChange={e => this.handleInput(e)}
                />
                <div className='auth-buttons'>
                    <button onClick={this.handleLogin}>Login</button>
                    <button onClick={this.handleRegister}>Register</button>
                </div>
            </div>
        )
    }
};

export default Auth;