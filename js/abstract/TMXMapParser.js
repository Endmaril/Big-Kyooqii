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

/**
 * Definition of objects used to parse the map from the tmx file
 */

var TileInTileset = function()
{
    this.id = 0;            //id int the tileset
    this.images = {};       //images associated with the tile
    this.properties = {};    //name:value for each property
};

var Image = function()
{
    this.src="";           //path to the image
    this.trans="";          //transparent color in the form "RRGGBB" in hex.
};

var TileSet = function()
{
    this.firstGid= 0;
    this.name= "";
    this.tileWidth= 0;
    this.tileHeight= 0;
    this.spacing= 0;
    this.margin= 0;
    this.images= {};       //indexed by src
    this.tiles= {};         //indexed by id
};

var Data = function()
{
    this.encoding = "";
    this.compress = "";
    this.data = "";
    this.tiles = [];        //Array of gid
};

var Layer = function()
{
    this.name= "";
    this.x= 0;
    this.y= 0;
    this.width= 0;
    this.height= 0;
    this.opacity= 0;
    this.visible= 0;
    this.properties= {};   //name:value for each property
    this.data= new Data();
};

var MapObject = function()
{
    this.name= "";
    this.type= "";
    this.x= 0;
    this.y= 0;
    this.width= 0;
    this.height= 0;
    this.gid= 0;
};

var ObjectGroup = function()
{
    this.name= "";
    this.mapObjects= [];
};

var TMXMap = function() 
{
    this.layers= [];
    this.tileSets= {},       //index with the firstgid attribute; contains TileSet objects.
    this.orientation= 0;     // 0 for orthogonal and 1 for isometric.
    this.width= 0;
    this.height= 0;
    this.tileWidth= 0;
    this.tileHeight= 0;
    this.properties= {};      //name:value for each property
};

/**
 * The Map class containing the representation of a map
 */
var TMXMapParser = new Class ({

  /* Public: */
  initialize: function initialize(mapPath) {
    this.tmxMap = new TMXMap();
    this.parse(mapPath);
    console.log();
  },
  
  /* Private: */
  tmxMap: null,
  
  /**
   * Load an xml file and return it
   */
  loadXML: function loadXML(docPath){
      var docXML = null;
      
      if (XMLHttpRequest)
      {
        // déclaration pour Mozilla et FF
        req = new XMLHttpRequest();
      }
      else if (ActiveXObject)
      {// code for IE6, IE5
        req = new ActiveXObject("Microsoft.XMLHTTP");
      }
      else 
      {
      
        alert('Votre navigateur ne saurait pas éxécuter ce jeu.');
        return null;
      }
      req.open("GET", docPath, false); 
      req.send(null);
      docXML = req.responseXML;
      docXML = (docXML.documentElement.nodeName == "parsererror") ? null : docXML;
      
      return docXML;
  },

  /**
   * Process the xml file, saving parametters in a TMXMap object.
   */
  parse: function parse(mapPath) {
      mapXML = this.loadXML(mapPath);
      if (mapXML == null) {
          return;
      }
      // Begin processing de DOM and saving parameters into the TMXMap object
      var rootElement = mapXML.documentElement;
      // The dom is not corretct, the root element is not map
      if (rootElement.nodeName != "map")
          return;
        
      if(rootElement.hasAttribute("orientation"))
          this.tmxMap.orientation = (rootElement.getAttribute("orientation")=="orthogonal") ? 0 : 1;
          
      if(rootElement.hasAttribute("width"))
          this.tmxMap.width = rootElement.getAttribute("width");
          
      if(rootElement.hasAttribute("height"))
          this.tmxMap.height = rootElement.getAttribute("height");
          
      if(rootElement.hasAttribute("tilewidth"))
          this.tmxMap.tileWidth = rootElement.getAttribute("tilewidth");
          
      if(rootElement.hasAttribute("tileheight"))
          this.tmxMap.tileHeight = rootElement.getAttribute("tileheight");
      
      while(rootElement.firstElementChild != null)
      {
          var child = rootElement.firstElementChild
          console.log(child.nodeName);
          switch(child.nodeName)
          {
            case "tileset" :
                this.processTileSet(child);
            break;
            
            case "layer" :
                this.processLayer(child);
            break;
            
            case "objectgroup" :
                this.processObjectGroup(child);
            break;
            
            case "properties" :
                this.processProperties(child);
            break;
          }
          rootElement.removeChild(child);
      }
  },
  
  processTileSet: function processTileset(element)
  {
      var tileSet = new TileSet();
      
      if(element.hasAttribute("firstgid"))
          tileSet.firstGid = parseInt(element.getAttribute("firstgid"));
          
      if(element.hasAttribute("source"))
          tileSet.source = element.getAttribute("source");
      
      if(element.hasAttribute("name"))
          tileSet.name = element.getAttribute("name");
          
      if(element.hasAttribute("tilewidth"))
          tileSet.tileWidth = parseInt(element.getAttribute("tilewidth"));
          
      if(element.hasAttribute("tileheight"))
          tileSet.tileHeight = parseInt(element.getAttribute("tileheight"));
          
      if(element.hasAttribute("spacing"))
          tileSet.spacing = parseInt(element.getAttribute("spacing"));
          
      if(element.hasAttribute("margin"))
          tileSet.margin = parseInt(element.getAttribute("margin"));
    
      while(element.firstElementChild != null)
      {
          var child = element.firstElementChild;
          console.log(child.nodeName);
          switch(child.nodeName)
          {
            case "image" :
                
            break;
            
            case "tile" :
            
            break;
          }
          element.removeChild(child);
      }
      
      this.tmxMap.tileSets[tileSet.firstGid] = tileSet;
  },
  
  processLayer: function processLayer(element)
  {
      
  },
  
  processObjectGroup: function processObjectGroup(element)
  {
      
  },
  
  processProperties: function processProperties(element)
  {
      
  }
});
