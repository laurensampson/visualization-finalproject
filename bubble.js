export default bubble;

function bubble(data, container){
    var selectedType;
    // initialization
    const margin = ({top: 30, right: 50, bottom: 0, left: 50});
    const width = 1400 - margin.left - margin.right,
          height = 475 - margin.top - margin.bottom;
    const svg = d3.select(container)
                  .append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var colors = d3.scaleOrdinal(d3.schemeTableau10);
    var factorType = new Set(data.map(function(array){return array.factorType;}));
    const xScale = d3.scaleBand()
                     .paddingInner(0.1);
    xScale.rangeRound([100, width + 100])
          .domain(data.map(d => d.factorType));
    var types = svg.selectAll("circle")
                   .data(factorType)
    types.enter()
         .append("circle")
         .attr("class", "types")
         .attr("cx", d => xScale(d))
         .attr("cy", 75)
         .attr("r", 0)
         .on("mouseover", function() {d3.select(this)
                                        .attr("opacity", 0.75)})
         .on("mouseout", function() {d3.select(this)
                                       .attr("opacity", 1)})
         .merge(types)
         .transition()
         .delay(1000)
         .attr("cx", d => xScale(d))
         .attr("cy", 75)
         .attr("r", 100)
         .attr("fill", d => colors(d));
    var labels = svg.selectAll("text")
         .data(factorType)
    labels.enter()
          .append("text")
          .attr("class", "labels")
          .attr("text-anchor", "middle")
          .attr("fill-opacity", 0)
          .attr("dx", d => xScale(d))
          .attr("dy", 80)
          .merge(labels)
          .transition()
          .delay(1000)
          .attr("fill-opacity", 1)
          .attr("dx", d => xScale(d))
          .attr("dy", 80)
          .text(d => d)
          .style("font-weight", "bold")
          .style("font-size", "20px");
    function showFactor(type) {
        console.log(type);
        var selectedFactors = data.filter(d => d.factorType == type);
        console.log(selectedFactors);
        xScale.domain(selectedFactors.map(d => d.factorName))
              .rangeRound([75 + width / 2 - selectedFactors.length * 90, 75 + width / 2 + selectedFactors.length * 90])
        var factors = svg.selectAll(".factors")
                         .data(selectedFactors)
        factors.enter()
               .append("circle")
               .attr("class", "factors")
               .attr("cx", width / 2)
               .attr("cy", 325)
               .attr("r", 90)
               .attr("fill", d => colors(d.factorType))
               .on("mouseover", function() {d3.select(this)
                                              .attr("opacity", 0.75)})
               .on("mouseout", function() {d3.select(this)
                                             .attr("opacity", 1)})
               .merge(factors)
               .transition()
               .delay(100)
               .attr("cx", d => xScale(d.factorName))
               .attr("cy", 325)
               .attr("r", 90)
               .attr("fill", d => colors(d.factorType));
        factors.exit()
               .remove();
        var names = svg.selectAll(".names")
                       .data(selectedFactors)
        names.enter()
             .append("foreignObject")
             .attr("class", "names")
             .attr("text-anchor", "center")
             .attr("x", d => xScale(d.factorName) - 80)
             .attr("y", d => 315 - d.factorName.length * 0.25)
             .attr("width", 160)
             .attr("height", 160)
             .append("xhtml:div")
             .append("p")
             .text(d => d.factorName)
             .style("font-size", "15px")
             .merge(names)
             .transition()
             .delay(100)
             .attr("fill-opacity", 1)
             .attr("x", d => xScale(d.factorName) - 80)
             .attr("y", d => 315 - d.factorName.length * 0.3)
             .attr("width", 160)
             .attr("height", 160)
             .attr("stroke", "black")
             .text(d => d.factorName)
             .style("font-weight", "bold")
             .style("font-size", "15px")
             .style("color", "black")
        names.exit()
             .remove();
    }
    return {
        showFactor
    }
}