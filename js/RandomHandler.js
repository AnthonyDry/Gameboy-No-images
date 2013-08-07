/**
 * @author Anthony Dry
 */
function RandomPlacementGenerator()
{
	
	var numberOfBricks = 16;
	var maxImages = 8;
	var imgPlacement = [];
	
	   //Utplacering av tecken i Array
	   
	for(var i=0; i<numberOfBricks; i++)
	{
		imgPlacement[i] = 0;
	}
	
	for(var currentImage=1; currentImage<=maxImages; currentImage++)
	{		
		var isImageOnePlaced = false;
		var isImageTwoPlaced = false;
			
		do
		{
			
			if(isImageOnePlaced == false)
			{
				
				var random1 = Math.floor( (Math.random() * 16 + 0));				
					
				if( imgPlacement[random1] == 0 )
				{
					
					imgPlacement[random1] = currentImage;
					isImageOnePlaced = true;
				}
				
			}	
			if(isImageTwoPlaced == false)
			{
				var random2 = Math.floor( (Math.random() * 16 + 0));				
								
				if( imgPlacement[random2] == 0)
				{
					imgPlacement[random2] = currentImage;
					isImageTwoPlaced = true;
				}
			}			
		}
		while(isImageOnePlaced == false || isImageTwoPlaced == false);		
	}
	
	
	//MY CUSTOM REPLACER NO NEED TO USE IF YOURE WORKING WITH IMAGES:
	var Placement = CustomConvertToText(imgPlacement);
	return Placement;
}

function CustomConvertToText(a_toConvert)
{
	var rtnArray= new Array();
	for(var i = 0, value; value = a_toConvert[i]; i++)
	{
		
		switch(value)
		{
		case 1:
  			rtnArray.push("A");
  			break;
		case 2:
  			rtnArray.push("B");
  			break;
  		case 3:
  			rtnArray.push("C");
  			break;
  		case 4:
  			rtnArray.push("D");
  			break;
  		case 5:
  			rtnArray.push("E");
  			break;
  		case 6:
  			rtnArray.push("F");
  			break;
  		case 7:
  			rtnArray.push("G");
  			break;
  		case 8:
  			rtnArray.push("@");
  			break;
		}
	}
	return rtnArray;
}