/**
 * @author Anthony Dry
 */

//----SOME SORT OF FAKE ENUMS-----------
var BrickStatus =
{

    Untouched:"Untouched-brick",
    Active:"Active-brick",
    Selected:"Selected-brick",
    ActiveOnSelected:"Active-on-selected",
    ActiveOnCorrect:"Active-on-correct",
    Revealed:"Revealed-brick",
    Correct:"Correct-brick",

}
var MoveList =
{
	Up:0,
	Down:1,
	Right:2,
	Left:3
}
var RowList =
{
	row1:1,
	row2:2,
	row3:3,
	row4:4
}
var ColList =
{
	col1:1,
	col2:2,
	col3:3,
	col4:4
}
var PlayerPair = 0;
var CountTries = 0;
var earlierStateMemoHandler;
var backUpActive = null;
var MAX_SELECTED = 2;
var CURRENTLY_SELECTED = 0;
var SelectedIds = new Array();
var GLOBAL_SECRETPICTURES;
//----------------------------------------


function initMemoryGame()
{
	GLOBAL_SECRETPICTURES = RandomPlacementGenerator();
	DoMemoryGameStart();
	ResetActive();
	addCSS("#display #theMemoryGame{animation-delay:1s;-moz-animation-delay:1s; /* Firefox */-webkit-animation-delay:1s; /* Safari and Chrome */-o-animation-delay:1s; /* Opera */animation:fadeInGame 2s;-moz-animation:fadeInGame 2s; /* Firefox */-webkit-animation:fadeInGame 2s; /* Safari and Chrome */-o-animation:fadeInGame 2s; /* Opera */-webkit-animation-fill-mode: forwards;-moz-animation-fill-mode: forwards;animation-fill-mode: forwards;-o-animation-fill-mode: farwards;}");

}
//Finds the Current Active brick in the game.
function GetActiveBrickPosition()
{
	var CurrentlyChecking;
	var isActive;
	var classes;
	var r;
	var c;
	var rtn = new Array();
		for (var i=1;i<=16;i++)
		{
			CurrentlyChecking = document.getElementById("brick"+i);
			classes = CurrentlyChecking.className;
			isActive = classes.toString().substr(5);
			//ganska snyggt försök för att inte få det att bli problem när du går över redan satta brickor så de behåller allt de ska ha etc.
			if(isActive == BrickStatus.Active || isActive == BrickStatus.Active+" "+BrickStatus.ActiveOnSelected || isActive == BrickStatus.Active+" "+BrickStatus.ActiveOnCorrect)
			{		
				break;
			}
		}
	r = CurrentlyChecking.parentNode.id;
	c = classes.substr(0,4)
	rtn.push(r);
	rtn.push(c);
	backUpActive = rtn;
	return rtn;	
}

function CheckMove(a_position,a_direction)
{
	var newPosition = new Array();
	var row = a_position[0].substr(0,3);
	var rowValue = parseInt(a_position[0].substr(3));
	var col = a_position[1].substr(0,3);
	var colValue = parseInt(a_position[1].substr(3));
	
	//Ganska mycke onödig kod hade nog brytit ut detta i 2 functioner en för left och right och en för up and down.
	
	//if Up key is pressed!
	if(a_direction == MoveList.Up)
	{
		if(rowValue == RowList.row1)
		{
			rowValue = RowList.row4;
		}
		else if(rowValue == RowList.row2)		
		{
			rowValue = RowList.row1;
		}
		else if(rowValue == RowList.row3)		
		{
			rowValue = RowList.row2;
		}
		else if(rowValue == RowList.row4)		
		{
			rowValue = RowList.row3;
		}
	}
	//if Down Key is pressed!
	if(a_direction == MoveList.Down)
	{
		if(rowValue == RowList.row1)
		{
			rowValue = RowList.row2;
		}
		else if(rowValue == RowList.row2)		
		{
			rowValue = RowList.row3;
		}
		else if(rowValue == RowList.row3)		
		{
			rowValue = RowList.row4;
		}
		else if(rowValue == RowList.row4)		
		{
			rowValue = RowList.row1;
		}
	}
	//if Left key is pressed!
	if(a_direction == MoveList.Left)
	{
		if(colValue == ColList.col1)
		{
			colValue = ColList.col4;
		}
		else if(colValue == ColList.col2)		
		{
			colValue = ColList.col1;
		}
		else if(colValue == ColList.col3)		
		{
			colValue = ColList.col2;
		}
		else if(colValue == ColList.col4)		
		{
			colValue = ColList.col3;
		}
	}
	//if Right key is pressed
	if(a_direction == MoveList.Right)
	{
		if(colValue == ColList.col1)
		{
			colValue = ColList.col2;
		}
		else if(colValue == ColList.col2)		
		{
			colValue= ColList.col3;
		}
		else if(colValue == ColList.col3)		
		{
			colValue = ColList.col4;
		}
		else if(colValue == ColList.col4)		
		{
			colValue = ColList.col1;
		}
	}
	//merge the position 2 the newPosition
	newPosition.push(row+rowValue);
	newPosition.push(col+colValue);
	
	DoMove(newPosition,a_position,a_direction);
}

