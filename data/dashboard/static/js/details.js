

// ****************************************************************** //
// FUNCTION 1 - LOADING DEMOGRAPHICS 
// Called on window load and option change
// ****************************************************************** //

function populate_demographic_table(sampleid)
{
   
    var data = d3.json("http://127.0.0.1:5000/api/v0/metaoperators").then(data => {    
    
        const metadata        = data;      
        const filteredData    = metadata.filter(sampledtl => sampledtl.loc_name == sampleid)[0]   
    
        const demographicpanel = d3.select('#sample-metadata')
        demographicpanel.html('');  
    
         
        Object.entries(filteredData).forEach(([key, value]) => {

              var label ="";
              var display_value = "";
              
              if (key == 'completeness')
                 label = "Completeness";
              else if (key == 'loc_amenity')  
                 label = "Amenity";
              else if (key == 'access_hours')  
                 label = "Access Hours";   
              else if (key == 'addr_postcode')  
                 label = "Postcode";  
              else if (key == 'state')  
                 label = "State";       
              else if (key == 'meta_operator')  
                 label = "Operator";     
              else if (key == 'meta_speciality')  
                 label = "Speciality";                                        
              else if (key == 'meta_emergency')  
                 label = "Emergency";  
              else if (key == 'contact_url')  
                 label = "URL";  
              else if (key == 'meta_operator_type')               
                 label = "Operator Type";   
              else if (key == 'contact_phone')               
                 label = "Contact Phone";                   
              else if (key == 'meta_wheelchair')               
                 label = "Wheelchair Access";                                    
              else
                 label = "";  

               
               if (value == null)
                  display_value = "-";
               else
                  display_value = value;    
              
               if  (label != "")
                   demographicpanel.append("h6").text(`${label}: ${display_value}`);              
        });    
        

    });
}


function build_graphs(sampleid)
{

    console.log("Building graphs for %s.",  sampleid) 
    console.log("Loading data...") 

    let data = d3.json("http://127.0.0.1:5000/api/v0/metaoperators").then(data => {    

        let metadata = data;
    
        let filteredSample      = metadata.filter(sampledtl => sampledtl.loc_name == sampleid)[0]  // Arrow function to extract the data
        let completeness        = parseInt(filteredSample.completeness)

       
    // ************************* GAUGE GRAPH ****************************** //


    function build_gauge_graph(sampleid){

        console.log("Building gauge bar for %s.",  sampleid) ; 
        console.log("Completeness is %s.",  completeness) ; 



        // Trig to calc meter point
        var degrees = (180 - (completeness*3.5)),
            radius = .5;
        var radians = degrees * Math.PI / 180;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);

        
        var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        
        var path = mainPath.concat(pathX,space,pathY,pathEnd);

        var data = [{ type  : 'scatter',
                      x     : [0], y:[0],
                      marker: {size: 28, color:'850000'},
                      showlegend: false,
                      name      : 'speed',
                      text      : completeness,
                      hoverinfo : 'text+name'},
                    { values    : [50/5, 50/5, 50/5, 50/5, 50/5,  50],
                      rotation  : 90,
                      text      : ['40+', '30-40', '20-30', '10-20','0-10',''],
                      textinfo  : 'text',
                      textposition :'inside',
                      marker       : {colors:['rgba(14, 100, 0, .5)', 
                                              'rgba(110, 154, 22, .5)',
                                              'rgba(130, 190, 35, .5)',
                                              'rgba(202, 209, 95, .5)',
                                              'rgba(232, 226, 202, .5)',
                                              'rgba(255, 255, 255, 0)']},
                      labels      : ['40+', '30-40', '20-30', '10-20','0-10',''],
                      hoverinfo   : 'label',
                      hole        : .5,
                      type        : 'pie',
                      showlegend  : false
                    }];

        var layout = {shapes:[{ type: 'path',
                                path: path,
                                fillcolor: '850000',
                                line: {color: '850000'}}],
                       title    : '<b>Completeness</b> <br> Completeness of the dataset',
                       height   : 500,
                       width    : 500,
                       xaxis    : {zeroline:false, showticklabels:false, showgrid: false, range: [-1, 1]},
                       yaxis    : {zeroline:false, showticklabels:false, showgrid: false, range: [-1, 1]}
                    };

        Plotly.newPlot('gauge', data, layout);

    }    



    // ************************************************************
    // CALLING GRAPHS

        build_gauge_graph(sampleid);
    }) 
}   



   
   



function optionChanged(sampleid)
{
    console.log("Selected individiual is " + sampleid);
    populate_demographic_table(sampleid)
    build_graphs(sampleid)

    
};    


// ****************************************************************** //
// Read sample.json data and load options
// Windows load action
// ****************************************************************** //



window.onload = function() {
    let data = d3.json("http://127.0.0.1:5000/api/v0/metaoperators").then(data => {
        
  


         const names     = []; 

         for (var index = 0; index < data.length; index++) {

             names.push(data[index].loc_name)
    
         }    

        // // dropDown button
         let dropDown = d3.select('#selDataset')
        
        // // dropDown.on('change', handleChange)
         names.forEach(name => {
             dropDown.append('option').text(name).property('value', name);
         });
         
         sampleid = "Callaghan Campus Pharmacy"
         populate_demographic_table(sampleid) // Load initial data for test id, after the file is loaded
         build_graphs(sampleid)
        

    })

   
}  


