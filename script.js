// 1-Choropleth map of endemic reef-forming coral species. 2020
// Load the CSV data
Plotly.d3.csv("Endemic reef-forming coral species, 2020.csv", cxcoralspecies_data => {

    // Function to unpack the data from the CSV file
    const unpack = (data, key) => data.map(row => row[key]);
    const location = unpack(coralspecies_data, 'Code');
    const coral_species = unpack(coralspecies_data, 'Reef-forming corals (total endemics)');
    const country = unpack(coralspecies_data, 'Entity');

    // Define the choropleth data
    var coralspecies_data = [{
        type: 'choropleth',
        locations: location,
        z: coral_species,
        text: country,
        colorscale: [
            [0, 'rgb(0, 88, 67)'],
            [0.2, 'rgb(33, 143, 83)'],
            [0.4, 'rgb(52, 187, 100)'],
            [0.6, 'rgb(103, 209, 125)'],
            [0.8, 'rgb(179, 230, 163)'],
            [0.95, 'rgb(239, 255, 227)'],
            [1, 'rgb(255, 255, 255)']
        ],
        autocolorscale: false,
        reversescale: true,
        zmin: 0,
        zmax: Math.max(...coral_species),
        hovertemplate: '%{text}<br>Reef-forming coral species: %{z}<extra></extra>',

        marker: {
            line: {
                color: '#7CAACD', // Set the line color for the map boundaries
                width: 0.4
            }
        },

        colorbar: {
            tickvals: [0, Math.max(...coral_species) / 3, Math.max(...coral_species)],
            ticktext: ['0', Math.max(...coral_species) / 3, Math.max(...coral_species)],
            title: 'Number of Coral Species',
            titlefont: { size: 14, family: "Raleway" },
            tickfont: { size: 12, family: "Raleway" },
            yanchor: 'top',
            y: 1, // Adjust the y position to control the distance between the chart and the colorbar
            len: 1,
            // bgcolor: '#2D4756',
            outlinewidth: 0,
            tickcolor: '#dddddd', // Set the color of colorbar tick labels
            ticklen: 7 // Adjust the length of colorbar tick lines
        }
    }];

    // Define the layout for the plot
    var coralspecies_layout = {
        margin: {
            l: 20,
            r: 30,
            t: 20,
            b: 10,
            pad: 0
        },
        geo: {
            showframe: false,
            showocean: true,
            oceancolor: '#2D4756',
            projection: {
                type: 'natural earth'
            }
        },
        // paper_bgcolor: '#2D4756',
        // plot_bgcolor: '#2D4756',
        annotations: [
            {
                xref: 'paper',
                yref: 'paper',
                x: 0.5,
                y: -0.15,
                xanchor: 'center',
                yanchor: 'top',
                text: 'Number of Coral Species',
                font: {
                    family: 'Raleway',
                    size: 14,
                    color: '#ffffff'
                },
                showarrow: true
            }
        ]
    };

    // Define the configuration for the plot
    var coralspecies_config = {
        responsive: true
    };
    
    // Create the plot
    Plotly.newPlot("choropleth", coralspecies_data, coralspecies_layout, coralspecies_config);
});



