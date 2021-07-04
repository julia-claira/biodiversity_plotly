
//read in the samples--------------------------------------
d3.json("samples.json").then((importedData)=>{
    var data = importedData;



    //Functions------------------------------------------------
    
    //Pulls Graph Values
    function pullGraphValues(){
        var tempSampleValues=[];//
        var testSubject=idField.property("value");//the index
        
        //BAR GRAPH VALUES
        
        if(data.samples[testSubject].otu_ids.length<10){
            var count=data.samples[testSubject].otu_ids.length;
        }
        else {
            var count=10;
        }
        
        //pulls top ten samples (or less if there isn't 10 samples)
        for (i=0; i<count; i++){
            var tempObject={};
            tempObject['sample']=data.samples[testSubject].sample_values[i];
            tempObject['id']=`OTU ${data.samples[testSubject].otu_ids[i]}`;
            tempObject['label']=data.samples[testSubject].otu_labels[i];

            tempSampleValues.push(tempObject);     
        }
        createBar(tempSampleValues);//bar graph

        //BUBBLE GRAPH VALUES
        tempSampleValues=[];
        count=data.samples[testSubject].otu_ids.length;
        
        for (i=0;i<count;i++){
            var tempObject={};
            tempObject['sample']=data.samples[testSubject].sample_values[i];
            tempObject['id']=data.samples[testSubject].otu_ids[i];
            tempObject['label']=data.samples[testSubject].otu_labels[i];

            tempSampleValues.push(tempObject);
         }
         createBubble(tempSampleValues);

        //META GRAPH VALUES AND PRINT
        var meta=d3.select("#sample-metadata");
        var metaHTML="";
        var lastValue="";
        Object.entries(data.metadata[testSubject]).forEach(([key,value]) => {
            metaHTML=metaHTML+`<p><b>${key}:</b> ${value}</p>`;
            lastValue=value;//the last value in the metadata is washing frequency
        });
        meta.node().innerHTML=metaHTML;

        createGauge(lastValue);//passes washing frequency into function for gauge
        
    };

    //BAR GRAPH DRAW
    function createBar(dataTopTen){
    
        //Adds line breaks instead of semicolons for hover text
        var theLabel=dataTopTen.map(row=> {
            return row.label.split(';');
        })
        theLabel=theLabel.map(row =>row.join('<br>'));
        theLabel.reverse();

        //Creates Trace
        var trace1 = {
            type: 'bar',
            x: dataTopTen.map(row=>row.sample).reverse(),
            y: dataTopTen.map(row=>row.id.toString()).reverse(),
            text: theLabel,
            hovertemplate: 
            '<b>%{x}<b>'+
            '<br>-------<br>'+
            '<i>%{text}</i>'+
            '<extra></extra>',
            orientation: 'h',
        };
        var myData=[trace1];

        //Layout and Plot
        layout = {
            title: {text:"Top Ten Bacteria Cultures Found",xanchor:'right'},
            title_x: 0,
            autosize: false,
            width: 600,
            height: 500,
            margin: {
                l: 70,
                r: 200,
                b: 100,
                t: 30,
                pad: 4
            },
            xanchor: 'left',
            display:'none'
        }
        Plotly.newPlot("bar", myData,layout,{displayModeBar: false});
    };

    //BUBBLE GRAPH DRAW
    function createBubble(sampleValues){
        var theIDs=sampleValues.map(row=>row.id);
        var theValues = sampleValues.map(row=>row.sample);
        //Adds line breaks instead of semicolons for hover text
        var theLabel=sampleValues.map(row=> {
            return row.label.split(';');
        })
        theLabel=theLabel.map(row =>row.join('<br>'));
        
        //Creates Trace
        var trace1 = {
            mode: 'markers',
            x: theIDs,
            y: theValues, 
            marker: {
                size: theValues,
                color:theIDs,
                colorscale: 'Portland',
                sizeref: 2 * Math.max(...theValues)/(15**2),
            },
            text: theLabel,
            hovertemplate: 
            '<b>%{x}<b>'+
            '<br>-------<br>'+
            '<i>%{text}</i>'+
            '<extra></extra>',
            orientation: 'h',
        };
        var myData=[trace1];

        //Layout and Plot
        layout = {
            title: {text:"Bacteria Cultures Per Sample",xanchor:'center'},
            title_x: 0,
            xaxis: {
                title: {
                  text: 'OTU ID',
                }
            }
  
        }
        Plotly.newPlot("bubble", myData,layout,{displayModeBar: false});

    }

    //GAUGE GRAPH DRAW
    function createGauge(WashFreq){
        var data = [
            {
            domain: { x: [0, 1], y: [0, 1] },
            value: WashFreq,
            title: { text: "Belly Button Washing Frequency" },
            type: "indicator",
            mode: "gauge",
            gauge: {
                axis: { range: [0, 9] },
                steps: [
                { range: [0, 1], color: "#E8F8F5"},
                { range: [1, 2], color: "#D1F2EB" },
                { range: [2, 3], color: "#D1F2EB" },
                { range: [3, 4], color: "#D1F2EB" },
                { range: [4, 5], color: "#D1F2EB" },
                { range: [5, 6], color: "#D1F2EB" },
                { range: [6, 7], color: "#D1F2EB" },
                { range: [6, 7], color: "#D1F2EB" },
                { range: [6, 7], color: "#D1F2EB" },
                ],
                threshold: {
                line: { color: "red", width: 4 },
                thickness: 0.75,
                value: WashFreq
                }
            }
            }
        ];
        
        var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', data, layout);
    }

    //Main ------------------------------------------------
    
    //The Dropbox Selection
    var idField= d3.select("#selDataset");//
    Object.entries(data.samples).forEach(([key,value]) => {
        idField.append("option").text(value.id).attr('value',key);
    });
    idField.on("change", pullGraphValues);

    //pull data and initialize graphs
    pullGraphValues();

    
});