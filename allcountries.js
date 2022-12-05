export default allcountries;

function allcountries(factor){
const spec = {"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
              "data": {"name": "myData", "url": "./Assets/Data/Number of Deaths by Risk Factors.csv"},
              "mark": {"type": "bar"},
              "encoding": {"x": {"field": "Entity", "type": "nominal", "title": "Country"},
                        "y": {"field": `${factor}`, "type": "quantitative", "scale": {"zero": false}},
                        "config": {
                            "axis": {"grid": true, "tickBand": "extent"}},
                        "tooltip": [
                            {"field": "Year", "type": "quantitative"},
                            {"field": "Entity", "type": "nominal"}
                        ]},
              "width": 1500,
              "height": 500
}
return spec;
}