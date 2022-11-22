export default scatter;

function scatter(factor, compare){
   const spec =  {
                "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
                "description": "A scatterplot showing correlation between two death factors",
                "width": 600,
                "height": 400,
                "data": {"url": "Number of Deaths by Risk Factors.csv"},
                "mark": "point",
                "encoding": {
                "x": {"field": `${factor}`, "type": "quantitative", "scale": {"zero": false}},
                "y": {"field": `${compare}`, "type": "quantitative"}
                }
            }
  
    return spec;
  }