// 2-Bar chart of number of coral bleaching events, World
// Load the CSV data
Plotly.d3.csv("coral-bleaching-events.csv", global_data => {

    // Filter out entries with any value as -1
    global_data = global_data.filter(entry => !Object.values(entry).some(value => value === -1));

    // Function to unpack the data from the CSV file
    const unpack = (data, key) => data.map(row => row[key]);
    const global_x = unpack(global_data, 'Year');
    const moderate = unpack(global_data, 'Moderate');
    const severe = unpack(global_data, 'Severe');

    // Define the data
    var trace_moderate = {
        x: global_x,
        y: moderate,
        type: 'bar',
        name: 'Moderate bleaching events (1-30% bleached)',
        marker: {
            color: 'rgb(106, 214, 207)',
            line: {
                color: 'rgb(106, 214, 207)',
                width: 1.5
            }
        }
    };

    var trace_severe = {
        x: global_x,
        y: severe,
        type: 'bar',
        name: 'Severe bleaching events (>30% bleached)',
        marker: {
            color: 'rgb(255, 150, 143)',
            line: {
                color: 'rgb(255, 150, 143)',
                width: 1.5
            }
        }
    };

    // Define the data array
    var global_plot_data = [trace_moderate, trace_severe];

    // Define the layout
    var global_plot_layout = {
        // title: 'Occurrence and Trend of Global Coral Bleaching Events',
        barmode: 'stack',
        xaxis: {
            title: 'Year',
            titlefont: {
                color: '#ffffff'
            },
            tickangle: -45,
            tickfont: {
                color: '#ffffff'
            },
            showgrid: true,
            gridcolor: 'rgba(255, 255, 255, 0.2)',
            gridwidth: 1,
            zeroline: false,
            tickmode: 'array', // Set x-axis tick mode to 'array'
            tickvals: global_x, // Provide the complete array of x-axis tick values
            ticktext: global_x.map(year => year.toString()) // Use complete x-axis tick values
        },
        yaxis: {
            title: 'Number of Bleaching Events',
            titlefont: {
                color: '#ffffff'
            },
            tickfont: {
                color: '#ffffff'
            },

            showgrid: true,
            gridcolor: 'rgba(255, 255, 255, 0.2)',
            gridwidth: 1,
            zeroline: false
        },
        margin: {
            l: 40, // Decrease the left margin to maximize the width
            r: 30,
            t: 60,
            b: 120
        },
        autosize: true, // Allow the plot to autosize and fill the available space
        legend: {
            x: 0.5,
            y: 1.05,
            orientation: 'h',
            xanchor: 'center',
            yanchor: 'bottom',
            font: {
                color: '#ffffff'
            }
        },
        plot_bgcolor: 'rgba(0, 0, 0, 0)',
        paper_bgcolor: '#2d4756'
    };

    Plotly.newPlot('global_plot', global_plot_data, global_plot_layout);
});



// 3-Bar chart of number of coral bleaching events, Australasia
// Load the CSV data
Plotly.d3.csv("Coral bleaching events in australasia.csv", australasia_data => {
    australasia_data = australasia_data.filter(entry => !Object.values(entry).some(value => value === -1));

    // Function to unpack the data from the CSV file
    const unpack = (data, key) => data.map(row => row[key]);
    const australasia_x = unpack(australasia_data, 'Year');
    const moderate = unpack(australasia_data, 'Moderate');
    const severe = unpack(australasia_data, 'Severe');

    // Define traces for each bar
    var trace_moderate = {
        x: australasia_x,
        y: moderate,
        type: 'bar',
        name: 'Moderate bleaching events (1-30% bleached)',
        marker: {
            color: 'rgb(106, 214, 207)',
            line: {
                color: 'rgb(106, 214, 207)',
                width: 2.5
            }
        },
        legendgroup: 'group'
    };

    var trace_severe = {
        x: australasia_x,
        y: severe,
        type: 'bar',
        name: 'Severe bleaching events (>30% bleached)',
        marker: {
            color: 'rgb(255, 150, 143)',
            line: {
                color: 'rgb(255, 150, 143)',
                width: 2.5
            }
        },
        legendgroup: 'group'
    };

    // Define the data array
    var australasia_plot_data = [trace_moderate, trace_severe];

    // Define the layout
    var australasia_plot_layout = {
        // title: 'Occurrence and trend of coral bleaching events in Australasia',
        barmode: 'stack',
        xaxis: {
            title: 'Year',
            titlefont: {
                color: '#ffffff'
            },
            tickangle: -50, // Adjust x-axis tick angle
            tickfont: {
                color: '#ffffff'
            },
            showgrid: true,
            gridcolor: 'rgba(255, 255, 255, 0.2)',
            gridwidth: 1,
            zeroline: false,
            tickmode: 'array', // Set x-axis tick mode to 'array'
            tickvals: australasia_x, // Provide the complete array of x-axis tick values
            ticktext: australasia_x.map(year => year.toString()) // Use complete x-axis tick values
        },
        yaxis: {
            title: 'Number of Bleaching Events',
            titlefont: {
                color: '#ffffff'
            },
            tickfont: {
                color: '#ffffff'
            },
            showgrid: true,
            gridcolor: 'rgba(255, 255, 255, 0.2)',
            gridwidth: 1,
            zeroline: false,
            range: [0, 30]
        },
        margin: {
            l: 80,
            r: 30,
            t: 60,
            b: 120
        },
        legend: {
            x: 1, // Set legend position to the right
            y: 1, // Set legend position to the top
            orientation: 'v', // Set legend orientation to vertical
            xanchor: 'right',
            yanchor: 'top',
            font: {
                color: '#ffffff'
            }
        },
        height: 700,
        plot_bgcolor: 'rgba(0, 0, 0, 0)',
        paper_bgcolor: '#2d4756'
    };

    // Create the plot
    Plotly.newPlot('australasia_plot', australasia_plot_data, australasia_plot_layout);

});



