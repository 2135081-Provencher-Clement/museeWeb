import React from 'react';
import RandomOeuvre from "./RandomOeuvre";


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <RandomOeuvre/>
            </div>
        );
    }
}

export default Main;
