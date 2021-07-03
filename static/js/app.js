
//read in the samples--------------------------------------
d3.json("samples.json").then((importedData)=>{
    var data = importedData;
    //console.log(data.samples[0].sample_values[0]);



    //Functions------------------------------------------------

    //Top 10 OTUs found in individual
    function topOTU(){
        var tempSampleValues=[];
        var testSubject=idField.property("value");
        
        for (i=0; i<10; i++){
            var tempObject={};
            tempObject['sample']=data.samples[testSubject].sample_values[i];
            tempObject['id']=`OTU ${data.samples[testSubject].otu_ids[i]}`;
            tempObject['label']=data.samples[testSubject].otu_labels[i];

            tempSampleValues.push(tempObject);
        }
        console.log(tempSampleValues);
        return tempSampleValues;
    };

    //function createBar(dataTopTen){}

 
    //Main ------------------------------------------------
    
    //The Dropbox Selection
    var idField= d3.select("#selDataset");//
    Object.entries(data.samples).forEach(([key,value]) => {
        idField.append("option").text(value.id).attr('value',key);
    });
    
    idField.on("change", topOTU);
    console.log(idField.property("value"));
//-------move the below into a function
     //Bar Graph
    var dataTopTen=topOTU();
    
    //Adds line breaks instead of semicolons for hover text
    var theLabel=dataTopTen.map(row=> {
        return row.label.split(';');
    })
    theLabel=theLabel.map(row =>row.join('<br>'));
    theLabel.reverse();

    //Creates Trace
    var trace1 = {
        type: 'bar',
        mode: 'lines+markers',
        x: dataTopTen.map(row=>row.sample).reverse(),
        y: dataTopTen.map(row=>row.id.toString()).reverse(),
        text: theLabel,//dataTopTen.map(row=>row.label),
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

    
});