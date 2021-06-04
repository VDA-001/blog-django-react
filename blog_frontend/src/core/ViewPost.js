import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import { IsAuthenticated } from '../auth/helper';
import {CreateComment, getComments, getUserDetail, ViewPostInDetail} from "./helper/coreApiCalls";
import "../SCSS/viewPost.scss";
import Button from 'react-bootstrap/Button';
import Base from './Base';
import {FaRegComments} from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

class ViewPost extends React.Component{
    constructor(props){
        super(props);
        this.state={
            error:false,
            post:[],
            comments:[],
            viewComments:false,
            UserDetail:[],
            content:"",
            show:false,
        };
    }

    handleClose = () =>{
        this.setState({show:false})
    }

    handleShow = () =>{
        this.setState({show:true})
    }

    componentDidMount(){
        this.loadPostInDetail(this.props.match.params.id);
    }
    componentWillUnmount(){
        clearInterval(this.state.error,this.state.post)
    }

    loadPostInDetail(userId){
        //Getting the full data of that particular post using its id 
        ViewPostInDetail(userId)
        .then(data =>{
            if(data.error){
                this.setState({error:data.error})
            }else{
                this.setState({post:data})
            }
        })
        .catch(err => console.log(err))
    }

    loadComments = (postId)  =>{
        getComments(postId)
        .then(data=>{
            if(data.error){
                this.setState({error:data.error})
            }else{
                this.setState({
                    comments:data.comments,
                })
                if(this.state.viewComments){
                    this.setState({viewComments:false})
                }else{
                    this.setState({viewComments:true})
                }
            }
        })
        .catch(err=>console.log(err))
    }

    loadUserDetailOfComment = (author_id)=>{
        getUserDetail(author_id)
        .then(data=>{
            if(data.error){
                this.setState({error:data.error})
            }else{
                this.setState({UserDetail:data})
                return(<p>{this.state.UserDetail.username}</p>);
            }
        })
        .catch(err=>console.log(err))
    }

    handleChange = (name) => (e) =>{
        this.setState({[name]:e.target.value});
    }

    onSubmit = (e) =>{
        this.handleClose();
        e.preventDefault();
        const post_id = this.state.post.id;
        const author_id = IsAuthenticated() && IsAuthenticated().user.id;
        const content = this.state.content;
        console.log(content);
        //Check for null comments
        if(content!==""){
            CreateComment(author_id,post_id,content)
            .then(data=>{
                this.setState({content:""})
            })
            .catch(err=> console.log(err))
        }
    }

    referenceFunction=()=>{
        this.loadComments(this.state.post.id);
        this.handleShow();
    }

    createMarkup = () => {
        return { __html: this.state.post.body};
    }

    render(){
        const Title = this.state.post ? this.state.post.title : "Title";
        const Description = this.state.post ? this.state.post.description : "Description";
        const Image = this.state.post ? this.state.post.image : "/home/vishal/Pictures/01-28-2021-11.32.04.jpg";
        const AuthorName = this.state.post.author ? this.state.post.author.name : "Vishal";
        const AuthorUserName = this.state.post.author ? this.state.post.author.username : "VDA-001";
        const numberOfComments = this.state.post ? this.state.post.number_of_comments : "0";
        //View post in detail

        return(
            <div>
                <Base />
                <div className="sticky-top left-div">
                    <img src={Image} alt="" className="left-div-image"/>
                    <span>
                        <h5>@{AuthorUserName}</h5>
                        <h6>{AuthorName}</h6>
                    </span>
                    <br/>
                    <hr/>
                    <p><FaRegComments className="comment-icon" />:{numberOfComments}</p>
                    <Button onClick={this.referenceFunction}>Comments</Button>
                </div>
                <Modal show={this.state.show} scrollable={true} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Comments</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal-body">{this.state.comments.map((comment,index) =>{
                        return(
                            <div key={index}>
                                <p>{ comment.content}</p>
                                <hr />
                                {/*//TODO: Get detail of owner of the comment*/}
                            </div>
                        );
                    })}</Modal.Body>
                    <Modal.Footer>
                    <InputGroup>
                        <FormControl
                        placeholder="Create Comment"
                        aria-label="Create Comment"
                        aria-describedby="basic-addon2"
                        value={this.state.content} 
                        name="comment" 
                        onChange={this.handleChange('content')}
                        />
                        <InputGroup.Append>
                        <Button variant="outline-secondary" onClick={this.onSubmit}>Create</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    </Modal.Footer>
                </Modal>
                <Container className="post-detail" style={{padding:"50px 200px"}}>
                    <h1>{Title}</h1>
                    <h4 className="description">{Description}</h4>
                    <hr/>
                    <img src={Image} alt=""/>
                    <br /><br />
                    <div dangerouslySetInnerHTML={this.createMarkup()} className="editor"></div>
                    <hr />
                </Container>
            </div>
        );
    }
};

export default ViewPost;