import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from 'react-redux';

import { deletePost, likePost } from "../../../actions/posts";

import useStyles from './styles'
import { useNavigate } from "react-router-dom";


const Post = ({ post, setCurrentId }) => {

    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.profile?._id))
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const openPost = () => {
        navigate(`/posts/${post._id}`);
    }


    return (
        <Card className={classes.card} raised elevation={6}>

            <CardMedia className={classes.media} image={post?.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} component='div' />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="h6">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {user?.profile?._id === post?.creator && (
                <div className={classes.overlay2}>
                    <Button
                        style={{ color: 'white' }}
                        size="small"
                        onClick={() => setCurrentId(post._id)}
                    >
                        <MoreHorizIcon fontSize="medium" />
                    </Button>
                </div>
            )}
            <ButtonBase className={classes.cardAction} onClick={openPost}>
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color='textSecondary' component="p">{post.message}</Typography>
                </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button color="primary" size="small" disabled={!user?.profile} onClick={() => { dispatch(likePost(post._id)) }}>
                    <Likes />
                </Button>
                {user?.profile?._id === post?.creator && (
                    <Button color="primary" size="small" onClick={() => { dispatch(deletePost(post._id)) }}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>
                )}
            </CardActions>

        </Card>
    );
};

export default Post;