import React from 'react';
import Oeuvre from "./Oeuvre";


class TousLesOeuvres extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const oeuvres = this.props.oeuvres.map(oeuvre => <Oeuvre
            titre={oeuvre.titre}
            urlImage={oeuvre.urlImage}
            key={oeuvre.id}
            id={oeuvre.id}
            setOeuvre={this.props.setOeuvre}
        />);

        return (
            <div class="contenant">
                {oeuvres}
            </div>
        );
    }
}

export default TousLesOeuvres;
