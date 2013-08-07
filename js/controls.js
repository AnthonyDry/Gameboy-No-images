/**
 * @author Anthony Dry
 */

var isOn = false;
var hasStarted = false;
var ShortGameFreeze = false;
var _SoundEffectStartUp;
var _SoundEffectMoving;
var _SoundEffectCorrect;
var _SoundEffectWrong;
var SoundTrackmusic;
function init() 
{
      document.getElementById("On").onclick = StartUp;
      document.getElementById("startButton").onclick = PressedStart;
      document.getElementById("clickUp").onclick = PressedArrowUp;
      document.getElementById("clickDown").onclick = PressedArrowDown;
      document.getElementById("clickLeft").onclick = PressedArrowLeft;
      document.getElementById("clickRight").onclick = PressedArrowRight;
      document.getElementById("Abutton").onclick = PressedMButton;
      _SoundEffectStartUp = document.getElementById("soundEffectStartUp");
      _SoundEffectMoving = document.getElementById("soundEffectMoving");
      _SoundEffectCorrect = document.getElementById("soundEffectCorrect");
      _SoundEffectWrong = document.getElementById("soundEffectWrong");
      SoundTrackmusic = document.getElementById("soundtrack");
      document.onkeypress = InspectKeyInput;
      
}
function StartUp()
{
	if(isOn == false)
	{
		
		//ÄNDRA TILLBAKA TILL 0.5 SENARE !
		SoundTrackmusic.volume= 0.5;
		addCss("#onButton{animation:myfirst 1s;-moz-animation:myfirst 1s; /* Firefox */-webkit-animation:myfirst 1s; /* Safari and Chrome */-o-animation:myfirst 1s; /* Opera */-webkit-animation-fill-mode: forwards;-moz-animation-fill-mode: forwards;animation-fill-mode: forwards;-o-animation-fill-mode: farwards;}");
		SoundTrackmusic.play();
		DoStartScreen();
		RandomPlacementGenerator()
		isOn = true;
	}
	else{
		music.pause();
	}
	

}
function PressedStart()
{
	if(isOn == true && hasStarted == false)
	{
		hasStarted = true;
		
		
		_SoundEffectStartUp.play();
		RemoveStartScreen();
		initMemoryGame();
	}
	
}
function PressedArrowUp()
{
	var position = new Array();
	if(isOn == true && hasStarted == true && ShortGameFreeze == false)
	{
	_SoundEffectMoving.play();
	position = GetActiveBrickPosition();
	CheckMove(position, MoveList.Up);
	}
}
function PressedArrowDown()
{
	var position = new Array();
	if(isOn == true && hasStarted == true && ShortGameFreeze == false)
	{
	_SoundEffectMoving.play();
	position = GetActiveBrickPosition();
	CheckMove(position, MoveList.Down);
	}
}
function PressedArrowLeft()
{
	var position = new Array();
	if(isOn == true && hasStarted == true && ShortGameFreeze == false)
	{
	_SoundEffectMoving.play();
	position = GetActiveBrickPosition();
	CheckMove(position, MoveList.Left);
	}
}
function PressedArrowRight()
{
	var position = new Array();
	if(isOn == true && hasStarted == true && ShortGameFreeze == false)
	{
	_SoundEffectMoving.play();
	position = GetActiveBrickPosition();
	CheckMove(position, MoveList.Right);
	}
}
function PressedMButton()
{
	
	if(isOn == true && hasStarted == true && ShortGameFreeze == false)
	{
		var position = new Array();
		position = GetActiveBrickPosition();
		_SoundEffectMoving.play();
		MakeSelected(position);
	}
}
function InspectKeyInput(event)
{
	var key_code = event.keyCode;
	var evtobj=window.event? event : event //distinguish between IE's explicit event object (window.event) and Firefox's implicit.
	var unicode=evtobj.charCode? evtobj.charCode : evtobj.keyCode
	var actualkey=String.fromCharCode(unicode)

	
	if(actualkey == "a")
	{
		PressedArrowLeft();
	}
	if (actualkey == "w")
	{
		PressedArrowUp();
	}
	if (actualkey == "d")
	{		
		PressedArrowRight();
	}
	if (actualkey == "s")
	{		
		PressedArrowDown();
	}
	if (unicode == 32)
	{		
		PressedStart();
	}
	if (actualkey == "m")
	{
		PressedMButton();
	}
	
}

window.onload = init();