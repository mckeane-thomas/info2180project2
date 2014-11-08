
var divTags;
var BLANK_Y;
var BLANK_X;
var siz = 15;

window.onload = function ()
{
        BLANK_X = "300px";
	BLANK_Y = "300px";
	var puzzlearea = $("puzzlearea");
        var shufflebutton = $("shufflebutton");	
	divTags= puzzlearea.getElementsByTagName("div");
        //div = $$
        var emptyDiv = document.createElement("div");
	emptyDiv.id = "empty";
	puzzlearea.appendChild(emptyDiv);
        
    for (var i=0; i<divTags.length; i++)	{
		divTags[i].className = "puzzlepiece";
		divTags[i].style.left = (i%4*100)+"px";
		divTags[i].style.top = (parseInt(i/4)*100) + "px";
		divTags[i].style.backgroundPosition= "-" + divTags[i].style.left + ' ' + '-' + divTags[i].style.top;
		
                //function to set css style if the tyles are moveable. 
                divTags[i].onmouseover = function()
		{
			if (moveablePiece(parseInt(this.innerHTML)))
			{       
				this.addClassName("movablepiece");
			}
                        else{this.removeClassName("movablepiece");}
		};
                //reset the style of the tile when the mouse moves out from it.
		
                //check the current move if the game is finished. and call the you win function
		divTags[i].onclick = function()
		{
			if (moveablePiece(parseInt(this.innerHTML)))
			{
				swap(this.innerHTML-1);
				if (isFinish())
				{
					solvedPuzzle();
				}
				return;
			}
		};
	}
        
   
	     
        
   shufflebutton.onclick = shufflePuzzle;


};

//check if a tile is moveable
function moveablePiece(pos)
{
	if (checkLeft(BLANK_X, BLANK_Y) === (pos-1))
	{
		return true;
	}

	if (checkDown(BLANK_X, BLANK_Y) === (pos-1))
	{
		return true;
	}

	if (checkUp(BLANK_X, BLANK_Y) === (pos-1))
	{
		return true;
	}

	if (checkRight(BLANK_X, BLANK_Y) === (pos-1))
	{
		return true;
}
}

//check if the game is finished
function isFinish()
{
	var isFinish = true;
	for (var i = 0; i < divTags.length; i++) {
		var y = parseInt(divTags[i].style.top);
		var x = parseInt(divTags[i].style.left);

		if (x !== parseInt(i%4*100) || y !== parseInt(i/4)*100)
		{
			isFinish = false;
			break;
		}
	}
	return isFinish;
}

//calculate left movement in the horizontal plane
function checkLeft(mov_x, mov_y)
{
        
	//var empty = document.getElementById("empty");
        
	if (parseInt(mov_x) > 0)
	{
		for (var i = 0; i <divTags.length; i++) 
		{
			if (parseInt(divTags[i].style.left) +100===parseInt(mov_x) && parseInt(divTags[i].style.top) === parseInt(mov_y))
			{
				return i;
			} 
		}
	}
       
	else 
	{
		return -1;
	}
}
//calculate right movement in the horizontal plane
function checkRight (mov_x, mov_y) {
	
	if (parseInt(mov_x) < 300)
	{
		for (var i =0; i<divTags.length; i++){
			if (parseInt(divTags[i].style.left) -100 === parseInt(mov_x) && parseInt(divTags[i].style.top) === parseInt(mov_y)) 
			{
				return i;
			}
		}
	}
	else
	{
		return -1;
	} 
}
//calculate "up" movement in the vertical plane

function checkUp (mov_x, mov_y) {
	
	if (parseInt(mov_y) > 0)
	{
		for (var i=0; i<divTags.length; i++)
		{
			if (parseInt(divTags[i].style.top) + 100 === parseInt(mov_y) && parseInt(divTags[i].style.left) === parseInt(mov_x)) 
			{
				return i;
			}
		} 
	}
	else 
	{
		return -1;
	}
}

//calculate "down" movement in the vertical plane
function checkDown (mov_x, mov_y)
{
	if (parseInt(mov_y) < 300)
	{
		for (var i=0; i<divTags.length; i++)
		{
			if (parseInt(divTags[i].style.top) - 100 === parseInt(mov_y) && parseInt(divTags[i].style.left) === parseInt(mov_x)) 
			{
				return i;
			}
		}
	}
	else
	{
		return -1;
	} 
} 

//display a back ground color on the overall id tag if the game is won
function solvedPuzzle()
{
	var overall = $("overall");
	overall.style.backgroundColor = "#FF0000";
		
}
//helper function for swapping tiles, move tiles in blank position 
swap =function(x) {
    
       //swap blank tilein the vertilcal plane
	var temp_var = divTags[x].style.top;
	divTags[x].style.top = BLANK_Y;
	BLANK_Y = temp_var;
        
        //swap blank tile in horizontal plane
         temp_var = divTags[x].style.left;
	divTags[x].style.left = BLANK_X ;
	BLANK_X = temp_var;
	
};




function shufflePuzzle() 
	{
             
		for (var i=0; i<250; i++)
		{
			var rand = parseInt(Math.random()* 100) %4;
			if (rand === 0)
			{
				var tmp = checkUp(BLANK_X, BLANK_Y);
				if ( tmp !== -1)
				{
					swap(tmp);
				}
			}
			if (rand === 1)
			{
				var tmp = checkDown(BLANK_X, BLANK_Y);
				if ( tmp !== -1) 
				{
					swap(tmp);
			}
			}

			if (rand === 2)
			{
				var tmp = checkLeft(BLANK_X, BLANK_Y);
				if ( tmp !== -1)
				{
					swap(tmp);
				}
			}

			if (rand === 3)
			{
				var tmp = checkRight(BLANK_X, BLANK_Y);
				if (tmp !== -1)
				{
					swap(tmp);
				}
		}
		}
	}

