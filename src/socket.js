module.exports=io=>{
    
    var line_history=[];
    
    io.on('connection',(socket)=>{
        
        for(let i in line_history){
            io.emit('draw_line',{line:line_history[i]});
        }

        socket.on('draw_line',data=>{
            line_history.push(data.line);
            io.emit('draw_line',data);
        });
    })
}

