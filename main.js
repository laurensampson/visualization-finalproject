import bubble from "./bubble.js";
import line from "./line.js";
import bar from "./bar.js";
import scatter from "./scatter.js";

Promise.all([ // load multiple files
	d3.csv('factorType.csv', d3.autoType),
  d3.csv('Number of Deaths by Risk Factors.csv', d3.autoType)
]).then(data=>{
    const type = data[0];
    const mainData = data[1];
    const bubbleChart = bubble(type, ".bubble");
    var selectedFactor, selectedCountry, compareFactor; // user selected factor and country
    
    d3.selectAll(".types")
      .on("click", function (e, d) {bubbleChart.showFactor(d)
                                    d3.selectAll(".factors")
                                      .on("click", function (event, d) {selectedFactor = d.factorName;
                                                                        console.log("selectedFactor", selectedFactor)
                                                                        //document.getElementById("selected").textContent = "You have selected " + selectedFactor + ". Scroll down to embark the journey";
                                                                        document.getElementById("select").textContent = "You have selected ";
                                                                        document.getElementById("selected").textContent = selectedFactor + ".";
                                                                        document.getElementById("scroll").textContent = "Scroll down to embark the journey.";
                                                                        document.getElementById("select-text").textContent = "Select a Country to See Its Details";
                                                                        document.getElementById("gdp").textContent = "Explore how a country's wealth and death rate from";
                                                                        document.getElementById("factor").textContent = selectedFactor;
                                                                        document.getElementById("region").textContent = "are related. Select any region you want to see.";
                                                                        document.querySelector("[class$=ss-main]").style.display = "inline-block";
                                                                        //document.querySelector("[class$=ss-main]").style.max-width = "100px";
                                                                        document.querySelector("[class$=ss-main]").style.width = "400px";
                                                                        document.querySelector("[class$=ss-main]").style.height = "50px";
                                                                        document.querySelector("[class$=ss-main]").style.margin = "auto";
                                                                        //document.querySelector("#selectCompareFactor").style.display = "block";
                                                                        selectedCountry = d3.select('#selectCountry').node().value;
                                                                        //compareFactor = d3.select('#selectCompareFactor').node().value;
                                                                        vegaEmbed("#line", line(selectedFactor, selectedCountry));
                                                                        document.getElementById("line-text").textContent = "This line chart shows the trend of";
                                                                        document.getElementById("line-factor").textContent = selectedFactor;
                                                                        document.getElementById("line-connect").textContent = "caused the number of deaths from 1990 to 2019 in"
                                                                        document.getElementById("line-country").textContent = selectedCountry + "."
                                                                        vegaEmbed("#bar", bar(selectedFactor, selectedCountry));
                                                                        vegaEmbed("#scatter", scatter(selectedFactor));

                                                                        console.log("parameters", selectedFactor, selectedCountry)
                                                                        d3.selectAll("#selectCountry")
                                                                          .on("change", function (event) {selectedCountry = d3.select('#selectCountry').node().value;
                                                                                                          console.log("selectedCountry", selectedCountry);
                                                                                                          console.log("filtered data", mainData.filter(d => d.Entity == selectedCountry))
                                                                                                          vegaEmbed("#line", line(selectedFactor, selectedCountry));
                                                                                                          document.getElementById("line-text").textContent = "This line chart shows the trend of";
                                                                                                          document.getElementById("line-factor").textContent = selectedFactor;
                                                                                                          document.getElementById("line-connect").textContent = "caused the number of deaths from 1990 to 2019 in"
                                                                                                          document.getElementById("line-country").textContent = selectedCountry + "."
                                                                                                          vegaEmbed("#bar", bar(selectedFactor, selectedCountry))});
                                                                        d3.selectAll("#selectCompareFactor")
                                                                          .on("change", function (event) {compareFactor = d3.select('#selectCompareFactor').node().value;
                                                                                                          vegaEmbed("#scatter", scatter(selectedFactor))});
                                                                    });
})});