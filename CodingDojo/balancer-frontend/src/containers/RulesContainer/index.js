// vendor
import React, {  Component  } from 'react';
import {  connect  } from 'react-redux';
// import classnames from 'classnames';
import {  Link  } from 'react-router-dom';
import {  CopyToClipboard  } from 'react-copy-to-clipboard';

// proj
import {  GameElements  } from '../../components';
import {  getGameConnectionString, getJavaClient  } from '../../utils';
import { requestSettingsStart } from '../../redux/settings';
import {  book  } from '../../routes';
import Icon from '../../styles/images/icons/rules.svg';
import BoardSample from '../../styles/images/game/field-sample.png';

// own
import Styles from './styles.module.css';

const BOARD_EXAMPLE =
`board=☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼     &        #  #   ☼☼ ☼ ☼ ☼ ☼ ☼ ☼ ☼ ☼
☼ ☼ ☼☼    # # #      ####  ☼☼ ☼ ☼ ☼ ☼ ☼#☼ ☼ ☼ ☼ ☼ ☼☼☺            #
  #☼☼ ☼ ☼ ☼ ☼҉☼ ☼ ☼#☼ ☼ ☼#☼☼# ### + ҉        &  #☼☼#☼ ☼ ☼ ☼҉☼♥☼ ☼ ☼ ☼
☼ ☼☼     ♣H҉҉H     #  #  ☼☼#☼ ☼#☼ ☼҉☼ ☼ ☼ ☼ ☼ ☼ ☼☼ # #    ҉#    # ♥
  ☼☼ ☼ ☼ ☼#☼҉☼ ☼ ☼ ☼ ☼ ☼ ☼☼                     ☼☼ ☼ ☼#☼ ☼ ☼ ☼ ☼ ☼ ☼♣
☼ ☼☼        &            ☼☼ ☼ ☼#☼ ☼ ☼ ☼ ☼ ☼ ☼ ☼ ☼☼  # #  #
# ☼☼&☼#☼ ☼ ☼ ☼ ☼#☼ ☼#☼ ☼ ☼☼     #           # & ☼☼ ☼#☼ ☼#☼ ☼ ☼ ☼#☼ ☼
☼ ☼☼##  #      #  #    # ☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼`;

const BOARD_EXAMPLE_2 =
`☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼
☼     &        #  #   ☼
☼ ☼ ☼ ☼ ☼ ☼ ☼ ☼ ☼ ☼ ☼ ☼
☼    # # #      ####  ☼
☼ ☼ ☼ ☼ ☼ ☼#☼ ☼ ☼ ☼ ☼ ☼
☼☺            #      #☼
☼ ☼ ☼ ☼ ☼҉☼ ☼ ☼#☼ ☼ ☼#☼
☼# ### + ҉        &  #☼
☼#☼ ☼ ☼ ☼҉☼♥☼ ☼ ☼ ☼ ☼ ☼
☼     ♣H҉҉H     #  #  ☼
☼#☼ ☼#☼ ☼҉☼ ☼ ☼ ☼ ☼ ☼ ☼
☼ # #    ҉#    # ♥    ☼
☼ ☼ ☼ ☼#☼҉☼ ☼ ☼ ☼ ☼ ☼ ☼
☼                     ☼
☼ ☼ ☼#☼ ☼ ☼ ☼ ☼ ☼ ☼♣☼ ☼
☼        &            ☼
☼ ☼ ☼#☼ ☼ ☼ ☼ ☼ ☼ ☼ ☼ ☼
☼  # #  #           # ☼
☼&☼#☼ ☼ ☼ ☼ ☼#☼ ☼#☼ ☼ ☼
☼     #           # & ☼
☼ ☼#☼ ☼#☼ ☼ ☼ ☼#☼ ☼ ☼ ☼
☼##  #      #  #    # ☼
☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼`;

const {  boardExample, mask, highligte, highligteNotes  } = Styles;

class RulesContainer extends Component {
    componentDidMount() {
        this.props.requestSettingsStart();
    }

