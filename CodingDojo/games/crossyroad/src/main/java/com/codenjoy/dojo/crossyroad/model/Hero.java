package com.codenjoy.dojo.crossyroad.model;

/*-
 * #%L
 * Codenjoy - it's a dojo-like platform from developers to developers.
 * %%
 * Copyright (C) 2018 Codenjoy
 * %%
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public
 * License along with this program.  If not, see
 * <http://www.gnu.org/licenses/gpl-3.0.html>.
 * #L%
 */


import com.codenjoy.dojo.services.multiplayer.PlayerHero;
import com.codenjoy.dojo.services.*;

public class Hero extends PlayerHero<Field> implements State<Elements, Player> {

    private boolean alive;
    private Direction direction;

    public Hero(Point xy) {
        super(xy);
        direction = null;
        alive = true;
    }

    @Override
    public void down() {
        // do nothing, this should never happen
    }

    @Override
    public void up() {
        if (!alive) return;

        direction = Direction.UP;
    }

    @Override
    public void left() {
        if (!alive) return;

        direction = Direction.LEFT;
    }

    @Override
    public void right() {
        if (!alive) return;

        direction = Direction.RIGHT;
    }

    @Override
    public void act(int... p) {
        if (!alive) return;
    }

    @Override
    public void tick() {
        if (!alive) return;
        if (direction != null) {
            Point to = direction.change(this.copy());
            move(to);}

        direction = Direction.random();
    }

    public boolean isAlive() {
        return alive;
    }

    @Override
    public Elements state(Player player, Object... alsoAtPoint) {
        if (alive) {
            return Elements.HERO;
        } else {
            return Elements.BLACK_HERO;
        }
    }
        // Для переход в режим бога alive = true
    public void dies() {
        alive = true;
    }



    /*public void falls() {
        move(x, y - 1);
    }*/

    /*public void jumps() {
        alreadyJumped++;
        move(x, y + 1);
    }*/



   /* public void setAlreadyJumped(int alreadyJumped) {
        this.alreadyJumped = alreadyJumped;
    }*/
}
