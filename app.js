const mysql = require('mysql2');
const inquirer = require('inquirer');
const connection = require('./db/connection');


function mainPrompts(){
    inquirer.prompt([
        {
            type:'list',
            name: 'choice',
            message: 'what would you like to do?',
            choices: [
                "View all departments", 
                "View all roles", 
                "View all employees", 
                "Add a department", 
                "Add a role", 
                "Add an employee", 
                "Update an employee role"
            ]
        }
    ]).then(res =>{
        if (res.choice === "View all departments" ){
            viewDepartments();

        }else if(res.choice === "Add a role"){
            addRole();
        } else if (res.choice === "View all roles"){
            viewAllRoles();
        } else if (res.choice === "View all employees"){
            viewAllEmployees();
        }else if (res.choice === "Add a department"){
            addDepartment();
        }
    })
}

function viewDepartments (){
    connection.query('SELECT * FROM department', function(err, res){
        if(err)throw err
        console.table(res)
        mainPrompts();
    })

}

function viewAllRoles (){
    connection.query('SELECT * FROM role', function(err,res){
        if(err)throw err
        console.table(res)
        mainPrompts();
    })
}

function viewAllEmployees (){
    connection.query('SELECT * FROM employee', function(err,res){
        if(err)throw err
        console.table(res)
        mainPrompts();
    })
}

function addRole(){
    inquirer.prompt([
        {
            name: 'title',
            message: 'what is the roles title?',
            type:'input'
        },
        {
            name: 'salary',
            message: 'what is the new salary?',
            type:'input'
        },
        {
            name: 'department_id',
            message: 'what is the new department id?',
            type:'list',
            choices: [
                {
                    name:'Sales',
                    value: '1'
                },
                {
                    name:'Engineering',
                    value: '2'
                },
                {
                    name:'Finance',
                    value: '3'
                },{
                    name:'Legal',
                    value: '4'
                },
            ]
        }

    ]).then(res =>{
        connection.query('INSERT INTO role SET ?',res,function(err){
            if(err)throw err
            console.log('New role added.');
            mainPrompts();

        })
    })
    
}

function addDepartment(){
    inquirer.prompt([
        {
            name: 'name',
            message: 'What is the new department name?',
            type:'input'
        },

    ]).then(res =>{
        connection.query('INSERT INTO department SET ?',res,function(err){
            if(err)throw err
            console.log('New department added.');
            mainPrompts();

        })
    })
    
}





mainPrompts();