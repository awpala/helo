import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';

class Nav extends Component {
    render() {
        return (
            <div className='nav-container'>
                {this.props.location.pathname !== '/'
                    ? (
                        <nav>
                            <Link to='/dashboard' className='nav-links'>
                                <button>Home</button>                        
                            </Link>
                            <Link to='/new' className='nav-links'>
                                <button>New Post</button>                        
                            </Link>
                            <Link to='/' className='nav-links'>
                                <button>Logout</button>                       
                            </Link>
                        </nav>
                    )
                    : null
                }
            </div>
        );
    }
};

export default withRouter(Nav);