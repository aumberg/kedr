
	// 
    var canvas, context, tool, 
    massPath = massPath || [],
    maxX,
    maxY,
    x, y, an, anOld,
    // timeAngleUp = (new Date()).getTime(),
    timeAngle = (new Date()).getTime(),
    angleSpeed = 1,
    timeKeydownJ = (new Date()).getTime(),
    // timeSpeed = (new Date()).getTime(),
    intervalSpeedIncrease,
    speed = 1,
    isKeydownD = false, isKeydownF = false, isKeydownG = false, isKeydownH = false, isKeydownJ = false, isKeydownK = false,
    angleChangeSpeed = 0;


function toImage() {
	if (window.open && canvas) {
		window.open(canvas.toDataURL(), "_blank")
	}
}


if(window.addEventListener) {
    window.addEventListener('load', function () {
    

    an = 0;


    setInterval(function() {
    	angleSpeed = Math.abs(angleSpeed)

    	if (isKeydownF || isKeydownG) {
    		angleSpeed = Math.min(8, angleSpeed+1);
    	}
    	else if ((150 < ((new Date()).getTime() - timeAngle)) && !isKeydownF && !isKeydownG) {
	    	angleSpeed = Math.max(1, angleSpeed/2);
	    	angleSpeed = Math.round(angleSpeed);
    	}


    	if (isKeydownF) {
    		angleSpeed = -angleSpeed
    	}
    }, 1000)    


    function draw() {
		if (isKeydownF || isKeydownG) {
			angle(Math.PI/(64/angleSpeed))
		}		
		
		if (isKeydownH || isKeydownJ) {
			// var t = 2 * Math.min(4, ((new Date()).getTime() - timeSpeed) / 1000);
			// console.log(t)

			x += Math.cos(an) * speed * 0.5;
			y += Math.sin(an) * speed * 0.5;
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

		if (isKeydownF || isKeydownG || isKeydownH || isKeydownJ || isKeydownK) {
			// draw()
			context.clearRect(0, 0, maxX, maxY)
			context.moveTo(maxX / 2, maxY / 2);
			context.beginPath()

			for (var i in massPath) {
				// context.lineTo(x, y);
				// x = massPath[i][0]
				// y = massPath[i][1]
				if (massPath[i][2]) {
					context.lineTo(massPath[i][0], massPath[i][1]);
				}

				context.moveTo(massPath[i][0], massPath[i][1]);
				// context.moveTo(400, 400);
			}

			context.closePath()

				context.stroke();
			// context.stroke();
			drawArrow()
		}
		
		if (isKeydownD) {
			
		}

		document.getElementById("angle").innerText = an.toFixed(2)
		document.getElementById("angleSpeed").innerText = angleSpeed

		requestAnimationFrame(draw);
    }

    function drawArrow() {
		context.save()
		context.fillStyle = 'rgba(0,0,0,1)';
		context.translate(x, y);
		context.rotate(an);
	    // context.beginPath();
	    context.fillRect(-4,-2,4,4)
	    context.fillStyle = 'rgba(220,0,0,1)';
	    context.fillRect(0,-2,4,4)
		// context.lineTo(x, y);
	 //    context.moveTo(0,-4);
	 //    context.lineTo(2,2);
	 //    context.lineTo(-2,2);


	    // context.moveTo(0,-10);
	    // context.lineTo(5,-5);
	    // context.lineTo(-5,-5);
		// context.transform (1, 0, 0, 1, 20, 20)

	    // context.moveTo(x,y-1);
	    // context.lineTo(x+1,y);
	    // context.lineTo(x-1,y);
	    // context.fill();
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

		isKeydownH = true
        massPath.push([x,y,false])
        draw()
        isKeydownH = false
        massPath = []
		massPath.push([x,y,false])

        tool = new tool_pencil();
        document.addEventListener('keydown', ev_canvas, false);
        document.addEventListener('keyup', ev_canvas, false);
        canvas.addEventListener('mousedown', ev_canvas, false);
        canvas.addEventListener('mousemove', ev_canvas, false);
        canvas.addEventListener('mouseup',   ev_canvas, false);
    }

    // Здесь мы будем ловить движения мыши
    function tool_pencil () {
        var tool = this;
        this.started = false;


        this.keyup = function (ev) {
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
            else if ((72 === ev.which) && !isKeydownJ) {
            	clearInterval(intervalSpeedIncrease);
            	intervalSpeedIncrease = null

            	if (isKeydownJ) {
					document.getElementById("buttonH").style.background = "url(img/buttonH.png)"
	            	isKeydownH = false;
            	}


            	// intervalSpeedIncrease = setInterval(function() {
            	// 	draw()
            	// },100)
            }
            else if (74 === ev.which) {
            	isKeydownJ = false;
				document.getElementById("buttonJ").style.background = "url(img/buttonJ.png)"
	            clearInterval(intervalSpeedIncrease);
	            intervalSpeedIncrease = null


				if (!isKeydownH) {
					speed = 1;
				}


				// if (isKeydownH) {
				// 	return;
				// }


	            // intervalSpeedIncrease = null;          	
        		// speed = Math.max(1, speed - 1);




            	// if (200 > ((new Date()).getTime() - timeKeydownJ)) {
            	// }
            }
            else if (75 === ev.which) {
            	isKeydownK = false;
				document.getElementById("buttonK").style.background = "url(img/buttonK.png)"
            }

            // if (((72 === ev.which) && !isKeydownJ) || ((74 === ev.which) && !isKeydownH)) {
            // 	var t = Math.min(8, ((new Date()).getTime() - timeSpeed) / 1000) / 2;
            // 	timeSpeed = (new Date()).getTime() + t * 1000 
            // }            

            if (((70 === ev.which) && !isKeydownG) || ((71 === ev.which) && !isKeydownF)) {
            	angleSpeed = Math.abs(angleSpeed)


            	// if (((70 === ev.which) && !isKeydownG) || ((71 === ev.which) && !isKeydownF)) {
	            // 	timeAngle = (new Date()).getTime()
            	// }

     //        	if (150 > ((new Date()).getTime() - timeAngle)) {
     //        		an = anOld


					// if ((1 === speed) && (70 === ev.which) && (8 === angleSpeed) && (an > 0) && (an < (Math.PI / 4))) {
					// 	an = Math.PI / 4;
					// }

					// if ((1 === speed) && (71 === ev.which) && (8 === angleSpeed) && (an > 0) && (an < (Math.PI / 4))) {
					// 	an = 0;
					// }


	    //         	if (70 === ev.which) {
	    //         		angle(-Math.PI/4)
	    //         	}
	    //         	else {
	    //         		angle(Math.PI/4)
	    //         	}

	    //         	angleSpeed = Math.min(8, angleSpeed+1)

	    //         	// timeAngle = (new Date()).getTime()
     //        		// angleSpeed = Math.min(8, angleSpeed+1);        		
     //        	}

            	if (70 === ev.which) {
            		angleSpeed = -angleSpeed;
            	}   



            	// if (200 > ((new Date()).getTime() - timeAngle)) {
	            // 	angleSpeed = Math.abs(angleSpeed)
// 
	            // 	if (70 === ev.which) {
	            // 		angle(-Math.PI/2)
	            // 	}
	            // 	else {
	            // 		angle(Math.PI/2)
	            // 	}


            	// 	// angleSpeed = Math.min(8, angleSpeed+1);

	            // 	if (70 === ev.which) {
	            // 		angleSpeed = -angleSpeed;
	            // 	}            		
            	// }
/*            	var t = Math.min(4, ((new Date()).getTime() - timeAngle) / 1000);

            	if (4 === t) {
            		t += 0.5
            	}

            	timeAngle = (new Date()).getTime() + t * 1000*/ 
            }
        }
        this.keydown = function (ev) {

        	// console.log(ev.which)

            if (((70 === ev.which) && !isKeydownF) || ((71 === ev.which) && !isKeydownG)) {
            	// if (0 < (timeAngle - (new Date()).getTime())) {
		            // timeAngle = (new Date()).getTime() - (timeAngle - (new Date()).getTime());
            	// }
            	// else {

            	angleSpeed = Math.abs(angleSpeed)

            	if (200 > ((new Date()).getTime() - timeAngle)) {
            		an = anOld

					if ((1 === speed) && (70 === ev.which) && (8 === angleSpeed) && (an > 0) && (an < (Math.PI / 4))) {
						an = Math.PI / 4;
					}

					if ((1 === speed) && (71 === ev.which) && (8 === angleSpeed) && (an > 0) && (an < (Math.PI / 4))) {
						an = 0;
					}

	            	if (70 === ev.which) {
	            		angle(-Math.PI/4)
	            	}
	            	else {
	            		angle(Math.PI/4)
	            	}

	            	angleSpeed = Math.min(8, angleSpeed+1)

	            	if (70 === ev.which) {
	            		angleSpeed = -angleSpeed;
	            	}

	            	return

	            	// timeAngle = (new Date()).getTime()
            		// angleSpeed = Math.min(8, angleSpeed+1);        		
            	}

            	anOld = an;
            	timeAngle = (new Date()).getTime()

            	if (70 === ev.which) {
            		angleSpeed = -angleSpeed;
            	}

            } 

            if ((72 === ev.which) && (!isKeydownH || !intervalSpeedIncrease)) {
				// speed = 1;
				// isKeydownJ = false;
				
				clearInterval(intervalSpeedIncrease);
				intervalSpeedIncrease = setInterval(function() {
					speed = speed * 1.2

					if (speed >= 20) {
						speed = 20;
						clearInterval(intervalSpeedIncrease);
						intervalSpeedIncrease = null
					}
				}, 100);
			


            	// if (0 < (timeSpeed - (new Date()).getTime())) {
		            // timeSpeed = (new Date()).getTime() - (timeSpeed - (new Date()).getTime());
            	// }
            	// else {
            	// 	timeSpeed = (new Date()).getTime()
            	// }
            }
            else if ((74 === ev.which) && !isKeydownJ) {
            	document.getElementById("buttonJ").style.background = "url(img/buttonKeydownJ.png)"

            	if (isKeydownH) {
            		timeKeydownJ = (new Date()).getTime();

					clearInterval(intervalSpeedIncrease);
					intervalSpeedIncrease = setInterval(function() {
						speed = speed * 0.5

						if (speed <= 1) {
							speed = 1;
							clearInterval(intervalSpeedIncrease);
							intervalSpeedIncrease = null;

			            	isKeydownH = false;

							document.getElementById("buttonH").style.background = "url(img/buttonH.png)"

						}
					}, 100);

					return;
				}


				// if (isKeydownH || (speed > 1)) {
					// speed = 0;
					isKeydownH = false;
					// clearInterval(intervalSpeedIncrease);
					// intervalSpeedIncrease = null;
				

					// intervalSpeedIncrease = setInterval(function() {
						clearInterval(intervalSpeedIncrease);
						// speed = 1;
						intervalSpeedIncrease = setInterval(function() {
							speed = speed * 1.2

							if (speed >=20) {
								speed = 20;
								clearInterval(intervalSpeedIncrease);
								intervalSpeedIncrease = null;
							}
						}, 100);		
					// }, 200);					
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
            	document.getElementById("buttonH").style.background = "url(img/buttonKeydownH.png)"           	
            }
            else if (74 === ev.which && !isKeydownJ) {
            	isKeydownJ = true;
            }
            else if (75 === ev.which) {
            	if (isKeydownK) {
            		if (massPath.length > 100) {
            			var f = massPath.length / 10
            			for (var i = 0; i < f; i++) {
            				massPath.pop()
            			}
            		}
            	}

            	isKeydownK = true;
            	document.getElementById("buttonK").style.background = "url(img/buttonKeydownK.png)"
            	massPath.pop()
            	massPath.pop()
            	massPath.pop()
            	massPath.pop()

            	var t = massPath.pop()

            	while (t && !t[2]) {
            		t = massPath.pop()
            	}

            	x = (t || [x,y])[0]
            	y = (t || [x,y])[1]

            	massPath.push([x,y,true])
            }           
        };
    
        this.mousedown = function (ev) {
            context.beginPath();
            context.moveTo(ev._x, ev._y);
            tool.started = true;
        };

        // Эта функция вызывается каждый раз, когда вы перемещаете мышь.
        // Но рисование происходит только когда вы удерживаете кнопку мыши
        // нажатой.
        this.mousemove = function (ev) {
            if (tool.started) {
                context.lineTo(ev._x, ev._y);
                context.stroke();
            }
        };

        // Событие при отпускании мыши
        this.mouseup = function (ev) {
            if (tool.started) {
                tool.mousemove(ev);
                tool.started = false;
            }
        };
    }

    // Эта функция определяет позицию курсора относительно холста
    function ev_canvas (ev) {
        if (ev.layerX || ev.layerX == 0) { // Firefox
            ev._x = ev.layerX;
            ev._y = ev.layerY;
        } else if (ev.offsetX || ev.offsetX == 0) { // Opera
            ev._x = ev.offsetX;
            ev._y = ev.offsetY;
        }

        // Вызываем обработчик события tool
        var func = tool[ev.type];
        if (func) {
            func(ev);
        }
    }

    init();

}, false); }

	