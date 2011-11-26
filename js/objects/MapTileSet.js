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


var MapTileSet = new Class({
    
    firstGid: null,
    tileWidth: null,
    tileHeight: null,
    images: [],
    tiles: [],

    initialize: function(tileSet)
    {
        this.firstGid = tileSet.firstGid;
        this.tileWidth = tileSet.tileWidth;
        this.tileHeight = tileSet.tileHeight;

        Array.each(tileSet.images, function(image) {
            var mapImage = new Image();
            mapImage.src = $MAPS_DIR + image.src;
            mapImage.width = image.width;
            mapImage.height = image.height;
            this.images.push(mapImage);
        }.bind(this));

        var gid = tileSet.firstGid;
        for(var y = 0; y < tileSet.images[0].height; y += tileSet.tileHeight) {
            for(var x = 0; x < tileSet.images[0].width; x += tileSet.tileWidth, gid++) {
                var tile = new MapTile();
                tile.tileSet = this;
                tile.gid = gid;
                tile.images = this.images;
                this.tiles[gid] = tile;
            }
        }
    },

});
