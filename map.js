export default map;

function map(factor){
    const spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": "A world map showing the death factor in color gradient corresponding to each country on the map",
        "width": 700,
        "height": 300,
          "data": {"url": "map.csv"},
          "params":[{"name": "year", 
                   "value": 1990,
                   "bind": {"input": "range",
                            "min": 1990,
                            "max": 2019,
                            "step": 1}}],
          "transform": [{
            "lookup": "id",
            "from": {
              "data": {
                "url": "https://raw.githubusercontent.com/bcviscourse/datasets/master/lab7-world-110m.json",
                "format": {
                  "type": "topojson",
                  "feature": "countries"
                }
              },
            "key": "id",
            "fields":["properties", "type", "geometry"]
            }},
          {"filter": "datum.Year==year"}
        ],
        "projection": { "type":"equirectangular"},
        "mark": "geoshape", 
        "encoding":{"color":{"field": `${factor}`, "type": "quantitative"},
                    "tooltip": [
                      {"type": "nominal", "field": "Code"},
                      {"field": `${factor}`, "type": "quantitative"}
      ]},
    }
    return spec;
}