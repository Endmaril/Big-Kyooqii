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
    
    needsRefresh: false,
    
    move: {}, // keyboard events
  
    initialize: function(app)
    {
        this.parent(app);
        
        // initialize the room
        this.room = new Room({});        
        this.room.addMonster(new Monster({
            name: 'Roger',
            pv: 10,
            speed: 1,
            radius: 18,
            aimScope: 200,
            imgPath: $IMG_DIR + 'monster.png'
        }));
        this.room.addMonster(new Monster({
            name: 'Bob',
            x: 500,
            y: 500,
            pv: 10,
            speed: 1,
            radius: 18,
            aimScope: 100,
            imgPath: $IMG_DIR + 'monster.png'
        }));
        this.room.addBairk(new Bairk({
            name: 'Bairky',
            x: 500,
            y: 300,
            speed: 1.5,
            radius: 18,
            aimScope: 130,
            imgPath: $IMG_DIR + 'hero.png'
        }));
        this.room.addItem(new Item({
            name: 'FuelBottle30',
            x: 100,
            y: 500,
            carac: 'Fuel',
            value: 30,
            imgPath: $IMG_DIR + 'hero.png'
        }));
        
        // put every displayable objects form the room to the scene.
        var pThis = this;
        this.room.monsters.each(function(element){
          pThis.objects[element.name] = element;
        });
        this.room.bairks.each(function(element){
          pThis.objects[element.name] = element;
        });
        this.room.items.each(function(element){
          pThis.objects[element.name] = element;
        });
        
        // hero
        this.objects.kyooqii = new Kyooqii({
            pv: 12,
            x: 300,
            y: 300,
            speed: 2.5,
            radius: 18,
            imgPath: $IMG_DIR + 'fullLight.png',
            imgFull: $IMG_DIR + 'fullLight.png',
            imgHalf: $IMG_DIR + 'halfLight.png',
            imgEmpty: $IMG_DIR + 'emptyLight.png'
        });
        
    },
  
    update: function(dt)
    {
        this.updateScene(dt);

        var kyooqii = this.objects.kyooqii;
        var monster1 = this.objects.monster1;
        
        if (kyooqii.isInvincible()) kyooqii.decInvincibleTime(1);
        console.log(kyooqii.isInvincible());
        
        // keyboard events
        if (this.move.left) kyooqii.move(-1,0);
        if (this.move.right) kyooqii.move(1,0);
        if (this.move.up) kyooqii.move(0,-1);
        if (this.move.down) kyooqii.move(0,1);
        if(this.move.left || this.move.right || this.move.up || this.move.down)
        {
            this.needsRefresh = true;
        }
        
        // Monsters logic
        this.room.monsters.each(function(element) {
          var dist = kyooqii.dist(element);
          if ((dist<=element.aimScope))
          {
            if (kyooqii.collide(element) && (!kyooqii.isInvincible())) {
                kyooqii.setInvincibleForAMoment(100);
                kyooqii.decPv(1);
                console.log(kyooqii.pv);
                kyooqii.heartTableFunction[kyooqii.pv-1]();
            }
            else if (!kyooqii.collide(element)){
                element.move((kyooqii.x-element.x)/dist, (kyooqii.y-element.y)/dist);
            }
          }
        });
        
        // Bairks logic
        this.room.bairks.each(function(element) {
          var dist = kyooqii.dist(element);
          if ((dist<=element.aimScope) && !(kyooqii.collide(element))) {
            element.move(-(kyooqii.x-element.x)/dist, -(kyooqii.y-element.y)/dist);
          }
        });
        
        // Items logic
        this.room.items.each(function(element) {
          var dist = kyooqii.dist(element);
          if (kyooqii.collide(element)) {
              this.popup(new CaptionObject({x: kyooqii.x, y: kyooqii.y, content: 'Bonus!'}));
            element.use(kyooqii);
            this.room.items = this.room.items.erase(element);
            delete this.objects[element.name];
            this.needsRefresh = true;
          }
        }, this);
        
        // invalidate() when something appear
        Object.each(this.objects, function(element) {
            if (element != kyooqii) {
                if (kyooqii.canSee(element)) {
                    this.needsRefresh = true;
                }
            }
        }, this);
        
        // invalidate() when fuel cross limit
        kyooqii.decFuel(0.1);
        if (kyooqii.setImage())
        {
            document.id('lantern').src = kyooqii.getLanternImg();
            console.log(kyooqii.img.src);
            this.needsRefresh = true;
        }
        
        if(this.needsRefresh) this.app.invalidate();
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
        if (event.key == 'space')
        {
            this.objects.kyooqii.decFuel();
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
