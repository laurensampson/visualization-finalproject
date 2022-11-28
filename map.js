export default map;

function map(factor){
    const spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": "A world map showing the death factor in color gradient corresponding to each country on the map",
        "width": 700,
        "height": 300,
        "data": {
            "url": "data/world-10m.json",
            "format": {
              "type": "topojson",
              "feature": "countries"
            }
          },
          "transform": [{
            "lookup": "id",
            "from": {
              "data": {
                "url": "Number of Deaths by Risk Factors.csv"
              },
              "key": "Entity",
              "fields": ["Outdoor air pollution"]
            }
          }],
        "projection": { "type":"equirectangular"},
        "data": {"name": "myData", "url": "Number of Deaths by Risk Factors.csv"},
        "mark": {"type": "geoshape", "tooltip": {"content": "data"}},
        "encoding":{"color":{"field": `${factor}`, "type": "quantitative"}},
    "tooltip": [
        {"field": "Entity", "type": "nominal"},
        {"field": `${factor}`, "type": "quantitative", "scale": {"zero": false}}
      ],
    }
    return spec;
}