import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Label, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


    function RenderLesson({lesson}) {        
            return (
                <div className="col-12 col-md-5 m-1">
                     <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                    <Card>
                        <CardImg top src={baseUrl + lesson.image} alt={lesson.name} />
                        <CardBody>
                            <CardTitle>{lesson.name}</CardTitle>
                            <CardText>{lesson.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
                    
                </div>
                
            );        
    }

    function RenderComments({comments, postComment, lessonId}) {
        if(comments !=null){
            return(
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                    <Stagger in>
                    {comments.map((commnet) => {
                            return (
                                <Fade in>
                                    <li key = {comments.id}>
                                    <p>{commnet.commnet}</p>
                                    <p>-- {commnet.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric',
                                     month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</p>
                                </li>
                                </Fade>                                
                            );
                        })}  
                    </Stagger>                 
                    </ul>
                    <CommentForm lessonId={lessonId} postComment={postComment} />
                </div>
            );
        }
        else
            return(
                <div></div>
            );  
    }

    class CommentForm extends Component {

        constructor(props) {
            super(props);
            
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);

            this.state = {
                isNavOpen: false,
                isModalOpen: false
            };
        }

        toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }

        handleSubmit(values) {
            this.toggleModal();
            this.props.postComment(this.props.lessonId, values.rating, values.author, values.comment);
        }

        render() {
            return(
                <div>
                    <Button outline onClick={this.toggleModal}><span></span></Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}></Modal>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Col>
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select
                                model=".rating"
                                id="username"
                                name="username"
                                className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                                </Col>                                                 
                            </Row>
                            <Row className="form-group">
                                <Col> 
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text 
                                model=".author"
                                id="author"
                                placeholder="Your Name" 
                                className="form-control" 
                                validators={{
                                    minLength: minLength(3),
                                    maxLength: maxLength(15)
                                }}
                                />
                                <Errors 
                                className="text-danger"
                                model=".author" 
                                show="touched"
                                messages={{
                                 maxLength: "Must be 15 charactors or less",
                                 minLength: "Must be greater than 2 charactors"
                                }}
                                />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" name="comment" rows="6" className="form-control"/>
                                </Col>
                            </Row>
                            
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </div>
            );
        }
    }




    const  LessonDetail = (props) => {
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.lesson != null)             
        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.lesson.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.lesson.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderLesson lesson={props.lesson} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} 
                     postComment={props.postComment}
                     lessonId={props.lesson.id}
                    />
                </div>
            </div>
            </div>
        );
        else
            return(
                <div></div>
            );  
            
    }    
    
export default LessonDetail;