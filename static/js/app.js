function createCharts(dataset){
    d3.json("../../samples.json").then((data) => {
        for (var i = 0; i < data.samples.length; i++){

            if (parseInt(data.samples[i].id) == dataset){

                var otu_ids = data.samples[i].otu_ids.slice(0, 10).reverse();


                for (id in otu_ids) {
                    id = toString(id);
                };

                var trace1 = {
                    x: data.samples[i].sample_values.slice(0, 10).reverse(),
                    y: otu_ids.map(id => "OTU " + id),
                    text: data.samples[i].otu_labels.slice(0, 10).reverse(),
                    type: "bar",
                    orientation: "h"
                };

                var trace2 = {
                    x: data.samples[i].otu_ids,
                    y: data.samples[i].sample_values,
                        mode: "markers",
                        marker: {
                            size: data.samples[i].sample_values,
                            color: data.samples[i].otu_ids
                        },
                        text: data.samples[i].otu_labels
                    };
                };
        
                chartData1 = [trace1];
                chartData2 = [trace2];
                layout = {};

                Plotly.newPlot("bar", chartData1, layout, {responsive: true});
                Plotly.newPlot("bubble", chartData2, layout, {responsive: true});
        };
    })
}

function createDemoInfo(dataset){
    d3.json("../../samples.json").then((data) => {
        for (var i = 0; i < data.samples.length; i++){

            if (parseInt(data.metadata[i].id) == dataset){
                d3.select(".id").text("id: " + data.metadata[i].id);
                d3.select(".ethnicity").text("ethnicity: " + data.metadata[i].ethnicity);
                d3.select(".gender").text("gender: " + data.metadata[i].gender);
                d3.select(".age").text("age: " + data.metadata[i].age);
                d3.select(".location").text("location: " + data.metadata[i].location);
                d3.select(".bbtype").text("bbtype: " + data.metadata[i].bbtype);
                d3.select(".wfreq").text("wfreq: " + data.metadata[i].wfreq);
            };
        };
    })
}

function optionChanged(dataset){
    d3.json("../../samples.json").then((data) => {
        for (var i = 0; i < data.samples.length; i++){

            if (parseInt(data.samples[i].id) == dataset){

                var otu_ids = data.samples[i].otu_ids.slice(0, 10).reverse();


                for (id in otu_ids) {
                    id = toString(id);
                };

                var update1 = {
                    x: data.samples[i].sample_values.slice(0, 10).reverse(),
                    y: otu_ids.map(id => "OTU " + id),
                    text: data.samples[i].otu_labels.slice(0, 10).reverse(),
                };
            
                var update2 = {
                    x: data.samples[i].otu_ids,
                    y: data.samples[i].sample_values,
                    marker: {
                        size: data.samples[i].sample_values,
                        color: data.samples[i].otu_ids
                    },
                    text: data.samples[i].otu_labels
                };

                createDemoInfo(dataset);
                Plotly.restyle("bar", update1);
                Plotly.restyle("bubble", update2);
            };
        };
    })
}

function init() {

    d3.json("../../samples.json").then((data) => {
        
        var dropdownMenu = d3.select("#selDataset");
    
        dropdownMenu.selectAll("option")
                     .data(data.names)
                     .enter().append("option")
                     .attr("value", ((d) => {d}))
                     .text(function(d){return d});
        
        var dataset = dropdownMenu.property("value");

        createCharts(dataset);
        createDemoInfo(dataset);
    });
}

init();


