const cellElements = document.querySelectorAll('[data-cell]');
 const overlay = document.getElementById('overlay');
 const resetBtn = document.querySelector('.reset');
 const closeBtn = document.getElementById('close');
 const board = document.querySelector('.board');
 var player1Score = document.querySelector('.score1');
 var player2Score = document.querySelector('.score2');
 var draw = document.querySelector('.draw');
 
 var score1 = 0;
 var score2 = 0;
 var ties = 0;
 
 
 
 
 let winner;
   
   const player1 = 'x';
   const player2 = 'circle';
  
  let circleTurn;
  

 
   const winCombos = [ 
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
 
 ];
 

 cellElements.forEach(cell => {
	 cell.addEventListener('click', handleClick, { once: true });
 })
  
 
  function handleClick(e) {
	  
	  cell = e.target;
	   const currentClass = circleTurn ? player1 : player2;
	  
	placeMarks(cell, currentClass);
	

	if(checkWin(currentClass)){
		 alert("the winner is");
		 setTimeout(showMessage, 500, currentClass);
          
		reset();
	     handleScore(currentClass);
		 
		  
		  } else if (isDraw()) {
		 alert("match is draw");
		 setTimeout(showDraw(), 500, currentClass);
		  getScore(isDraw);
		reset();
		 
	 } 
		 
	
		 swapTurn(currentClass);
	setBoardHoverClass();
	
     } 
	 
	 function isDraw(){
		return [...cellElements].every(cell => {
		return cell.classList.contains(player1) || cell.classList.contains(player2);
		})
	 }
	  function showDraw(){
		  document.querySelector('.content').innerHTML = "match is Draw";
		  overlay.style.display = 'flex';
	  }
	   function handleScore(currentClass){
		
		if(currentClass == player1){
			
			score1 = score1 + 1;
			player1Score.innerHTML = score1;
		}
           if(currentClass == player2){		
			score2 = score2 + 1;
			player2Score.innerHTML = score2;
			} 
			 }
			 
			 function getScore(isDraw){
				ties = ties + 1;
				draw.innerHTML = ties;
			 }
			  
	 
	 function reset(){
		 cellElements.forEach(cell => {
	   circleTurn = false;
		 cell.classList.remove(player1);
		 cell.classList.remove(player2);
		 cell.removeEventListener('click', handleClick);
		cell.addEventListener('click', handleClick, { once: true });
		 
	       })
	  
	 }
	 resetBtn.addEventListener('click', reset);
			
	 function showMessage(currentClass){
		overlay.style.display = 'flex';
	    document.querySelector('.content').innerHTML = currentClass +'    '+ 'is the <h2>winner</h2>';
	     
	}		
	    
		
			closeBtn.addEventListener('click', ()=> {
				overlay.style.display = "none";
			})
		
				
 function checkWin(currentClass){
			  
		return	  winCombos.some(combo => {
		return        combo.every(index => {
		return		cellElements[index].classList.contains(currentClass);
		      
                currentClass.score++;

			  handleScore(currentClass);
	           
				 })
		})
		
		 }
		 
		  function placeMarks(cell, currentClass){
		 cell.classList.add(currentClass);
	     
	}
	 
	  function swapTurn(currentClass){
		circleTurn = (!circleTurn);
	    
	 }
	 
	   function setBoardHoverClass() {
		board.classList.remove(player1);
		board.classList.remove(player2);
		if(circleTurn){
			board.classList.add(player1);
			
		}else{
			board.classList.add(player2);
		}
	}
