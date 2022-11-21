export default line;

function line(factor){
    const spec = {"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
                  "data": {"name": "myData"},
                  "mark": {"type": "line", "point": true},
                  "encoding": {"x": {"field": "Year", "type": "quantitative", "scale": {"zero": false}},
                               "y": {"field": `${factor}`, "type": "quantitative", "scale": {"zero": false}},
                               "order": {"field": "Year"}},
                  "width": 500,
                  "height": 300}
    return spec;
}