json_path = "../../../data/samples.json"

function init() {
    data = [{
        // values
        x: [5, 6, 7, 8],
        // labels
        y: ["A", "B", "C", "D"],
        // texthover
        text: ['A', 'B', 'C', 'D'],
        type: "bar",
        orientation: "h",
        marker: {
            color: 'rgb(142,124,195)'
          }
    }];
    layout={
        title:"Top 10 OTUs found for id"
    }

    Plotly.newPlot("bar", data,layout);
};



d3.json(json_path).then(function (data) {
    console.log("data", data);
});

// Promise Pending
const dataPromise = d3.json(json_path);
console.log("Data Promise: ", dataPromise);

// select id that will work on it 
listId = d3.selectAll("#selDataset")

listId.on("click", function getData() {
    // option list to push values to it 
    let optionList = document.getElementById('selDataset').options;

    d3.json(json_path).then(function (data) {
        // samples key in json
        sample = data.samples

        // loop through and add the id to option 
        sample.forEach(value => optionList.add(new Option(value.id)));

    });

});

d3.selectAll("body").on("change", updatePage);
// bar chart data 
function updatePage() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.selectAll("#selDataset").node();
    // Assign the dropdown menu option to a variable
    var selectedOption = dropdownMenu.value;
    console.log(selectedOption);
    // filter data from the user 
    otuIdsFilter = sample.filter(row => row.id === selectedOption)[0];

    // label chart and convert it to string 
    arrayOtu = otuIdsFilter.otu_ids;
    y = arrayOtu.slice(0, 10).map(yy=>"OTU "+ yy.toString()+"  ").reverse();

    // values in x asis 
    arraySample = otuIdsFilter.sample_values;
    x = arraySample.slice(0, 10).reverse();

    // texthover 
    arrayText = otuIdsFilter.otu_labels;
    text = arrayText.slice(0, 10).reverse();

    // update the plot data 
    Plotly.restyle("bar", "x", [x]);
    Plotly.restyle("bar", "y", [y]);
    Plotly.restyle("bar", "text", [text]);

    console.log("y",y)

};
init();



