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

var Title = new Class({
  
    Extends: Scene,
    
    menus: [],
    selected: 0,
  
    initialize: function(app)
    {
        this.parent(app);

        this.menus.push({text: 'Play', callback: function(){
            app.setScene(new Game(app));
        }});
        //this.menus.push({text: 'Options', callback: function(){
            //app.setScene(new TitleOptions(app));
        //}});
        this.menus.push({text: 'Help', callback: function(){
            app.setScene(new TitleHelp(app));
        }});
        
        this.menus.push({text: 'Credits', callback: function(){
            app.setScene(new Credit(app));
        }});
        
        this.objects.titleText = new TextObject({
            x: this.canvas.width/2,
            y: 50,
            content: 'Big Kyooqii',
            textAlign: 'center',
            textBaseline: 'top',
            font: '40pt Courier',
            color: 'rgb(255, 0, 0)'
        });
        
        var baseY = 240;
        
        this.menus.each(function(item){
            this.objects[item.text+'Text'] = new TextObject({
                x: this.canvas.width/2,
                y: baseY,
                content: item.text,
                textAlign: 'center',
                textBaseline: 'middle'
            });
            baseY += 40;
        }, this);

        
        this.objects.selector = new ImageObject({
            x: this.canvas.width/2.75,
            imgPath: $IMG_DIR+'selector.png'
        });
        
        if ( Title.lastSelected ) {
          this.objects.selector.y = 240 + Title.lastSelected*40;
          this.selected = Title.lastSelected;
        }
        else
          this.objects.selector.y = 240 + this.selected*40;
    },

    keyDown: function(event)
    {
        if(event.key == 'up')
        {
            if (this.selected > 0)
            {
                this.objects.selector.y -= 40;
                this.selected--;
            }

            this.app.invalidate();
            return false;
        }
        else if(event.key == 'down')
        {
            if (this.selected < this.menus.length - 1)
            {
                this.objects.selector.y += 40;
                this.selected++;
            }

            this.app.invalidate();
            return false;
        }
        else if(event.key == 'enter')
        {
            Title.lastSelected = this.selected;
            this.menus[this.selected].callback();
        }

        return true;
    }

});

Title.lastSelected = 0;
