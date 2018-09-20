package com.epam.dojo.icancode.model.items;

/*-
 * #%L
 * iCanCode - it's a dojo-like platform from developers to developers.
 * %%
 * Copyright (C) 2016 - 2018 EPAM
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

import com.codenjoy.dojo.services.Tickable;
import com.epam.dojo.icancode.model.Elements;

public class ZombiePot extends FieldItem implements Tickable {

    public static int TICKS = 5;
    private int time = 0;

    public ZombiePot(Elements el) {
        super(el);
    }

    @Override
    public void tick() {
        if (++time % TICKS == 0) {
            field.move(newZombie(), this.getCell().getX(), this.getCell().getY());
        }
    }

    private Zombie newZombie() {
        boolean gender = field.dice().next(1) == 0;
        Zombie zombie = new Zombie(gender);
        zombie.setField(field);
        return zombie;
    }
}
