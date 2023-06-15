function displayPlot() {
    tablePlot();
    networkPlot();
    mapPlot();
    wordsPlot();
}

let tablePlot = function() {
    
    var margin = {top: 30, bottom: 40, left: 60, right: 10};
    var width = 1300 - margin.left - margin.right;
    var height = 2000 - margin.top - margin.bottom;

    var svg = d3.select("#table_plot")
        .append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    d3.csv("./processed_dataset/win_counts.csv").then(function(data) {
        const keys = data.columns.slice(1);
        
        const stackedData = d3.stack().keys(keys)(data);

        const xScale = d3.scaleLinear()
            .domain([0, d3.max(stackedData, d => d3.max(d, d => d[1]))])
            .range([0, width]);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale));

        
        const yScale = d3.scaleBand()
            .domain(data.map(d => d.year))
            .range([height, 0])
            .padding(0.5);

        svg.append("g").call(d3.axisLeft(yScale));

        const color = d3.scaleSequential()
            .domain([0, keys.length])
            .interpolator(d3.interpolateTurbo);

        var tooltip = d3.select("#table_plot")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)
            .style("background-color", "transparent")
            .style("color", "white")
            .style("border", "solid")
            .style("border-width", "1px")
            .style("border-radius", "10px")
            .style("padding", "5px");

        var mouseover = function(event, d) {
            var subgroupName = d3.select(event.currentTarget.parentNode).datum().key;
            var subgroupVal = d[1] - d[0];
            d3.selectAll(".myRect").style("opacity", 0.2);
            d3.selectAll("."+subgroupName).style("opacity", 1);
            tooltip.html("Country: " + subgroupName + "<br>" + "Value: " + subgroupVal)
                .style("position", "absolute")
                .style("opacity", 1)
        }

        var mousemove = function(event) {
            tooltip
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 10) + "px")};

        var mouseleave = function(d) {
            d3.selectAll(".myRect").style("opacity", 1);
            tooltip.style("opacity", 0);
        }

        svg.append("g")
            .selectAll("g")
            .data(stackedData)
            .enter()
            .append("g")
            .attr("fill", function(d, i) {return color(i);})
            .attr("class", function(d) { return "myRect " + d.key })
            .selectAll("rect")
            .data(function(d) { return d; })
            .enter().append("rect")
            .attr("x", function(d) { return xScale(d[0]); })
            .attr("y", function(d) { return yScale(d.data.year); })
            .attr("width", function(d) { return xScale(d[1]) - xScale(d[0]); })
            .attr("height", yScale.bandwidth())
            .attr("stroke", "grey")
            .attr("stroke-width", 0.5)
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave);

        const legend = d3.select("#legend1");
        keys.forEach(function (country, i) {
            let legendRow = legend.append("div").attr("class", "legendRow");

            legendRow.append("div")
                .attr("class", "legendColor")
                .style("background", color(i))
                .style("display", "inline-block")
                .style("width", "10px")
                .style("height", "10px")
                .style("margin-right", "5px");

            legendRow.append("span")
                .attr("class", "legendText")
                .style("padding-left", "5px")
                .style("font-size", "12px")
                .text(country);
        });
    });
        
    svg.append("text")
        .attr("x", width/2)
        .attr("y", height + margin.bottom)
        .attr("text-anchor", "middle")
        .style("font-weight", "bold")
        .style("font-size", "18px")
        .style("fill", "white")
        .style("font-family", "Avenir, sans-serif")
        .text("Number of Wins");
        
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -margin.left+15)
        .attr("text-anchor", "middle")
        .style("font-weight", "bold")
        .style("font-size", "18px")
        .style("font-family", "Avenir, sans-serif")
        .style("fill", "white")
        .text("Year");
    
    svg.append("text")
        .attr("class", "plot-title")
        .attr("x", width / 2)
        .attr("y", 0)
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .style("font-size", "24px")
        .style("fill", "white")
        .style("font-family", "Avenir, sans-serif")
        .text("Historical Football Wins by Country");

}

