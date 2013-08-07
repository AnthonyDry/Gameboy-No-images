/**
 * @author Anthony Dry
 */
var HiddenBrick = "<span class='HiddenBrick'>?</span>";
var m_tableName = 'theMemoryGame';
var m_ScreenHeader = "StartSceenh3";
var m_gameArea = "display";

function DoStartScreen()
{
	
	var container = document.getElementById(m_gameArea);
	var new_div = document.createElement("div");
	new_div.setAttribute('id', m_ScreenHeader);
	new_div.innerHTML = "<h3>PRESS START!</h3>";
	container.appendChild(new_div);
	
}
function DoMemoryGameStart()
{

	var container = document.getElementById(m_gameArea);
	var newMemoryGame = document.createElement("table");
	newMemoryGame.setAttribute('id', m_tableName);
	var RowArray = new Array();
	var ColArray = new Array();
	var idNum = 1;
	for(var i =1; i <= 4; i++)
	{
		
		var ColArray = new Array();
		var row = document.createElement("tr");
		row.setAttribute("id","Row"+i)	
		for(var j = 1; j <= 4; j++)
		{
			var col = document.createElement("td");
			col.setAttribute("id", "brick"+idNum);
			col.setAttribute("class", "Col"+j+" "+BrickStatus.Untouched);
			col.innerHTML = HiddenBrick;
			idNum++;
			row.appendChild(col);
		}
		
		
		
		newMemoryGame.appendChild(row);
	}
	//MakeFirstBlockActive.Check for Correct to implement
	
	container.appendChild(newMemoryGame); 	
							
}


function addCss(cssCode) 
{
	var styleElement = document.createElement("style");
  	styleElement.type = "text/css";
  
  	if (styleElement.styleSheet) 
	{
   		styleElement.styleSheet.cssText = cssCode;
  	} 
  	else 
  	{
    	styleElement.appendChild(document.createTextNode(cssCode));
  	}
  
  document.getElementsByTagName("head")[0].appendChild(styleElement);
}



function RemoveStartScreen()
{	
	var parentdiv = document.getElementById(m_gameArea);
	var removedElement = document.getElementById(m_ScreenHeader);
	parentdiv.removeChild(removedElement);
}

function CreateVisibleBrick(brickId)
{
	
	return "<span class='VisibleBrick'>"+GLOBAL_SECRETPICTURES[brickId]+"</span>";
}

function ShowEndScreen()
{
	SoundTrackmusic.pause();
	var parentdiv = document.getElementById(m_gameArea);
	var removedElement = document.getElementById(m_tableName);
	parentdiv.removeChild(removedElement);
	var endScreenDiv = document.createElement("div");
	endScreenDiv.setAttribute('id', "EndScreen");
	var theHTML = "<h4>Congratulations!</h4>";
 	theHTML += "<h5>You managed to beat the game in: "+CountTries+" tries.</h5>";
	//theHTML += "<p>Rank: "+CalcRank()+"</p>";
	endScreenDiv.innerHTML = theHTML;
	parentdiv.appendChild(endScreenDiv);
}
