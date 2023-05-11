import React from 'react';


class Oeuvre extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSetOeuvre = () => {
        let oeuvre = {
            titre: this.props.titre,
            urlImage: this.props.urlImage,
            id: this.props.id
        }
        this.props.setOeuvre(oeuvre);
    }

    render() {
        return (
            <div onClick={this.handleSetOeuvre} id={"oeuvre-" + this.props.id}>
                <img class="tiny-oeuvre" src={require("./Images/" + this.props.urlImage)}/>
                <p class="tiny-titre" id={"nom-oeuvre-" + this.props.id}>{this.props.titre}</p>
            </div>
        );
    }
}

export default Oeuvre;
