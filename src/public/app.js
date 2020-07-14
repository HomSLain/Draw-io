
function init(){
    
    let mouse ={
        click: false,
        move: false,
        ini:{x:0,y:0},
        fin:false
    }

    const canvas = document.getElementById('space');
    const context =canvas.getContext('2d');
    const W_width= window.innerWidth;
    const W_heigh= window.innerHeight;
    
    let socket=io();
    canvas.width=W_width;
    canvas.height=W_heigh;

    

    canvas.addEventListener('mousedown',(e)=>{
        mouse.click=true;
    });

    canvas.addEventListener('mouseup',(e)=>{
        mouse.click=false;
    });

    canvas.addEventListener('mousemove',(e)=>{
       mouse.ini.x=e.clientX/W_width;
       mouse.ini.y=e.clientY/W_heigh;
       mouse.move=true;
    })

    socket.on('draw_line',(data)=>{

            const line= data.line;
            context.beginPath();
            context.linewidth=2;
            context.moveTo(line[0].x*W_width,line[0].y*W_heigh);
            context.lineTo(line[1].x*W_width,line[1].y*W_heigh);
            context.stroke();
    });

    function mainLoop(){
        if(mouse.click && mouse.move && mouse.fin){
            socket.emit('draw_line',{line:[mouse.ini,mouse.fin]});
            mouse.move=false;       
        }
        mouse.fin={x:mouse.ini.x,y:mouse.ini.y};
        setTimeout(mainLoop,25);
    }

    mainLoop();
    
}

document.addEventListener('DOMContentLoaded',init);

