//read in the samples--------------------------------------
d3.json("samples.json").then((importedData)=>{
    var data = importedData;
    console.log(data.samples[0].sample_values[0]);



    //Functions------------------------------------------------

    //Top 10 OTUs found in individual
    function topOTU(){
        var tempSampleValues=[];
        for (i=0; i<10; i++){
            console.log("");
            tempSampleValues.push(data.samples[0].sample_values[i]);
        }

        return tempSampleValues;
    };

    console.log(topOTU());


});