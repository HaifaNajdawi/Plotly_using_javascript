json_path = "../../../data/samples.json"

function init() {
    data = [{
        x: [5, 6, 7, 8],
        y: ["A", "B", "C", "D"],
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
}



d3.json(json_path).then(function (data) {
    console.log("data", data);
});

// Promise Pending
const dataPromise = d3.json(json_path);
console.log("Data Promise: ", dataPromise);

listId = d3.selectAll("#selDataset")

listId.on("click", function getData() {
    let optionList = document.getElementById('selDataset').options;

    d3.json(json_path).then(function (data) {
        sample = data.samples
        id = sample.forEach(value => optionList.add(new Option(value.id)));


    });

});

d3.selectAll("body").on("change", updatePage);

function updatePage() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.selectAll("#selDataset").node();
    // Assign the dropdown menu option to a variable
    var selectedOption = dropdownMenu.value;
    console.log(selectedOption);
    otuIdsFilter = sample.filter(row => row.id === selectedOption)[0]

    arrayOtu = otuIdsFilter.otu_ids;
    y = arrayOtu.slice(0, 10).map(yy=>yy.toString()+" OTU").reverse()

    arraySample = otuIdsFilter.sample_values;
    x = arraySample.slice(0, 10).reverse()

    arrayText = otuIdsFilter.otu_labels
    text = arrayText.slice(0, 10).reverse()

    Plotly.restyle("bar", "x", [x]);
    Plotly.restyle("bar", "y", [y]);
    Plotly.restyle("bar", "text", [text]);

    console.log("y",y)



}
init()



