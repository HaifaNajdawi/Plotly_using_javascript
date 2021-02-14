json_path = "../../../data/samples.json"


d3.json(json_path).then(function (data) {
    console.log("data", data);
});

// Promise Pending
const dataPromise = d3.json(json_path);
console.log("Data Promise: ", dataPromise);

// Returns an array of values
function unpack(rows, index) {
    return rows.map(function (row) {
        return row[index];
    });
}
listId = d3.selectAll("#selDataset")

listId.on("click", function getData() {
    let optionList = document.getElementById('selDataset').options;

    d3.json(json_path).then(function (data) {
        sample = data.samples
        console.log("samples", sample)
        sample.forEach(value => optionList.add(new Option(value.id)) )

        

    })

})

