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
    tileWidth: 0,
    tileHeihgt: 0,
    preCanvas: null,

    initialize: function(tmxMap)
    {
        this.tmxMap = tmxMap;
        this.tileWidth = tmxMap.tileWidth;
        this.tileHeight = tmxMap.tileHeight;

        Object.each(this.tmxMap.tileSets, function(tileSet) {
            var mapTileSet = new MapTileSet(tileSet);
            this.tileSets.push(mapTileSet);
            this.tiles.combine(mapTileSet.tiles);
        }.bind(this));
    },

    isWalkable: function isWalkable(x, y)
    {
        var walkable = false;
        var ix = Math.floor(x),
            iy = Math.floor(y);

        Array.each(this.tmxMap.layers, function(layer) {
            if(layer.name == 'walkable')
            {
                var i = ix % layer.width + Math.floor(iy * layer.width);

                if(layer.data.tiles[i] > 0)
                    walkable = true;
            }
        }.bind(this));

        return walkable;
    },

    getSpawn: function getSpawn()
    {
        var spawn = undefined;
        Array.each(this.tmxMap.objectGroups, function(layer) {
            if(layer.name == 'game') {
                Array.each(layer.mapObjects, function(object) {
                    if(object.name == 'spawn')
                        spawn = {x: object.x, y: object.y};
                });
            }
        }.bind(this));

        return spawn;
    },
 
    preDraw: function preDraw()
    {
        // if one layer isn't loaded yet, just try another time
        var ready = true;
        Array.each(this.tileSets, function(tileset) {
            if(!tileset.ready)
                ready = false;
        }.bind(this));
        if(!ready)
            return false;

        this.preCanvas = document.createElement("canvas");
        this.preCanvas.width = this.tmxMap.width * this.tmxMap.tileWidth;
        this.preCanvas.height = this.tmxMap.height * this.tmxMap.tileHeight;
        var ctx = this.preCanvas.getContext("2d");

        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, this.preCanvas.width, this.preCanvas.height);

        Array.each(this.tmxMap.layers, function(layer) {
            switch(layer.name)
            {
            case 'set':
            case 'walkable':
                break;
            default:
                ctx.globalAlpha = layer.opacity;
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

                var width = 125;  // Triangle Width
                var height = 105; // Triangle Height
                var padding = 20;
            }
        }.bind(this));
        ctx.globalAlpha = 1;
    },

    draw: function draw(ctx, width, height)
    {
        if(this.preCanvas == null && !this.preDraw())
            return;

        ctx.drawImage(this.preCanvas, 0, 0);
    },
});

