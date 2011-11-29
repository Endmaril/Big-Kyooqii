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

var Credit = new Class({
  
    Extends: Scene,
  
    initialize: function(app)
    {
        this.parent(app);
        
        this.objects.text1 = new TextObject({
            content: 'Développeurs:'
        });
        
        this.objects.text2 = new TextObject({
            content: 'Jérémy Gabriele',
            x:280
        });
        
        this.objects.text3 = new TextObject({
            content: 'Clément Léger (Wiz)',
            x:280,
            y:100
        });
        
        this.objects.text4 = new TextObject({
            content: 'Romaric Pighetti',
            x:280,
            y:150
        });
        
        this.objects.text5 = new TextObject({
            content: 'Graphisme: ',
            y:200
        });
        
        this.objects.text6 = new TextObject({
            content: 'Anthony Germain',
            x:280,
            y:200
        });
        
        this.objects.text7 = new TextObject({
            content: 'www.lostgarden.com',
            x:280,
            y:250
        });
        
        this.objects.text8 = new TextObject({
            content: 'GameDesign:',
            y:300
        });
        
        this.objects.text9 = new TextObject({
            content: 'Paul Sanchez',
            y:300,
            x:280
        });
    },

    keyDown: function(event)
    {
        if(event.key == 'esc')
        {
            this.app.setScene(new Title(this.app));
            return false;
        }

        return true;
    }

});
