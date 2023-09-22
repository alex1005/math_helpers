function onDimChange() {
    const vectorLenForm = document.getElementById("matVectMultForm");
    const dim = vectorLenForm["dim"];
    
    const mat = document.getElementById("mat");
    mat.innerHTML = "";
    const vect = document.getElementById("vect");
    vect.innerHTML = "";

    for(let i = 1; i <= dim.value; i++) {
        for(let j = 1; j <= dim.value; j++) {
            mat.appendChild(createCoordInput("cell"));
        }
        mat.appendChild(document.createElement('br'));
        
        vect.appendChild(createCoordInput("cell"));
        vect.appendChild(document.createElement('br'));
    }
}

function createCoordInput(name) {
    const newField = document.createElement('input');
    newField.setAttribute('type','number');
    newField.setAttribute('class', 'small');
    newField.setAttribute('name', name);
    newField.setAttribute('value', '0');
    return newField;
}

function printResult(result) {
    const tbl = document.createElement('table');

    let isCorrupted = false;
    for (let i = 0; i < result.length; i++) {
        const tr = tbl.insertRow();
        if(Number.isFinite(result[i])) {
            const td = tr.insertCell();
            td.style.minWidth = '40px';
            td.style.textAlign = 'right';
            td.appendChild(document.createTextNode(result[i]));
        } else {
            isCorrupted = true;
            break;
        }
    }

    if(!isCorrupted) {
        if(!document.getElementById("result")) {
            document.getElementById("result_box").innerHTML = "<hr/><p id=\"result\"></p>";
        }
        document.getElementById("result").innerHTML = "Result vector:<br>";
        document.getElementById("result").appendChild(tbl);
    } else {
        alert("Unknown error happened or the result contains infinity!");
    }
}

function computeProduct() {
    // try {
        const matMultForm = document.getElementById("matVectMultForm");
        const dim = matMultForm["dim"].value;

        const matInput = document.getElementById("mat").getElementsByTagName("input");
        const vectInput = document.getElementById("vect").getElementsByTagName("input");
        
        const resVect = Array(+dim).fill(0);
        for(let i = 0; i < dim; i++) {
            let vectItem = 0;
            for(let j = 0; j < dim; j++) {
                const v1 = matInput[i*dim + j].value;
                const v2 = vectInput[j].value;
                if(v1 === '' || v2 === '') {
                    alert("Some fields are empty!");
                    return;
                }
                vectItem += v1 * v2;
            }
            resVect[i] = vectItem;
        }

        printResult(resVect);
    // } catch(e) {
    //     alert("Error happened! Check your input!");
    // }
}