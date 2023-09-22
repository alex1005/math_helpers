function onDimChange() {
    const vectorLenForm = document.getElementById("vectorLenForm");
    const dim = vectorLenForm["dim"];
    
    const coords = document.getElementById("coords");
    coords.innerHTML = "";
    for(let i = 1; i <= dim.value; i++) {
        const block = createCoordInputBlock(`Coordinate #${i}: `);
        block.appendChild(createCoordInput('coord'));
        coords.appendChild(block);
    }
}

function createCoordInput(name) {
    const newField = document.createElement('input');
    newField.setAttribute('type','number');
    newField.setAttribute('name', name);
    newField.setAttribute('value', '0');
    return newField;
}

function createCoordInputBlock(label) {
    const block = document.createElement('p');
    block.textContent = label;
    return block;
}

function printResult(result) {
    if(Number.isFinite(result)) {
        if(!document.getElementById("result")) {
            document.getElementById("result_box").innerHTML = "<hr/><p id=\"result\"></p>";
        }
        document.getElementById("result").innerHTML = "Length is: " + result.toFixed(5);
    } else {
        alert("Unknown error happened or the result is infinity!");
    }
}

function computeLength() {
    try {
        let sumSq = 0;
        for(let c of document.getElementById("coords").getElementsByTagName("*")) {
            if(c.name != "coord") continue;
            if(c.value == '') {
                alert("Some fields are empty!");
                return;
            }
            sumSq += c.value**2;
        }
    
        const len = Math.sqrt(sumSq);
        printResult(len);
    } catch(e) {
        alert("Error happened! Check your input!");
    }
}