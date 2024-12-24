document.addEventListener('DOMContentLoaded',()=>{
  const bird=document.querySelector('.bird');
   const ground=document.querySelector('.ground');
   const gamedisplay=document.querySelector('.game-container');
   let birdleft=220;
   let birdbottom=100; 
   let gravity=2;
   let isgameover=false;
   let gap=420;
   function startgame(){
    birdbottom-=gravity
    bird.style.bottom=birdbottom+'px';
    bird.style.left=birdleft+'px';
   }
    let gametimerid=setInterval(startgame,20);
    function control(e){
        if(e.keyCode===32&&!isgameover)  
        jump();
    }
    function jump(){
        if(birdbottom<500)
        birdbottom+=50;
        bird.style.bottom=birdbottom+'px';
    }
    addEventListener('keyup',jump);
    function generateobstacle(){
        let randomheight=Math.random()*60;
        let obstacleleft=500;
        let obstaclebottom=randomheight;
        const obstacle=document.createElement('div');
        const topobstacle=document.createElement('div');
       if(!isgameover){
        obstacle.classList.add('obstacle');
        topobstacle.classList.add('topobstacle');
       }
        gamedisplay.appendChild(obstacle);
        gamedisplay.appendChild(topobstacle);
        obstacle.style.left=obstacleleft+'px';
        obstacle.style.bottom=obstaclebottom+'px';
        topobstacle.style.left=obstacleleft+'px';
        topobstacle.style.bottom=obstaclebottom+gap+'px';

        function moveobstacle(){
            obstacleleft-=2;
            obstacle.style.left=obstacleleft+'px'; 
            topobstacle.style.left=obstacleleft+'px'; 

            if(obstacleleft===-60){
                clearInterval(timer);
                gamedisplay.removeChild(obstacle);
                gamedisplay.removeChild(topobstacle);
            }
            if (obstacleleft>200&&
                obstacleleft<280 &&
                birdleft===220 &&(birdbottom<obstaclebottom+153||birdbottom>obstaclebottom+gap-200)||
                birdbottom===0){
                gameover();
                clearInterval(timer);

            }
        }
        let timer=  setInterval(moveobstacle,20);
        if(!isgameover)
        setTimeout(generateobstacle,3000);
    }
    generateobstacle();

    function gameover(){
      clearInterval(gametimerid);
      console.log('gameover');
      isgameover=true;
      document.removeEventListener('keyup',control);
    }
})