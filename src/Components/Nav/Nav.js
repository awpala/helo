import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {connect} from 'react-redux';

const Nav = props => {
    const location = useLocation();
    console.log(props);
    return (
        <div className='nav-container'>
            {location.pathname !== '/'
                ? (
                    <nav>
                        <div>
                            <img src={props.user.profile_picture} alt={props.user.username}/>
                            <p>{props.user.username}</p>
                        </div>
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
};

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Nav);