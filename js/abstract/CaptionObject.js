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
var CaptionObject = new Class({
	
    Extends: DisplayableObject,
    
	content: 'no content',
    textAlign: 'left',
    textBaseline: 'bottom',
    font: '20pt Courier',
    color: 'rgb(0, 0, 0)',
	
	initialize: function(params)
    {
        this.parent(params);

		if (params.content) this.content = params.content;
		if (params.textAlign) this.textAlign = params.textAlign;
		if (params.textBaseline) this.textBaseline = params.textBaseline;
		if (params.font) this.font = params.font;
		if (params.color) this.color = params.color;
	},

    bubble: function(ctx, w)
    {
        ctx.beginPath();
        var x = this.x,
            y = this.y,
            h = 50;

        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(20, -5,
                             20, -25);
        ctx.quadraticCurveTo(-15, -25,
                             -15, -25 - h / 2);
        ctx.quadraticCurveTo(-15, -25 - h,
                             15 + w / 2, -25 - h);
        ctx.quadraticCurveTo(15 + w, -25 - h,
                             15 + w, -25 - h / 2);
        ctx.quadraticCurveTo(15 + w, -25,
                             35, -25);
        ctx.quadraticCurveTo(35, -5,
                             0, 0);
    },
	
	draw: function(ctx, canvasWidth, canvasHeight)
    {
        ctx.save();

        ctx.textAlign = this.textAlign;
        ctx.textBaseline = this.textBaseline;
        ctx.font = this.font;
        var w = ctx.measureText(this.content, 0, -35).width;
        var x = this.x;
        if(x + w > canvasWidth)
            x = canvasWidth - w;
        ctx.translate(x, this.y);

        ctx.fillStyle = 'white';
        this.bubble(ctx, w);
        ctx.fill();

        ctx.fillStyle = 'black';
        this.bubble(ctx, w);
        ctx.stroke();

        ctx.textAlign = this.textAlign;
        ctx.textBaseline = this.textBaseline;
        ctx.font = this.font;
        ctx.fillStyle = this.color;
        ctx.fillText(this.content, 0, -35);

        ctx.restore();
	}

});
