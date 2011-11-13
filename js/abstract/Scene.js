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

var Scene = new Class({
  
  objects : {},
  canvas : null,
  ctx : null,
  app : null,
  
  initialize: function(app){
        if (app) {
            this.app = app;
            this.canvas = app.canvas;
            this.ctx = app.context;
        } else {
            console.log("Pas d'app !!!");
        }
	},
  
  render: function()
  {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    Object.each(this.objects, function(item) {
        item.draw(this.ctx);
    }, this);
  }
  
});
