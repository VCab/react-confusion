import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {

    render() {

        const dish = this.props.dishSelected;
        if (dish) {
            return (
                <div className='container'>
                    <div className='row'>
                        <Card>
                            <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default DishDetail;