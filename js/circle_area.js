function printResult(result) {
    if(Number.isFinite(result)) {
        if(!document.getElementById("result")) {
            document.getElementById("result_box").innerHTML = "<hr/><p id=\"result\"></p>";
        }
        document.getElementById("result").innerHTML = "Length is: " + result.toFixed(5);
    } else {
        alert("Unknown error happened or result is infinity!");
    }
}

function computeArea() {
    try {
        const circleAreaForm = document.getElementById("circleAreaForm");
        const radius = circleAreaForm["radius"];
        if(radius.value == '') {
            alert("Enter the radius!");
            return;
        }
    
        const area = Math.PI * radius.value**2;
        printResult(area);
    } catch(e) {
        alert("Error happened! Check your input!");
    }
}