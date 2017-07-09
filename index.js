$(document).ready(function(argument) {
	var tiles;
	var game;
	var isOver;
	var score;
	var scorePara = $('#score p:nth-child(2)');

	var getRandom=function(){
		var randomTiles = $('#board>div.row>div.default-color');
		var elem = randomTiles.eq(Math.floor(Math.random()*randomTiles.length));
		var ran = Math.random();

		if(ran<0.9){
			elem.text("2");
			elem.removeClass(elem.attr('class')).addClass('color_2');
		}

		else{
			elem.text("4");
			elem.removeClass(elem.attr('class')).addClass('color_4');
		}

		updateGame();

	}

	var updateGame=function(){

		for(var i=1;i<=4;i++){
			for(var j=1;j<=4;j++){
				var el = $('#board>div.row:nth-child('+i+')>div:nth-child('+j+')');
				var n = parseInt(el.text());

				if(n>=2){
					game[i-1][j-1] = n;
				}

			}
		}		

	}


	var setTile = function(row,col,num){
		var c= $('#board>div.row:nth-child('+row+')>div:nth-child('+col+')');

		if(num>=2 && num<=64){
			c.text(num);
			c.removeClass(c.attr('class')).addClass('color_'+num);
		}
		else if(num>64){
			c.text(num);
			c.removeClass(c.attr('class')).addClass('color_above');
		}

		else{
			c.text("");
			c.removeClass(c.attr('class')).addClass('default-color');
		}

	};

	var updateBoard = function(){

		for(var i=0;i<4;i++){

			for(var j=0;j<4;j++){
				setTile(i+1,j+1,game[i][j]);

			}

		}

	}

	var isSame = function(){

		for(var i=1;i<=4;i++){

			for(var j=1;j<=4;j++){

				var el = $('#board>div.row:nth-child('+i+')>div:nth-child('+j+')');

				if(parseInt(el.text())!=game[i-1][j-1]){
					if(game[i-1][j-1]==0 && el.text()!=""){
						return false;
					}
				}

			}

		}	

		return true;	

	}

	var moveDown = function(){

			for(var i=0;i<4;i++){

				var hold=-1;
				var posOfIns = 3;
				for(var j=3;j>=0;j--){
					if(game[j][i]!=0){
						if(hold==-1){
							hold=game[j][i];
							game[j][i]=0;
						}

						else if(hold==game[j][i]){
							game[posOfIns][i] = 2*hold;
							score+=2*hold;
							scorePara.text(score);
							game[j][i]=0;
							posOfIns--;
							hold = -1;
						}

						else{
							game[posOfIns][i] = hold;
							hold=game[j][i];
							game[j][i]=0;
							posOfIns--;
						}
					}
				}

				if(hold!=-1){
					game[posOfIns][i] = hold;
				}

			}	

	}

	var moveUp = function(){

			for(var i=0;i<4;i++){

				var hold=-1;
				var posOfIns = 0;
				for(var j=0;j<4;j++){
					if(game[j][i]!=0){
						if(hold==-1){
							hold=game[j][i];
							game[j][i]=0;
						}

						else if(hold==game[j][i]){
							game[posOfIns][i] = 2*hold;
							score+=2*hold;
							scorePara.text(score);
							game[j][i]=0;
							posOfIns++;
							hold = -1;
						}

						else{
							game[posOfIns][i] = hold;
							hold=game[j][i];
							game[j][i]=0;
							posOfIns++;
						}
					}
				}

				if(hold!=-1){
					game[posOfIns][i] = hold;
				}

			}
		
	}

	var moveLeft = function(){
			for(var i=0;i<4;i++){

				var hold=-1;
				var posOfIns = 0;
				for(var j=0;j<4;j++){
					if(game[i][j]!=0){
						if(hold==-1){
							hold=game[i][j];
							game[i][j]=0;
						}

						else if(hold==game[i][j]){
							game[i][posOfIns] = 2*hold;
							score+=2*hold;
							scorePara.text(score);
							game[i][j]=0;
							posOfIns++;
							hold = -1;
						}

						else{
							game[i][posOfIns] = hold;
							hold=game[i][j];
							game[i][j]=0;
							posOfIns++;
						}
					}
				}

				if(hold!=-1){
					game[i][posOfIns] = hold;					
				}

			}
	}

	var moveRight = function(){
		for(var i=0;i<4;i++){

				var hold=-1;
				var posOfIns = 3;
				for(var j=3;j>=0;j--){
					if(game[i][j]!=0){
						if(hold==-1){
							hold=game[i][j];
							game[i][j]=0;
						}

						else if(hold==game[i][j]){
							game[i][posOfIns] = 2*hold;
							score+=2*hold;
							scorePara.text(score);
							game[i][j]=0;
							posOfIns--;
							hold = -1;
						}

						else{
							game[i][posOfIns] = hold;
							hold=game[i][j];
							game[i][j]=0;
							posOfIns--;
						}
					}
				}

				if(hold!=-1){
					game[i][posOfIns] = hold;					
				}

		}
	}

	var movePossible = function(){

		for(var i=0;i<=3;i++){
			for(var j=0;j<=3;j++){

				if(game[i][j]==0){
					return true;
				}

				else if((i<3 && j<3) && (game[i][j]==game[i+1][j] || game[i][j]==game[i][j+1])){
					return true;
				}

			}
		}

		return false;

	}

	var afterMove = function(){
		var same = isSame();
		updateBoard();

		if(!movePossible()){
		    isOver = true;
			$('#game-over').fadeIn();
		}

		if(!same){
			setTimeout(function(){
		       	getRandom();
	  		},110);
		}	
	}

	$('body').on('keydown',function(event){
		if(!isOver){
			if(event.key=='ArrowDown'){
				moveDown();

			}

			else if(event.key=='ArrowUp'){
				
				moveUp();

			}

			else if(event.key=='ArrowLeft'){
				
				moveLeft();

			}

			else if(event.key=='ArrowRight'){
				
				moveRight();

			}

			afterMove();
		}
	});

	document.addEventListener('touchstart', handleTouchStart, false);        
	document.addEventListener('touchmove', handleTouchMove, false);

	var xDown = null;                                                        
	var yDown = null;                                                        

	function handleTouchStart(evt) {                                         
	    xDown = evt.touches[0].clientX;                                      
	    yDown = evt.touches[0].clientY;                                      
	};                                                

	function handleTouchMove(evt) {
	    if ( ! xDown || ! yDown ) {
	        return;
	    }

	    var xUp = evt.touches[0].clientX;                                    
	    var yUp = evt.touches[0].clientY;

	    var xDiff = xDown - xUp;
	    var yDiff = yDown - yUp;

	    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
	        if ( xDiff > 0 ) {
	            /* left swipe */ 
	            moveLeft();
	        } else {
	            /* right swipe */
	            moveRight();
	        }                       
	    } else {
	        if ( yDiff > 0 ) {
	            /* up swipe */ 
	            moveUp();
	        } else { 
	            /* down swipe */
	            moveDown();
	        }                                                                 
	    }
	    /* reset values */
	    xDown = null;
	    yDown = null;  
	    afterMove();                                           
	};

	//------------------------------------------
	$('#button').click(function(event){
		event.preventDefault();
		isOver = false;
		score = 0;
		scorePara.text(score);
		$('#game-over').hide();
		tiles = $('#board>div.row>div');
		game = 
		[
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0],
		];

		tiles.each(function(){
			$(this).addClass("default-color");
		});

		updateBoard();

			getRandom();
			getRandom();
	});

	$('#button').click();
//-----------------------------------------------

});