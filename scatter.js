export default scatter;

function scatter(factor){
   const spec =  {
                "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
                "description": "A scatterplot showing correlation between two death factors",
                "params": [{"name": "selectedRegion",
                            "select": {"type": "point", "fields": ["Region"]},
                            "bind": {
                              "input": "select",
                              "name": "Region",
                              "options": [null, "Africa", "Americas", "Asia", "Europe", "Oceania"], 
                              "labels": ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"]}}],
                "width": 800,
                "height": 400,
                "data": {"url": "./Assets/Data/scatter.csv"},
                "mark": "point",
                "transform": [{"calculate": `datum['${factor}'] / datum.Population * 100`, "as": "Deaths Rate (%)"}],
                "encoding": {
                "x": {"field": "Deaths Rate (%)", "type": "quantitative", "scale": {"zero": false}},
                "y": {"field": "GDP per Capita (USD)", "type": "quantitative"},
                "color": {"condition": {"param": "selectedRegion",
                                        "field": "Region",
                                        "type": "nominal",
                                        "scale": {"scheme": "category10"}},
                          "value": "#BDBDBD"
                },
                "tooltip": {"type": "nominal", "field": "Entity"},
                }
            }
  
    return spec;
  }
