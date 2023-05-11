import React from 'react';
import RandomOeuvre from "./RandomOeuvre";
import TousLesOeuvres from "./TousLesOeuvres";
import AjoutOeuvre from "./AjoutOeuvre";
import axios from "axios";
import GetCle from "./GetCle";


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            oeuvreActuelle: {
                id: -1,
                titre: "",
                urlImage: "placeholder.jpg"
            },
            compliment: "",
            oeuvres: []
        };
    }

    componentDidMount() {
        this.changerOeuvres();
        this.setState({isLoaded: true});
    }

    changerOeuvres = () => {
        axios({
            method: 'get',
            url: 'http://museeApi.dvl.to/oeuvres',
            headers : {
                Authorization : '4455987'
            }
        })
            .then((resultat) => {
                this.setState({oeuvres: resultat.data.oeuvres});
            })
    }

    changerOeuvreHasard = () => {
        axios({
            method: 'get',
            url: 'http://museeApi.dvl.to/oeuvre',
            headers : {
                Authorization : '4455987'
            }
        })
            .then((resultat) => {
                this.setState({oeuvreActuelle: resultat.data.oeuvre[0]});
            })
        this.changerCompliment()
    }

    changerCompliment = () => {
        axios({
            method: 'get',
            url: 'https://complimentr.com/api'
        })
            .then((resultat) => {
                this.setState({compliment: resultat.data.compliment})
            })
    }

    supprimerOeuvre = (id) => {
        axios({
            method: 'delete',
            url: ('http://museeApi.dvl.to/oeuvre/' + id),
            headers : {
                Authorization : '4455987'
            }
        })
            .then((resultat) => {

                for( let i = 0; i < this.state.oeuvres.length; i += 1) {
                    if (this.state.oeuvres[i].id === id) {
                        delete this.state.oeuvres[i];
                    }
                }
                delete document.getElementById("oeuvre-" + id)

                this.changerOeuvres()

                this.changerOeuvreHasard();

                alert("oeuvre supprimée avec succès")
            }).catch((error) => {

        })
    }

    setOeuvre = (oeuvre) => {
        this.setState({oeuvreActuelle: oeuvre});
        this.changerCompliment()
    }

    addOeuvre = (oeuvre) => {
        this.setState({oeuvres: this.state.oeuvres.concat([oeuvre])})
        alert("oeuvre ajoutée avec succès")
    }

    modifieOeuvre = (oeuvre) => {
        for ( let i = 0; i < this.state.oeuvres.length; i += 1) {
            if(this.state.oeuvres[i] === oeuvre.id) {
                let tempOeuvres = this.state.oeuvres
                tempOeuvres[i] = oeuvre
                this.setState({oeuvre: tempOeuvres})
            }
        }

        alert("oeuvre modifiée avec succès")
    }

    render() {

        if (this.state.isLoaded) {
            return (
                <div>
                    <RandomOeuvre supprimerOeuvre={this.supprimerOeuvre} oeuvreActuelle={this.state.oeuvreActuelle} changerOeuvreHasard={this.changerOeuvreHasard}/>
                    <h3>« {this.state.compliment} »</h3>
                    <br/>
                    <AjoutOeuvre setOeuvre={this.setOeuvre} modifieOeuvre={this.modifieOeuvre} addOeuvre={this.addOeuvre} oeuvreActuelle={this.state.oeuvreActuelle}/>
                    <TousLesOeuvres setOeuvre={this.setOeuvre} oeuvres={this.state.oeuvres}/>
                    <GetCle/>
                </div>
            );
        } else {
            return (
                <div>
                    <p>Chargement en cours...</p>
                </div>
            )
        }
    }
}

export default Main;