let neutralPlot = function() {
    
    var margin = {top: 30, bottom: 40, left: 60, right: 10};
    var width = 1300 - margin.left - margin.right;
    var height = 2000 - margin.top - margin.bottom;

    var svg = d3.select("#neutral_plot")
        .append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    d3.csv("neutral_counts.csv").then(function(data) {
        const keys = data.columns.slice(1);
        
        const stackedData = d3.stack().keys(keys)(data);

        const xScale = d3.scaleLinear()
            .domain([0, d3.max(stackedData, d => d3.max(d, d => d[1]))])
            .range([0, width]);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale));

        
        const yScale = d3.scaleBand()
            .domain(data.map(d => d.year))
            .range([height, 0])
            .padding(0.5);

        svg.append("g").call(d3.axisLeft(yScale));

        const color = d3.scaleSequential()
            .domain([0, keys.length])
            .interpolator(d3.interpolateTurbo);

        var tooltip = d3.select("#table_plot")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)
            .style("background-color", "transparent")
            .style("color", "white")
            .style("border", "solid")
            .style("border-width", "1px")
            .style("border-radius", "10px")
            .style("padding", "5px");

        var mouseover = function(event, d) {
            var subgroupName = d3.select(event.currentTarget.parentNode).datum().key;
            var subgroupVal = d[1] - d[0];
            d3.selectAll(".myRect").style("opacity", 0.2);
            d3.selectAll("."+subgroupName).style("opacity", 1);
            tooltip.html("Country: " + subgroupName + "<br>" + "Value: " + subgroupVal)
                .style("position", "absolute")
                .style("opacity", 1)
        }

        var mousemove = function(event) {
            tooltip
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 10) + "px")};

        var mouseleave = function(d) {
            d3.selectAll(".myRect").style("opacity", 1);
            tooltip.style("opacity", 0);
        }

        svg.append("g")
            .selectAll("g")
            .data(stackedData)
            .enter()
            .append("g")
            .attr("fill", function(d, i) {return color(i);})
            .attr("class", function(d) { return "myRect " + d.key })
            .selectAll("rect")
            .data(function(d) { return d; })
            .enter().append("rect")
            .attr("x", function(d) { return xScale(d[0]); })
            .attr("y", function(d) { return yScale(d.data.year); })
            .attr("width", function(d) { return xScale(d[1]) - xScale(d[0]); })
            .attr("height", yScale.bandwidth())
            .attr("stroke", "grey")
            .attr("stroke-width", 0.5)
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave);

        const legend = d3.select("#legend1");
        keys.forEach(function (country, i) {
            let legendRow = legend.append("div").attr("class", "legendRow");

            legendRow.append("div")
                .attr("class", "legendColor")
                .style("background", color(i))
                .style("display", "inline-block")
                .style("width", "10px")
                .style("height", "10px")
                .style("margin-right", "5px");

            legendRow.append("span")
                .attr("class", "legendText")
                .style("padding-left", "5px")
                .style("font-size", "12px")
                .text(country);
        });
    });
        
    svg.append("text")
        .attr("x", width/2)
        .attr("y", height + margin.bottom)
        .attr("text-anchor", "middle")
        .style("font-weight", "bold")
        .style("font-size", "18px")
        .style("fill", "white")
        .style("font-family", "Avenir, sans-serif")
        .text("Number of Neutrals");
        
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -margin.left+15)
        .attr("text-anchor", "middle")
        .style("font-weight", "bold")
        .style("font-size", "18px")
        .style("font-family", "Avenir, sans-serif")
        .style("fill", "white")
        .text("Year");
    
    svg.append("text")
        .attr("class", "plot-title")
        .attr("x", width / 2)
        .attr("y", 0)
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .style("font-size", "24px")
        .style("fill", "white")
        .style("font-family", "Avenir, sans-serif")
        .text("Historical Football Neutrals by Country");

}

