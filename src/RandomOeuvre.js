import React from 'react';
import axios from "axios";


class RandomOeuvre extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titre: "Sans titre",
            urlImage: "placeholder.jpg"
        };
    }

    changerOeuvre = () => {
        axios({
            method: 'get',
            url: 'http://museeApi.dvl.to/oeuvre'
        })
            .then((resultat) => {
                this.setState({titre: resultat.data.oeuvre[0].titre})
                //this.setState({urlImage: resultat.data.oeuvre[0].urlImage})
            })
    }

    render() {
        return (
            <div class="contenant-vertical">
                <p class="titre">{this.state.titre}</p>
                <img class="main-oeuvre" src={require("./Images/" + this.state.urlImage)}/>
                <button class="bouton-pour-changer" onClick={this.changerOeuvre}>Changer l'oeuvre</button>
            </div>
        );
    }
}

export default RandomOeuvre;
