import React from 'react';
import './card.css';
import {Segment, Label, Image} from "semantic-ui-react";

class Card extends React.Component {

    render() {
        return (
            <Segment className="card-box" padded>
                <img alt="" src={this.props.image}/>
                <div>{this.props.name}</div>
                <Label  tag attached='top right'>
                    ${this.props.price}
                </Label>
            </Segment>
        );
    }
}

export default Card;