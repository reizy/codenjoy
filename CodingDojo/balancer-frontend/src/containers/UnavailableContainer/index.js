// vendor
import React from 'react';

// own
import Styles from './styles.module.css';

const UnavailableContainer = () => (
    <div className='container'>
        <div className='content'>
            <div className={ Styles.unavailableContainer }>
                <h2 className='title'>Dear players!</h2>
                <p>
                    At the moment, we are preparing for the Final between the players.
                </p>
                <p>
                    We will inform the finalists in the near future about
                    when and in what format the Final will take place.{ ' ' }
                </p>
            </div>
        </div>
    </div>
);

export default UnavailableContainer;