function DoMove(newPos,oldPos,direction)
{ 
	
	var oldCol;
	var newCol;
	var oldRow = document.getElementById(oldPos[0]);
	var searchOldCol = document.getElementsByClassName(oldPos[1]); 
	var newRow = document.getElementById(newPos[0]);
	var searchNewCol = document.getElementsByClassName(newPos[1]);
	
	for(var i=0; i< searchOldCol.length; i++)
	{
		if(searchOldCol[i].parentNode == oldRow)
		{
			oldCol = searchOldCol[i].getAttribute("id");
		} 
	}
	for(var a=0; a< searchNewCol.length; a++)
	{
		if(searchNewCol[a].parentNode == newRow)
		{
			newCol = searchNewCol[a].getAttribute("id");
		} 
	}
	oldCol = document.getElementById(oldCol);
	newCol = document.getElementById(newCol);
	
	if(earlierStateMemoHandler == oldPos[1]+" "+BrickStatus.Selected)
	{
		oldCol.className = oldPos[1]+" "+BrickStatus.Selected;
	}
	else if(earlierStateMemoHandler == oldPos[1]+" "+BrickStatus.Correct)
	{
		oldCol.className = oldPos[1]+" "+BrickStatus.Correct;
	}
	else
	{
		oldCol.className = oldPos[1]+" "+BrickStatus.Untouched;
	}
	
	earlierStateMemoHandler = newCol.className;
	
	if(newCol.className == newPos[1]+" "+BrickStatus.Selected)
	{
		newCol.className = newPos[1]+" "+BrickStatus.Active+" "+BrickStatus.ActiveOnSelected;	
	}
	else if(newCol.className == newPos[1]+" "+BrickStatus.Correct)
	{
		newCol.className = newPos[1]+" "+BrickStatus.Active+" "+BrickStatus.ActiveOnCorrect;	
	}
	else
	{
		newCol.className = newPos[1]+" "+BrickStatus.Active;
		
	}
}

