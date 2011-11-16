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


var Room = new Class({

    name: 'Room',

    monsters: [],
    items: [],
    bairks: [],

    initialize: function(params)
    {
        if (params.name) this.name = params.name; // debug
        
        // utile ?
        if (params.monsters) this.monsters = params.monsters;
        if (params.objects) this.objects = params.objects;
        if (params.bairks) this.bairks = params.bairks;
    },
    
    addMonster: function(monster) {
      this.monsters = this.monsters.append(Array.from(monster));
    },
    
    addItem: function(item) {
      this.items = this.items.append(Array.from(item));
    },
    
    addBairk: function(bairk) {
      this.bairks = this.bairks.append(Array.from(bairk));
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

