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

var Title = new Class({
  
    Extends: Scene,
    menus: [],
    selected: 0,
  
    initialize: function(app)
    {
        this.app = app;
        this.canvas = app.canvas;

        this.menus.push({text: 'Play', callback: function(){
            app.setScene(new Game());
        }});
        this.menus.push({text: 'Options', callback: function(){
            app.SetScene(new TitleOptions());
        }});
        this.menus.push({text: 'Help', callback: function(){
            app.SetScene(new TitleHelp());
        }});
    },
  
    update: function()
    {

    },

    keyDown: function(event)
    {
        if(event.key == 'up')
        {
            if(this.selected > 0)
                this.selected--;

            this.app.invalidate();
            return false;
        }
        else if(event.key == 'down')
        {
            if(this.selected < this.menus.length - 1)
                this.selected++;

            this.app.invalidate();
            return false;
        }

        return true;
    },
  
    render: function(ctx, time)
    {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.font = '40pt Courier';
        ctx.fillStyle = 'rgb(255, 0, 0)';
        ctx.fillText("Big-Kyooqii", this.canvas.width / 2, 13.37);

        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.font = '20pt Courier';

        var x = this.canvas.width / 3;
        var y = 240;
        this.menus.each(function(menu, index){
            ctx.fillStyle = 'rgb(0, 0, 0)';
            ctx.fillText(menu.text, x, y);
            if(index == this.selected)
            {
                ctx.beginPath();
                ctx.arc(x - 40, y, 10, 0, 2 * Math.PI, false);
                ctx.fillStyle = 'rgb(0, 0, 255)';
                ctx.fill();
            }

            y += 40;
        }, this);
    }

});
