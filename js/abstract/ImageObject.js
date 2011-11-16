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

var ImageObject = new Class({
	
    Extends: DisplayableObject,
    
    imgPath: '',
	
	initialize: function(params){
        this.parent(params);
        
		if (params.imgPath)
        {
            this.imgPath = params.imgPath;
        
            this.img = new Image();
            this.img.ready = false;
            this.img.src = this.imgPath;
            this.img.onload = function (){
                this.ready = true;
            };
        } else {
            console.log("invalid imgPath for " + this.name);
        }
	},
	
	draw: function(ctx){
        ctx.drawImage(this.img, Math.round(this.x / 2) * 2, Math.round(this.y / 2) * 2);
	}
});
