// vendor
import React, { Component } from 'react';

// proj
// import bomb from '../../styles/images/game/sprite/bomb.png';
import bomb_blast_radius_increase from '../../styles/images/game/sprite/bomb_blast_radius_increase.png';
import bomb_bomberman from '../../styles/images/game/sprite/bomb_bomberman.png';
import bomb_count_increase from '../../styles/images/game/sprite/bomb_count_increase.png';
import bomb_immune from '../../styles/images/game/sprite/bomb_immune.png';
import bomb_remote_control from '../../styles/images/game/sprite/bomb_remote_control.png';
// import bomb_timer_0 from '../../styles/images/game/sprite/bomb_timer_0.png';
import bomb_timer_1 from '../../styles/images/game/sprite/bomb_timer_1.png';
import bomb_timer_2 from '../../styles/images/game/sprite/bomb_timer_2.png';
import bomb_timer_3 from '../../styles/images/game/sprite/bomb_timer_3.png';
import bomb_timer_4 from '../../styles/images/game/sprite/bomb_timer_4.png';
import bomb_timer_5 from '../../styles/images/game/sprite/bomb_timer_5.png';
import bomberman from '../../styles/images/game/sprite/bomberman.png';
import boom from '../../styles/images/game/sprite/boom.png';
import dead_bomberman from '../../styles/images/game/sprite/dead_bomberman.png';
import dead_meat_chopper from '../../styles/images/game/sprite/dead_meat_chopper.png';
import destroyable_wall from '../../styles/images/game/sprite/destroyable_wall.png';
import destroyed_wall from '../../styles/images/game/sprite/destroyed_wall.png';
import meat_chopper from '../../styles/images/game/sprite/meat_chopper.png';
import none from '../../styles/images/game/sprite/none.png';
import other_bomb_bomberman from '../../styles/images/game/sprite/other_bomb_bomberman.png';
import other_bomberman from '../../styles/images/game/sprite/other_bomberman.png';
import other_dead_bomberman from '../../styles/images/game/sprite/other_dead_bomberman.png';
import wall from '../../styles/images/game/sprite/wall.png';

//own
import Styles from './styles.module.css';

const ELEMENTS = [
    {
        image:       bomberman,
        title:       `BOMBERMAN ('☺')`,
        description: `Your Bomberman.`,
    },
    {
        image:       bomb_bomberman,
        title:       `BOMB_BOMBERMAN ('☻')`,
        description: `Your Bomberman, if he's sitting on a bomb.`,
    },
    {
        image:       dead_bomberman,
        title:       `DEAD_BOMBERMAN ('Ѡ')`,
        description: `oops, your Bomberman is dead (don't worry, he will appear
somewhere in next Round) you're getting penalty points for each death.`,
    },
    {
        image:       other_bomberman,
        title:       `OTHER_BOMBERMAN ('♥')`,
        description: `Other Bomberman.`,
    },
    {
        image:       other_bomb_bomberman,
        title:       `OTHER_BOMB_BOMBERMAN ('♠')`,
        description: `Other Bomberman, if he's sitting on a bomb.`
    },
    {
        image:       other_dead_bomberman,
        title:       `OTHER_DEAD_BOMBERMAN ('♣')`,
        description: `This is what a dead Bomberman opponent looks like.
If you blow it up - you get bonus points.`
    },
    {
        image:       bomb_timer_5,
        title:       `BOMB_TIMER_5 ('5')`,
        description: `After Bomberman puts the bomb timer
will start working (only 5 ticks / seconds). Most likely you will
not see this character (only BOMB_BOMBERMAN ('☻')),
but remember - 5 seconds and an explosion will occur. You need to run fast.`
    },
    {
        image:       bomb_timer_4,
        title:       `BOMB_TIMER_4 ('4')`,
        description: `This bomb will explode in 4 ticks.`
    },
    {
        image:       bomb_timer_3,
        title:       `BOMB_TIMER_3 ('3')`,
        description: `This bomb will explode in 3 ticks.`
    },
    {
        image:       bomb_timer_2,
        title:       `BOMB_TIMER_2 ('2')`,
        description: `This bomb will explode in 2 ticks.`
    },
    {
        image:       bomb_timer_1,
        title:       `BOMB_TIMER_1 ('1')`,
        description: `This bomb will explode in 1 tick.`
    },
    {
        image:       boom,
        title:       `BOOM ('҉')`,
        description: `Bam! This is how the bomb explodes. With
everything that can be destroyed will be destroyed together with
your Bomberman, if you do not hide in advance.`
    },
    {
        image:       wall,
        title:       `WALL ('☼')`,
        description: `Non-destructive walls - they are not afraid of bomb explosions.`
    },
    {
        image:       destroyable_wall,
        title:       `DESTROYABLE_WALL ('#')`,
        description: `And this wall can be destroyed.`
    },
    {
        image:       destroyed_wall,
        title:       `DESTROYED_WALL ('H')`,
        description: `This is what a ruined wall looks like, it will disappear
the next second. If you do this - you will receive bonus points.`
    },
    {
        image:       meat_chopper,
        title:       `MEAT_CHOPPER ('&')`,
        description: `This little one runs across the field in random order.
If your Bomberman touches it, he will die. It would be better for you to destroy
this piece of meat, for which you will receive bonus points. Otherwise run away!`
    },
    {
        image:       dead_meat_chopper,
        title:       `DEAD_MEAT_CHOPPER ('x')`,
        description: `It's a mitchoper that exploded. If you did -
get bonus points.`
    },
    {
        image:       bomb_blast_radius_increase,
        title:       `BOMB_BLAST_RADIUS_INCREASE ('+')`,
        description: `Increases the radius* of the bomb explosion. Valid only for new bombs.`
    },
    {
        image:       bomb_count_increase,
        title:       `BOMB_COUNT_INCREASE ('c')`,
        description: `Increases the number* of bombs available to the player.`
    },
    {
        image:       bomb_immune,
        title:       `BOMB_IMMUNE ('i')`,
        description: `Gives immunity to bomb explosions (any bombs, yours and others').`
    },
    {
        image:       bomb_remote_control,
        title:       `BOMB_REMOTE_CONTROL ('r')`,
        description: `Remote control of the detonator. The bomb explodes
when the ACT command is repeated. There are several* detonators.`
    },
    {
        image:       none,
        title:       `NONE ('')`,
        description: `Free section where you can send your Bomberman.`
    }
];

export class GameElements extends Component {
    render() {
        const {  settings  } = this.props;

        return (
            <div className={ Styles.gameElements }>
                { ELEMENTS.map(({ image, title, description }) => (
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
