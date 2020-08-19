// vendor
import React from 'react';
import { Link } from 'react-router-dom';

// proj
import { book } from '../../routes';
import First from '../../styles/images/prizes/first.png';
import Second from '../../styles/images/prizes/second.png';
import Third from '../../styles/images/prizes/third.png';
import Icon from '../../styles/images/icons/rules.svg';
import StepWinHeader from '../../styles/images/layout/presents.png';
import stepBattleHeader from '../../styles/images/layout/battle.png';
import stepCreateHeader from '../../styles/images/layout/create.png';

// own
import Styles from './styles.module.css';

const startDate = process.env.REACT_APP_EVENT_START_DATE;
const endDate = process.env.REACT_APP_EVENT_END_DATE;
const dayTimeStart = process.env.REACT_APP_EVENT_START_TIME;
const dayTimeEnd = process.env.REACT_APP_EVENT_FINAL_TIME;
const finalistsCount = process.env.REACT_APP_EVENT_FINALISTS_COUNT;
const registerEndDate = process.env.REACT_APP_EVENT_REGISTER_END_DATE;

const HomeContainer = () => (
    <div className='container'>
        <div className={ Styles.homeTitle }>
            <div className={ Styles.mainText }>Develop a smart bot</div>
            <div className={ Styles.subText }>Compete with other participants</div>
            <div className={ Styles.subText }>Win prizes</div>
            <div className={ Styles.prizeList }>
                <img className={ Styles.prizeImage } src={ First } alt='PS4'
                     title='Game console PlayStation 4 Pro 1TB'/>
                <img className={ Styles.prizeImage } src={ Second } alt='SegaMegaDriveMini'
                     title='Game console Sega Mega Drive Mini'/>
                <img className={ Styles.prizeImage } src={ Third } alt='HobbyWorldFallout'
                     title='Board game Hobby World Fallout'/>
            </div>
            <Link to={ book.rules } className={ Styles.acceptButton }>
                Challenge accepted
            </Link>
        </div>
        <div className='content'>
            <div className='title'>How to participate</div>
            <div className={ Styles.guideContainer }>
                <div className={ Styles.guideStep }>
                    <div className={ Styles.steps }>
                        <img src={ stepCreateHeader } alt='Develop' />
                    </div>
                    <div className={ Styles.stepTitle }>DEVELOP</div>
                    <div className={ Styles.stepDescription }>
                        <div>
                            Download the game project
                        </div>
                        <br />
                        <div>
                            Create logic to move your Bot
                        </div>
                    </div>
                </div>
                <div className={ Styles.guideStep }>
                    <div className={ Styles.steps }>
                        <img src={ stepBattleHeader } alt='Fight' />
                    </div>
                    <div className={ Styles.stepTitle }>FIGHT</div>
                    <div className={ Styles.stepDescription }>
                        <div>
                            Compete with other participants
                        </div>
                        <br />
                        <div>
                            Improve your Bot every day
                        </div>
                        <br />
                        <div>
                            More modifications - more chances!
                        </div>
                    </div>
                </div>
                <div className={ Styles.guideStep }>
                    <div className={ Styles.steps }>
                        <img src={ StepWinHeader } alt='Win' />
                    </div>
                    <div className={ Styles.stepTitle }>WIN</div>
                    <div className={ Styles.stepDescription }>
                        <div>
                            Take one of the three prizes and win:
                        </div>
                        <br/>
                        <ol>
                            <li>place - Game console PlayStation 4 Pro 1TB</li>
                            <li>place - Game console Sega Mega Drive Mini</li>
                            <li>place - Board game Hobby World Fallout</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className='title'>Правила гри</div>
            <p>
                Download the game project. Create logic to move your Bot.
                Get the most points to be among the Finalists.
            </p>
            <p>
                The competition will be every day from { startDate } till { registerEndDate }&nbsp;
                except weekends, starting at { dayTimeStart } o'clock
                and ending at { dayTimeEnd } o'clock.
                { finalistsCount } finalists are determined each day.
            </p>
            <p>
                Participate in the Final on { endDate }. Take one of the three prizes
                seats and get a drive gift!
            </p>
            <p>
                Look for detailed rules and game design to create a bot
                &nbsp;
                <Link to={ book.rules }>
                    by the link <img src={ Icon } alt='Contest Rules' />
                </Link>
            </p>
        </div>
    </div>
);

export default HomeContainer;
