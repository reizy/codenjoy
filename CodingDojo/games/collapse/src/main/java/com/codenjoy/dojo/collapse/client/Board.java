package com.codenjoy.dojo.collapse.client;

import java.util.ArrayList;
import java.util.List;

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


import com.codenjoy.dojo.client.AbstractBoard;
import com.codenjoy.dojo.collapse.model.Elements;

public class Board extends AbstractBoard<Elements> {

    @Override
    public Elements valueOf(char ch) {
        return Elements.valueOf(ch);
    }
   
    public List<ElementPoint> findAll(Elements element) {
        List<ElementPoint>  result = new ArrayList<>();
        for (int x = 0; x < size; x++) {
            for (int y = 0; y < size; y++) {
                Elements elementAt = getAt(0, x, y);
                if (elementAt == element) {
                    result.add(new ElementPoint(x, y, elementAt));
                }
            }
        }
        return result;
    };

    public List<ElementPoint> findAllExtended() {
        List<ElementPoint>  result = new ArrayList<>();
        for (int x = 0; x < size; x++) {
            for (int y = 0; y < size; y++) {
                Elements element = getAt(0, x, y);
                result.add(new ElementPoint(x, y, element));
            }
        }
        return result;
    };

}