let networkPlot = function() {
   d3.json('./processed_dataset/networkData.json').then(function (graph) {
        let width = 1000;
        let height = 1200;

        const marginTop = 30;

        const svg = d3.select('#network_plot')
            .append('svg')
            .attr("width", width)
            .attr("height", height+marginTop);


        let force = simulation = d3.forceSimulation(graph.nodes)
            .force("link", d3.forceLink(graph.links).id(d => d.id).distance(70))
            .force("charge", d3.forceManyBody().strength(-400))
            .force("center", d3.forceCenter(width / 2, height / 2.5));

        const thicknessScale = d3.scaleLinear()
            .domain([0, d3.max(graph.links, d => d.value)])
            .range([1, 20]);
        

        const edges = svg.selectAll("line")
            .data(graph.links)
            .enter()
            .append("line")
            .attr("stroke", "#4753c0")
            .attr("stroke-width", d => thicknessScale(d.value));

        function handleMouseOver(event, d) {
            d3.select(event.currentTarget).attr("fill", "#05F3FF");
        
            var key =  d3.select(event.currentTarget.parentNode).datum().id;
    
            const connectedNodes = graph.links.filter(link => link.source.id === key);
            const connectedNodeIds = connectedNodes.flatMap(link => [link.target.id]);
            const connectedLinks = connectedNodes.flatMap(link => [link.source.id, link.target.id]);

            nodes.filter(node => connectedNodeIds.includes(node.id)).attr("fill", "gold");
            edges.filter(edge => connectedLinks.includes(edge.source.id) && connectedLinks.includes(edge.target.id)).attr("stroke", "#bee2d5");
        
            nodes.filter(node => !connectedNodeIds.includes(node.id)).style("opacity", 0.5);
            edges.filter(edge => !connectedLinks.includes(edge.source.id) && !connectedLinks.includes(edge.target.id)).style("opacity", 0.1);
        }
        
        function handleMouseOut(d) {
            d3.select(this).attr("fill", "#29bf12ad");
        
            nodes.attr("fill", "#29bf12ad").style("opacity", 1);
            edges.attr("stroke", "#4753c0").style("opacity", 1);
        }

        const nodes = svg.selectAll("circle")
            .data(graph.nodes)
            .enter()
            .append("g")
            .append("circle")
            .attr("r", 10)
            .attr("fill", "#29bf12ad")
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut);
        
        const labels = svg.selectAll("text")
            .data(graph.nodes)
            .enter()
            .append("text")
            .text(d => d.name)
            .attr("dx", -2)
            .attr("dy", 0)
            .style("font-size", "10px")
            .style("fill", "white");

        force.on("tick", () => {
            edges.attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
            
            nodes.attr("cx", d => d.x)
                .attr("cy", d => d.y);
            
            labels.attr("x", d => d.x)
                .attr("y", d => d.y);
        });

        svg.append("text")
            .attr("class", "plot-title")
            .attr("x", width / 2)
            .attr("y", 30)
            .style("text-anchor", "middle")
            .style("font-weight", "bold")
            .style("font-size", "24px")
            .style("fill", "white")
            .text("Network of Team Matches");
   })
}

