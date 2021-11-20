import React, { useState } from 'react';
import './App.css';


function App() {
  const [tasks,setTasks] = useState([]);
  const [stageNames,setStageNames] = useState(['backlog','to do','doing','done']);
  const [txtValue,setTextValue] = useState('');

  let stageTasks = [];



  const changeTextValue = (event) =>{
    setTextValue(event.target.value);
  }

  const addTask = () =>{
    if(txtValue!==''){
      const inpData = {
        name: txtValue,
        stage: 0
      }

      const newTask = [...tasks];
      newTask.push(inpData);
      setTasks(newTask);
      setTextValue('');
    }
  }

  console.log(txtValue);
  console.log(tasks);

  const goBack = (taskName) => {
    let newTask = [...tasks];
    let findObj = newTask.find((item) => {
      return item.name == taskName;
    })
    let ind = newTask.indexOf(findObj);
    let count = tasks[ind]['stage'];
    count = count - 1;
    newTask[ind]['stage'] = count; 
    setTasks(newTask);
  }

  const goForward = (taskName) => {
    let newTask = [...tasks];
    let findObj = newTask.find((item) => {
      return item.name == taskName;
    })
    let ind = newTask.indexOf(findObj);
    let count = tasks[ind]['stage'];
    count = count + 1;
    newTask[ind]['stage'] = count; 
    setTasks(newTask);
  }

  const deleteTask = (taskName) => {
    let newTask = [...tasks.filter((item)=>item.name!==taskName)];
    setTasks(newTask);
  }

  stageNames.forEach((val,ind)=>{
    stageTasks.push([]);
  })

  tasks.forEach((val,ind)=>{
    stageTasks[val.stage].push(val);
  })

  return (
    <div className="App">
      <div className="container">
        <div className="kanbanContainer">
          <div className="row">
            <div className="col-lg-10 col-sm-10 col-md-10">
              <input className="form-control" type="text" placeholder="Add a new Task" value={txtValue} onChange={changeTextValue}/>
            </div>
            <div className="col-lg-2 col-sm-2 col-md-2">
              <button type="button" className="btn btn-dark" onClick={addTask}>Add New Task</button>
            </div>
          </div>
          <div className="row" style={{marginTop:50}}>
            {
              stageTasks.map((stageItem,ind)=>{
                return(
                  <div className="col-lg-3 col-md-3 col-sm-3" key={`${ind}`}>
                    <div className="colStyle">
                      <h5 className="headingStyle">{stageNames[ind]}</h5>
                      <div style={{padding:5}}>
                      {
                        stageItem.map((task,ind1)=>{
                          return(
                            <div className="cardStyle" key={`${ind}${ind1}`}>
                              {task.name}
                              <button type="button" className="btnStyle" onClick={() => goBack(task.name)} disabled={task.stage == 0}><i className="fas fa-arrow-left" style={task.stage == 0 ? {color:'gray'} : {color:'green'}}></i></button>
                              <button type="button" className="btnStyle" onClick={() => goForward(task.name)} disabled={task.stage == stageTasks.length - 1}><i className="fas fa-arrow-right" style={task.stage == stageTasks.length - 1 ? {color:'gray'} : {color:'green'}}></i></button>
                              <button type="button" className="btnStyle" onClick={() => deleteTask(task.name)}><i className="fas fa-trash" style={{color:'red'}}></i></button>
                            </div>
                          )
                        })
                      }  
                      </div>  
                    </div>
                  </div> 
                ) 
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
