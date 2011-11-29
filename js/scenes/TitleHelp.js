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

var TitleHelp = new Class({
  
    Extends: Scene,
  
    initialize: function(params)
    {
        this.parent(params);
        
        this.objects.text1 = new TextObject({
            content: 'Vous devez trouver la clé pour pouvoir vous '
        });
        
        this.objects.text2 = new TextObject({
            content: 'échaper du donjon. Vous possédez une lampe ',
            y:100
        });
        
        this.objects.text3 = new TextObject({
            content: 'qui s\'éteind progressivement. Vous devrez ',
            y:150
        });
        
        this.objects.text4 = new TextObject({
            content: 'trouver du carburant pour l\'alimenter si ',
            y:200
        });
        
        this.objects.text5 = new TextObject({
            content: 'vous ne voulez pas qu\'elle s\'éteigne. ',
            y:250
        });
        
        this.objects.text6 = new TextObject({
            content: 'Faite attention aux trolls, ils sont ',
            y:300
        });
        
        this.objects.text7 = new TextObject({
            content: 'dangereux. En revanche les bairks ',
            y:350
        });
        
        this.objects.text8 = new TextObject({
            content: 'requierent votre aide. Cependant, ils',
            y:400
        });
        
        this.objects.text9 = new TextObject({
            content: 'ont peur dès que quiconque approche,',
            y:450
        });
        
        this.objects.text10 = new TextObject({
            content: 'il faudra donc les rattraper.',
            y:500
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
