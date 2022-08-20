import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, List } from 'reactstrap';

function RenderDish({ dish }) {
    return (
        <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    )
}

function RenderComments({comments}) {
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
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

const DishDetail = (props) => {
    const dish = props.dishSelected;
    if (dish) {
        return (
            <div className='container'>
                <div className='row'>
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={dish}></RenderDish>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={dish.comments}></RenderComments>
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