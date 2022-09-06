d3.json("http://127.0.0.1:5000/api/v0/healthsites").then(
 data => {
 console.log(data);
 }).catch(error => {
   console.log("error fetching url", url);
});