let mapPlot = function () {

    var margin = {top: 50};
    var width = 850;
    var height = 400 - margin.top;

    
    const geojsonUrl = 'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson';

    Promise.all([d3.json(geojsonUrl), d3.csv("./processed_dataset/host_counts.csv")]).then(function([geojson, hostCounts]) {
        const hostCountsByCountry = {};
        hostCounts.forEach(d => {
            hostCountsByCountry[d.country] = +d.count;
        });

        var svg = d3.select("#map_plot")
            .append("svg")
            .attr("width", width)
            .attr("height", height + margin.top);

        var path = d3.geoPath();
        var projection = d3.geoNaturalEarth1()
            .scale(width / 2 / Math.PI)
            .translate([width / 2, height/1.6]);

        const colorScale = d3.scaleSequential(d3.interpolateBlues).domain([0, d3.max(hostCounts, d => +d.count)]);
   
        var tooltip = d3.select("#map_plot")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)
            .style("background-color", "lightgreen")
            .style("color", "black")
            .style("font-size", "14px")
            .style("border", "solid")
            .style("border-width", "1px")
            .style("border-radius", "10px")
            .style("padding", "5px");

        var mouseover = function(event, d) {
            const count = hostCountsByCountry[d.properties.name] || "N/A";

            tooltip.html(`<strong>Country:</strong> ${d.properties.name}<br><strong>Host Count:</strong> ${count}`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 10) + "px")
                .style("position", "absolute")
                .style("opacity", 1)
        }

        var mouseleave = function(d) {
            tooltip.style("opacity", 0);
        }

        svg.append("text")
               .attr("x", width/2)
               .attr("y", 20)
               .attr("text-anchor", "middle")
               .style("font-size", "24px")
               .style("fill", "white")
               .text("Host Counts by Country");

        svg.selectAll("path")
            .data(geojson.features)
            .enter()
            .append("path")
            .attr("d", d3.geoPath().projection(projection))
            .attr("fill", d => {
                const count = hostCountsByCountry[d.properties.name] || 0;
                return colorScale(count);
            })
            .on("mouseover", mouseover)
            .on("mouseleave", mouseleave);
        
            const legendWidth = 150;
            const legendHeight = 15;
            const legendX = 650;
            const legendY = 5;

            const gradient = svg.append("defs")
              .append("linearGradient")
              .attr("id", "gradient");

            gradient.selectAll("stop")
              .data(d3.range(0, 1.1, 0.1))
              .enter()
              .append("stop")
              .attr("offset", d => d)
              .attr("stop-color", d => colorScale(d * d3.max(hostCounts, d => +d.count)));

            svg.append("rect")
              .attr("x", legendX)
              .attr("y", legendY)
              .attr("width", legendWidth)
              .attr("height", legendHeight)
              .style("fill", "url(#gradient)");

            const legendScale = d3.scaleLinear()
              .domain([0, d3.max(hostCounts, d => +d.count)])
              .range([legendX, legendX + legendWidth]);

            const legendAxis = d3.axisBottom(legendScale).ticks(5);

            svg.append("g")
              .attr("transform", `translate(0, ${legendY + legendHeight})`)
              .call(legendAxis);
    });
}

let wordsPlot = function() {
    d3.json("./processed_dataset/goalscorers.json").then(function(data) {
        var myWords = data.map(function(d) {
            return {word:d.scorer, size: d.time};
        });

        var margin = {top: 60, right: 10, bottom: 10, left: 10};
        var width = 1100 - margin.left - margin.right;
        var height = 860 - margin.top - margin.bottom;

        var svg = d3.select("#word_cloud")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        svg.append("text")
            .attr("x", width/2)
            .attr("y", -40)
            .attr("text-anchor", "middle")
            .style("font-weight", "bold")
            .style("font-size", "24px")
            .style("fill", "white")
            .text("Masters of the Scoreboard");

        var layout = d3.layout
            .cloud()
            .size([width, height])
            .words(myWords)
            .padding(5)
            .rotate(function() {
                return ~~(Math.random() * 2) * 90;
            })
            .fontSize(function (d) {
                return d.size;
            })
            .on("end", draw);

        layout.start();

        var tooltip = d3.select("#word_cloud")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        function draw(words) {
            svg.append("g")
                .attr("transform", "translate(" + layout.size()[0] / 2 +"," + layout.size()[1] / 2 +")")
                .selectAll("text")
                .data(words)
                .enter()
                .append("text")
                .style("font-size", function (d) {return d.size;})
                .style("fill", function (){
                    var hue = Math.floor(Math.random() * 360);
                    return "hsl(" + hue + ", 70%, 50%)";
                })
                .attr("text-anchor", "middle")
                .style("font-family", "'Avenir', sans-serif")
                .attr("transform", function (d) {
                    return ("translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")");
                })
                .text(function (d) {return d.word;})
                .on("mouseover", function (event, d) {
                    tooltip.transition().duration(200).style("opacity", 0.9);
                    console.log(d.word + d.size);
                    tooltip
                        .html(d.word + ": " + d.size + " time(s)")
                        .style("left", event.pageX + "px")
                        .style("top", event.pageY + "px");
                })
                .on("mousemove", function (event) {
                    tooltip
                      .style("left", event.pageX + "px")
                      .style("top", event.pageY + "px");})
                .on("mouseout", function () {tooltip.transition().duration(500).style("opacity", 0);});
        }
    });
}