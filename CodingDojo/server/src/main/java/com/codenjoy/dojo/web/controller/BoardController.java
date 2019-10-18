package com.codenjoy.dojo.web.controller;

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


import com.codenjoy.dojo.services.ConfigProperties;
import com.codenjoy.dojo.services.GameType;
import com.codenjoy.dojo.services.Player;
import com.codenjoy.dojo.services.PlayerService;
import com.codenjoy.dojo.services.dao.Registration;
import com.codenjoy.dojo.services.multiplayer.MultiplayerType;
import com.codenjoy.dojo.services.nullobj.NullGameType;
import com.codenjoy.dojo.services.nullobj.NullPlayer;
import com.codenjoy.dojo.services.security.RegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;

import static com.codenjoy.dojo.web.controller.AdminController.GAME_NAME_FORM_KEY;
import static com.codenjoy.dojo.web.controller.Validator.CANT_BE_NULL;
import static com.codenjoy.dojo.web.controller.Validator.CAN_BE_NULL;

@Controller
@RequiredArgsConstructor
public class BoardController {

    public static final String URI = "/board";

    private final PlayerService playerService;
    private final Registration registration;
    private final Validator validator;
    private final ConfigProperties properties;
    private final RegistrationService registrationService;

    // TODO удалить везде имейл как id больше не будет тут имейла
    @RequestMapping(value = URI + "/player/{id:" + Validator.EMAIL_OR_ID + "}",
                    method = RequestMethod.GET)
    public String boardPlayer(ModelMap model,
                              @PathVariable("id") String id,
                              @RequestParam(name = "only", required = false) Boolean justBoard)
    {
        validator.checkPlayerId(id, CANT_BE_NULL);

        return boardPlayer(model, id, null, justBoard, (String) model.get("gameName"));
    }

    @RequestMapping(value = URI + "/player/{id:" + Validator.EMAIL_OR_ID + "}", params = {"code", "remove"}, method = RequestMethod.GET)
    public String removePlayer(@PathVariable("id") String id, @RequestParam("code") String code) {
        validator.checkPlayerCode(id, code);

        Player player = playerService.get(id);
        if (player == NullPlayer.INSTANCE) {
            return "redirect:/register?id=" + id;
        }

        playerService.remove(player.getName());
        return "redirect:/";
    }

    @RequestMapping(value = URI + "/player/{id:" + Validator.EMAIL_OR_ID + "}",
                    params = "code",
                    method = RequestMethod.GET)
    public String boardPlayer(ModelMap model,
                              @PathVariable("id") String id,
                              @RequestParam("code") String code,
                              @RequestParam(name = "only", required = false) Boolean justBoard,
                              @RequestParam(name = "gameName", required = false, defaultValue = "") String gameName) {
        validator.checkPlayerId(id, CANT_BE_NULL);
        validator.checkCode(code, CAN_BE_NULL);

        Player player = playerService.get(id);
        if (player == NullPlayer.INSTANCE) {
            return "redirect:/register?id=" + id;
        }

        populateJoiningGameModel(model, code, player);

        return (justBoard == null || !justBoard) ? "board" : "board-only";
    }

    @GetMapping(URI + "/rejoining/{gameName}")
    public String rejoinGame(ModelMap model, @PathVariable("gameName") String gameName,
                             HttpServletRequest request,
                             @AuthenticationPrincipal Registration.User user) {

        Player player = playerService.get(user.getCode());
        if (player == NullPlayer.INSTANCE) {
            return registrationService.connectRegisteredPlayer(user.getCode(), request, user.getId(), gameName);
        }

        populateJoiningGameModel(model, player.getCode(), player);
        return "board";
    }

    private void populateJoiningGameModel(ModelMap model, String code, Player player) {
        model.addAttribute("code", code);
        model.addAttribute(GAME_NAME_FORM_KEY, player.getGameName());
        model.addAttribute("gameNameOnly", player.getGameNameOnly());
        model.addAttribute("playerName", player.getName());
        model.addAttribute("readableName", player.getReadableName());
        model.addAttribute("allPlayersScreen", false);
    }

    @RequestMapping(value = URI + "/log/player/{id:" + Validator.EMAIL_OR_ID + "}",
            method = RequestMethod.GET)
    public String boardPlayerLog(ModelMap model, @PathVariable("id") String id) {
        validator.checkPlayerId(id, CANT_BE_NULL);

        Player player = playerService.get(id);
        if (player == NullPlayer.INSTANCE) {
            return "redirect:/register?id=" + id;
        }

        model.addAttribute(GAME_NAME_FORM_KEY, player.getGameName());
        model.addAttribute("gameNameOnly", player.getGameNameOnly());
        model.addAttribute("playerName", player.getName());
        model.addAttribute("readableName", player.getReadableName());

        return "board-log";
    }

    @RequestMapping(value = URI, method = RequestMethod.GET)
    public String boardAll() {
        GameType gameType = playerService.getAnyGameWithPlayers();
        if (gameType == NullGameType.INSTANCE) {
            return "redirect:/register";
        }
        return "redirect:/board/game/" + gameType.name();
    }

    @RequestMapping(value = URI + "/game/{gameName}", method = RequestMethod.GET)
    public String boardAllGames(ModelMap model, @PathVariable("gameName") String gameName) {
        validator.checkGameName(gameName, CANT_BE_NULL);

        if (gameName == null) {
            return "redirect:/board";
        }

        Player player = playerService.getRandom(gameName);
        if (player == NullPlayer.INSTANCE) {
            return "redirect:/register?" + GAME_NAME_FORM_KEY + "=" + gameName;
        }
        GameType gameType = player.getGameType();
        if (gameType.getMultiplayerType() == MultiplayerType.MULTIPLE) {
            return "redirect:/board/player/" + player.getName();
        }

        model.addAttribute("code", null);
        model.addAttribute(GAME_NAME_FORM_KEY, gameName);
        model.addAttribute("gameNameOnly", player.getGameNameOnly());
        model.addAttribute("playerName", null);
        model.addAttribute("readableName", null);
        model.addAttribute("allPlayersScreen", true); // TODO так клиенту припрутся все доски и даже не из его игры, надо фиксить dojo transport
        return "board";
    }

    @RequestMapping(value = URI, params = "code", method = RequestMethod.GET)
    public String boardAll(ModelMap model, @RequestParam("code") String code) {
        validator.checkCode(code, CAN_BE_NULL);

        String id = registration.getIdByCode(code);
        Player player = playerService.get(id);
        if (player == NullPlayer.INSTANCE) {
            player = playerService.getRandom(null);
        }
        if (player == NullPlayer.INSTANCE) {
            return "redirect:/register";
        }
        if (player.getGameType().getMultiplayerType() != MultiplayerType.SINGLE) {
            return "redirect:/board/player/" + player.getName() + ((code != null)?"?code=" + code:"");
        }

        String gameName = player.getGameName();
        model.addAttribute("code", code);
        model.addAttribute(GAME_NAME_FORM_KEY, gameName);
        model.addAttribute("gameNameOnly", player.getGameNameOnly());
        model.addAttribute("playerName", player.getName());
        model.addAttribute("readableName", player.getReadableName());
        model.addAttribute("allPlayersScreen", true);
        return "board";
    }

    @RequestMapping(value = "/donate", method = RequestMethod.GET)
    public String donate(ModelMap model) {
        model.addAttribute("today", new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
        model.addAttribute("donateCode", properties.getDonateCode());
        return "donate-form";
    }

    @RequestMapping(value = "/help")
    public String help() {
        return "help";
    }
}
