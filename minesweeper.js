// JavaScript Document

var minesweeperBombArray;
	
function newMinesweeperGame(divID, cols, rows)
{
	// make the game spots
	minesweeperBombArray = new Array();
	for(var row = 0; row < rows; row++)
	{
		minesweeperBombArray.push(new Array(cols));
	}
	
	// minesweeperBombArray is now a multi-dimensional array, all spots are empty
	var totalBombs = 10;
	var bombsPlaced = 0;
	var col;
	var row;
	
	do
	{
		col = Math.floor(Math.random() * cols);
		row = Math.floor(Math.random() * rows);
		if(minesweeperBombArray[row][col] != 'x')
		{
			minesweeperBombArray[row][col] = 'x';
			bombsPlaced++;
		}
	} while (bombsPlaced < totalBombs);
	
	
	var htmlStr = "";
	var str;
	var boxSize = 20;
	
	// background
	for(var row = 0; row < rows; row++)
	{
		for(var col = 0; col < cols; col++)
		{
			str = '<div style="position:absolute;top: ' + (row * boxSize) + 'px;left: ' + (col * boxSize) + 'px;width: ' + boxSize + 'px;height: ' + boxSize + 'px;';
			if(row == 0)
			{
				str += 'border-top: 1px solid black;';
			}
			str += 'border-bottom: 1px solid black;';
			
			if(col == 0)
			{
				str += 'border-left: 1px solid black;';
			}
			str +=  'border-right: 1px solid black;';
			
			str += '"></div>';
			htmlStr += str;
		}
	}
	
	// numbers
	var n;
	var row2;
	var row2max;
	var col2;
	var col2max;
	var c;
	var r;
	var numOfBombs;
	
	for(var row = 0; row < rows; row++)
	{
		for(var col = 0; col < cols; col++)
		{
			if(minesweeperBombArray[row][col] == 'x')
			{
				n = 'x';
			}
			else
			{
				n = '0';
				row2 = row - 1;
				if(row2 < 0) row2 = 0;
				row2max = row + 1;
				if(row2max > rows - 1) row2max = rows - 1;
				
				col2 = col - 1;
				if(col2 < 0) col2 = 0;
				col2max = col + 1;
				if(col2max > cols - 1) col2max = cols -1;
				
				numOfBombs = 0;
				for(r = row2; r <= row2max; r++)
				{
					for(c = col2; c <= col2max; c++)
					{
						if(minesweeperBombArray[r][c] == 'x')
						{
							numOfBombs++;
						}
					}
				}
				
				n = numOfBombs;
				
			}
			str = '<div style="position:absolute;top: ' + (row * boxSize) + 'px;left: ' + (col * boxSize) + 'px;width: ' + boxSize + 'px;height: ' + boxSize + 'px;text-align: center;vertical-align: text-top;">' + n + '</div>';
			htmlStr += str;
		}
	}
	
	// buttons
	for(var row = 0; row < rows; row++)
	{
		for(var col = 0; col < cols; col++)
		{
			str = '<button id="button-' + row + '-' + col + '" type="button" class="msButton" onDblClick="javascript: doMinesweeperDoubleClick(' + row + ', ' + col + ');" onmousedown="javascript: doMinesweeperButtonClick(event, ' + row + ', ' + col + ');" style="background-color: #efefef;position:absolute;top: ' + (row * boxSize) + 'px;left: ' + (col * boxSize) + 'px;width: ' + boxSize + 'px;height: ' + boxSize + 'px;"></button>';
			htmlStr += str;
		}
	}
	
	document.getElementById(divID).innerHTML = htmlStr;
	
	var elements = document.getElementsByClassName("msButton");
	for(var a = 0; a < elements.length; a++)
	{
		elements[a].addEventListener("contextmenu", e => e.preventDefault());
	}
}

function doMinesweeperButtonClick(e, row, col)
{
	var whichButton = "left";
	if(e.which == 3) whichButton = "right";
	//alert(whichButton);
	
	if(whichButton == "right")
	{
		var id = (e.target || e.srcElement).id;
		
		if(document.getElementById(id).style.backgroundColor == "rgb(255, 0, 0)")
		{
			document.getElementById(id).style.backgroundColor = "#efefef";
		}
		else
		{
			document.getElementById(id).style.backgroundColor = "#ff0000";
		}
		return false;
	}
	
	
	//alert(row + ':' + col);
	
	if(minesweeperBombArray[row][col] == 'x')
	{
		// game over
		for(var r = 0; r < minesweeperBombArray.length; r++)
		{
			for(var c = 0; c < minesweeperBombArray[r].length; c++)
			{
				document.getElementById('button-' + r + '-' + c).style.display = 'none';
			}
		}
	}
	else
	{	
		// remove just this button	
		document.getElementById('button-' + row + '-' + col).style.display = 'none';
	}
}

function doMinesweeperDoubleClick(row, col)
{
	var str = document.getElementById("button-" + row + '-' + col).innerHTML;
	if(str == '?')
	{
		str = '';
	}
	else
	{
		str = '?';
	}
	
	document.getElementById("button-" + row + '-' + col).innerHTML = str;
}