// 4-Bar chart of number of coral bleaching events by stage of the enso cycle
// Load the CSV data
Plotly.d3.csv("Number of Coral Bleaching Events by Stage of the ENSO cycle.csv", enso_data => {
    // Filter out entries with any value as -1
    enso_data = enso_data.filter(entry => !Object.values(entry).some(value => value === -1));

    // Function to unpack the data from the CSV file
    const unpack = (data, key) => data.map(row => row[key]);
    const enso_x = unpack(enso_data, 'Year');
    const elNino = unpack(enso_data, 'El Nino Total');
    const laNina = unpack(enso_data, 'La Nina Total');
    const moderate = unpack(enso_data, 'Moderate Total');

    // Define traces for each bar
    var trace_elNino = {
        x: enso_x,
        y: elNino,
        type: 'bar',
        name: 'El Nino',
        marker: {
            color: 'rgb(106, 214, 207)',
            line: {
                color: 'rgb(106, 214, 207)',
                width: 2.5
            }
        }
    };

    var trace_laNina = {
        x: enso_x,
        y: laNina,
        type: 'bar',
        name: 'La Nina',
        marker: {
            color: 'rgb(255, 150, 143)',
            line: {
                color: 'rgb(255, 150, 143)',
                width: 2.5
            }
        }
    };

    var trace_moderate = {
        x: enso_x,
        y: moderate,
        type: 'bar',
        name: 'Moderate',
        marker: {
            color: 'rgb(179, 230, 163)',
            line: {
                color: 'rgb(179, 230, 163)',
                width: 2.5
            }
        }
    };

    // Define the data array
    var enso_plot_data = [trace_elNino, trace_laNina, trace_moderate];

    // Define the layout
    var enso_plot_layout = {
        barmode: 'stack',
        xaxis: {
            title: 'Year',
            titlefont: {
                color: '#ffffff'
            },
            tickangle: -50,
            tickfont: {
                color: '#ffffff'
            },
            showgrid: true,
            gridcolor: 'rgba(255, 255, 255, 0.2)',
            gridwidth: 1,
            zeroline: false,
            tickmode: 'array',
            tickvals: enso_x,
            ticktext: enso_x.map(year => year.toString())
        },
        yaxis: {
            title: 'Number of Bleaching Events',
            titlefont: {
                color: '#ffffff'
            },
            tickfont: {
                color: '#ffffff'
            },
            showgrid: true,
            gridcolor: 'rgba(255, 255, 255, 0.2)',
            gridwidth: 1,
            zeroline: false,
            range: [0, Math.max(...[...elNino, ...laNina, ...moderate])]
        },
        margin: {
            l: 80,
            r: 30,
            t: 60,
            b: 120
        },
        legend: {
            x: 1,
            y: 1,
            orientation: 'v',
            xanchor: 'right',
            yanchor: 'top',
            font: {
                color: '#ffffff'
            }
        },
        height: 700,
        plot_bgcolor: 'rgba(0, 0, 0, 0)',
        paper_bgcolor: '#2d4756'
    };

    // Create the plot
    Plotly.newPlot('enso_plot', enso_plot_data, enso_plot_layout);
});



