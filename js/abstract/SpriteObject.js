/*
	How to use ?
	
	var sprite = new SpriteObject({
     x: 100,
     y: 100,
   });
   
   sprite.add({
     sequenceName: 'run',
     spriteSheet: 'spriteSheet.png',
     totalFrame: 4,
     offset: 0,
     frameSize: {w: 32, h: 32},
     framePerSecond: 1,
     scale: 1
   });
   
   sprite.add({
     sequenceName: 'walk',
     spriteSheet: 'spriteSheet.png',
     totalFrame: 4,
     offset: 4,
     frameSize: {w: 32, h: 32},
     framePerSecond: 0.5, // every 2 sec
     scale: 1
   });
   
   this.objects.hero.start('run');
   this.objects.hero.start('run'); // does nothing
   //this.objects.hero.start('walk');
*/

var SpriteObject = new Class({
	
  Extends: DisplayableObject,
  
	sequences: {},
	currentSequence: null,
	// timer related :
	nextTick: 1, // sec
	timeBeforeTick: 0, // sec
	paused: true,
	// img related :
	scale: 1,
	radius: 1,
	
	initialize: function(params){
    this.parent(params);
	},
	
	/*
		ADD a new sequence that can be played :
		sequenceName (MANDATORY)	: name of the sequence
		spriteSheet (MANDATORY)		: spriteSheet that contains the sequence
		totalFrame								: number of images of the animation
		offset										: offset of the first image
		framePerSecond						: images will change each 1/framePerSecond sec
		scale											: scale of the image
		frameSize									: size of an image of the animation
	*/
	add: function add(params){
		var seq = {};
		seq.offset = 0;
		seq.totaleFrame = 0;
		seq.nextTick = 1000;
		seq.frameSize = {w:0, h:0};
		
		if(params.sequenceName)
			seq.sequenceName = params.sequenceName;
		else {
			console.log("No name for the sequence");
			return;
		}
		if (params.spriteSheet)
    {
	    seq.spriteSheet = params.spriteSheet;
	
	    seq.img = new Image();
	    seq.img.ready = false;
	    seq.img.src = seq.spriteSheet;
	    seq.sheetSize = {w: seq.img.width, h: seq.img.height};
	    seq.img.onload = function (){
	        this.ready = true;
	    };
    } else {
    	console.log("invalid spriteSheet for " + seq.name);
			return;
    }
    if (params.totalFrame) seq.totalFrame = params.totalFrame;
    if (params.offset) seq.offset = params.offset;
    if (params.framePerSecond) seq.nextTick = 1/params.framePerSecond;
    seq.timeBeforeTick = seq.nextTick;
    if (params.scale) this.scale = params.scale;
    if (params.frameSize) seq.frameSize = params.frameSize;
    seq.currentFrame = seq.offset;
    seq.framePerRow = Math.floor(seq.sheetSize.w/seq.frameSize.w);
		this.sequences[params.sequenceName] = seq;
		this.currentSequence = seq;
	},
	
	/*
		INCREASE the sprite counter
	*/
	currentFramePlusPlus: function currentFramePlusPlus(){
		if (!this.paused) {
			if (this.currentSequence.currentFrame+1 > this.currentSequence.totalFrame+this.currentSequence.offset)
				this.currentSequence.currentFrame = this.currentSequence.offset+1;
			else this.currentSequence.currentFrame += 1;
		}
	},
	
	/*
		START the named animation
	*/
	start: function start(sequenceName){
		this.paused = false;
		if ( this.currentSequence == this.sequences[sequenceName]) return;
		this.currentSequence = this.sequences[sequenceName]
		this.currentSequence.currentFrame = this.currentSequence.offset+1;
		this.currentSequence.timeBeforeTick = this.currentSequence.nextTick;
		this.paused = false;
	},
	
	
	/*
		PAUSE the current animation
	*/
	pause: function pause(seq){
		this.paused = true;
	},
	
	update: function update(dt){
		this.currentSequence.timeBeforeTick -= dt;
		if (this.currentSequence.timeBeforeTick <= 0) {
			this.currentFramePlusPlus();
			this.currentSequence.timeBeforeTick += this.currentSequence.nextTick;
			return true;
		}
		return false
	},
	
	draw: function(ctx){
	  var posX = this.x; //Math.round((this.x-this.img.width/2)/2)*2 ;
	  var posY = this.y; //Math.round((this.y-this.img.height/2)/2)*2 ;
	  var f = this.currentSequence.currentFrame-1
	  var imgBounds = [(f%this.currentSequence.framePerRow)*this.currentSequence.frameSize.w,
	  									(Math.floor(f/this.currentSequence.framePerRow))*this.currentSequence.frameSize.h,
	  									this.currentSequence.frameSize.w,
	  									this.currentSequence.frameSize.h]
	  ctx.drawImage(this.currentSequence.img,imgBounds[0],imgBounds[1],imgBounds[2],imgBounds[3],
	  							posX,posY,imgBounds[2]*this.scale,imgBounds[3]*this.scale)
		//console.log(this.currentSequence.img+","+imgBounds[0]+","+imgBounds[1]+","+imgBounds[2]+","+
			//					imgBounds[3]+","+posX+","+posY+","+imgBounds[2]*this.scale+","+imgBounds[3]*this.scale);
		console.log(this.currentSequence.currentFrame);
	}
});
