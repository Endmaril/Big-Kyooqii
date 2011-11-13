/*
    This file is part of the Big Kyoqii game.
    Copyright (C) 2011  Jérémy Gabriele, Romaric Pighetti, Wiz

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

var TitleHelp = new Class({
  
    Extends: Scene,
  
    initialize: function(params)
    {
        this.parent(params);
    },
  
    update: function()
    {

    },

    keyDown: function(event)
    {
        if(event.key == 'esc')
        {
            this.app.setScene(new Title(this.app));
            return false;
        }

        return false;
    },
  
    render: function(ctx, time)
    {
        ctx.textAlign = 'left';
        ctx.textBaseline = 'bottom';
        ctx.font = '20pt Courier';
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillText("Fucking Manual", 0, 30);
    }

});
