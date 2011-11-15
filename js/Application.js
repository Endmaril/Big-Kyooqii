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

var Application = new Class({
    scene: null,
    context: null,
    canvas: null,

    initialize: function(){
        this.canvas = document.id('game-canvas');
        this.context = this.canvas.getContext('2d');

        this.setScene(new Title(this));

        document.addEvent('keydown', function(event){
            if(!this.scene.keyDown(event))
                event.preventDefault();
        }.bind(this));
        
        document.addEvent('keyup', function(event){
            if(this.scene.keyUp) this.scene.keyUp(event);
        }.bind(this));
    },

    setScene: function(scene)
    {
        this.scene = scene;
        this.invalidate();
    },

    invalidate: function(){
        var pThis = this;
        window.requestAnimFrame(function(time){
            pThis.scene.update(time);
            pThis.render(time);
        });
    },

    render: function(time){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.scene.render(this.context, time);
    },
});

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
            function(callback){
                window.setTimeout(callback, 1000 / 60);
            };
})();
