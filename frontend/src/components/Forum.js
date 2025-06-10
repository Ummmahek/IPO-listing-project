import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext';

export default function Forum() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [newReply, setNewReply] = useState({});
    const { user } = useContext(UserContext);

    // Simulated posts data (replace with actual API calls)
    useEffect(() => {
        setPosts([
            {
                id: 1,
                author: 'John Doe',
                content: 'What are your thoughts on the upcoming XYZ IPO?',
                timestamp: '2024-03-09T10:00:00',
                replies: [
                    {
                        id: 1,
                        author: 'Jane Smith',
                        content: 'I think it looks promising based on their financials.',
                        timestamp: '2024-03-09T10:30:00'
                    }
                ]
            }
        ]);
    }, []);

    const handlePostSubmit = (e) => {
        e.preventDefault();
        if (!newPost.trim()) return;

        const post = {
            id: Date.now(),
            author: user.username,
            content: newPost,
            timestamp: new Date().toISOString(),
            replies: []
        };

        setPosts([post, ...posts]);
        setNewPost('');
    };

    const handleReplySubmit = (postId, e) => {
        e.preventDefault();
        if (!newReply[postId]?.trim()) return;

        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    replies: [
                        ...post.replies,
                        {
                            id: Date.now(),
                            author: user.username,
                            content: newReply[postId],
                            timestamp: new Date().toISOString()
                        }
                    ]
                };
            }
            return post;
        });

        setPosts(updatedPosts);
        setNewReply({ ...newReply, [postId]: '' });
    };

    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '2rem'
        }}>
            <h1 style={{
                color: '#2c3e50',
                marginBottom: '2rem',
                textAlign: 'center'
            }}>Discussion Forum</h1>

            <form onSubmit={handlePostSubmit} style={{
                marginBottom: '2rem',
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '10px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Start a new discussion..."
                    style={{
                        width: '100%',
                        minHeight: '100px',
                        padding: '1rem',
                        marginBottom: '1rem',
                        borderRadius: '5px',
                        border: '1px solid #ddd',
                        resize: 'vertical'
                    }}
                />
                <button type="submit" style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}>
                    Post
                </button>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {posts.map(post => (
                    <div key={post.id} style={{
                        backgroundColor: 'white',
                        padding: '1.5rem',
                        borderRadius: '10px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '1rem'
                        }}>
                            <strong style={{ color: '#2c3e50' }}>{post.author}</strong>
                            <span style={{ color: '#666' }}>
                                {new Date(post.timestamp).toLocaleString()}
                            </span>
                        </div>
                        <p style={{ marginBottom: '1rem' }}>{post.content}</p>

                        <div style={{ marginLeft: '2rem' }}>
                            {post.replies.map(reply => (
                                <div key={reply.id} style={{
                                    backgroundColor: '#f8f9fa',
                                    padding: '1rem',
                                    borderRadius: '5px',
                                    marginBottom: '1rem'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginBottom: '0.5rem'
                                    }}>
                                        <strong style={{ color: '#2c3e50' }}>{reply.author}</strong>
                                        <span style={{ color: '#666' }}>
                                            {new Date(reply.timestamp).toLocaleString()}
                                        </span>
                                    </div>
                                    <p>{reply.content}</p>
                                </div>
                            ))}

                            <form onSubmit={(e) => handleReplySubmit(post.id, e)}>
                                <textarea
                                    value={newReply[post.id] || ''}
                                    onChange={(e) => setNewReply({
                                        ...newReply,
                                        [post.id]: e.target.value
                                    })}
                                    placeholder="Write a reply..."
                                    style={{
                                        width: '100%',
                                        minHeight: '60px',
                                        padding: '0.5rem',
                                        marginBottom: '0.5rem',
                                        borderRadius: '5px',
                                        border: '1px solid #ddd',
                                        resize: 'vertical'
                                    }}
                                />
                                <button type="submit" style={{
                                    padding: '0.5rem 1rem',
                                    backgroundColor: '#2ecc71',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}>
                                    Reply
                                </button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 