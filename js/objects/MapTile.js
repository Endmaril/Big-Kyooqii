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


var MapTile = new Class({
    
    //Extends: DisplayableObject,

    tileSet: null,
    gid: 0,
    images: [],

	draw: function(ctx, dx, dy)
    {
        Array.each(this.images, function(img){
            var id = this.gid - this.tileSet.firstGid;
            var si = id % (img.width / this.tileSet.tileWidth),
                sj = Math.floor(id / (img.width / this.tileSet.tileWidth));
            var sx = si * this.tileSet.tileWidth,
                sy = sj * this.tileSet.tileHeight;

            ctx.drawImage(img, sx, sy, this.tileSet.tileWidth, this.tileSet.tileHeight, dx, dy, this.tileSet.tileWidth, this.tileSet.tileHeight);
        }.bind(this));
	},

});
