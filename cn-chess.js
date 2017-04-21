//旧浏览器不支持渐变，悔棋，和棋，吃自己的子为该提自己的子，微信上清空不了背景，棋子字的位置垂直方向不在中间
	var board = document.getElementById('board');
	var square = board.getElementsByTagName('div');
	var player= document.getElementById('player');
	var playerTxt= player.firstChild;
	var start= document.getElementById('start');
	var startTxt=start.firstChild;
	var tip=document.getElementById('tip');
	var tipTxt=tip.firstChild;
	var ret=document.getElementById('retract');
	var i;
	var step;
	var id;
	var piece;
	var record;
	//红先
	startGame();
	//初始化，填充棋子，给红棋子增加提子事件，增加颜色，背景,重置提示信息
	function startGame() {
		EventUtil.removeHandler(start,"click",startGame);
		EventUtil.removeHandler(ret,"click",retract);
		var zi;
		player.className="redpiece";
		playerTxt.nodeValue="帅";
		start.className="cantclick";
		ret.className="cantclick";
		tipTxt.nodeValue="对弈开始";
		step=0;
		record=[];
		piece=0;
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
				if (Number(square[i].id.replace("sq","")[0])<5) {
					square[i].className="blackpiece";
				} else {
					square[i].className="redpiece";
				}
			}else {
				square[i].className=" ";
			}
		}
		EventUtil.addHandler(board,"mousedown",select);
	}
	//提子
	function select(event) {
		event=EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);
		var selectpiece={
			sq:target,
			id:target.id.replace("sq",""),
			name:target.firstChild.nodeValue
		};
		selectpiece.row=Number(selectpiece.id[0]);
		selectpiece.col=Number(selectpiece.id[1]);

		//判断是否有子并且是本轮的棋子？
		if (piece===0&&selectpiece.sq.className.search(/redpiece/)!==-1||piece===1&&selectpiece.sq.className.search(/blackpiece/)!==-1) {
			addClass(selectpiece.sq,"thispiece");
			EventUtil.removeHandler(board,"mousedown",select);
			EventUtil.addHandler(board,"mousedown",piecego);
		}
		//落子
		function piecego(event) {
			EventUtil.removeHandler(board,"mousedown",piecego);
			event=EventUtil.getEvent(event);
			var target = EventUtil.getTarget(event);
			var gopiece={
				sq:target,
				id:target.id.replace("sq",""),
				name:target.firstChild.nodeValue
			}
			gopiece.row=Number(gopiece.id[0]);
			gopiece.col=Number(gopiece.id[1]);
			//判断落子处是否是自身，是否是己方子
			if (gopiece.id===selectpiece.id) {
				selectpiece.sq.className=selectpiece.sq.className.replace("thispiece"," ");
				EventUtil.addHandler(board,"mousedown",select);
			} else if(document.defaultView.getComputedStyle(gopiece.sq, null).color===document.defaultView.getComputedStyle(selectpiece.sq, null).color&&document.defaultView.getComputedStyle(gopiece.sq, null).backgroundImage===document.defaultView.getComputedStyle(selectpiece.sq, null).backgroundImage){
				select(event);
			} else {
				//判断棋子行走是否符合规则，符合规则的话改变棋手判断落子处是否是将或帅					
				switch (selectpiece.name) {
					case "车" : 
						if (ie(selectpiece.row,selectpiece.col,gopiece.row,gopiece.col)) {
							piecedown(selectpiece.sq,gopiece.sq);
						}
						break;
					case "马" : 
						if (ma(selectpiece.row,selectpiece.col,gopiece.row,gopiece.col)) {
							piecedown(selectpiece.sq,gopiece.sq);
						}
						break;
					case "炮" : 
						if (pc(selectpiece.row,selectpiece.col,gopiece.row,gopiece.col)) {
							piecedown(selectpiece.sq,gopiece.sq);
						}
						break;
					case "象" : 
						if (xlb(selectpiece.row,selectpiece.col,gopiece.row,gopiece.col)) {
							piecedown(selectpiece.sq,gopiece.sq);
						}
						break;
					case "士" : 
						if (uib(selectpiece.row,selectpiece.col,gopiece.row,gopiece.col)) {
							piecedown(selectpiece.sq,gopiece.sq);
						}
						break;
					case "将" : 
						if (jl(selectpiece.row,selectpiece.col,gopiece.row,gopiece.col)) {
							piecedown(selectpiece.sq,gopiece.sq);
						}
						break;
					case "卒" : 
						if (zu(selectpiece.row,selectpiece.col,gopiece.row,gopiece.col)) {
							piecedown(selectpiece.sq,gopiece.sq);
						}
						break;
					case "相" : 
						if (xlr(selectpiece.row,selectpiece.col,gopiece.row,gopiece.col)) {
							piecedown(selectpiece.sq,gopiece.sq);
						}
						break;
					case "仕" : 
						if (uir(selectpiece.row,selectpiece.col,gopiece.row,gopiece.col)) {
							piecedown(selectpiece.sq,gopiece.sq);
						}
						break;
					case "帅" : 
						if (uk(selectpiece.row,selectpiece.col,gopiece.row,gopiece.col)) {
							piecedown(selectpiece.sq,gopiece.sq);
						}
						break;
					case "兵" : 
						if (bk(selectpiece.row,selectpiece.col,gopiece.row,gopiece.col)) {
							piecedown(selectpiece.sq,gopiece.sq);
						}
						break;
					default:
						alert("!!!!");
				}
				
			} 
			//恢复棋子提子事件
			if (piece===0||piece===1) {
				selectpiece.sq.className=selectpiece.sq.className.replace("thispiece"," ");
				EventUtil.addHandler(board,"mousedown",select);
			}
		}
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
	//棋子落下事件,改变棋手，判断胜负，改变棋子位置
	function piecedown(iizi,deadpiece) {
		//更改显示信息
		if (step===0) {
			startTxt.nodeValue="新局";
			tipTxt.nodeValue="对弈中";
			EventUtil.addHandler(start,"click",startGame);
			EventUtil.addHandler(ret,"click",retract);
			start.className=" ";
			ret.className=" ";
		}
		//判断胜负
		var deadpieceName=deadpiece.firstChild.nodeValue;
		if (deadpieceName==="将"||deadpieceName==="帅") {
			if (deadpieceName==="将") {
				tipTxt.nodeValue="红胜";
			} else {
				tipTxt.nodeValue="黑胜";
			}
			piece=2;
			EventUtil.removeHandler(ret,"click",retract);
			ret.className="cantclick";
		}
		//记录历史
		step=step+1;
		record[step-1]={
			sq1:iizi,
			sq2:deadpiece,
			sq1name:iizi.firstChild.nodeValue,
			sq2name:deadpiece.firstChild.nodeValue,
		}
		//更改棋子
		if(record[step-2]){
			record[step-2].sq1.className=record[step-2].sq1.className.replace("lastpiece"," ");
			record[step-2].sq2.className=record[step-2].sq2.className.replace("lastpiece"," ");
		}
		deadpiece.className=iizi.className.replace("thispiece","lastpiece");
		deadpiece.firstChild.nodeValue=iizi.firstChild.nodeValue;
		iizi.className="lastpiece";
		iizi.firstChild.nodeValue=" ";
		//更改棋手显示信息
		if (piece===1) {
			piece=0;
			player.className="redpiece";
			playerTxt.nodeValue="帅"
		} else if(piece===0) {
			piece=1;
			player.className="blackpiece";
			playerTxt.nodeValue="将";
		} else{
			player.className=" ";
			playerTxt.nodeValue=" ";
			alert("恭喜"+tipTxt.nodeValue);
		}
	}
	function retract() {
		record[step-1].sq1.firstChild.nodeValue=record[step-1].sq1name;
		record[step-1].sq2.firstChild.nodeValue=record[step-1].sq2name;
		if (piece===0) {
			record[step-1].sq1.className=("blackpiece");
			if (record[step-1].sq2name===" ") {
				record[step-1].sq2.className=" ";
			} else {
				record[step-1].sq2.className=("redpiece");
			}
		} else{
			record[step-1].sq1.className=("redpiece");
			if (record[step-1].sq2name===" ") {
				record[step-1].sq2.className=" ";
			} else {
				record[step-1].sq2.className=("blackpiece");
			}
		}
		if (record[step-2]) {
			record[step-2].sq1.className="lastpiece";
			addClass(record[step-2].sq2,"lastpiece");
		}
		step=step-1;
		if (piece===1) {
			piece=0;
			player.className="redpiece";
			playerTxt.nodeValue="帅";
		} else {
			piece=1;
			player.className="blackpiece";
			playerTxt.nodeValue="将";
		}
		if (step===0) {
			EventUtil.removeHandler(ret,"click",retract);
			ret.className="cantclick";
		}
	}