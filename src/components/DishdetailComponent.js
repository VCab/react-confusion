import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, List, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    toggleModal() {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}><i className="fa fa-pencil mr-1"></i>Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row>
                                <Col className="form-group">
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="form-group">
                                    <Label htmlFor="author">Your Name</Label>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors className="text-danger" model=".author" show="touched" messages={{
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}></Errors>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="form-group">
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Button type="submit" color="primary">
                                Submit
                            </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }

}

function RenderDish({ dish }) {
    return (
        <Card>
            <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}></CardImg>
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    )
}

function RenderComments({ comments, addComment, dishId }) {
    if (comments.length) {
        const commentsList = comments.map((comment) =>
            <div>
                <li className="mb-2">{comment.comment}</li>
                <li className="mb-2">-- {comment.author}, {new Intl.DateTimeFormat('en-us', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</li>
            </div>
        );
        return (
            <div>
                <h4>Comments</h4>
                <List type="unstyled">
                    {commentsList}
                </List>
                <CommentForm dishId={dishId} addComment={addComment}></CommentForm>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

const DishDetail = (props) => {
    const dish = props.dish;
    if (props.isLoading) {
        return (
            <div className='container'>
                <div className='row'>
                    <Loading></Loading>
                </div>
            </div>
        );
    } else if (props.errMess) {
        return (
            <div className='container'>
                <div className='row'>
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    } else if (dish) {
        return (
            <div className='container'>
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{dish.name}</h3>
                        <hr></hr>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={dish}></RenderDish>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments}
                            addComment={props.addComment}
                            dishId={props.dish.id}>
                        </RenderComments>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div></div>
        )
    }
}



export default DishDetail;