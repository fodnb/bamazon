var inquirer = require("inquirer");
var mysql = require("mysql");
var table = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: "3306",
    password: "Buddy#13",
    database: "bamazon"

})




var options = ["View Product Sales by Department", "Create New Department"];
connection.connect(function(err) {
    if (err) throw err;
     console.log("connection at terminal:" + connection.threadId);
})


connection.query("Select department_name from products inner join departments on products.department_name = departments.department_name", function(error, response, fields){
    console.log(response[0]);
});

// inquirer.prompt([{
// name: "selection",
// type: "rawlist",
// message: "What would you like to Supervise!",
// choices: options



// }]).then(function(ans) {


// var Values = [];
//     switch (ans.selection) {
//         case "View Product Sales by Department":


// connection.query("SELECT * from departments", function(error, response, fields){



// 	// console.log(response);

//        	for(var i = 0; i < 5; i++){
//        		Values.push([response[i].department_id, response[i].department_name, response[i].over_head_cost, response[i].product_sales]);

//        	};
//        	// console.log(Values);
//        	console.log("");
//             console.table(["Department_Id",
//         	"Department_name",
//         	"Over_head_cost",
//         	"Product_Sales",
//         	"Total_Profit"], Values);

// });



//             break;
//         case "Create New Department":
//             inquirer.prompt([{
//                     name: "name",
//                     message: "Please enter a name for the department.",
//                     type: "input"
//                 }, {
//                     name: "cost",
//                     message: "please enter an over-head cost.",
//                     type: "number",
//                       validate: function(value) {
//           if (isNaN(value) === false && parseInt(value) > 0) {
//             return true;
//           }
//           return false;
//         }
//             }]).then(function(ans) {


//             // connection.query("UPDATE departments SET ?"
//             // 	{



//             // 	}, function(error, response, fields){


//             // })
//             console.log(ans.name);
//             console.log(ans.cost);
//             // })
//         }) // ending then
// }

// })












// connection.query('select * from products, departments', function(error, response, fields){



// // })
// validate: function(input) {
//                         	input = parseInt(input);
//                             if (typeof input !== 'number') {
//                                 // Pass the return value in the done callback 
//                                 done('You need to provide a number');
//                                 return;

//                             }

//                         }
