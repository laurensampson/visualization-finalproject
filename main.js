import bubble from "./bubble.js";

Promise.all([ // load multiple files
	d3.csv('factorType.csv', d3.autoType)
]).then(data=>{
    const type = data[0];
    const bubbleChart = bubble(type, ".bubble");
    var selectedFactor; // user selected factor
    d3.selectAll(".types").on("click", function (e, d) {bubbleChart.showFactor(d)
                                                        d3.selectAll(".factors").on("click", function (event, d) {selectedFactor = d.factorName;
                                                                                                                  console.log("selectedFactor", selectedFactor)
                                                                                                                  document.getElementById("selected").textContent = "You have selected " + selectedFactor + ". Scroll down to embark the journey";});
                                                    })
});