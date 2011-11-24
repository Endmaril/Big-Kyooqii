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


var Map = new Class({

    name: 'Map',
    Extends: DisplayableObject,

    tmxMap: null,
    tileSets: [],
    tiles: [],

    initialize: function(tmxMap)
    {
        this.tmxMap = tmxMap;

        Object.each(this.tmxMap.tileSets, function(tileSet) {
            var mapTileSet = new MapTileSet(tileSet);
            this.tileSets.push(mapTileSet);
            this.tiles.combine(mapTileSet.tiles);
        }.bind(this));
    },
 
    draw: function draw(ctx)
    {
        Array.each(this.tmxMap.layers, function(layer) {
            if(layer.name != 'set')
            {
                var i = 0;
                for(var x = 0; x < this.tmxMap.width * this.tmxMap.tileWidth; x += this.tmxMap.tileWidth) {
                    for(var y = 0; y < this.tmxMap.height * this.tmxMap.tileHeight; y += this.tmxMap.tileHeight, i++) {
                        var gid = layer.data.tiles[i];

                        if(gid > 0)
                        {
                            this.tiles[gid].draw(ctx, y, x);
                        }
                    }
                }
            }
        }.bind(this));
    },

});

