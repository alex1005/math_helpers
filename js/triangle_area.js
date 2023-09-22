function onDimChange() {
    const triagForm = document.getElementById("triangleAreaForm");
    const dim = triagForm["dim"];
    if(dim.value == 3) {
        if(!triagForm["c13"]) {
            document.getElementById("vert1").appendChild(createCoordInput("c13"));
            document.getElementById("vert2").appendChild(createCoordInput("c23"));
            document.getElementById("vert3").appendChild(createCoordInput("c33"));
        }
    } else {
        if(triagForm["c13"]) {
            document.getElementById("vert1").removeChild(triagForm["c13"]);
            document.getElementById("vert2").removeChild(triagForm["c23"]);
            document.getElementById("vert3").removeChild(triagForm["c33"]);
        }
    }
}

function createCoordInput(name) {
    const newField = document.createElement('input');
    newField.setAttribute('type','number');
    newField.setAttribute('name', name);
    newField.setAttribute('value', '0');
    return newField;
}

function printResult(result) {
    if(Number.isFinite(result)) {
        if(!document.getElementById("result")) {
            document.getElementById("result_box").innerHTML = "<hr/><p id=\"result\"></p>";
        }
        document.getElementById("result").innerHTML = "Area is: " + result.toFixed(5);
    } else {
        alert("Unknown error happened or the result is infinity!");
    }
}

function computeArea() {
    try {
        const triagForm = document.getElementById("triangleAreaForm");
        const dim = triagForm["dim"];

        const c11 = triagForm["c11"].value;
        const c12 = triagForm["c12"].value;
        const c21 = triagForm["c21"].value;
        const c22 = triagForm["c22"].value;
        const c31 = triagForm["c31"].value;
        const c32 = triagForm["c32"].value;

        if(c11 === '' || c12 === '' || c21 === '' || c22 === '' || c31 === '' || c32 === '') {
            alert("Some fields are empty!");
            return;
        }
        
        let side1, side2, side3;
        if(dim.value == 3) {
            const c13 = triagForm["c13"].value;
            const c23 = triagForm["c13"].value;
            const c33 = triagForm["c33"].value;

            if(c13 === '' || c23 === '' || c33 === '') {
                alert("Some fields are empty!");
                return;
            }

            side1 = Math.sqrt((c11-c21)**2 + (c12 - c22)**2 + (c13-c23)**2);
            side2 = Math.sqrt((c21-c31)**2 + (c22 - c32)**2 + (c23-c33)**2);
            side3 = Math.sqrt((c11-c31)**2 + (c12 - c32)**2 + (c13-c33)**2);
        } else {
            side1 = Math.sqrt((c11-c21)**2 + (c12 - c22)**2);
            side2 = Math.sqrt((c21-c31)**2 + (c22 - c32)**2);
            side3 = Math.sqrt((c11-c31)**2 + (c12 - c32)**2);
        }
        
        const s = (side1 + side2 + side3)/2;
        const area = Math.sqrt(s*(s-side1)*(s-side2)*(s-side3));
        printResult(area);
    } catch(e) {
        alert("Error happened! Check your input!");
    }
}