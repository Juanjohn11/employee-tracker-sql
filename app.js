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
                "View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"
                    
                
            ]
        }
    ]).then(res =>{
        if (res.choice === "view all departments" ){
            viewDepartments();

        }else if(res.choice === "add a role"){
            addRole();
        }
    })
}

function viewDepartments (){
    connection.query('SELECT * FROM department', function(err, res){
        if(err)throw err
        console.table(res);
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
            console.log('addRole');
            mainPrompts();

        })
    })
    
}

mainPrompts();