#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let todoList: string [] = [];
let conditions = true;

//print welcome message
console.log(chalk.blue.bold("\n \tWelcome to Code With Muneeba Todo-List Application\n"));
let main = async () => {
    while (conditions){
        let option = await inquirer.prompt([
            {
                name: "choices",
                type: "list",
                message: "Select an option you want to do:",
                choices: ["Add Task", "Delete Task", "Update Task", "View Todo-List", "Exit"],
            }
        ]);
        if(option.choices === "Add Task"){
            await addTask()
        }
        else if(option.choices === "Delete Task"){
            await deleteTask()
        }
        else if(option.choices ==="Update Task"){
            await updateTask()
        }
        else if(option.choices === "View Todo-List"){
            await viewTask()
        }
        else if(option.choices === "Exit"){
            conditions = false;   
        }
    }
}
//function to add new task to the list
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: "Enter your new task :"
        }
    ]);
    todoList.push(newTask.task);
    console.log(`\n ${newTask.task} task added sucessfully in Todo-List`);
}
//function to view all todo list tasks
let viewTask = () => {
    console.log("\n Your Todo-List: \n");
    todoList.forEach((task,index) =>{
        console.log(`${index + 1}: ${task}`)
    })
}
//function to delete a task from list
let deleteTask = async () => {
    await viewTask()
    let taskIndex  = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the 'index no.' of the task you want to delete:",
        }
    ]);
    let deletedTask = todoList.splice(taskIndex.index - 1,1);
    console.log(`\n ${deletedTask} this task has been deleted sucessfully from your Todo-List\n`);
}

//function to update a task
let updateTask = async () => {
    await viewTask()
    let update_task_index = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the 'index no.' of the task you want to update :"
        },
        {
            name: "new_task",
            type: "input",
            messgae: "Now Enter new task name :",
        }
    ]);
    todoList[update_task_index.index - 1] = update_task_index.new_task
    console.log(`\n Task at index no. ${update_task_index.index - 1}updated sucessfully [for update list Check option: "View Todo-List"]`)
}

main();
