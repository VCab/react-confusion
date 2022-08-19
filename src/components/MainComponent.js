import { Component } from 'react';
import { Navbar, NavbarBrand, List } from 'reactstrap';
import Menu from './MenuComponent';
import DishDetail from "./DishdetailComponent";
import { DISHES } from '../shared/dishes';

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            selectedDish: null
        }
    }

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId });
    }

    // renderDish(dish) {
    //     if (dish) {
    //         return (
    //             <DishDetail dishSelected={this.state.selectedDish} />
    //         )
    //     } else {
    //         return (
    //             <div></div>
    //         )
    //     }
    // }

    renderComments(comments) {
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

    render() {
        return (
            <div>
                <Navbar dark color="primary">
                    <div className='container'>
                        <NavbarBrand href='/'>Ristorante Con Fusion</NavbarBrand>
                    </div>
                </Navbar>
                <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
                <div className='container'>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <DishDetail dishSelected={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            {this.state.selectedDish && this.renderComments(this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0].comments)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Main;
