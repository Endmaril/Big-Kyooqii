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
            imgPath: $IMG_DIR + 'monster.png'
        });
    },
  
    update: function(dt)
    {
        this.objects.monster1.x -= (this.move.left)? 100*dt : 0;
        this.objects.monster1.x += (this.move.right)? 100*dt : 0;
        this.objects.monster1.y -= (this.move.up)? 100*dt : 0;
        this.objects.monster1.y += (this.move.down)? 100*dt : 0;

        if(this.move.left || this.move.right || this.move.up || this.move.down)
            this.app.invalidate();
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
