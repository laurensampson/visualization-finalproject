import bubble from "./bubble.js";


Promise.all([ // load multiple files
	d3.csv('factorType.csv', d3.autoType)
]).then(data=>{
    const type = data[0];
    const bubbleChart = bubble(type, ".bubble");
    var selectedFactor, selectedCountry; // user selected factor and country
    d3.selectAll(".types").on("click", function (e, d) {bubbleChart.showFactor(d)
                                                        d3.selectAll(".factors").on("click", function (event, d) {selectedFactor = d.factorName;
                                                                                                                  console.log("selectedFactor", selectedFactor)
                                                                                                                  document.getElementById("selected").textContent = "You have selected " + selectedFactor + ". Scroll down to embark the journey";;
                                                                                                                  document.querySelector("[class$=ss-main]").style.display = "block";
                                                                                                                  document.querySelector("[class$=ss-main]").style.width = "400px";
                                                                                                                  document.querySelector("[class$=ss-main]").style.margin = "auto";
                                                                                                                  d3.selectAll("#selectCountry").on("change", function (event) {
                                                                                                                    selectedCountry = d3.select('#selectCountry').node().value; //currently saving 2-lettercountry code, can be change to 3-letter ones
                                                                                                                    console.log("selectedCountry", selectedCountry);
                                                                                                                  });
                                                                                                                })
                                                                                                                });
});