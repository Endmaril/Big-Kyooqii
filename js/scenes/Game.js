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

var Game = new Class({
  
    Extends: Scene,
    
    room: null,
    
    // game vars
    nbBairks: 0,
    nbKeys: 0,
    
    move: {}, // keyboard events
  
    initialize: function(app)
    {
        this.parent(app);
        
        this.room = new Room({});
        
        this.room.addMonster(new Monster({
            name: 'Roger',
            pv: 10,
            speed: 2.3,
            radius: 18,
            aimScope: 200,
            imgPath: $IMG_DIR + 'monster.png'
        }));
        this.room.addMonster(new Monster({
            name: 'Bob',
            x: 500,
            y: 500,
            pv: 10,
            speed: 2.3,
            radius: 18,
            aimScope: 130,
            imgPath: $IMG_DIR + 'monster.png'
        }));
        
        this.room.addBairk(new Bairk({
            name: 'Bairky',
            x: 500,
            y: 300,
            speed: 2,
            radius: 18,
            aimScope: 300,
            imgPath: $IMG_DIR + 'hero.png'
        }));
        
        var pThis = this;
        this.room.monsters.each(function(element){
          pThis.objects[element.name] = element;
        });
        
        this.room.bairks.each(function(element){
          pThis.objects[element.name] = element;
        });
        
        // hero
        this.objects.kyooqii = new Kyooqii({
            pv: 10,
            x: 300,
            y: 300,
            speed: 4,
            radius: 18,
            imgPath: $IMG_DIR + 'hero.png'
        });
        
        
    },
  
    update: function(dt)
    {
        var kyooqii = this.objects.kyooqii;
        var monster1 = this.objects.monster1;
        
        if (this.move.left) kyooqii.move(-1,0);
        if (this.move.right) kyooqii.move(1,0);
        if (this.move.up) kyooqii.move(0,-1);
        if (this.move.down) kyooqii.move(0,1);

        if(this.move.left || this.move.right || this.move.up || this.move.down)
            this.app.invalidate();
        
        this.room.monsters.each(function(element) {
          var dist = kyooqii.dist(element);
          if ((dist<=element.aimScope) && !(kyooqii.collide(element))) {
            console.log(element.name+" bouge !");
            element.move((kyooqii.x-element.x)/dist, (kyooqii.y-element.y)/dist);
          }
        });
    },

    keyDown: function(event)
    {
        var weDidNothing = true;
        if (event.key == 'esc')
        {
            this.app.setScene(new Title(this.app));
            return false;
        }
        if (event.key == 'up')
        {
            this.move.up = true;
            weDidNothing = false;
        }
        if (event.key == 'down')
        {
            this.move.down = true;
            weDidNothing = false;
        }
        if (event.key == 'left')
        {
            this.move.left = true;
            weDidNothing = false;
        }
        if (event.key == 'right')
        {
            this.move.right = true;
            weDidNothing = false;
        }
        
        if (weDidNothing)
        {
            return true;
        } else {
            return false;
        }

    },
    
    keyUp: function(event)
    {
        if (event.key == 'up') this.move.up = false;
        if (event.key == 'down') this.move.down = false;
        if (event.key == 'left') this.move.left = false;
        if (event.key == 'right') this.move.right = false;
    }
});
