paper.install(window)
window.onload=()=>{
    paper.setup('myCanvas');
    let [w,h] = [window.innerWidth,window.innerHeight*2]
    const blendMode = [
        'difference', 'color', 'saturation','hue','exclusion','color-dodge','overlay','screen',
        'multiply'
    ]
    
    function drawCircle(){
        const count = 10
        const size = 50
        

        project.importSVG("/../person.svg", function (item) {
            for(let i=0;i<10;i++){
                const ranSize = Math.random()*0.5
                 let svg = item.clone()
                 svg.position.x -= i*200
                 svg.position.y += Math.random() * 100 * pn()
                 svg.scale(ranSize * pn(), ranSize * pn())
                 svg.fillColor = 'red'
                 svg.blendMode = 'multiply'
            }
                 item.remove()
            
        });

        for(let x=1;x<count*2;x++){
           for(let y=1;y<count;y++){
               var rect = new Path.Rectangle([100,100],[size,size])
               rect.style={
                fillColor: Color.random(),
               }
               rect.blendMode = 'screen'
               const ranSize = 1 + Math.random()*0.2*pn()
               rect.scale(ranSize)
               rect.position.x += size*x  + Math.random()*pn()
               rect.position.y += size*y + Math.random()*pn()
               rect.fillColor.saturation -= 0.1
               rect.fillColor.lightness = 0.5
           }

        }


        function animate(time){
            requestAnimationFrame(animate)
            paper.project.activeLayer.children.forEach((path)=>{
                path.fillColor.hue += 1
            })
        }

        animate()

    }

    // drawCircle()


    function drawPeople(){
        project.activeLayer.removeChildren()
        project.importSVG("../person.svg", function (item) {
            const floor = 13
            let count = 1
            item.position.y = 300
            for (let i = 1; i < floor; i++) {
                count += Math.floor(Math.random() * 10)
                for (let x = 1; x < count; x++) {
                    const ranSize = Math.random() * [i/20+0.2]
                    let svg = item.clone()
                    // svg.insertBelow(project.activeLayer.children[project.activeLayer.children.length - 1])
                    if(x%2==0){
                        svg.position.x += x * 30
                    }else{
                        svg.position.x += x * -30
                    }
                    
                    svg.position.y += i * 100
                    svg.scale(ranSize * pn(), ranSize)
                    svg.fillColor = new Color(`hsl(${Math.random()*255}, ${70}, ${70/i+20})`)
                    // svg.opacity = 5/i+0.1
                    // svg.blendMode = blendMode[Math.floor(Math.random()*blendMode.length-1)]
                }
            }
            let all = project.activeLayer.children
            all[all.length-1].remove()
            item.remove()
        });
        // console.log(project);
        // const exp = project.exportSVG()
        // var blob = new Blob([exp], {
        //     type: "image/svg+xml;charset=utf-8"
        // });
        
       
    }


    document.getElementById('btn').addEventListener('click',()=>{
        drawPeople()

    })

}




// +++ tool +++

const ptCalc = (t, pt, method)=>{
    if(!Array.isArray(pt)){
        if(method == '+'){
            t.x += pt.x
            t.y += pt.y
            return t
        }else if(method == '-'){
            t.x -= pt.x
            t.y -= pt.y
            return t
        }else if(method == '*'){
            t.x *= pt.x
            t.y *= pt.y
            return t
        }else if(method == '%'){
            t.x /= pt.x
            t.y /= pt.y
            return t
        }
    }else{
        let [x,y] = pt
        if(method == '+'){
            t.x += x
            t.y += y
            return t
        }else if(method == '-'){
            t.x -= x
            t.y -= y
            return t
        }else if(method == '*'){
            t.x *= x
            t.y *= y
            return t
        }else if(method == '%'){
            t.x /= x
            t.y /= y
            return t
        }
    }


}

const pn =()=>{
    return Math.random()>0.5 ? -1 : 1
}

// +++ tool +++

const ptTopt = (p1,p2)=>{
    let x,y
    x = p1.x + p2.x
    y = p1.y + p2.y
    return {x,y}
}

function getCreateArcInfo(degrees, center, radius) {
    return {
        from: {
            x: center.x + radius,
            y: center.y
        },
        through: {
            x: center.x + Math.cos(degrees / 2) * radius,
            y: center.y + Math.sin(degrees / 2) * radius
        },
        to: {
            x: center.x + Math.cos(degrees) * radius,
            y: center.y + Math.sin(degrees) * radius
        },
        strokeColor: 'black'
    }
}

