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

    centerY: 0.512,
    pv: 0,
    att: 0,
    def: 0,
    speed: 0,
    lightRadius: 120,
    fuel: 100,
    invincible: 0,
    imgEmpty: null,
    imgHalf: null,
    imgFull: null,
    map: null,
    hasKey: false,

    initialize: function(params)
    {
        this.parent(params);
        
        if (params.name) this.name = params.name; // debug

        if (params.pv) this.pv = params.pv;
        if (params.att) this.att = params.att;
        if (params.def) this.def = params.def;
        if (params.speed) this.speed = params.speed;
        if (params.map) this.map = params.map;
        
        if (params.lightRadius) this.lightRadius = params.lightRadius;
        if (params.fuel) this.fuel = params.fuel;
        if (params.invincible) this.invincible = params.invincible;
        
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
        
        this.heartTableFunction = [
            function f0() { document.id('firstHeart').src = $IMG_DIR + 'emptyHeart.png'; },
            function f1() { document.id('firstHeart').src = $IMG_DIR + 'quarterHeart.png'; },
            function f2() { document.id('firstHeart').src = $IMG_DIR + 'halfHeart.png'; },
            function f3() { document.id('firstHeart').src = $IMG_DIR + 'threeQuarterHeart.png'; },
            function f4() {
                document.id('firstHeart').src = $IMG_DIR + 'fullHeart.png';
                document.id('secondHeart').src = $IMG_DIR + 'emptyHeart.png';
            },
            function f5() { document.id('secondHeart').src = $IMG_DIR + 'quarterHeart.png'; },
            function f6() { document.id('secondHeart').src = $IMG_DIR + 'halfHeart.png'; },
            function f7() { document.id('secondHeart').src = $IMG_DIR + 'threeQuarterHeart.png'; },
            function f8() {
                document.id('secondHeart').src = $IMG_DIR + 'fullHeart.png';
                document.id('thirdHeart').src = $IMG_DIR + 'emptyHeart.png';
            },
            function f9() { document.id('thirdHeart').src = $IMG_DIR + 'quarterHeart.png'; },
            function f10() { document.id('thirdHeart').src = $IMG_DIR + 'halfHeart.png'; },
            function f11() { document.id('thirdHeart').src = $IMG_DIR + 'threeQuarterHeart.png'; },
            function f12() { document.id('thirdHeart').src = $IMG_DIR + 'fullHeart.png'; }
        ]
    },
   
    move: function(x, y) {
        var newX = this.x + x * this.speed,
            newY = this.y + y * this.speed;

        if(this.map.isWalkable(newX / this.map.tileWidth, newY / this.map.tileHeight))
        {
            this.x = newX;
            this.y = newY;
        }
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
    
    decPv: function(unfill) {
        if (this.pv-unfill >= 0) 
          this.pv-=unfill;
        else
          this.pv = 0;
    },
    
    incPv: function(refill) {
        if (this.pv+refill <= 12)
            this.pv+=refill;
        else this.pv = 12;
    },

    
    decFuel: function(unfill) {
        if (this.fuel-unfill >= 0) this.fuel-=unfill;
    },
    
    incFuel: function(refill) {
        if (this.fuel+refill <= 100)
            this.fuel+=refill;
        else this.fuel = 100;
    },
    
    isInvincible: function()
    {
        return this.invincible > 0;
    },
    
    setInvincibleForAMoment: function(howLong)
    {
        if (howLong >= 0) this.invincible = howLong;
    },
    
    decInvincibleTime: function(unfill)
    {
        if (this.invincible-unfill >= 0)
            this.invincible = this.invincible-unfill;
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
