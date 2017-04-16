//旧浏览器不支持渐变，悔棋，和棋，吃自己的子为该提自己的子，微信上清空不了背景，棋子字的位置垂直方向不在中间
	var board = document.getElementById('board');
	var square = board.getElementsByTagName('div');
	var player= document.getElementById('player');
	var playerTxt= player.firstChild;
	var start= document.getElementById('start');
	var startTxt=start.firstChild;
	var tip=document.getElementById('tip');
	var tipTxt=tip.firstChild;
	var i,j;
	var id;
	var piece
	//红先
	iuuihx();
	//初始化，填充棋子，给红棋子增加提子事件，增加颜色，背景,重置提示信息
	function iuuihx() {
		var zi;
		for (i = 0; i < square.length; i++) {
			zi = square[i].firstChild;
			//判断是否填子
			switch(i){
				case 0: zi.nodeValue="车";break;
				case 1: zi.nodeValue="马";break;
				case 2: zi.nodeValue="象";break;
				case 3: zi.nodeValue="士";break;
				case 4: zi.nodeValue="将";break;
				case 5: zi.nodeValue="士";break;
				case 6: zi.nodeValue="象";break;
				case 7: zi.nodeValue="马";break;
				case 8: zi.nodeValue="车";break;
				case 19: zi.nodeValue="炮";break;
				case 25: zi.nodeValue="炮";break;
				case 27: zi.nodeValue="卒";break;
				case 29: zi.nodeValue="卒";break;
				case 31: zi.nodeValue="卒";break;
				case 33: zi.nodeValue="卒";break;
				case 35: zi.nodeValue="卒";break;
				case 54: zi.nodeValue="兵";break;
				case 56: zi.nodeValue="兵";break;
				case 58: zi.nodeValue="兵";break;
				case 60: zi.nodeValue="兵";break;
				case 62: zi.nodeValue="兵";break;
				case 64: zi.nodeValue="炮";break;
				case 70: zi.nodeValue="炮";break;
				case 81: zi.nodeValue="车";break;
				case 82: zi.nodeValue="马";break;
				case 83: zi.nodeValue="相";break;
				case 84: zi.nodeValue="仕";break;
				case 85: zi.nodeValue="帅";break;
				case 86: zi.nodeValue="仕";break;
				case 87: zi.nodeValue="相";break;
				case 88: zi.nodeValue="马";break;
				case 89: zi.nodeValue="车";break;
				default : zi.nodeValue=" ";
			}
			//判断是否有子
			if (square[i].firstChild.nodeValue!==" ") {
				square[i].style.background="radial-gradient(#ec0 69%, transparent 0) ";
				if (Number(square[i].id.replace("sq","")[0])<5) {
					square[i].style.color="rgb(0, 0, 0)";
				} else {
					square[i].style.color="rgb(255, 0, 0)";
					square[i].onclick=tizi;
				}
			}else {
				square[i].onclick=null;
				square[i].style=" ";
			}
		}
		start.onclick=null;
		player.parentNode.firstChild.nodeValue="轮到";
		playerTxt.nodeValue="红方";
		startTxt.nodeValue="已经开始";
		tipTxt.nodeValue="对弈开始";
		piece=0;	
	} 
	//棋子落下事件,改变棋手，判断胜负，改变棋子位置
	function gameover(iizi,bwiizi) {
		if (tipTxt.nodeValue!=="对弈中..") {
			startTxt.nodeValue="重新开始";
			tipTxt.nodeValue="对弈中..";
			start.onclick=iuuihx;
		}
		piece=(piece)?0:1;
		//判断胜负
		var bwiiziName=bwiizi.firstChild.nodeValue;
		if (bwiiziName==="将"||bwiiziName==="帅") {
			player.parentNode.firstChild.nodeValue="恭喜";
			for (i = 0; i < square.length; i++) {
				square[i].onclick=null;
			}
			tipTxt.nodeValue="对弈结束";
			if (bwiiziName==="将") {
				playerTxt.nodeValue="红胜";
			} else {
				playerTxt.nodeValue="黑胜";
			}
			piece=2;
		}
		//落子
		bwiizi.style.color=iizi.style.color;
		bwiizi.firstChild.nodeValue=iizi.firstChild.nodeValue;
		bwiizi.style.background="radial-gradient(#ec0 69%, transparent 0) ";
		iizi.style=" ";
		iizi.firstChild.nodeValue=" ";
	}
	//定义棋子行走规则，符合返回true，否则返回false
	function ie(x1,y1,x2,y2) {
		if (x1===x2) {
			if (y1>y2) {
				for (i = y2+1; i < y1; i++) {
					if (document.getElementById("sq"+x1+i).firstChild.nodeValue!==" ") {
						return false;
					}
				}
			} else {
				for (i = y1+1; i < y2; i++) {
					if (document.getElementById("sq"+x1+i).firstChild.nodeValue!==" ") {
						return false;
					}
				}
			}
		} else if(y1===y2){
			if (x1>x2) {
				for (i = x2+1; i < x1; i++) {
					if (document.getElementById("sq"+i+y1).firstChild.nodeValue!==" ") {
						return false;
					}
				}
			} else {
				for (i = x1+1; i < x2; i++) {
					if (document.getElementById("sq"+i+y1).firstChild.nodeValue!==" ") {
						return false;
					}
				}
			}
		}else {
			return false;
		}
		return true;
	}
	function ma(x1,y1,x2,y2) {
		if (Math.abs(x1-x2)===1&&Math.abs(y1-y2)===2) {
			if (document.getElementById('sq'+x1+(y1+y2)/2).firstChild.nodeValue===" ") {
				return true;
			}
		} else if(Math.abs(x1-x2)===2&&Math.abs(y1-y2)===1){
			if (document.getElementById('sq'+(x1+x2)/2+y1).firstChild.nodeValue===" ") {
				return true;
			}
		}
		return false;
	}
	function pc(x1,y1,x2,y2) {
		if (document.getElementById("sq"+x2+y2).firstChild.nodeValue===" ") {
			return ie(x1,y1,x2,y2);
		} else {
			if (x1===x2) {
				if (y1>y2) {
					for (i = y2+1,j=0; i < y1; i++) {
						if (document.getElementById("sq"+x1+i).firstChild.nodeValue!==" ") {
							j=j+1;
						}
					}
				} else {
					for (i = y1+1,j=0; i < y2; i++) {
						if (document.getElementById("sq"+x1+i).firstChild.nodeValue!==" ") {
							j=j+1;
						}
					}
				}
			} else if(y1===y2){
				if (x1>x2) {
					for (i = x2+1,j=0; i < x1; i++) {
						if (document.getElementById("sq"+i+y1).firstChild.nodeValue!==" ") {
							j=j+1;
						}
					}
				} else {
					for (i = x1+1,j=0; i < x2; i++) {
						if (document.getElementById("sq"+i+y1).firstChild.nodeValue!==" ") {
							j=j+1;
						}
					}
				}
			}else {
				j=-1;
			}
			if (j===1) {
				return true;
			}
		}
		return false;
	}
	function xlb(x1,y1,x2,y2) {
		if (x2<=4&&Math.abs(x1-x2)===2&&Math.abs(y1-y2)===2&&document.getElementById('sq'+(x1+x2)/2+(y1+y2)/2).firstChild.nodeValue===" ") {
			return true;
		} 
		return false;
	}
	function uib(x1,y1,x2,y2) {
		if (x2<=2&&y2>=3&&y2<=5&&Math.abs(x1-x2)===1&&Math.abs(y1-y2)===1) {
			return true;
		} 
		return false;
	}
	function jl(x1,y1,x2,y2) {
		if (x2<=2&&y2>=3&&y2<=5) {
			if (Math.abs(x1-x2)===1&&y1===y2||Math.abs(y1-y2)===1&&x1===x2) {
				return true;
			}
		} else if(y1===y2&&document.getElementById('sq'+x2+y2).firstChild.nodeValue==="帅"){
			for (i = x1+1; i < 2; i++) {
				if (document.getElementById("sq"+i+y1).firstChild.nodeValue!==" ") {
					return false;
				}
			}
			return true;
		}
		return false;
	}
	function zu(x1,y1,x2,y2) {
		if (x1<=4) {
			if (x2-x1===1&&y1===y2) {
				return true;
			}
		} else {
			if (x2-x1===1&&y1===y2||Math.abs(y1-y2)===1&&x1===x2) {
				return true;
			}
		}
		return false;
	}
	function xlr(x1,y1,x2,y2) {
		if (x2>=5&&Math.abs(x1-x2)===2&&Math.abs(y1-y2)===2&&document.getElementById('sq'+(x1+x2)/2+(y1+y2)/2).firstChild.nodeValue===" ") {
			return true;
		} 
		return false;
	}
	function uir(x1,y1,x2,y2) {
		if (x2>=7&&y2>=3&&y2<=5&&Math.abs(x1-x2)===1&&Math.abs(y1-y2)===1) {
			return true;
		} 
		return false;
	}
	function uk(x1,y1,x2,y2) {
		if (x2>=7&&y2>=3&&y2<=5) {
			if (Math.abs(x1-x2)===1&&y1===y2||Math.abs(y1-y2)===1&&x1===x2) {
				return true;
			}
		} else if(y1===y2&&document.getElementById('sq'+x2+y2).firstChild.nodeValue==="将"){
			for (i = x2+1; i < x1; i++) {
				if (document.getElementById("sq"+i+y1).firstChild.nodeValue!==" ") {
					return false;
				}
			}
			return true;
		}
		return false;
	}
	function bk(x1,y1,x2,y2) {
		if (x1>=5) {
			if (x1-x2===1&&y1===y2) {
				return true;
			}
		} else {
			if (x1-x2===1&&y1===y2||Math.abs(y1-y2)===1&&x1===x2) {
				return true;
			}
		}
		return false;
	}
	//提子
	function tizi() {
		var dhqmzi={
			square:this,
			id:this.id.replace("sq",""),
			name:this.firstChild.nodeValue
		};
		dhqmzi.hh=Number(dhqmzi.id[0]);
		dhqmzi.lp=Number(dhqmzi.id[1]);
		//重复判断是否有子？
		if (dhqmzi.name!==" ") {
			dhqmzi.square.style.outline="#aa0 dashed 2px";
			for (i = 0; i < square.length; i++) {
				square[i].onclick=lozi; 
			}
		}
		//落子
		function lozi() {
			var xxyizi={
				square:this,
				id:this.id.replace("sq",""),
				name:this.firstChild.nodeValue
			}
			xxyizi.hh=Number(xxyizi.id[0]);
			xxyizi.lp=Number(xxyizi.id[1]);
			//判断是否 移动				判断是否 不是吃自己的子
			if (xxyizi.id!==dhqmzi.id&&(xxyizi.name===" "||xxyizi.square.style.color!==dhqmzi.square.style.color)) {
				//判断棋子行走是否符合规则，符合规则的话改变棋手判断落子处是否是将或帅					
				switch (dhqmzi.name) {
					case "车" : 
						if (ie(dhqmzi.hh,dhqmzi.lp,xxyizi.hh,xxyizi.lp)) {
							gameover(dhqmzi.square,xxyizi.square);
						}
						break;
					case "马" : 
						if (ma(dhqmzi.hh,dhqmzi.lp,xxyizi.hh,xxyizi.lp)) {
							gameover(dhqmzi.square,xxyizi.square);
						}
						break;
					case "炮" : 
						if (pc(dhqmzi.hh,dhqmzi.lp,xxyizi.hh,xxyizi.lp)) {
							gameover(dhqmzi.square,xxyizi.square);
						}
						break;
					case "象" : 
						if (xlb(dhqmzi.hh,dhqmzi.lp,xxyizi.hh,xxyizi.lp)) {
							gameover(dhqmzi.square,xxyizi.square);
						}
						break;
					case "士" : 
						if (uib(dhqmzi.hh,dhqmzi.lp,xxyizi.hh,xxyizi.lp)) {
							gameover(dhqmzi.square,xxyizi.square);
						}
						break;
					case "将" : 
						if (jl(dhqmzi.hh,dhqmzi.lp,xxyizi.hh,xxyizi.lp)) {
							gameover(dhqmzi.square,xxyizi.square);
						}
						break;
					case "卒" : 
						if (zu(dhqmzi.hh,dhqmzi.lp,xxyizi.hh,xxyizi.lp)) {
							gameover(dhqmzi.square,xxyizi.square);
						}
						break;
					case "相" : 
						if (xlr(dhqmzi.hh,dhqmzi.lp,xxyizi.hh,xxyizi.lp)) {
							gameover(dhqmzi.square,xxyizi.square);
						}
						break;
					case "仕" : 
						if (uir(dhqmzi.hh,dhqmzi.lp,xxyizi.hh,xxyizi.lp)) {
							gameover(dhqmzi.square,xxyizi.square);
						}
						break;
					case "帅" : 
						if (uk(dhqmzi.hh,dhqmzi.lp,xxyizi.hh,xxyizi.lp)) {
							gameover(dhqmzi.square,xxyizi.square);
						}
						break;
					case "兵" : 
						if (bk(dhqmzi.hh,dhqmzi.lp,xxyizi.hh,xxyizi.lp)) {
							gameover(dhqmzi.square,xxyizi.square);
						}
						break;
					default:
						alert("!!!!");
				}
			}
			//恢复棋子提子事件
			dhqmzi.square.style.outline="none";
			if (piece===0) {
				playerTxt.nodeValue="红方";
				for (i = 0; i < square.length; i++) {
					square[i].onclick=null;
					if (square[i].firstChild.nodeValue!==" ") {
						if (square[i].style.color==="rgb(255, 0, 0)") {
							square[i].onclick=tizi;
						}
					} 
				}
			} else if(piece===1) {
				playerTxt.nodeValue="黑方";
				for (i = 0; i < square.length; i++) {
					square[i].onclick=null;	
					if (square[i].firstChild.nodeValue!==" ") {
						if (square[i].style.color==="rgb(0, 0, 0)") {
							square[i].onclick=tizi;
						} 
					}
				}
			}
		}
	}