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

var GameOver = new Class({
  
    Extends: Scene,
  
    initialize: function(app)
    {
        this.parent(app);
        
        this.objects.text1 = new TextObject({
            content: 'Vous avez été tué par les trolls.'
        });
    },
    
    keyDown: function(event)
    {
        if(event.key == 'esc')
        {
            document.id('firstHeart').src = $IMG_DIR + 'fullHeart.png';
            document.id('secondHeart').src = $IMG_DIR + 'fullHeart.png';
            document.id('thirdHeart').src = $IMG_DIR + 'fullHeart.png';
            document.id('lantern').src = $IMG_DIR+'fullLantern.png';
            this.app.setScene(new Title(this.app));
            return false;
        }

        return true;
    }

});
