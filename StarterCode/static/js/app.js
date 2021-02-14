json_path="../../../data/samples.json"


d3.json(json_path).then(function(data) {
    console.log(data);
  });
  
  // Promise Pending
  const dataPromise = d3.json(json_path);
  console.log("Data Promise: ", dataPromise);
  
