// vendor
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowUp,
    faArrowRight,
    faAnchor,
    faLightbulb,
} from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';

// own
import Styles from './styles.module.css';

export default class ActionsPanel extends Component {
    _getTitle() {
        if (this.props.isExiting) {
            return 'Leaving the room...';
        } else if (this.props.isJoining) {
            return 'Connecting to the room...';
        } else if (this.props.isRoomExited) {
            return 'Leaving the room is done';
        } else if (this.props.isRoomJoined) {
            return 'Connected to the room';
        } else if (this.props.ownIndex === -1) {
            return 'You do not have a game room';
        }

        return 'You are in the game room';
    }

    _getLampStyle() {
        if (this.props.isExiting || this.props.isJoining) {
            return Styles.actionInProgress;
        } else if (this.props.isRoomExited) {
            return Styles.exitedRoomRequest;
        } else if (this.props.isRoomJoined) {
            return Styles.joinedRoomRequest;
        } else if (this.props.ownIndex === -1) {
            return Styles.exitedRoom;
        }

        return Styles.joinedRoom;
    }

    _renderToTopButton() {
        const { rating, setParticipant, scrollToPosition } = this.props;

        return (
            !!rating.length && (
                <FontAwesomeIcon
                    title='Show leaders'
                    onClick={ () => {
                        setParticipant(_.first(rating));
                        scrollToPosition(0);
                    } }
                    className={ Styles.toTop }
                    icon={ faArrowUp }
                />
            )
        );
    }

    _renderToMyPositionButton() {
        const {
            rating,
            ownIndex,
            setParticipant,
            scrollToPosition,
        } = this.props;

        return (
            ownIndex !== -1 && (
                <FontAwesomeIcon
                    title='To my position'
                    onClick={ () => {
                        setParticipant(rating[ ownIndex ]);
                        scrollToPosition(ownIndex);
                    } }
                    className={ Styles.toMyPosition }
                    icon={ faArrowRight }
                />
            )
        );
    }

    _isDisabled() {
        const { isJoining, isExiting, isRoomExited, isRoomJoined } = this.props;

        return isJoining || isExiting || isRoomExited || isRoomJoined;
    }

    render() {
        const {
            ownIndex,
            selectedIndex,
            watchPosition,
            id,
            active,

            setWatchPosition,
            scrollToPosition,
            exitRoom,
            joinRoom,
        } = this.props;

        return (
            <div className={ Styles.participantHeader }>
                Participant
                { this._renderToMyPositionButton() }
                { this._renderToTopButton() }
                <FontAwesomeIcon
                    title={
                        watchPosition
                            ? 'Follow the position'
                            : 'Free to view'
                    }
                    onClick={ () => {
                        setWatchPosition(!watchPosition);
                        if (!watchPosition) {
                            scrollToPosition(selectedIndex);
                        }
                    } }
                    className={
                        watchPosition ? Styles.watchPosition : Styles.freeMove
                    }
                    icon={ faAnchor }
                />
                { id && active && (
                    <FontAwesomeIcon
                        icon={ faLightbulb }
                        title={ this._getTitle() }
                        className={ this._getLampStyle() }
                        onClick={
                            this._isDisabled()
                                ? void 0
                                : ownIndex === -1
                                    ? joinRoom
                                    : exitRoom
                        }
                    />
                ) }
            </div>
        );
    }
}