    _gets(name) {
        const {  server, code, id, settings  } = this.props;
        const loggedIn = [ server, code, id ].every(Boolean);

        return (loggedIn && !!settings)
            ? ( <b>&nbsp;(<a href="#settings">{ settings[0][name] }*</a>)</b> )
            : ( <b><a href='#settings'>*</a></b> );
    }

    render() {
        const {  server, code, id, settings  } = this.props;
        const loggedIn = [ server, code, id ].every(Boolean);
        const connectionUrl = loggedIn
            ? getGameConnectionString(server, code, id)
            : void 0;
        const localhostConnectionUrl = getGameConnectionString('127.0.0.1:8080', '12345678901234567890', 'anyidyouwant');
        const privacyRulesUrl = process.env.REACT_APP_EVENT_LINK + '/privacyRules';
        const settingsLink = process.env.REACT_APP_API_SERVER + '/codenjoy-balancer/rest/game/settings/get';
        const privacyRulesDetailsUrl = privacyRulesUrl + '#details3';
        const joinSlackUrl = process.env.REACT_APP_JOIN_CHAT_LINK;
        const clientLink = loggedIn
            ? (
                <a href={ getJavaClient(server) }>Download client</a>
            )
            : ''

        return (
            <div className='container'>
                <div className={ mask }>Bot Challenge - how to play?</div>
                <div className='content'>
                    <h2 className='title'>What is the gist of the game?</h2>
                    <p>
                        You should write your bot for the hero who will beat the
                        other bots by the score it gets. All bots play on the
                        same field of play. The hero can move by idle cells to
                        all four directions.
                    </p>
                    <p>
                        The hero can plant a bomb. The bomb will explode in 5
                        ticks (seconds). The blast wave can affect inhabitants
                        of the field. All affected by the blast wave disappear.
                        You can decline by both your and someone else's bomb.
                    </p>
                    <p>
                        On her/his way, the hero can meet a meatchopper –
                        red air-ballon that destroys all bombermen on its way.
                    </p>
                    <p>
                        The walls also prevent Bomberman from moving -
                        there are two types: those that can be destroyed; and intact.
                    </p>
                    <p>
                        Each destroyed object on the field (bomberman, meatchopper,
                        destroyed walls) is restored in an instant in the other place.
                        If the bomberman is damaged, the penalty points are
                        allocated to him{ this._gets('yourHeroesDeathPenalty') }.
                    </p>
                    <p>
                        The bomberman whose bomb destroyed something on the
                        map receives bonus points as follows:
                        for the destroyed walls{ this._gets('killWallScore') },
                        for the meatchopper{ this._gets('killMeatChopperScore') },
                        for the enemy bomberman{ this._gets('killOtherHeroScore') }.
                        All points are summed up.
                    </p>

                    <div className='subTitle' id='client'>
                        Download the Game Client to create a Bot
                    </div>
                    <p>
                        { clientLink }
                        { !loggedIn && '(links will be available after logging in to the site)' }
                    </p>
                    <p>
                        Remember: in the process of writing a Bot, you need to take care
                        of the logic of your Bot's movements - auxiliary things have
                        already been done for you. But you can improve the Client's logic
                        at your own discretion.
                    </p>
                    <p>
                        Register using the New Player registration form. Remember the
                        specified data (e-mail address and password) - you will need
                        them in the future for authorization on the site.
                    </p>
                    <p>
                        Then, you need to connect from the Client code to the server.
                    </p>

                    <div className='subTitle' id='client-url'>
                        Address to connect the game on the server
                    </div>

                    { loggedIn ? (
                        <>
                            <div className={ highligte }>
                                { connectionUrl }
                                <CopyToClipboard text={ connectionUrl }>
                                    <img
                                        className={ Styles.copyConnection }
                                        src={ Icon }
                                        alt='Copy URL'
                                    />
                                </CopyToClipboard>
                            </div>
                            <p>
                                Here 'user' is your player id and 'code'
                                is your security token, you can get it
                                from browser address bar after registration/login.
                            </p>
                        </>
                    ) : (
                        <div className={ highligte }>
                            <Link to={ book.login }>
                                You must be logged in to get the link
                            </Link>
                        </div>
                    ) }
                    <div style={{ marginLeft:'50px' }}>
                        <p>
                            <b>[Optional]</b> If you want to connect to the game when
                            the server is unavailable (weekends, holidays or
                            non-working hours) - you can <a className='content' style={{ display:'initial' }}
                            href='https://drive.google.com/uc?export=download&id=174aZrssLxql1_bGsKyAIENUXUv4Qjw9K'>download server</a> і
                            run it with a command (you must first install a java application on your computer).
                        </p>
                        <div className={ highligte } style={{whiteSpace:"pre"}} >
                            { "# windows\n" +
                              "java -jar -Dhost=127.0.0.1 -Dport=8080 -Dtimeout=1000\n" +
                              "          -Dlog=\"output.txt\" -DlogTime=true -DshowPlayers=\"2,3\"\n" +
                              "          -Drandom=\"random-soul-string\" -DwaitFor=2\n" +
                              "          -Dsettings=\"{'boardSize':11,'bombPower':7}\"\n" +
                              "\n" +
                              "# linux\n" +
                              "java -jar --host=127.0.0.1 --port=8080 --timeout=1000\n" +
                              "          --log=\"output.txt\" --logTime=true --showPlayers=\"2,3\"\n" +
                              "          --random=\"random-soul-string\" --waitFor=2\n" +
                              "          --settings=\"{'boardSize':11,'bombPower':7}\"" }
                        </div>
                        <p>
                            As you can see - it is possible to change the host / port, the number of milliseconds per tick (timeout),
                            game settings<b><a href='#settings'>*</a></b> (in the form of json),
                            log settings (log, logTime, showPlayers), configuration of pseudo-generator
                            of random numbers (random) and number of participants (waitFor)
                            to connect to start the server. You can then use the link to connect
                            <br/>
                            <a className='content' style={{ display:'initial' }} href={ localhostConnectionUrl }>{ localhostConnectionUrl }</a>
                            <br/>
                            It is also possible to connect with several clients - all bombers will gather in one field.
                        </p>
                        <p>
                            <b style={{ color:'#ffffff' }}>Warning!</b> The local server will be upgraded -
                            stay tuned for updates on this page.
                            A version <a className='content' style={{ display:'initial' }}>'Dahlia' (v3)</a> is currently available.
                        </p>
                    </div>
                    <p>
                        After connection, the client will regularly (every second)
                        receive a line of characters with the encoded state of the
                        field. The format:
                        <br />
                    </p>
                    <p className={ highligte }>
                        { '^board=(.*)$' }
                    </p>
                    <p>
                        With the help of regexp you can obtain a board line.
                    </p>

                    <div className='subTitle' id='board'>
                        Example of the line from the server
                    </div>
                    <div className={ highligte }>
                        <pre className={ boardExample }>{ BOARD_EXAMPLE }</pre>
                    </div>
                    <p>
                        The line length is equal to the field square. If to insert a
                        wrapping character (carriage return) every sqrt(length(string))
                        characters, you obtain the readable image of the field.
                    </p>
                    <div className={ highligte }>
                        <pre className={ boardExample }>{ BOARD_EXAMPLE_2 }</pre>
                    </div>
                    <p>
                        The first character of the line corresponds to a cell
                        located on the left-top corner and has the [0,22] coordinate.
                        The following example shows the position of the
                        bomberman (the '☺' character) - [1, 17].
                        Left-bottom corner has the [0, 0] coordinate.
                    </p>

                    <div className='subTitle' id='elements'>
                        Interpretation of characters
                    </div>
                    <p className="game-field-img-container">
                        <img className="responsive-img" src={ BoardSample } alt='Game field'/>
                    </p>
                    <GameElements
                        settings={ settings }
                    />

                    <div className='subTitle' id='commands'>
                        How to control the Bot
                    </div>
                    <p>
                        The game is turn-based, every second the server sends to your client
                        (bot) the state of the updated field at the moment and expects a
                        response of the team to the hero. Within the next second, the
                        player should give a command to the hero. If the player lost
                        his/her chance, the hero remains in place.
                    </p>
                    <p>
                        The commands (UP, DOWN, LEFT, RIGHT) move the hero to the given
                        direction in one cell; ACT – leave a bomb on hero’s position.
                        You can combine movement commands with the ACT command by separating
                        them by a comma. The order (LEFT, ACT) or (ACT, LEFT) matters:
                        either we move to the left and plant a bomb there or we plant
                        a bomb and run away to the left. If a player uses the ACT command
                        only, the bomb will be planted under the hero without her/his move
                        on the field.
                    </p>
                    <p>
                        Your task is to write a client’s WebSocket which will connect to the
                        server. Then you should “force” the hero to listen to the
                        commands. This is the way the gamer will prepare herself/himself
                        to the main game. The main goal is to play meaningfully and win
                        in the current Game Day.
                    </p>

                    <div className='subTitle' id='match'>
                        Rounds/matches
                    </div>
                    <ul>
                        <li>
                            The match consists of several{ this._gets('roundsPerMatch') } Rounds.
                        </li>
                        <li>
                            Each Match begins in a new Room after a sufficient
                            number of{ this._gets('playersPerRoom') } Participants.
                        </li>
                        <li>
                            Bomberman will be waiting for the start of the next Round on the
                            field in a new, pre-known to all Participants, place in an inactive state.
                        </li>
                        <li>
                            Each Match starts with a countdown to a
                            certain number{ this._gets('timeBeforeStartRound') } of ticks (seconds),
                            after which all Bombermen become active - begin to perform the teams of the Participants.
                        </li>
                        <li>
                            Each Round of the Match takes place with a certain composition of Participants.
                        </li>
                        <li>
                            The Participant who has completed the last Round of the Match
                            immediately enters the new room, where after a sufficient number
                            of Participants gather, a new Match will begin in the new composition
                            of the Participants.
                        </li>
                        <li>
                            The round lasts a certain number{ this._gets('timePerRound') } of ticks
                            (seconds) and ends with the victory of Bomberman:
                            <ul>
                                <li>
                                    If more than 1 Bomberman survived by the end of the Round,
                                    the winner is the one who has suffered the most damage
                                    (the total number of points received since the beginning
                                    of the round is counted);
                                </li>
                                <li>
                                    If only one Bomberman survives on the field, he wins.
                                </li>
                            </ul>
                        </li>
                        <li>
                            The winner of the Round receives bonus points{ this._gets('winRoundScore') } in addition to
                            those points obtained during the Round for the destruction
                            of objects in the field (Bombermen, Mitchhoppers and collapsing walls).
                            <ul>
                                <li>
                                    But not before a certain number of ticks{ this._gets('minTicksForWin') }
                                    (seconds) of the Round have passed.
                                </li>
                            </ul>
                        </li>
                        <li>
                            A Bomberman who is forced to leave the Round / Match
                            receives penalty points{ this._gets('yourHeroesDeathPenalty') }.
                        </li>
                    </ul>

                    <div className='subTitle' id='exceptions'>
                        Special cases
                    </div>
                    <ul>
                        <li>
                            The field has the shape of a square with
                            a certain length{ this._gets('boardSize') }.
                        </li>
                        <li>
                            Bombs:
                            <ul>
                                <li>
                                    Bomberman has a certain number of
                                    bombs by default{ this._gets('bombsCount') } бомб.
                                </li>
                                <li>
                                    A bomb left on the field will explode in 5 ticks (seconds).
                                </li>
                                <li>
                                    The bomb explodes in all directions on a
                                    certain number of cells{ this._gets('bombPower') } until
                                    it encounters an obstacle - any element.
                                </li>
                                <li>
                                    A bomberman who explodes on his own or someone
                                    else's bomb dies and gets penalty points{ this._gets('yourHeroesDeathPenalty') }.
                                </li>
                                <li>
                                    The Bomberman whose bomb blew up another Bomberman
                                    will earn bonus points{ this._gets('killOtherHeroScore') }.
                                </li>
                            </ul>
                        </li>
                        <li>
                            Mitchopers:
                            <ul>
                                <li>
                                    There are usually a number{ this._gets('meetChoppersCount') } of Mitchopers on the field.
                                </li>
                                <li>
                                    Bomberman, whose bomb was detonated by Mitchoper,
                                    will earn bonus points{ this._gets('killMeatChopperScore') }.
                                </li>
                                <li>
                                    The newly blown-up Mitchoper immediately appears on the field in a new location.
                                </li>
                                <li>
                                    Bomberman, who met with Mitchoper, dies and
                                    receives penalty points{ this._gets('yourHeroesDeathPenalty') }.
                                </li>
                            </ul>
                        </li>
                        <li>
                            Destroy walls:
                            <ul>
                                <li>
                                    The field usually has a certain
                                    number{ this._gets('destroyWallCount') } of collapsing walls.
                                </li>
                                <li>
                                    Bomberman, whose bomb blew up a collapsing wall,
                                    picks up bonus points{ this._gets('killWallScore') }.
                                </li>
                                <li>
                                    A newly blown up wall immediately appears on the field in a new place.
                                </li>
                                <li>
                                    Perk may appear during the destruction of the wall.
                                </li>
                                <li>
                                    Perk raised by Bomberman modifies the behavior
                                    of some game aspects (see section 'Modifiers (Perks)').
                                </li>
                            </ul>
                        </li>
                        <li>
                            There are also walls that do not collapse -
                            there is no way to destroy them.
                        </li>
                    </ul>

                    <div className='subTitle' id='perks'>
                        Modifiers (Perks)
                    </div>
                    <ul>
                        <li>
                            perks fall in place of the destroyed wall
                            with a probability of %{ this._gets('perksDropRatio') }.
                        </li>
                        <li>
                            The effect of the perk disappears after a while:
                            <ul>
                                <li>
                                    BOMB_<wbr/>BLAST_<wbr/>RADIUS_<wbr/>INCREASE a certain number{ this._gets('perksBombBlastRadiusIncreaseEffectTimeout') } of ticks (seconds).
                                    But if several perks were taken in a row - the total working time is added up.
                                </li>
                                <li>
                                    BOMB_COUNT_INCREASE a certain number{ this._gets('perksBombCountEffectTimeout') } of ticks (seconds).
                                </li>
                                <li>
                                    BOMB_IMMUNE a certain number{ this._gets('perksBombImmuneEffectTimeout') } of ticks (seconds).
                                </li>
                                <li>
                                    BOMB_REMOTE_CONTROL does not end on timeout.
                                </li>
                            </ul>
                        </li>
                        <li>
                            If no one picks up the perk, it disappears from the field after a while{ this._gets('perksPickTimeout') }.
                        </li>
                        <li>
                            If the participant picks up a perk, he receives
                            bonus points{ this._gets('catchPerkScore') }.
                        </li>
                        <li>
                            Perk BOMB_<wbr/>BLAST_<wbr/>RADIUS_<wbr/>INCREASE:
                            <ul>
                                <li>
                                    Increases the radius of the bomb explosion by a certain
                                    number{ this._gets('perksBombBlastRadiusIncrease') } of
                                    cells in all directions.
                                </li>
                                <li>
                                    Valid only for new bombs.
                                </li>
                                <li>
                                    The effect of the perk disappears after
                                    a while{ this._gets('perksBombBlastRadiusIncreaseEffectTimeout') }.
                                </li>
                                <li>
                                    When receiving several perks of this type at the same time,
                                    the radius of the bomb explosion increases in proportion to
                                    the number of received perks, and the total time of their
                                    action is summed.
                                </li>
                            </ul>
                        </li>
                        <li>
                            Perk BOMB_COUNT_INCREASE:
                            <ul>
                                <li>
                                    Temporarily increases the number of bombs { this._gets('perksBombCountIncrease') } available
                                    to the player by a certain number in addition to the
                                    default{ this._gets('bombsCount') } Bomberman bombs.
                                </li>
                                <li>
                                    A bomberman can put no more than one bomb per tick (second).
                                </li>
                                <li>
                                    The effect of the perk disappears after a while{ this._gets('perksBombCountEffectTimeout') }.
                                </li>
                                <li>
                                    Perks do not accumulate. When you receive several
                                    perks of this type at the same time, the number of bombs
                                    returns to the value{ this._gets('perksBombCountIncrease') }&nbsp
                                    in addition to the default ones{ this._gets('bombsCount') }.
                                    The timer is set to the initial position{ this._gets('perksBombCountEffectTimeout') }.
                                </li>
                            </ul>
                        </li>
                        <li>
                            Perk BOMB_IMMUNE:
                            <ul>
                                <li>
                                    Gives immunity to bomb explosions (even alien).
                                </li>
                                <li>
                                    The effect of the perk disappears after a while{ this._gets('perksBombImmuneEffectTimeout') }.
                                </li>
                                <li>
                                    Perks do not accumulate. When receiving several perks of this type
                                    at the same time, the action timer is set to the initial position.
                                </li>
                            </ul>
                        </li>
                        <li>
                            Perk BOMB_REMOTE_CONTROL:
                            <ul>
                                <li>
                                    Enables remote control of the detonator.
                                </li>
                                <li>
                                    The bomb is placed on the field by the first ACT command, and explodes
                                    when the ACT command is repeated. Both the bomb and
                                    the detonator (separately) are used.
                                </li>
                                <li>
                                    There are a number of detonators{ this._gets('perksNumberOfBombRemoteControl') }.
                                </li>
                                <li>
                                    The action of the perk does not end on timeout.
                                </li>
                                <li>
                                    Perks do not accumulate. Upon receipt of several perks of
                                    this type simultaneously, the total number of detonators is
                                    renewed to the above.
                                </li>
                            </ul>
                        </li>
                        <li>
                            Perks do not affect each other, only complement each other.
                        </li>
                        <li>
                            Each perk has its own: timer and / or counter (depending on the type).
                        </li>
                    </ul>

                    <div className='subTitle' id='starting'>
                        Tips
                    </div>
                    <p>
                        If you do not know what to write, try the following algorithms:
                    </p>
                    <ul>
                        <li>
                            Move to the random side if the corresponding cell is free.
                        </li>
                        <li>
                            Movement on a free cell towards the nearest wall that can be destroyed.
                        </li>
                        <li>
                            Place a bomb next to a wall that can be destroyed.
                        </li>
                        <li>
                            Dodge bombs if it is estimated that its blast wave could hit Bomberman.
                        </li>
                        <li>
                            Avoiding Mitchhoppers who met on the way.
                        </li>
                        <li>
                            Trying to blow up Mitchhopper or another Bomberman with a bomb.
                        </li>
                        <li>
                            Collecting Perks and implementing a more cunning strategy,
                            which will definitely lead to victory.
                        </li>
                    </ul>

                    <div className='subTitle' id='winners'>
                        How will the winners be determined?
                    </div>
                    <p>
                        You can read more about this
                        &nbsp;
                        <a href={ privacyRulesDetailsUrl }>
                            by the link<img src={ Icon } alt='Contest Rules'/>
                        </a>
                    </p>

                    <div className='subTitle' id='additional'>
                        Additional Information
                    </div>
                    <p>
                        <b>(<a name='settings'>*</a>)</b> - Exact values: points for
                        destruction on the field and penalty points; the number of
                        Rounds in the Match; the strength of the effect, timeouts, the
                        probability of dropping Perks and other variables must be clarified
                        with the organizers at the beginning of the Game Day in the Slack
                        chat or here, on this page, after authorization, or&nbsp;
                        <a href={ settingsLink } rel='noopener noreferrer' target='_blank'>
                            by the link<img src={ Icon } alt='Join the chat'/>
                        </a>.
                    </p>
                    <p>
                        Be careful - these values will be different for different Game Days of the Contest.
                    </p>
                    <p>
                        To communicate between the Participants and the Organizer,
                        a Channel has been created in the Slack application, which you can join
                        &nbsp;
                        <a href={ joinSlackUrl } rel='noopener noreferrer' target='_blank'>
                            by the link<img src={ Icon } alt='Join the chat'/>
                        </a>
                    </p>
                    <p>
                        A detailed description of the Rules and Regulations of the game can be found
                        &nbsp;
                        <a href={ privacyRulesUrl }>
                            by the link<img src={ Icon } alt='Contest Rules'/>
                        </a>
                    </p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    id:       state.auth.id,
    server:   state.auth.server,
    code:     state.auth.code,
    settings: state.settings.settings,
});
const mapDispatchToProps = { requestSettingsStart };

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RulesContainer);
