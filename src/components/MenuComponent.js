import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardTitle, List } from "reactstrap";
import DishDetail from "./DishdetailComponent";

class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDish: null
        }
    };

    onDishSelect(dish) {
        this.setState({ selectedDish: dish });
    }

    renderDish(dish) {
        if (dish) {
            return (
                <DishDetail dishSelected={this.state.selectedDish} />
            )
        } else {
            return (
                <div></div>
            )
        }
    }

    renderComments(comments) {
        if (comments.length) {
            const commentsList = comments.map((comment) =>
                <div>
                    <li className="mb-2">{comment.comment}</li>
                    <li className="mb-2">-- {comment.author}, {comment.date}</li>
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

    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
                <div className="col-12 col-md-5 m-1">
                    <Card key={dish.id} onClick={() => this.onDishSelect(dish)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.state.selectedDish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.state.selectedDish && this.renderComments(this.state.selectedDish.comments)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Menu;