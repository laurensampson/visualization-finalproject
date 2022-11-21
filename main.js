import bubble from "./bubble.js";
import line from "./line.js"

Promise.all([ // load multiple files
	d3.csv('factorType.csv', d3.autoType),
  d3.csv('Number of Deaths by Risk Factors.csv', d3.autoType)
]).then(data=>{
    const type = data[0];
    const mainData = data[1];
    const bubbleChart = bubble(type, ".bubble");
    var selectedFactor, selectedCountry; // user selected factor and country
    d3.selectAll(".types")
      .on("click", function (e, d) {bubbleChart.showFactor(d)
                                    d3.selectAll(".factors")
                                      .on("click", function (event, d) {selectedFactor = d.factorName;
                                                                        console.log("selectedFactor", selectedFactor)
                                                                        document.getElementById("selected").textContent = "You have selected " + selectedFactor + ". Scroll down to embark the journey";;
                                                                        document.querySelector("[class$=ss-main]").style.display = "block";
                                                                        document.querySelector("[class$=ss-main]").style.width = "400px";
                                                                        document.querySelector("[class$=ss-main]").style.margin = "auto";
                                                                        selectedCountry = d3.select('#selectCountry').node().value;
                                                                        vegaEmbed('#line', line(selectedFactor)).then(res => res.view.insert('myData', mainData.filter(d => d.Entity == selectedCountry))
                                                                                                                                       .run());
                                                                        d3.selectAll("#selectCountry")
                                                                
                                                                          .on("change", function (event) {selectedCountry = d3.select('#selectCountry').node().value;
                                                                                                          console.log("selectedCountry", selectedCountry);
                                                                                                          console.log("filtered data", mainData.filter(d => d.Entity == selectedCountry))
                                                                                                          vegaEmbed('#line', line(selectedFactor)).then(res => res.view.insert('myData', mainData.filter(d => d.Entity == selectedCountry))
                                                                                                                                       .run()
                                                                                                          );
                                                                      });
                                                                    })
                                                                    });
});