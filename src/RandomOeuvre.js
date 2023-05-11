import React from 'react';


class RandomOeuvre extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.changerOeuvreHasard()
    }

    handleSupprimerOeuvre = () => {
        this.props.supprimerOeuvre(this.props.oeuvreActuelle.id)
    }

    render() {
        return (
            <div class="contenant-vertical">
                <div class="titre">{this.props.oeuvreActuelle.titre}</div>

                <img class="main-oeuvre" src={require("./Images/" + this.props.oeuvreActuelle.urlImage)}/>
                <div id="boutonPoubelle">
                <img id={"poub"} src={require("./Images/poubelle.png")} onClick={this.handleSupprimerOeuvre}/>
                <button class="bouton-pour-changer" onClick={this.props.changerOeuvreHasard}>Afficher un oeuvre au hasard</button>
                </div>
            </div>
        );
    }
}

export default RandomOeuvre;
