ig.module( 
	'plugins.zmagic.zmagic' 
)
.requires(
	'impact.impact'
)
.defines(function(){

ig.Zmagic = ig.Class.extend({

    	instance: null,

    	staticInstantiate: function( ignore ) {
        	if( ig.Zmagic.instance == null ) {
            		return null;
        	}
        	else {
            		throw("Error: ig.Zmagic has already been instantiated. It can only be instantiated once.");
            		return ig.Zmagic.instance;
        	}
    	},

    	init: function() {
    	
    		//Inject three new methods into ig.Entity
		ig.Entity.inject({
			
			//Move calling Entity to the Back
			moveToBack: function(){
				var ents = ig.game.entities;
				ents.splice( ents.indexOf( this ), 1 );
				ents.unshift( this );
			},
	        	
	        	//Move calling Entity to the front
	            	moveToFront: function() {
	            		var ents = ig.game.entities;
	                	ents.splice( ents.indexOf( this ), 1 );
	                	ents.push( this );
	            	},
	        	
	        	//Move calling Entity to a specified zIndex
		        setzIndex: function( newZ ){
		        	
		        	//remove current zIndex
		    		var ents = ig.game.entities;
		    		ents.splice( ents.indexOf( this ), 1 );
		    		
		    		//insert new zIndex
		    		var i = ents.length;
		    		while( i-- ){
				        if( ents[i].zIndex <= newZ ){
				            ents.splice( i + 1, 0, this );
				            break;
				        }
		    		}
		    		this.zIndex = newZ;
			},
				
			//Swap calling Entity with another Entity
			swapzIndex: function( ent ){
					var ents = ig.game.entities;
					var a = ents.indexOf( this );
					var b = ents.indexOf( ent );
					ents[a] = ent;
					ents[b] = this;
			}
		
		});

        	ig.Zmagic.instance = this;
    	}

});

});