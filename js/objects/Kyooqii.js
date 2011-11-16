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

var Kyooqii = new Class({

    Extends: ImageObject,

    name: 'Kyooqii',

    pv: 0,
    att: 0,
    def: 0,
    speed: 0,
    radius: 1,

    initialize: function(params)
    {
        this.parent(params);
        
        if (params.name) this.name = params.name; // debug

        if (params.pv) this.pv = params.pv;
        if (params.att) this.att = params.att;
        if (params.def) this.def = params.def;
        if (params.speed) this.speed = params.speed;
        
        if (params.radius) this.radius = params.radius;
    },
    
    move: function(x, y) {
      this.x += x*this.speed;
      this.y += y*this.speed;
    },
    
    dist: function(other) {
      return Math.sqrt(Math.pow((this.x-other.x),2) + Math.pow((this.y-other.y),2));
    },
    
    collide: function(other) {
      return (this.dist(other) <= (this.radius+other.radius));
    },
    
    log: function(){
        console.log(this.name + ':');
        
        console.log(this.pv + 'pv');
        console.log(this.att + 'att');
        console.log(this.def + 'def');
        console.log('coord: (' + this.x + ',' + this.y + ')');
        console.log('speed: ' + this.speed);
        console.log('img: "' + this.imgPath + '", ' +
            this.width + 'x' + this.height);
    }


});
