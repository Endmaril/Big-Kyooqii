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
    
    move: {},
  
    initialize: function(app)
    {
        this.parent(app);
        
        this.objects.monster1 = new Monster({
            name: 'Roger',
            pv: 10,
            speed: 2.3,
            imgPath: $IMG_DIR + 'monster.png'
        });
        
        this.objects.kyooqii = new Kyooqii({
            pv: 10,
            x: 200,
            y: 200,
            speed: 4,
            imgPath: $IMG_DIR + 'hero.png'
        });
    },
  
    update: function(dt)
    {
        var kyooqii = this.objects.kyooqii;
        var monster1 = this.objects.monster1;
        
        kyooqii.x -= (this.move.left)? kyooqii.speed : 0;
        kyooqii.x += (this.move.right)? kyooqii.speed : 0;
        kyooqii.y -= (this.move.up)? kyooqii.speed : 0;
        kyooqii.y += (this.move.down)? kyooqii.speed : 0;

        if(this.move.left || this.move.right || this.move.up || this.move.down)
            this.app.invalidate();
            
        var dist = Math.sqrt(Math.pow((kyooqii.x-monster1.x),2) + Math.pow((kyooqii.y-monster1.y),2));
        
        if (dist <= 250) {
          monster1.x += (kyooqii.x-monster1.x) / dist * monster1.speed;
          monster1.y += (kyooqii.y-monster1.y) / dist * monster1.speed;
        }
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
