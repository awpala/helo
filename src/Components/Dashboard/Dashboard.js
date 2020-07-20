import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: '',
            isMyPost: true,
            posts: []
        };
    }

    // Event Handlers
    handleInput = e => {
        this.setState({ searchTerm: e.target.value });
    }

    handleSearch = () => {
        const { user_id, username } = this.props.user;
        const { isMyPost, searchTerm } = this.state;
        axios.get(`/api/posts/${user_id}&userposts=${isMyPost}&search=${searchTerm}`)
        .then(res => this.setState({ posts: res.data }))
        .catch(err => console.log(err));
    }

    handleReset = () => {
        this.setState({ searchTerm: '' })
    }

    handleCheck = () => {
        this.setState({ isMyPost: !this.state.isMyPost });
    }

    render() {
        const mappedPosts = this.state.posts.map(post => (
            <div className='posts'>
                <p>{post.title}</p>
                <p>by {post.username}</p>
                <img key={post.post_id} src={post.profile_picture} alt='post'/>
            </div>
        ));

        return (
        <div>
            <input
                type='text'
                value={this.state.searchTerm}
                name='search-term'
                placeholder='Search by Title'
                onChange={e => this.handleInput(e)}
            />
            <div className='search-buttons'>
                <button onClick={this.handleSearch}>Search</button>
                <button onClick={this.handleReset}>Reset</button>
                <p>My Posts</p>
                <input
                    type='checkbox'
                    value={this.state.isMyPost}
                    name='my-posts'
                    onChange={this.handleCheck}
                />
            </div>
            <div className='posts'>
                {mappedPosts}
            </div>
        </div>
        );
    }
};

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Dashboard);