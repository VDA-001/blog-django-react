import React from 'react';
import {useHistory} from 'react-router-dom';

export const PostCard = ({post}) =>{
    //Getting all the info about the card
    const CardTitle = post.value ? post.value.title : "Card Title";
    const CardDescription = post.value ? post.value.description : "Card Description";
    const CardImage = post.value ? post.value.image : "/home/vishal/Pictures/01-28-2021-11.32.04.jpg";
    const CardAuthorName = post.value.author ? post.value.author.name : "Vishal";
    const CardAuthorUserName = post.value.author ? post.value.author.username : "VDA-001";
    const history = useHistory();

    //redirecting to view/:id to get detail of post
    function handleClick(){
        history.push(`/post/view/${post.value.id}`);
    };
    
    return(
        <div onClick={() => handleClick()} className="Card" style={{width:"25%",border:"2px solid black"}}>
            <h1>{CardTitle}</h1>
            <h4>{CardDescription}</h4>
            <img src={CardImage} style={{width:"100%"}} alt=""/>
            <p>{CardAuthorName}</p>
            <p>{CardAuthorUserName}</p>
        </div>
    );
};

export const CategoryCard =({category}) =>{
    const CardTitle = category ? category.title : "Card Title";
    const CardDescription = category ? category.description : "Card Description";
    const history = useHistory();

    function handleClick(){
        history.push(`/category/view/${category.id}`);
    };

    return(
        <div onClick={() =>handleClick()} className="Card" style={{width:"25%",border:"2px solid black"}}>
            <h1>{CardTitle}</h1>
            <h4>{CardDescription}</h4>
        </div>
    );
};