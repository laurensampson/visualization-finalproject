export default bar;

function bar(factor, country){
   const spec =  {"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
                    "data": {"name": "myData", "url": "Number of Deaths by Risk Factors.csv"},
                    "transform": [{"filter": {"field": "Entity", "equal": `${country}`}}],
                    "mark": {"type": "bar"},
                    "encoding": {"x": {"field": "Year", "type": "temporal", "scale": {"zero": false}},
                               "y": {"field": `${factor}`, "type": "quantitative", "scale": {"zero": false}, "title": "Death (people)"},
                               "order": {"field": "Year"}},
                    "width": 600,
                    "height": 400}
    return spec;
  }