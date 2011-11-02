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

var DisplayableObject = new Class({
	
	imgPath: "",
	x: 0,
	y: 0,
	
	initialize: function(params){
		if (params.imgSrc) this.imgSrc = params.imgSrc;
		if (params.x) this.x = params.x;
		if (params.y) this.y = params.y;
	},
	
	prepare: function(){
		this.img = new Image();
		this.img.ready = false;
		this.img.src = this.imgSrc;
		this.img.onload = function (){
			this.ready = true;
		};	
	},
	
	draw: function(ctx){
			ctx.drawImage(this.img, this.x, this.y);
	}
});
