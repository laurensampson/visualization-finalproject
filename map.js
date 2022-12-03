export default map;

function map(factor){
    const spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": "A world map showing the death factor in color gradient corresponding to each country on the map",
        //"width": 1400,
        //"height": 500,
        "data": {"url": "map.csv"},
        "params":[{"name": "year", 
                  "value": 1990,
                  "bind": {"input": "range",
                          "min": 1990,
                          "max": 2019,
                          "step": 1}},
                  {
                    "name": "invalidCode",
                    "value": "M"
                  }],
        "vconcat": [{
          "width": 800,
          "height": 400,
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
          {"filter": "datum.Year==year"},
          ],
          "projection": { "type":"equirectangular"},
          "mark": "geoshape", 
          "encoding":{"color":{"field": `${factor}`, "type": "quantitative"},
                      "tooltip": [
                        {"type": "nominal", "field": "Code"},
                        {"field": `${factor}`, "type": "quantitative"}]}},
          {
            "width": 800,
            "height": 200,
            "transform": [
              {"filter": "datum.Year==year"},
              {"filter": "datum.id!=0"},
              {"calculate": `datum['${factor}'] * 1`, "as": "Deaths"},
              {
                "window": [{
                  "op": "count",
                  "as": "count"
                }],
                "sort": [{"type": "quantitative", "field": `Deaths`, "order": "descending" }]
              },
              {"filter": "datum.count <=10"}
            ],
            "mark": "bar",
            "encoding": {
              "x": {
                  "field": "Code",
                  "type": "nominal",
                  "title": "Country",
                  "sort": {"field": `${factor}`, "order":"descending"}
              },
              "y": {
                  "field": `Deaths`,
                  "type": "quantitative"
                  //"sort": null
              }
          }}]}

          
    return spec;
}