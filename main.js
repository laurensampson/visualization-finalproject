import bubble from "./bubble.js";
import line from "./line.js";
import bar from "./bar.js";
import map from "./map.js";
import scatter from "./scatter.js";
import allcountries from "./allcountries.js"

Promise.all([ // load multiple files
	d3.csv('factorType.csv', d3.autoType),
  d3.csv('Number of Deaths by Risk Factors.csv', d3.autoType),
  d3.csv('map.csv', d3.autoType)
]).then(data=>{
    const type = data[0];
    const mainData = data[1];
    const mapData = data[2];
    const bubbleChart = bubble(type, ".bubble");
    var selectedFactor, selectedCountry; // user selected factor and country
    
    d3.selectAll(".types")
      .on("click", function (e, d) {bubbleChart.showFactor(d)
                                    d3.selectAll(".factors")
                                      .on("click", function (event, d) {selectedFactor = d.factorName;
                                                                        console.log("selectedFactor", selectedFactor)
                                                                        document.getElementById("select").textContent = "You have selected ";
                                                                        document.getElementById("selected").textContent = selectedFactor + ".";
                                                                        document.getElementById("scroll").textContent = "Scroll down to embark the journey.";
                                                                        document.getElementById("world-overview").textContent = "World Overview of " + selectedFactor + ":";
                                                                        document.getElementById("map-title").textContent = "1. Death Population Comparison Across Countries";
                                                                        document.getElementById("world-instruction").textContent = "This choropleth shows the number of deaths by";
                                                                        document.getElementById("instruction-factor").textContent = selectedFactor;
                                                                        document.getElementById("bar-instruction").textContent = "through different saturations. You can see the total number of deaths. Mouse on any country to see the specific death number in that country. Below the map is a barchart showing the top 10 countries with most death population by this Factor. ";
                                                                        document.getElementById("slider-instruction").textContent = "Please feel free to use the slider below the barchart to see a certain year and the chronological change of the big picture and ranking.";
                                                                        document.getElementById("scatter-title").textContent = "2. Correlation Between Countries' Death Rate and Economy"
                                                                        document.getElementById("select-text").textContent = "Select a Country to See Its Details";
                                                                        document.getElementById("gdp").textContent = "This scatter plot allows you to explore how a country's wealth and death rate from";
                                                                        document.getElementById("factor").textContent = selectedFactor;
                                                                        document.getElementById("region").textContent = "are related. Data for GDP per capita and death rate are more accurate to reflect the actual situation since countries have different population sizes. The data are from 2019, which is the latest year for all available data. Please select any region you want to see down the bottom.";
                                                                        document.getElementById("country-view").textContent = "Detailed Trend of Each Country for " + selectedFactor + ":";
                                                                        document.querySelector("[class$=ss-main]").style.display = "inline-block";
                                                                        document.querySelector("[class$=ss-main]").style.width = "400px";
                                                                        document.querySelector("[class$=ss-main]").style.height = "50px";
                                                                        document.querySelector("[class$=ss-main]").style.margin = "auto";
                                                                        selectedCountry = d3.select('#selectCountry').node().value;
                                                                        vegaEmbed("#line", line(selectedFactor, selectedCountry));
                                                                        document.getElementById("line-text").textContent = "This line chart shows the trend of";
                                                                        document.getElementById("line-factor").textContent = selectedFactor;
                                                                        document.getElementById("line-connect").textContent = "caused the number of deaths from 1990 to 2019 in"
                                                                        document.getElementById("line-country").textContent = selectedCountry + ". ";
                                                                        document.getElementById("select-another").textContent = "Please feel free to select another country to see its trend. Even with the same death factor, two different countries might have very distinct trends, especially between developed countries and developing countries."
                                                                        vegaEmbed("#scatter", scatter(selectedFactor));
                                                                        let axisMax = mapData[0][selectedFactor];
                                                                        console.log("axisMax ", axisMax);
                                                                        vegaEmbed("#map", map(selectedFactor, axisMax));
                                                                        vegaEmbed("#allcountries", allcountries(selectedFactor));
                                                                        console.log("parameters", selectedFactor, selectedCountry)
                                                                        d3.selectAll("#selectCountry")
                                                                          .on("change", function (event) {selectedCountry = d3.select('#selectCountry').node().value;
                                                                                                          console.log("selectedCountry", selectedCountry);
                                                                                                          console.log("filtered data", mainData.filter(d => d.Entity == selectedCountry))
                                                                                                          vegaEmbed("#line", line(selectedFactor, selectedCountry));
                                                                                                          document.getElementById("line-country").textContent = selectedCountry + "."});
                                                                    });
})});