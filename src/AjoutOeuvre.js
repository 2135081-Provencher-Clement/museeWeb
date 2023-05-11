import React from 'react'
import axios from "axios";

class AjoutOeuvre extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modifier: false,
            nomOeuvre: "",
            images: [
                "amogne car.png",
                "BoClement.jpg",
                "Fémixx.png",
                "JFF.jpg"
            ]
        };
    }

    handleNomchange = (event) => {
        this.setState({nomOeuvre: event.target.value})
    }

    handleNomchangeMain = (event) => {
        this.setState({nomOeuvre: event.target.value})
        console.log(this.props.oeuvreActuelle)
        this.props.setOeuvre({
            id: this.props.oeuvreActuelle.id,
            titre: event.target.value,
            urlImage: this.props.oeuvreActuelle.urlImage
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        if(this.state.modifier === true) {
            axios({
                method: 'put',
                url: 'http://museeApi.dvl.to/oeuvre/' + this.props.oeuvreActuelle.id,
                data : {
                    "titre": this.state.nomOeuvre,
                    "urlImage": this.props.oeuvreActuelle.urlImage
                },
                headers : {
                    Authorization : '4455987'
                }
            }).then((resultat) => {
                this.props.modifieOeuvre(resultat.data)
            })
        } else {
            let indexRandom = Math.floor(Math.random()*this.state.images.length)
            let image = this.state.images[indexRandom]
            axios({
                method: 'post',
                url: 'http://museeApi.dvl.to/oeuvre',
                data : {
                    "titre": this.state.nomOeuvre,
                    // Sélectionne une image au hasard
                    "urlImage": image
                },
                headers : {
                    Authorization : '4455987'
                }
            }).then((resultat) => {
                this.props.addOeuvre(resultat.data)
            })
        }
    }

    setModifier = (event) => {
        event.preventDefault()
        this.setState({modifier: true})
    }

    unsetModifier = (event) => {
        event.preventDefault()
        this.setState({modifier: false})
    }

    render() {
        if( this.state.modifier === true ) {
            return (
                <form>
                    <button onClick={this.unsetModifier}>Ajouter</button>
                    <h1>Modifier un oeuvre</h1>
                    <input id="inputOeuvre" type={"text"} value={this.props.oeuvreActuelle.titre} onChange={this.handleNomchangeMain}/>
                    <button type={"submit"} onClick={this.handleSubmit}>Modifier Oeuvre</button>
                </form>
            );
        } else {
            return (
                <form>
                    <button onClick={this.setModifier}>Modifier</button>
                    <h1>Ajouter un oeuvre</h1>
                    <input id="inputOeuvre" type={"text"} onChange={this.handleNomchange}/>
                    <button type={"submit"} onClick={this.handleSubmit}>Ajouter Oeuvre</button>
                </form>
            );
        }
    }
}

export default AjoutOeuvre;
