import React, {Component} from 'react';
import {connect} from 'react-redux';

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
        // TO-DO
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
                <p>by {post.author_id}</p>
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