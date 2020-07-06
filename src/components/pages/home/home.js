import './home.css';
import React from 'react';
import {Header, Responsive} from 'semantic-ui-react';
import cakeBG from '../../../resource/background-home.png';
import Menu from "../../basic/menu";
import Card from "../../basic/card/card";

import backend from '../../../api/base';

class Home extends React.Component {

    state = {
        cards: [],
        noDataMsgDisplay: false
    };


    componentDidMount = async () => {
        const response = await backend.get('/offers/');
        if (response.status === 200) {
            this.setState({noDataMsgDisplay: false, cards: response.data});
        } else {
            this.setState({noDataMsgDisplay: true, cards: []});
        }
    };

    renderCards = () => {
        if (!this.state.cards || this.state.cards.length < 1 || this.state.noDataMsgDisplay) {
            return <Header size='huge'>No data to view</Header>;
        }
        return this.state.cards.map((card, key) => {
            console.log(card);
            return <Card key={key} image={card.image} name={card.name} price={card.price}/>;
        });
    };

    render() {
        return (
            <div>
                <Menu/>
                <Responsive {...Responsive.onlyTablet}>
                    <div className="home-view">
                        <img alt="" src={cakeBG}/>
                        <div className="home-text-view">
                            <h2>khathu baking</h2>
                            <p>
                                What are you waiting for? <br/> Enter the deepest worlds<br/>
                                with the tastiest cakes
                            </p>
                        </div>
                    </div>
                </Responsive>
                <Responsive {...Responsive.onlyComputer}>
                    <div className="home-view">
                        <img alt="" src={cakeBG}/>
                        <div className="home-text-view">
                            <h2>khathu baking</h2>
                            <p>What are you waiting for? <br/> Enter the deepest worlds<br/>
                                with the tastiest cakes</p>
                        </div>
                    </div>
                </Responsive>
                <Responsive {...Responsive.onlyMobile}>
                    <div className="home-view">
                        <div className="home-text-view">
                            <h2>khathu baking</h2>
                            <p>What are you waiting for? <br/> Enter the deepest worlds<br/>
                                with the tastiest cakes</p>
                        </div>
                    </div>
                </Responsive>
                <div className="section-two">
                    <div className="view-box">
                        {this.renderCards()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;