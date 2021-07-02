//read in the samples--------------------------------------
d3.json("samples.json").then((importedData)=>{
    var data = importedData;
    console.log(data.samples[0].sample_values[0]);



    //Functions------------------------------------------------

    //Top 10 OTUs found in individual
    function topOTU(){
        var tempSampleValues=[];
        
        for (i=0; i<10; i++){
            var tempObject={};
            tempObject['sample']=data.samples[0].sample_values[i];
            tempObject['id']=`OTU ${data.samples[0].otu_ids[i]}`;
            tempObject['label']=data.samples[0].otu_labels[i];
            //tempObject.push({id:data.samples[0].otu_ids[i]});
            //tempObject.push({label:data.samples[0].otu_labels[i]});
            
            tempSampleValues.push(tempObject);
        }

        return tempSampleValues;
    };
    //Main ------------------------------------------------
   
    //Bar Graph
    var dataTopTen=topOTU();
    
    var trace1 = {
        type: 'bar',
        x: dataTopTen.map(row=>row.sample).reverse(),
        y: dataTopTen.map(row=>row.id.toString()).reverse(),
        text: dataTopTen.map(row=>row.label).reverse(),
        orientation: 'h',
    }
    var myData=[trace1];

    layout = {
        title: "Top Ten OTUs",
    }
    Plotly.newPlot("bar", myData,layout);

    console.log(trace1)
});