const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
var fs = require('fs'); //require file system object

var customers = {
   customer1:{ 
      firstName: "Carol",
      lastName: "Danvers",
      age: 33,
      address:
      {
          streetAddress: "417 5th Avenue Apt 10B",
          city: "New York",
          state: "NY",
          postalCode: "10016"
      },
      phoneNumber: "2125551234",
      id: 1,
  },
  customer2:{
      firstName: "Tony",
      lastName: "Stark",
      age: 48,
      address:
      {
          streetAddress: "890 Fifth Avenue",
          city: "New York",
          state: "NY",
          postalCode: "10021"
      },
      phoneNumber: "2125554567"
  },
  customer3:{
      firstName: "Steve",
      lastName: "Rogers",
      age: 93,
      address:
      {
          streetAddress: "890 Fifth Avenue",
          city: "New York",
          state: "NY",
          postalCode: "10021"
      },
      phoneNumber: "6781367092"
  }
}

var orders =  {
  customer1:{
      order: "phone",
      id: 1
   },
   customer2:{
      order: "books",
      id: 2
   },
   customer3:{
       order: "car",
       id: 3
   }
  }


app.get('/health/customer', (req, res) => {
  fs.readFile(__dirname + "/" + "customers.json",  function(err, data){
    console.log(data);
    res.send(orders);
  });
})

//The addOrder endpoint
app.post('/health/customer/:id', function(req, res) {
  var id = parseInt(req.params.id);
	var newCustomer = req.body;
    orders["customer" + id] = newCustomer;
	  console.log("--->After Post, customer orders:\n" + JSON.stringify(orders, null, 4));
    res.end("Post Successfully: \n" + JSON.stringify(newCustomer, null, 4));
})

    // Update a Customer Order with Id
  app.put('/health/customer/:id', function(req, res) {
    var id = parseInt(req.params.id);
    var updatedCustomer = req.body; 
    if(orders["customer" + id] != null){
      // update data
      orders["customer" + id] = updatedCustomer;
  
      console.log("--->Update Successfully,  customer orders: \n" + JSON.stringify(orders, null, 4))}
    });


   // Delete a Customer Order with Id
   app.delete('/health/customer/:id', function(req, res) {
    var deleteCustomer = orders["customer" + req.params.id];
      delete orders["customer" + req.params.id];
      console.log("--->After deletion, customer orders:\n" + JSON.stringify(orders, null, 4) );
      res.end( "Deleted customer order: \n" + JSON.stringify(deleteCustomer, null, 4));
  } );



app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;