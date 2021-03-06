let text = "Let's see how fast you can type, shall we?";

let checker = 0;
let output = "";
const list = new Array();let c=0;
let e;
let start, _final;
let c1 = 0;
let acc = 100;

const canvas = document.querySelector("#canvas");
const speed = document.querySelector("#speed");
const accuracy = document.querySelector("#accuracy");

const reFRESH = (_text, list, elem)=>{
	for(let i = 0; i<_text.length; i++){
		e = document.createElement('span');
		e.textContent = _text[i];
		list.push(e);
	}

	elem.innerHTML = "&nbsp;"  // set it up!
	for(let i = 0; i<list.length; i++){
		elem.append(list[i]);
	}
	setUpAccuracy();
}

const FormatAcc = (s)=>{
	return "ACCURACY: " + s.toString() + "%";
}

const setUpAccuracy=()=>{
	accuracy.textContent = FormatAcc(acc);
};

const innerHtmlGenerator = (list)=>{ // superfluous
	let _string = "";
	for(let i = 0; i<list.length; i++){
		_string+=list[i].innerHTML;
	}
	return _string;
};



const wps = (length, secondsPassed)=>{ // f(value);
	return (length*60)/(5*secondsPassed);
}


const interlude = setInterval(()=>{
	_final = ((new Date()).getTime() - start);
	speed.textContent = (wps(output.length, _final/1000)).toString();
	accuracy.textContent = FormatAcc(acc);
}, 200);

const clear=()=>{
	clearInterval(interlude);
	// document.dispatchEvent; // in the works;
	canvas.textContent = "DONE!";
	speed.textContent = (wps(output.length, _final/1000)).toString();
	accuracy.textContent = FormatAcc(acc);
};

const logKey=e=>{
	//console.log(list[c]);
	if(!checker){
		if(e.key==list[c].textContent){
			output += String(e.key);
			list[c].style.background = 'blue';
			c++; // next;
			if(c==list.length){
				checker = 1;
				clear();
			}
		}else{ // else  diminish the accuracy;
			acc -= 0.3;
		}
	}; 
	// do nothing;
};

(()=>{
	if(!c1){start = (new Date()).getTime(); c1 = 1;};
	reFRESH(text, list, canvas);
	document.addEventListener('keypress', logKey);
})();

