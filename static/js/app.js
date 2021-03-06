//Use D3 to read Json Data
d3.json("./static/js/data/samples.json").then((data) => {
  console.log(data)
  // get all the ids
  var names = data.names;
  // d3.select the select tag with id selDataset
  var dropdown = d3.select("#selDataset");
  names.forEach(id => dropdown.append("option").text(id));

  // build metadata
  var firstMetaData = data.metadata[0]
  Object.entries(firstMetaData).forEach(([key, value]) => {
      d3.select("#sample-metadata").append("h5").text(`${key} :  ${value}`)
  });

  // BAR CHART STARTS
  // sample_values as the values for the charts
  var sample_values = data.samples[0].sample_values
  var sample_values_10 = data.samples[0].sample_values.slice(0, 10).reverse()
  // otu_ids as the labels for the bar chart.
  var otu_ids = data.samples[0].otu_ids
  var otu_ids_10 = data.samples[0].otu_ids.slice(0, 10).reverse()
  // otu_labels as the hovertext for the chart.
  var otu_labels = data.samples.otu_labels
  var otu_labels_10 = data.samples[0].otu_labels.slice(0, 10).reverse()

  // horizontal bar chart to display the top 10 OTUs found in that individual.
  var barData = [{
      type: 'bar',
      x: sample_values_10,
      y: otu_ids_10.map(id => ("OTU" + id.toString())),
      text: otu_labels_10,
      orientation: 'h'
  }];

  var layout = {
      title: "Top 10 Operational Taxonomic Units (OTU) in Belly Button",
      xaxis: {
          title: {
              text: "Top 10 Sample Values"
          }
      },
      yaxis: {
          title: {
              text: "OTU IDs"
          }
      }
  };

  // Plot the chart
  Plotly.newPlot('bar', barData, layout);
  // BAR CHART ENDS

  // BUBBLE GRAPH STARTS
  // Create a bubble chart that displays each sample.
  var trace1 = {
      // otu_ids for the x values.
      x: otu_ids,
      // sample_values for the y values.
      y: sample_values,
      // otu_labels for the text values.
      text: otu_labels,
      mode: 'markers',
      marker: {
          // sample_values for the marker size.
          size: sample_values,
          // otu_ids for the marker colors.
          color: otu_ids
      }
  };

  var bubbleData = [trace1];

  var layout = {
      title: 'All Operational Taxonomic Units (OTU) in Belly Button',
      showlegend: false,
      height: 600,
      width: 600,
      xaxis: {
          title: {
              text: "OTU IDs"
          }
      },
      yaxis: {
          title: {
              text: "Bacteria Volume"
          }
      }
  };

  Plotly.newPlot('bubble', bubbleData, layout);
  // BUBBLE GRAPH ENDS

}); // end D3 to read Json Data


// FUNCTIONS TO UPDATE
function optionChanged(ID) {
  updateData(ID);
};


// UPDATES STARTS
function updateData(ID) {
  d3.json("./static/js/data/samples.json").then((data) => {
      // Update metadata
      var metaDataLength = data.metadata.length;
      var metaData = data.metadata;
      // updating demographic info
      for (var i = 0; i < metaDataLength; i++) {
          if (metaData[i].id.toString() === ID) {
              d3.select("#sample-metadata").html("")
              Object.entries(metaData[i]).forEach(([key, value]) => {
                  d3.select("#sample-metadata").append("h5").text(`${key} :  ${value}`)

                  // loop through new values
                  // sample_values as the values for the bar chart.
                  var sample_values = data.samples[i].sample_values
                  var sample_values_10 = data.samples[i].sample_values.slice(0, 10).reverse()
                  // otu_ids as the labels for the bar chart.
                  var otu_ids = data.samples[i].otu_ids
                  var otu_ids_10 = data.samples[i].otu_ids.slice(0, 10).reverse()
                  // otu_labels as the hovertext for the chart.
                  var otu_labels = data.samples[i].otu_labels
                  var otu_labels_10 = data.samples[i].otu_labels.slice(0, 10).reverse()

                  // UPDATE BAR CHART STARTS
                  // horizontal bar chart to display the top 10 OTUs found in that individual.
                  var barData = [{
                      type: 'bar',
                      x: sample_values_10,
                      y: otu_ids_10.map(id => ("OTU" + id.toString())),
                      text: otu_labels_10,
                      orientation: 'h'
                  }];

                  var layout = {
                      title: "Top 10 Operational Taxonomic Units (OTU) in Belly Button",
                      xaxis: {
                          title: {
                              text: "Top 10 Sample Values"
                          }
                      },
                      yaxis: {
                          title: {
                              text: "OTU IDs"
                          }
                      }
                  };

                  // Plot the chart
                  Plotly.newPlot('bar', barData, layout);
                  // UPDATE BAR CHART ENDS

                  // UPDATE BUBBLE CHART STARTS
                  // Create a bubble chart that displays each sample.
                  var trace1 = {
                      // otu_ids for the x values.
                      x: otu_ids,
                      // sample_values for the y values.
                      y: sample_values,
                      // otu_labels for the text values.
                      text: otu_labels,
                      mode: 'markers',
                      marker: {
                          // sample_values for the marker size.
                          size: sample_values,
                          // otu_ids for the marker colors.
                          color: otu_ids
                      }
                  };

                  var bubbleData = [trace1];

                  var layout = {
                      title: 'All Operational Taxonomic Units (OTU) in Belly Button',
                      showlegend: false,
                      height: 600,
                      width: 600,
                      xaxis: {
                          title: {
                              text: "OTU IDs"
                          }
                      },
                      yaxis: {
                          title: {
                              text: "Bacteria Volume"
                          }
                      }
                  };
                  
                  // Plot the chart
                  Plotly.newPlot('bubble', bubbleData, layout);
                  // UPDATE BUBBLE CHART ENDS

              });
          };
      };
  });
};