function MakeSelected(pos)
{
	
	var row = document.getElementById(pos[0]);
	var col;
	var searchCol = document.getElementsByClassName(pos[1]); 
	for(var i=0; i< searchCol.length; i++)
	{
		if(searchCol[i].parentNode == row)
		{
			var colId = searchCol[i].getAttribute("id");
			col = searchCol[i]
		} 
	}
	
	if(earlierStateMemoHandler == pos[1]+" "+BrickStatus.Selected)
	{
		
		col.className = pos[1]+" "+BrickStatus.Active;
		earlierStateMemoHandler = pos[1]+" "+BrickStatus.Untouched;
		if(CURRENTLY_SELECTED == 1)
		{
			SelectedIds.pop();
		}
		CURRENTLY_SELECTED--;
	}
	else if(earlierStateMemoHandler == pos[1]+" "+BrickStatus.Correct)
	{
		
	}
	else if(CURRENTLY_SELECTED < MAX_SELECTED)
	{
		col.className = pos[1]+" "+BrickStatus.Active+" "+BrickStatus.ActiveOnSelected;
		earlierStateMemoHandler = pos[1]+" "+BrickStatus.Selected;
		CURRENTLY_SELECTED++;
		SelectedIds.push(colId);
	
	}
	
	if(CURRENTLY_SELECTED == MAX_SELECTED)
	{	
		CURRENTLY_SELECTED = 0;
		FlipBricks(SelectedIds);	
	}
}	
function FlipBricks(FlipIds)
{
	
	
	var select1 = document.getElementById(FlipIds[0]);
	var select2 = document.getElementById(FlipIds[1]);
	var SaveCol1;
	var SaveCol2;
	var brickId1 = 0;
	var brickId2 = 0;
	
	
	//first Selected
	SaveCol1 = select1.className;
	
	SaveCol1 = SaveCol1.substr(0,4);
	select1.className = SaveCol1+" "+BrickStatus.Revealed;
	brickId1 = select1.id.substr(5);
	
	select1.innerHTML = CreateVisibleBrick(brickId1-1);
	//Second Selected
	SaveCol2 = select2.className;
	SaveCol2 = SaveCol2.substr(0,4);
	select2.className = SaveCol2+" "+BrickStatus.Revealed;
	brickId2 = parseInt(select2.id.substr(5));
	select2.innerHTML = CreateVisibleBrick(brickId2-1);
	
	if(CheckMatch(select1.innerHTML,select2.innerHTML) == true)
	{
		
		SelectedIds.length = 0;
		PlayerPair++;
		select1.className = SaveCol1+" "+BrickStatus.Correct;
		select2.className = SaveCol2+" "+BrickStatus.Correct;
		if(PlayerPair != 8)
		{
			_SoundEffectCorrect.play();
			ResetActive();
		}
		else
		{
			ShowEndScreen();
		}
	}
	else
	{
		_SoundEffectWrong.play();
		ShortGameFreeze  = true;
		setTimeout(function(){HideBricks(select1,SaveCol1,select2,SaveCol2);}, 1500)
		
	}
}
function CheckMatch(val1,val2)
{
	if(val1 == val2)
	{
		
		return true;
	}
	return false;
}
function HideBricks(valOne,classOne,valTwo,classTwo)
{
	ShortGameFreeze = false;
	SelectedIds.length = 0;
	valOne.innerHTML = HiddenBrick;
	valTwo.innerHTML = HiddenBrick;
	valOne.className = classOne+" "+BrickStatus.Untouched;
	valTwo.className = classTwo+" "+BrickStatus.Untouched;
	
	CountTries++;
	ResetActive();
	
}

function ResetActive()
{
	
	var CurrentlyChecking;
	var isActive;
	var classes;
	var r;
	var c;
	var rtn = new Array();
		for (var i=1;i<=16;i++)
		{
			CurrentlyChecking = document.getElementById("brick"+i);
			classes = CurrentlyChecking.className;
			isActive = classes.toString().substr(5);
			if(isActive == BrickStatus.Untouched)
			{		
				break;
			}
		}
	r = CurrentlyChecking.parentNode.id;
	c = classes.substr(0,4)
	rtn.push(r);
	rtn.push(c);
	
	
	DoResetBrickPosition(rtn);	
}
function DoResetBrickPosition(pos)
{
	
	var Row = document.getElementById(pos[0]);
	var searchCol = document.getElementsByClassName(pos[1]); 
	for(var i=0; i< searchCol.length; i++)
	{
		if(searchCol[i].parentNode == Row)
		{
			var Colid = searchCol[i].getAttribute("id");
		} 
	}
	var Col = document.getElementById(Colid);
	Col.className = pos[1]+" "+BrickStatus.Active;
	earlierStateMemoHandler = pos[1]+" "+BrickStatus.Untouched;
}



