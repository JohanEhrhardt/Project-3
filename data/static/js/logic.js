console.log("Hey")

d3.json("localhost:5000/").then(
  
 data => {
 console.log(data);


 }).catch(error => {
   console.log("error fetching url",  error);
});



