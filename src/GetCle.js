import React from 'react';
import axios from "axios";


class GetCle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username : "",
            password : "",
            cle : ""
        };
    }

    changeUsername = (event) => {
        this.setState({username : event.target.value});
    }

    changePassword = (event) => {
        this.setState({password : event.target.value});
    }

    changerCle = (event) => {
        event.preventDefault()

        axios({
            method: 'put',
            url: 'http://museeApi.dvl.to/cle',
            data : {
                "username" : this.state.username,
                "password" : this.state.password
            }
        })
            .then((resultat) => {
                this.setState({cle: resultat.data.cle});
            }).catch((error) => {
            this.setState({cle: "utilisateur invalide ou enregistrement impossible"});
        })
    }
    render() {
        return (
            <form>
                <lable>Nom d'usager  </lable>
                <input value={this.state.username} onChange={this.changeUsername}/>
                <br/>
                <label>Mot de passe  </label>
                <input value={this.state.password} onChange={this.changePassword}/>
                <br/>
                <button onClick={this.changerCle}>Soumettre</button>

                <p>Nouvelle clé d'api : {this.state.cle}</p>
            </form>
        );
    }
}

export default GetCle;
