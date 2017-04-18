var table = require("console.table");
var inquirer = require("inquirer");
var mysql = require("mysql");
var table = require("console.table");
var connection = mysql.createConnection({
    host: "localhost",
    password: "Buddy#13",
    port: "3306",
    user: "root",
    database: "bamazon"
})

// connection.connect(function(err) {
//     if (err) throw err;
//     // console.log("connection at terminal:" + connection.threadId);

// })


// connection.query("SELECT * FROM departments, products", function(error,response, fields){


// connection.query("SELECT * FROM departments", function(error, response, fields){


// //     for(var i = 0; i < response.length; i++){
// // var array[i] = [];
// // console.log(arrayi);
// //     }


// connection.query("SELECT departments.department_name, departments.total_sales, products.department_name, products.product_name, products.product_sales From products INNER JOIN departments on (products.department_name = departments.department_name)", function(error, response, fields){
//     console.log(response);



// // console.log(array1);		





// })
// })
// })

connection.query("SELECT departments.department_name, departments.department_id, SUM(products.product_sales) AS Total_Sales, departments.over_head_costs, departments.total_sales FROM departments LEFT JOIN products ON departments.department_name = products.department_name GROUP BY departments.department_id", function(error, response, fields){
// console.log(response[0].Total_Sales);
// console.log(error);
for(var i = 0; i < response.length; i++){

var profit = - response[i].over_head_costs - response[i].Total_Sales;
// console.log(profit);



connection.query("Update departments SET total_sales = ?,  WHERE department_id = ?", [response[i].Total_Sales, i+1], function(error, results, fields) {
console.log(response);
})
}


})