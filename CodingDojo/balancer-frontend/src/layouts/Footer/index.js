// vendor
import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FacebookShareButton } from 'react-share';

// proj
import { book } from '../../routes';
import Styles from './styles.module.css';

const orgEmail = process.env.REACT_APP_EVENT_ORG_EMAIL;
const joinSlackUrl = process.env.REACT_APP_JOIN_CHAT_LINK;

export class Footer extends PureComponent {
    render() {
        return (
            <div className={ Styles.footer }>
                <ul className={ Styles.navigation }>
                    <li>
                        {/*<NavLink to={ book.privacyRules }>
                            Rules and regulations
                        </NavLink>*/}
                    </li>
                    <li>
                        {/*<NavLink to={ book.privacyPolicy }>
                            Privacy policy
                        </NavLink>*/}
                    </li>
                </ul>
                <ul className={ classnames(Styles.navigation) }>
                    <li>
                        <a href={ 'mailto:' + orgEmail }>
                            Contact us
                            <FontAwesomeIcon
                                className={ Styles.navigationIcon }
                                icon={ [ 'far', 'envelope' ] }
                                style={ { color: '#fff' } }
                            />
                        </a>
                    </li>
                    <li>
                        <div className={ Styles.share }>
                            <FacebookShareButton
                                className={ Styles.facebookShare }
                                url={ process.env.REACT_APP_EVENT_LINK }
                            >
                                Share
                                <FontAwesomeIcon
                                    className={ Styles.navigationIcon }
                                    icon={ [ 'fas', 'share-alt' ] }
                                    style={ { color: '#fff' } }
                                />
                            </FacebookShareButton>
                        </div>
                    </li>
                    <li>
                        <a href={ joinSlackUrl } rel='noopener noreferrer' target='_blank'>
                            Join the chat
                            <FontAwesomeIcon
                                className={ Styles.navigationIcon }
                                icon={ [ 'far', 'comments' ] }
                                style={ { color: '#fff' } }
                            />
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}
