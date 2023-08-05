import { useState} from "react";


function AppTodo() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (event) => setToDo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (toDo ===""){
      return;
    }
    setToDos((currentArray) => [toDo, ...currentArray]);
    setToDo("");
  }
  return (
    <div>  
      <h1>My ToDo List({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={toDo} placeholder="Write your to do..." type="text"></input>
        <button>Add To Do</button>
      </form>
      <hr />
      {toDos.map((item,index) => (<li key={index}>{item}</li>))}
    </div>
  );
}

export default AppTodo;
