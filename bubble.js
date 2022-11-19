export default bubble;

function bubble(data, container){
    // initialization
    const margin = ({top: 30, right: 50, bottom: 75, left: 50});
    const width = 1400 - margin.left - margin.right,
          height = 650 - margin.top - margin.bottom;
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
         .on("click", (e, d) => showFactor(d))
         .merge(types)
         .transition()
         .delay(1000)
         .attr("cx", d => xScale(d))
         .attr("cy", 75)
         .attr("r", 100)
         .attr("fill", d => colors(d));
    var wrap = d3.textwrap()
                 .bounds({height: 50, width: 50});
    var labels = svg.selectAll("text")
         .data(factorType)
         .call(wrap)
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
        //let adjustment = 9 - selectedFactors.length;
        //console.log("lower range bound", 100 + width / adjustment);
        xScale.domain(selectedFactors.map(d => d.factorName))
              //.rangeRound([100 + width / adjustment, 100 + width * (adjustment - 1) / adjustment]);
              .rangeRound([75 + width / 2 - selectedFactors.length * 90, 75 + width / 2 + selectedFactors.length * 90])
        var factors = svg.selectAll(".factors")
                         .data(selectedFactors)
        console.log("selectedFactor", xScale(selectedFactors.factorName))
        factors.enter()
               .append("circle")
               .attr("class", "factors")
               .attr("cx", width / 2)
               .attr("cy", 300)
               .attr("r", 90)
               .attr("fill", d => colors(d.factorType))
               .on("mouseover", function() {d3.select(this)
                                              .attr("opacity", 0.75)})
               .on("mouseout", function() {d3.select(this)
                                             .attr("opacity", 1)})
               .on("click", (e, d) => console.log(d.factorName))
               .merge(factors)
               .transition()
               .delay(100)
               .attr("cx", d => xScale(d.factorName))
               .attr("cy", 300)
               .attr("r", 90)
               .attr("fill", d => colors(d.factorType));
        factors.exit()
               .remove();
        
        var names = svg.selectAll(".names")
                       .data(selectedFactors)
        names.enter()
             .append("text")
             .attr("class", "names")
             .attr("text-anchor", "middle")
             .attr("fill-opacity", 0)
             .attr("dx", d => xScale(d.factorName))
             .attr("dy", 310)
             .style("font-size", "8px")
             .merge(names)
             .transition()
             .delay(100)
             .attr("fill-opacity", 1)
             .attr("dx", d => xScale(d.factorName))
             .attr("dy", 310)
             .text(d => d.factorName)
             .style("font-weight", "bold")
             //.style("margin", "2px")
             //.style("font-size", "10px");
        names.exit()
             .remove();
    }
}