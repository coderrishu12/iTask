import { useEffect, useState } from 'react'
import Navbar from './assets/components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

function App() {
  const [todo, setTodo]=useState("");
  const [todos, setTodos]=useState([]);
  const [showFinished, setShowFinished] = useState(true);


  const toggleFinished=(e)=>{
    setShowFinished(!showFinished);
  }

  const saveToLS = (params)=>{
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      const storedTodos = JSON.parse(localStorage.getItem("todos"));
      if (storedTodos.length > 0) {
        setTodos(storedTodos);
      }
    }
  }, []);
  

  const handleAdd=()=>{
    setTodos([...todos, {id:uuidv4(), todo, isCompleted: false}]);
    setTodo("");
    console.log(todos);
    saveToLS();
  }

  const handleEdit = (e, id) =>{
    let t = todos.filter(i=> i.id===id) 
    setTodo(t[0].todo);
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos);
    saveToLS();
  }

  const handleDelete=(e, id)=>{
    let newTodos = todos.filter(item=>{
       return item.id!==id
    });
    console.log(newTodos);
    setTodos(newTodos);
    console.log(newTodos);

    saveToLS();
    console.log(newTodos);

  }

  const handleChange = (e)=>{
    setTodo(e.target.value);
    
  }

  const handleCheckbox=(e)=>{
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  }

  return (
    <>
    <Navbar/>
      <div className='md:container mx-auto my-5 bg-slate-300 p-5 rounded-xl min-h-[85vh] md:w-1/2'>
        <h1 className='font-bold text-xl text-center'>iTask - Manage your todos at one place</h1>
        <div className='addtodo font-bold my-5 flex flex-col gap-4 '>
          <h2 className='text-lg'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type='text' className='  rounded-full md:w-full py-1 px-5 ' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-slate-800 text-lg text-white px-4 py-1  my-3  hover:bg-slate-400 disabled:bg-slate-400 disabled:text-black hover:text-slate-950 rounded-md font-bold'>Save</button>
        </div>
        <input className='my-5' onChange={toggleFinished} type='checkbox' checked={showFinished} /> Show Finished
         <h2 className='font-bold'> Your Todos </h2>

         <div className='todos'>
          {todos.length ===0 && <div className='m-5 text-center'>No Todos to display</div>}

          {todos.map(item=>{ 

          return (showFinished || !item.isCompleted) && <div key={item.id} className='todo  flex my-3 md:w-1/2  justify-between '>
            <div className='flex gap-5'>
            <input name={item.id} onChange={handleCheckbox} type='checkbox'  checked={item.isCompleted} id="" />
        
                    <div  className={item.isCompleted?"line-through":""}>
                      {item.todo}
                    </div>
            </div>

                    <div className='buttons flex h-full '>

                    <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-slate-800 text-white p-4 py-1 mx-1 hover:bg-slate-400  hover:text-slate-950 rounded-md font-bold'><FaEdit /></button>
                    <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-slate-800 text-white p-4 py-1 mx-2 hover:bg-slate-400 hover:text-slate-950 rounded-md font-bold '><AiFillDelete /></button>

                    </div>
              
          </div>
          })}

         </div>
        
      </div>
    </>
  )
}

export default App
