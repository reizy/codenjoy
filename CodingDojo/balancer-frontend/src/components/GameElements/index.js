import React, {Component} from "react";
import Styles from "./styles.module.css";

import ElementsBomberman from "./bomberman";
import ElementsICanCode from "./icancode";

const Elements = function getElements() {
    switch (process.env.REACT_APP_GAME) {
        case 'icancode' :
            return ElementsICanCode;
        case 'bomberman' :
            return ElementsBomberman;
    }
}();

export class GameElements extends Component {
    render() {
        const {  settings  } = this.props;

        return (
            <div className={ Styles.gameElements }>
                { Elements.map(({ image, title, description }) => (
                    <div key={ title } className={ Styles.elementContainer }>
                        <img
                            className={ Styles.elementImage }
                            src={ image }
                            alt={ title }
                        />
                        <div className={ Styles.elementDescriptionContainer }>
                            <div className={ Styles.elementTitle }>{ title }</div>
                            <div className={ Styles.elementDescription }
                                 dangerouslySetInnerHTML={{__html: description.replace('*', '<a href="#settings">*</a>') }}/>
                        </div>
                    </div>
                )) }
            </div>
        );
    }
}
