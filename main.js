import bubble from "./bubble.js";

Promise.all([ // load multiple files
	d3.csv('factorType.csv', d3.autoType)
]).then(data=>{
    const type = data[0];
    //var selectedType;
    const bubbleChart = bubble(type, ".bubble");
    //bubbleChart.update(type);
});