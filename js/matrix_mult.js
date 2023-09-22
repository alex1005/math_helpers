function onDimChange() {
    const vectorLenForm = document.getElementById("matMultForm");
    const dim = vectorLenForm["dim"];
    
    const mat1 = document.getElementById("mat1");
    mat1.innerHTML = "";
    const mat2 = document.getElementById("mat2");
    mat2.innerHTML = "";

    for(let i = 1; i <= dim.value; i++) {
        for(let j = 1; j <= dim.value; j++) {
            mat1.appendChild(createCoordInput("cell"));
            mat2.appendChild(createCoordInput("cell"));
        }
        mat1.appendChild(document.createElement('br'));
        mat2.appendChild(document.createElement('br'));
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
        for (let j = 0; j < result[0].length; j++) {
            if(Number.isFinite(result[i][j])) {
                const td = tr.insertCell();
                td.style.width = '40px';
                td.style.textAlign = 'right';
                td.appendChild(document.createTextNode(result[i][j]));
            } else {
                isCorrupted = true;
                break;
            }
        }
        if(isCorrupted) break;
    }

    if(!isCorrupted) {
        if(!document.getElementById("result")) {
            document.getElementById("result_box").innerHTML = "<hr/><p id=\"result\"></p>";
        }
        document.getElementById("result").innerHTML = "Result matrix:<br>";
        document.getElementById("result").appendChild(tbl);
    } else {
        alert("Unknown error happened or the result contains infinity!");
    }
}

function computeProduct() {
    try {
        const matMultForm = document.getElementById("matMultForm");
        const dim = matMultForm["dim"].value;

        const mat1Input = document.getElementById("mat1").getElementsByTagName("input");
        const mat2Input = document.getElementById("mat2").getElementsByTagName("input");
        
        const prod = Array(+dim).fill().map(()=>Array(+dim).fill(0));
        for(let k = 0; k < dim; k++) {
            for(let i = 0; i < dim; i++) {
                let subSum = 0;
                for(let j = 0; j < dim; j++) {
                    const v1 = mat1Input[k*dim + j].value;
                    const v2 = mat2Input[j*dim + i].value;
                    if(v1 === '' || v2 === '') {
                        alert("Some fields are empty!");
                        return;
                    }
                    subSum += v1 * v2;
                }
                prod[k][i] = subSum;
            }
        }

        printResult(prod);
    } catch(e) {
        alert("Error happened! Check your input!");
    }
}