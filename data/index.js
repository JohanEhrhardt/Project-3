d3.json("http://127.0.0.1:5000/api/healthcaretypes").then(
 data => {
 console.log(data);
 }).catch(error => {
   console.log("error fetching url", url);
});