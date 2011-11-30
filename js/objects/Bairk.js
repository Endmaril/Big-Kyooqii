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

var Bairk = new Class({

    Extends: ImageObject,

    name: 'Bairk',

    aimScope: 150,
    speed: 0,
    radius: 0,
    map:null,

    initialize: function(params)
    {
        this.parent(params);
        
        if (params.name) this.name = params.name; // debug

        if (params.aimScope) this.aimScope = params.aimScope;
        if (params.speed) this.speed = params.speed;
        if (params.radius) this.radius = params.radius;
        if (params.map) this.map = params.map;
    },
    
    move: function(x, y) {
        var newX = this.x + x*this.speed;
        var newY = this.y + y*this.speed;
      
        if(this.map.isWalkable(newX / this.map.tileWidth, newY / this.map.tileHeight))
        {
            this.x = newX;
            this.y = newY;
        }
    },
    
    log: function(){
        console.log(this.name + ':');
        
        console.log('coord: (' + this.x + ',' + this.y + ')');
        console.log('speed: ' + this.speed);
        console.log('img: "' + this.imgPath + '", ' +
            this.width + 'x' + this.height);
    }


});
