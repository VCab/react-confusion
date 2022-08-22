import { Component } from "react";
import Home from "./HomeComponent";
import Menu from "./MenuComponent";
import DishDetail from "./DishdetailComponent";
import Header from "./Header";
import Footer from "./Footer";
import { DISHES } from "../shared/dishes";
import { COMMENTS } from "../shared/comments";
import { LEADERS } from "../shared/leaders";
import { PROMOTIONS } from "../shared/promotions";
import { Switch, Route, Redirect } from 'react-router-dom';
import Contact from "./ContactComponent";

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS
        }
    }

    // onDishSelect(dishId) {
    //     this.setState({ selectedDish: dishId });
    // }

    render() {

        const HomePage = () => {
            return (
                <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                    promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.state.leaders.filter((leader) => leader.featured)[0]}
                ></Home>
            );
        }
        return (
            <div>
                <Header></Header>
                <Switch>
                    <Route path="/home" component={HomePage}></Route>
                    <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes}></Menu>}></Route>
                    <Route exact path="/contactus" component={Contact}></Route>
                    <Redirect to="/home"></Redirect>
                </Switch>
                {/* <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
                <div className="container">
                    <div className="row">
                        <DishDetail dishSelected={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
                    </div>
                </div> */}
                <Footer></Footer>
            </div>
        );
    }
}


export default Main;
