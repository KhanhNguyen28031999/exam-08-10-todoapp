import './App.css';
import { useState, useRef } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskChecks, setTaskChecks] = useState([
    {
      task: 'Testing',
      isCompleted: false,
    },
  ]);
  const [filterMode, setFilterMode] = useState('All');

  const handleCheckboxChange = (event) => {
    const task = taskChecks.find((task) => task.task === event.target.name);

    if (event.target.checked) {
      task.isCompleted = true;
      task.classname = 'todo-task-completed';
    } else {
      task.isCompleted = false;
      task.classname = '';
    }

    const updatedTaskChecks = taskChecks.map((t) => {
      if (t.task === task.task) {
        return task;
      }
      return t;
    });

    setTaskChecks(updatedTaskChecks);
  };

  const handleAddTask = () => {
    const newTask = prompt('Enter new task:');
    if (newTask) {
      setTasks((prevTasks) => [...prevTasks, { task: newTask, isCompleted: false }]);
      setTaskChecks((prevTaskChecks) => [...prevTaskChecks, { task: newTask, isCompleted: false }]);
    }
  };
  const handleDeleteAllTasks = () => {
    setTasks([]);
    setTaskChecks([]);
  };
  const handleFilterChange = (filter) => {
    setFilterMode(filter);
  };
  

  const addTaskButtonRef = useRef(null);

  return (
    <div className='App'>
      <div className='todo-app'>
        <div className='todo-header'>
          <h3>#Todo-list</h3>
        </div>
        <div className='todo-task-sort'>
          <span onClick={() => handleFilterChange('All')} className='filter-btn1'>All</span>
          <span onClick={() => handleFilterChange('Active')} className='filter-btn2'>Active</span>
          <span onClick={() => handleFilterChange('Completed')} className='filter-btn'>Completed</span>
        </div>
        <div className='todo-task-list'>
          {taskChecks
            .filter((task) => {
              if (filterMode === 'All') {
                return true;
              } else if (filterMode === 'Active' && !task.isCompleted) {
                return true;
              } else if (filterMode === 'Completed' && task.isCompleted) {
                return true;
              }
              return false;
            })
            .map((task) => (
              <div className='task-list' key={task.task}>
                <input
                  type='checkbox'
                  checked={task.isCompleted}
                  name={task.task}
                  onChange={handleCheckboxChange}
                />
                <span className={task.classname}>{task.task}</span>

                <button
                  className='todo-task-delete'
                  onClick={() => {
                    const updatedTasks = tasks.filter((t) => t !== task);
                    setTasks(updatedTasks);
                    const updatedTaskChecks = taskChecks.filter((t) => t !== task);
                    setTaskChecks(updatedTaskChecks);
                  }}
                >
                  X
                </button>

              </div>
            ))}
        </div>
        <div className='todo-task-btn0'>
          <button
            className='todo-task-btn'
            ref={addTaskButtonRef}
            onClick={handleAddTask}
          >
            Add Task
          </button>
          <button
          className='todo-task-btn-delete-all' 
          onClick={handleDeleteAllTasks}>
            Delete All Tasks
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

