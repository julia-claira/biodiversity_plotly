
//read in the samples--------------------------------------
d3.json("samples.json").then((importedData)=>{
    var data = importedData;
    //console.log(data.samples[0].sample_values[0]);



    //Functions------------------------------------------------

     function topOTU(){
        var tempSampleValues=[];//
        var testSubject=idField.property("value");//the index
        
        //BAR GRAPH TOP TEN-----------------------------
        //checks for samples with less than 10 rows of data
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

        //BUBBLE GRAPH----------------
        tempSampleValues=[];
        count=data.samples[testSubject].otu_ids.length;
        
        for (i=0;i<count;i++){
            var tempObject={};
            tempObject['sample']=data.samples[testSubject].sample_values[i];
            tempObject['id']=data.samples[testSubject].otu_ids[i];
            tempObject['label']=data.samples[testSubject].otu_labels[i];

            tempSampleValues.push(tempObject);
         }
         createBubble(tempSampleValues);//create bubble graph
        
    };

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

    //Main ------------------------------------------------
    
    //The Dropbox Selection
    var idField= d3.select("#selDataset");//
    Object.entries(data.samples).forEach(([key,value]) => {
        idField.append("option").text(value.id).attr('value',key);
    });
    idField.on("change", topOTU);

    //pull data and initialize bar graph
    topOTU();

    
});