// 5-Group bar chart of coral reef's contribution to the global economy
// Load the CSV data
Plotly.d3.csv("Coral Reef’s Contribution To The Global Economy.csv", economy_data => {
    economy_data = economy_data.filter(entry => !Object.values(entry).some(value => value === -1));

    // Function to unpack the data from the CSV file
    const unpack = (data, key) => data.map(row => row[key]);
    const economy_x = unpack(economy_data, 'Country');
    const Biodiversity = unpack(economy_data, 'Biodiversity value');
    const Tourism = unpack(economy_data, 'Tourism/recreation');
    const Coastal = unpack(economy_data, 'Coastal protection');
    const Fisheries = unpack(economy_data, 'Fisheries');

    // Define traces for each bar
    var trace_Biodiversity = {
        x: economy_x,
        y: Biodiversity,
        type: 'bar',
        name: 'Biodiversity value',
        marker: {
            color: 'rgb(106, 214, 207)',
            line: {
                color: 'rgb(106, 214, 207)',
                width: 1
            }
        },
        width: 0.2
    };

    var trace_Tourism = {
        x: economy_x,
        y: Tourism,
        type: 'bar',
        name: 'Tourism/recreation',
        marker: {
            color: 'rgb(255, 150, 143)',
            line: {
                color: 'rgb(255, 150, 143)',
                width: 1
            }
        },
        width: 0.2
    };

    var trace_Coastal = {
        x: economy_x,
        y: Coastal,
        type: 'bar',
        name: 'Coastal protection',
        marker: {
            color: 'rgb(179, 230, 163)',
            line: {
                color: 'rgb(179, 230, 163)',
                width: 1
            }
        },
        width: 0.2
    };

    var trace_Fisheries = {
        x: economy_x,
        y: Fisheries,
        type: 'bar',
        name: 'Fisheries',
        marker: {
            color: 'rgb(255, 204, 102)',
            line: {
                color: 'rgb(255, 204, 102)',
                width: 1
            }
        },
        width: 0.2
    };

    // Define the data array
    var economy_plot_data = [trace_Biodiversity, trace_Tourism, trace_Coastal, trace_Fisheries];

    // Define the layout
    var economy_plot_layout = {
        barmode: 'group', // Display each bar separately
        xaxis: {
            title: 'Regions',
            titlefont: {
                color: '#ffffff'
            },
            tickfont: {
                color: '#ffffff'
            },
            showgrid: true,
            gridcolor: 'rgba(255, 255, 255, 0.2)',
            gridwidth: 1,
            zeroline: false
        },
        yaxis: {
            title: 'Potential Net Benefit Streams pre year (in US$ million)',
            titlefont: {
                color: '#ffffff'
            },
            tickfont: {
                color: '#ffffff'
            },
            showgrid: true,
            gridcolor: 'rgba(255, 255, 255, 0.2)',
            gridwidth: 1,
            zeroline: false
        },
        margin: {
            l: 80,
            r: 30,
            t: 60,
            b: 120
        },
        legend: {
            x: 1,
            y: 1,
            orientation: 'h',
            xanchor: 'right',
            yanchor: 'top',
            font: {
                color: '#ffffff'
            }
        },
        plot_bgcolor: 'rgba(0, 0, 0, 0)',
        paper_bgcolor: '#2d4756'
    };

    // Create the plot
    Plotly.newPlot('economy_plot', economy_plot_data, economy_plot_layout);
});

