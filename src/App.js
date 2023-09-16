import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

export default function App() {
    const user = JSON.parse(localStorage.getItem('profile'));
    return (
        <BrowserRouter>
            <Container maxWidth='xl'>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Navigate to="/posts" />} />
                    <Route path="/posts" element={<Home />} />
                    <Route path="/posts/search" element={<Home />} />
                    <Route path="/posts/:id" element={<PostDetails />} />
                    <Route path="/auth" Component={() => !user ? <Auth /> : <Navigate to='/posts' />} />
                    <Route path="*" Component={() => (
                        <div>
                            <h1>404 Page Not Found</h1>
                        </div>
                    )} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
};