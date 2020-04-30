var buttons = document.querySelectorAll('.btn');
var screen = document.getElementById('screen');
var lastIsOp = false;
var canDec = true;
var currVal = '';
var currOp = '';
var segments = [];

document.getElementById('calculator')
.addEventListener('click', function(event) {
    if (!event.target.matches('.btn')) {
        return;
    } else if (event.target.matches('.num')) {
        handleNumber(event.target.innerText)
    } else if (event.target.matches('.op')) {
        handleOperator(event.target.innerText);
    } else if (event.target.id === 'dec') {
        handleDecimal();
    } else if (event.target.id === 'pos-neg') {
        handlePosNeg();
    } else if (event.target.id === 'clear') {
        handleClear();
    } else if (event.target.id === 'equals') {
        handleEquals();
    }
});

function handleClear() {
    setScreen('');
    lastIsOp = false;
    canDec = true;
    currVal = '';
    currOp = '';
    segments = [];
}

function handleDecimal() {
    if(canDec) {
        addToScreen('.');
    } 
    canDec = false;
}

function handleNumber(num) {
    //updating currVal, CurrOp and segments
    if(currOp){
        segments.push(currOp);
        currOp = '';
    }
    addToScreen(num);
    currVal += num;
    

    //updating flags
    lastOp = false;
}

function handleOperator(op){
    if(currVal) {
        // add currVal to segments
        segments.push(currVal);
        // empty currVal
        currVal = '';
        // update screen
        addToScreen(op);
    } else {
        var newScreenTxt = screen.innerText.slice(0, -1) + op;
        setScreen(newScreenTxt);
    }
    currOp = op;
    //update flags
    lastIsOp = true;
    canDec = true;
}

function setScreen(val){
    document.getElementById('screen').innerText = val;
}

function addToScreen(val){
    document.getElementById('screen').innerText += val;
}

function handleEquals() {

    if(currVal === '-'){
        segments.push('0');
        currVal = '';
    } else if(currVal) {
        segments.push(currVal);
        currVal = '';
    } else {
        currOp = '';
    }

    for( var i = 0; i < segments.length; i+=2){
        if(segments[i] === '-') {
            segments[i] = '0';
        }
        if(segments[i].startsWith('-')) {
            segments[i] = '(' + segments[i] + ')';
        }
    }
    var answer = eval(segments.join('')).toFixed(3);

    //update state values
    currVal = answer.toString();
    segments = [];

    //update screen
    setScreen(answer);

    //update flags
    lastIsOp = false;
     // if answer cannot be neatly divided by 1 it has a decimal
     if(answer % 1){
        canDec = false;
    } else {
        canDec = true;
    }
}


function handlePosNeg() {
    if(currVal && currVal.startsWith('-')){
        currVal = currVal.slice(1);
    } //make screen and currVal positive
    else if(currVal) {
        currVal = '-' + currVal;
        
    } //clean-up currOp and set currVal
    else {
        currVal = '-';
        segments.push(currOp);
        currOp = '';
    }
    var newScreenTxt = segments.join('') + currVal;
    setScreen(newScreenTxt);
}