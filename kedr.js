var canvas, context, tool, 
    massPath = massPath || [],
    maxX,
    maxY,
    x, y, an = 0, anOld,
    timeAngle = (new Date()).getTime(),
    clearCount = 4,
    intervalSpeedIncrease,
    speed = 0,
    isMouseDown = false, isKeydownD = false, isKeydownF = false, isKeydownG = false, isKeydownH = false, isKeydownJ = false, isKeydownK = false;


function toImage() {
	if (window.open && canvas) {
		window.open(canvas.toDataURL(), "_blank")
	}
}

// setTimeout(function() {
// 	document.getElementById("dis2").style.display="none"
// 	document.getElementById("dis3").style.display="block"
// 	document.getElementById("dis4").style.display="block" 
// }, 5000)
setTimeout(function() {
	document.getElementById("dis").style.display="none"
	document.getElementById("dis2").style.display="none"
	document.getElementById("dis3").style.display="none" 
	document.getElementById("dis4").style.display="none" 
}, 1000)



if(window.addEventListener) {
    window.addEventListener('load', function () {

    setInterval(function() {
		if (isKeydownF || isKeydownG) {
			angle(isKeydownG ? Math.PI/32 : -Math.PI/32)
		}		
		
		if (speed) {
			x += Math.cos(an) * speed * 0.4;
			y += Math.sin(an) * speed * 0.4;
			isLine = true;

			if (0 > x) {
				x = maxX + x
				isLine = false
			}
			else if (maxX < x) {
				x = x - maxX
				isLine = false
			}

			if (0 > y) {
				y = maxY + y
				isLine = false
			}
			else if (maxY < y) {
				y = y - maxY
				isLine = false
			}			

			if (!isKeydownJ) {
				massPath.push([x,y,isLine]);
			}
			else {
				if (!massPath[massPath.length - 1][2]) {
					massPath.pop()
				}

				massPath.push([x,y, false]);
			}

			document.getElementById("speed").innerText = speed.toFixed(2)
		}

		if (isKeydownF || isKeydownG || speed || isKeydownK) {
			draw()
		}
		
		if (isKeydownD) {
			
		}

		document.getElementById("angle").innerText = an.toFixed(2)
    }, 50)

    function draw() {
		context.clearRect(0, 0, maxX, maxY)
		context.moveTo(maxX / 2, maxY / 2);
		context.beginPath()

		for (var i in massPath) {
			if (massPath[i][2]) {
				context.lineTo(massPath[i][0], massPath[i][1]);
			}

			context.moveTo(massPath[i][0], massPath[i][1]);
		}

		context.closePath()
		context.stroke();
		drawArrow()
    }

    function drawArrow() {
		context.save()
		context.fillStyle = 'rgba(0,0,0,1)';
		context.translate(x, y);
		context.rotate(an);
	    context.beginPath();
	    context.fillRect(-4,-2,4,4)
	    context.fillStyle = 'rgba(220,0,0,1)';
	    context.fillRect(0,-2,4,4)
	    context.closePath()
	    context.restore()
	    context.moveTo(x,y);
    }

    function angle(inc) {
    	an = an + (inc || 0)

    	while(true) {
	    	if (an > (Math.PI * 2)) {
	    		an = an - (Math.PI * 2);

	    		if (an < 0.0001) {
	    			an = 0;
	    		}
	    	}
	    	else if (an < 0) {
	    		an = an + (Math.PI * 2);
	    	}
	    	else {
	    		break;
	    	}
    	}

    	return an;
    }

    function init () {
        // Находим canvas элемент
        canvas = document.getElementById('myCanvas');
        canvas.focus()
        
        if (!canvas) {
            alert('Ошибка! Canvas элемент не найден!');
            return;
        }

        if (!canvas.getContext) {
            alert('Ошибка: canvas.getContext не существует!');
            return;
        }

        // Получаем 2D canvas context.
        context = canvas.getContext('2d');
        if (!context) {
            alert('Ошибка: getContext! не существует');
            return;
        }
        

		var w = window,
	    d = document,
	    e = d.documentElement,
	    g = d.getElementsByTagName('body')[0];


	    maxX = w.innerWidth || e.clientWidth || g.clientWidth;
	    maxY = w.innerHeight|| e.clientHeight|| g.clientHeight;

        canvas.width = maxX
        canvas.height= maxY

		x = maxX / 2;
		y = maxY / 2;

		massPath.push([x,y,false])
		draw()
		massPath = []
		massPath.push([x,y,false])

        document.addEventListener('keydown', onKeydown, false);
        document.addEventListener('keyup',   onKeyup, false);
        canvas.addEventListener('mousedown', onMouse, false);
        canvas.addEventListener('mousemove', onMouse, false);
        canvas.addEventListener('mouseup',   onMouse, false);
    }

    function onKeyup(ev) {
        if (68 === ev.which) {
        	isKeydownD = false;
			// document.getElementById("buttonD").style.background = "url(img/buttonD.png)"
        }
        else if (70 === ev.which) {
        	isKeydownF = false;       
			document.getElementById("buttonF").style.background = "url(img/buttonF.png)"
        }
        else if (71 === ev.which) {
        	isKeydownG = false;
			document.getElementById("buttonG").style.background = "url(img/buttonG.png)"
        }
        else if (72 === ev.which) {

        	if (!isKeydownJ) {
	        	var waitCount = 1;

	        	if (!speed) {
	        		waitCount = 5;
	        	}

	            clearInterval(intervalSpeedIncrease);
				intervalSpeedIncrease = setInterval(function() {
					if (waitCount < 5) {
						waitCount++;
						return;
					}

					speed = speed * 0.8

					if (speed <= 1) {
						speed = 0;
						clearInterval(intervalSpeedIncrease);
					}
				}, 100);         	
        	}



        	isKeydownH = false;
			document.getElementById("buttonH").style.background = "url(img/buttonH.png)"
        }
        else if (74 === ev.which) {
        	if (!isKeydownH) {
	            clearInterval(intervalSpeedIncrease);
				speed = 0;
        	}
        	isKeydownJ = false;
			document.getElementById("buttonJ").style.background = "url(img/buttonJ.png)"
        }
        else if (75 === ev.which) {
        	isKeydownK = false;
			document.getElementById("buttonK").style.background = "url(img/buttonK.png)"
        }

		// if (!isKeydownH && !isKeydownF && !isKeydownG && !isKeydownJ) {
		// 	speed = 1;
  //       }   
    }

    function onKeydown(ev) {
		if (((70 === ev.which) && !isKeydownF) || ((71 === ev.which) && !isKeydownG)) {
        	if (200 > ((new Date()).getTime() - timeAngle)) {
        		an = anOld

            	if (70 === ev.which) {
            		angle(-Math.PI/4)
            	}
            	else {
            		angle(Math.PI/4)
            	}

            	anOld = an;
        		timeAngle = (new Date()).getTime()
        		draw()
            	return 		
        	}

        	anOld = an;
        	timeAngle = (new Date()).getTime()
        } 

        if ((72 === ev.which) && !isKeydownH) {
        	var waitCount = 1;

        	if (!speed) {
        		waitCount = 5;
        		speed = 1;
        	}

			clearInterval(intervalSpeedIncrease);
			intervalSpeedIncrease = setInterval(function() {
				if (waitCount < 5) {
					waitCount++;
					return;
				}

				speed = speed * 1.2

				if (speed >= 20) {
					speed = 20;
					clearInterval(intervalSpeedIncrease);
					intervalSpeedIncrease = null
				}
			}, 100);
        }
        else if ((74 === ev.which) && !isKeydownJ) {
        	// if (isKeydownH) {
				// speed = 0;
    //     	// }

        	var waitCount = 1;

        	if (!speed) {
        		waitCount = 5;
        	}        

    		speed = 5;

			clearInterval(intervalSpeedIncrease);
			intervalSpeedIncrease = setInterval(function() {
				if (waitCount < 5) {
					waitCount++;
					return;
				}

				speed = (speed || 1) * 1.4

				if (speed >= 20) {
					speed =  20;
					clearInterval(intervalSpeedIncrease);
					intervalSpeedIncrease = null;
				}
			}, 100);	
        }

        if (68 === ev.which) {
        	isKeydownD = true;
        	// document.getElementById("buttonD").style.background = "url(img/buttonKeydownD.png)"
        }
        else if ((70 === ev.which) && !isKeydownF) {
        	isKeydownF = true;
        	document.getElementById("buttonF").style.background = "url(img/buttonKeydownF.png)"
        }
        else if ((71 === ev.which) && !isKeydownG) {
        	isKeydownG = true;
        	document.getElementById("buttonG").style.background = "url(img/buttonKeydownG.png)"
        }
        else if ((72 === ev.which) && !isKeydownH) {
        	isKeydownH = true;
        	clearCount = 4;
        	document.getElementById("buttonH").style.background = "url(img/buttonKeydownH.png)"           	
        }
        else if (74 === ev.which && !isKeydownJ) {
        	isKeydownJ = true;
        	// ev.which = 72
        	// onKeyup(ev);
        	// console.log("e")
        	document.getElementById("buttonJ").style.background = "url(img/buttonKeydownJ.png)"
        }
        else if (75 === ev.which) {
        	var t;

    		clearCount = clearCount * 1.05;

			var f = (massPath.length > clearCount) ? clearCount : massPath.length;

			for (var i = 0; i < f; i++) {
				t = massPath.pop()

	        	while (t && !t[2]) {
	        		t = massPath.pop()
	        	}        				
			}

        	isKeydownK = true;
        	document.getElementById("buttonK").style.background = "url(img/buttonKeydownK.png)"

        	x = (t || [x,y])[0]
        	y = (t || [x,y])[1]

        	massPath.push([x,y,true])
        }           
    };

    // Эта функция определяет позицию курсора относительно холста
    function onMouse (ev) {
        if ("mousedown" === ev.type) {
	        if (ev.layerX || ev.layerX == 0) { // Firefox
	            x = ev.layerX;
	            y = ev.layerY;
	        } else if (ev.offsetX || ev.offsetX == 0) { // Opera
	            x = ev.offsetX;
	            y = ev.offsetY;
	        }

            isMouseDown = true
			massPath.push([x,y,false])
	        draw()
        }
        else if (isMouseDown && ("mousemove" === ev.type)) {
	        if (ev.layerX || ev.layerX == 0) { // Firefox
	            x = ev.layerX;
	            y = ev.layerY;
	        } else if (ev.offsetX || ev.offsetX == 0) { // Opera
	            x = ev.offsetX;
	            y = ev.offsetY;
	        }

		    massPath.push([x,y,true])
		    draw()
        }
        else if ("mouseup" === ev.type) {
        	isMouseDown = false       	
        }
    }

    init();

}, false); }

	