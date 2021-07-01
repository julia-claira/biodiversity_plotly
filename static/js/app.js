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
            tempObject['id']=data.samples[0].otu_ids[i];
            tempObject['label']=data.samples[0].otu_labels[i];
            //tempObject.push({id:data.samples[0].otu_ids[i]});
            //tempObject.push({label:data.samples[0].otu_labels[i]});
         
            tempSampleValues.push(tempObject);
        }

        return tempSampleValues;
    };
    //Main ------------------------------------------------
    console.log(topOTU());


});