import React from 'react';
import { getPost, getUserDetail } from './helper/coreApiCalls';
import { PostCard } from "./Card";
import Base from "./Base";
import { IsAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user:[],
            checkPost:false,
            filteredPost:[],
            error:false,
        }
    }

    componentDidMount(){
        //Getting the user details and his/her posts
        this.loadUserDetail();
        this.loadPosts();
    }

    loadUserDetail(){
        //Getting authenticated users id
        const userId = IsAuthenticated() && IsAuthenticated().user.id;
        getUserDetail(userId)
        .then(data=>{
            if(data.error){
                this.setState({error:data.error})
            }else{
                this.setState({user:data})
            }
        })
        .catch(err=>console.log(err))
    }

    loadPosts(){
        getPost()
        .then(data =>{
            if(data.error){
                this.setState({error:data.error})
            }else{
                //Filtering the data to get current authenticated users posts
                let filteredData = data.filter((post) =>{
                    if(post.author.id === this.state.user.id){
                        return post;
                    }
                }) || [];
                if(filteredData!=null){
                    this.setState({filteredPost:filteredData,checkPost:true})
                }
            }
             
        })
    }

    handleClick = (id) =>{
        console.log(id);
        return(
            <Link to={`/update-post/${id}`} />
        );
    }

    render(){
        return(
            <div>
                <Base />
                <p>{this.state.user.username}</p>
                <p>{this.state.user.name}</p>
                <hr/>
                {this.state.checkPost && this.state.filteredPost.map((post,index)=>{
                    return(
                        <div key={index}>
                            <PostCard post = {post} />
                            <Link to={`/update-post/${post.id}`} >Update</Link>
                        </div>
                    )
                })}
            </div>
        );
    }
};

export default Profile;