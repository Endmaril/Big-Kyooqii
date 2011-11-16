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

var Item = new Class({

    Extends: ImageObject,
    
    name: '',

    carac: '',
    value: 0,

    initialize: function(params)
    {
        this.parent(params);
        
        if (params.name) this.name = params.name; // debug

        if (params.carac) this.carac = params.carac;
        if (params.value) this.value = params.value;
    },
    
    use: function(user) { // if carac="Fuel", needs a function setFuel(val)
      user["inc"+this.carac](this.value);
    },
    
    
    log: function(){
        console.log(this.name + ':');
        console.log('Description : donne '+this.value+' en '+this.carac+'.');
    }


});