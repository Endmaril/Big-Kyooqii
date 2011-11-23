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
    lightRadius: 120,
    fuel: 100,
    imgEmpty: null,
    imgHalf: null,
    imgFull: null,

    initialize: function(params)
    {
        this.parent(params);
        
        if (params.name) this.name = params.name; // debug

        if (params.pv) this.pv = params.pv;
        if (params.att) this.att = params.att;
        if (params.def) this.def = params.def;
        if (params.speed) this.speed = params.speed;
        
        if (params.lightRadius) this.lightRadius = params.lightRadius;
        if (params.fuel) this.fuel = params.fuel;
        
        if (params.imgFull)
        {
            this.imgFull = new Image();
            this.imgFull.ready = false;
            this.imgFull.src = params.imgFull;
            this.imgFull.onload = function (){
                this.ready = true;
            };
        }
        
        if (params.imgEmpty)
        {
            this.imgEmpty = new Image();
            this.imgEmpty.ready = false;
            this.imgEmpty.src = params.imgEmpty;
            this.imgEmpty.onload = function (){
                this.ready = true;
            };
        }
        if (params.imgHalf)
        {
            this.imgHalf = new Image();
            this.imgHalf.ready = false;
            this.imgHalf.src = params.imgHalf;
            this.imgHalf.onload = function (){
                this.ready = true;
            };
        }
        
        this.img = this.imgFull;
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
    
    canSee: function(other) {
      return (this.dist(other) <= (this.lightRadius+other.radius));
    },
    
    setImage: function() // return true <=> we changed this.img
    {
        if (this.fuel < 20)
        {
            if (this.img != this.imgEmpty)
            {
                this.img = this.imgEmpty;
                this.lightRadius = 30;
                return true;
            }
        }
        else if (this.fuel < 70)
        {
            if (this.img != this.imgHalf)
            {
                this.img = this.imgHalf;
                this.lightRadius = 80;
                return true;
            }
        }
        else
            if (this.img != this.imgFull)
            {
                this.img = this.imgFull;
                this.lightRadius = 120;
                return true;
            }
        return false;
    },
    
    getLanternImg: function()
    {
        if (this.img == this.imgEmpty)
            return $IMG_DIR+'emptyLantern.png';
        else if (this.img == this.imgHalf)
            return $IMG_DIR+'halfLantern.png';
        else if (this.img == this.imgFull)
            return $IMG_DIR+'fullLantern.png';
        
    },
    
    decFuel: function(unfill) {
        if (this.fuel > 0) this.fuel-=unfill;
    },
    
    incFuel: function(refill) {
        if (this.fuel+refill <= 100)
            this.fuel+=refill;
        else this.fuel = 100;
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
