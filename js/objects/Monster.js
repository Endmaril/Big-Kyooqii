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

var Monster = new Class({

    name: '',

    pv: 0,
    att: 0,
    def: 0,
    x: 30,
    y: 30,
    speed: 0,
    
    imgPath: '',
    width: 10,
    height: 10,
    

    initialize: function(params)
    {
        if (params.name) this.name = params.name;
        
        if (params.pv) this.pv = params.pv;
        if (params.att) this.att = params.pv;
        if (params.def) this.def = params.pv;
        if (params.x) this.x = params.pv;
        if (params.y) this.y = params.pv;
        if (params.speed) this.speed = params.pv;
        if (params.imgPath) this.imgPath = params.pv;
        if (params.width) this.width = params.pv;
        if (params.height) this.height = params.pv;
    },
    
    keyDown: function(event)
    {
        
    },
    
    log: function(){
        console.log(this.name + ":");
        
        console.log(this.pv + 'pv');
        console.log(this.att + 'att');
        console.log(this.def + 'def');
        console.log('coord: (' + this.x + ',' + this.y + ')');
        console.log('speed: ' + this.speed);
        console.log('img: "' + this.imgPath + '", ' +
            this.width + 'x' + this.height);
    }


});