import React, {Component} from 'react';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner/spinner";
import PlanetView from "./planet-view";

import './random-planet.css'
import ErrorIndicator from "../error-indicator/error-indicator";


class RandomPlanet extends Component {
    swapiService = new SwapiService();

    state = {
        planet: {},
        loading: true,
        error: false,
    };

    componentDidMount() {
        this.updatePlanet();
        this.interval = setInterval(this.updatePlanet, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    onPlanetLoaded = (planet) => {
        this.setState({
            planet,
            loading: false,
        });
    };

    onError = (err) => {
        this.setState({
            error: true,
            loading: false,
        })
    };

    updatePlanet = () => {
        console.log('update')
        const id = Math.floor(Math.random() * 17) + 2;
        this.swapiService
            .getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError);
    }

    render() {
        console.log('render')
        const {planet, loading, error} = this.state;

        const errorMessage = error ? <ErrorIndicator/> : null
        const spinner = loading ? <Spinner/> : null;
        const content = !loading && !error ? <PlanetView planet={planet}/> : null;

        return (
            <div className="random-planet jumbotron rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

export default RandomPlanet;
