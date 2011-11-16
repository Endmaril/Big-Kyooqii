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

var Scene = new Class({

    objects : {},
    popups: [],
    canvas : null,
    ctx : null,
    app : null,

    initialize: function(app)
    {
        if (app) {
            this.app = app;
            this.canvas = app.canvas;
            this.ctx = app.context;
        } else {
            console.error("Pas d'app !!!");
        }
    },

    update: function(dt)
    {
        Object.each(this.objects, function(item) {
            if(item.update)
                item.update(dt);
        }, this);

        Object.each(this.popups, function(popup) {
            if(popup.remaining > -popup.fadeoutduration)
            {
                popup.remaining -= dt;
            }
            else
            {
                //TODO: remove popup from array
                this.app.invalidate();
            }
        }, this);
    },

    popup: function(obj)
    {
        popup = {object: obj, duration: 5.0, remaining: 5.0, fadeoutduration: 0.25};
        this.popups.push(popup);
    },

    render: function(time)
    {
        console.log("draw");
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        var objs = [];
        Object.each(this.objects, function(item) {
            if (item != this.objects.kyooqii) // VIRER, SPECIFIQUE A BIG KYOOQII
                objs.push(item);
        }, this);

        objs.sort(function(a, b){
            return a.y - b.y;
        });
        Array.each(objs, function(item)
        {
            item.draw(this.ctx);
        }, this);
        
        if (this.objects.kyooqii) this.objects.kyooqii.draw(this.ctx); // VIRER, SPECIFIQUE A BIG KYOOQII

        Object.each(this.popups, function(popup) {
            if(popup.remaining > -popup.fadeoutduration) {
                if(popup.remaining < 0)
                    this.ctx.globalAlpha = 1 + popup.remaining / popup.fadeoutduration;

                popup.object.draw(this.ctx);
                this.ctx.globalAlpha = 1;
            }
        }, this);
    }

});
