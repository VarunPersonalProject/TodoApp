import { useEffect, useState } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";

function App() {
  const KEY = "TODOS",
    [taskCount, setTaskCount] = useState(0),
    [todoList, setTodoList] = useState(
      JSON.parse(localStorage.getItem(KEY)) || []
    ),
    handleEditInput = (oEvent, sId) => {
      const newArray = [...todoList];
      for (let index = 0; index < newArray.length; index++) {
        if (newArray[index].id === sId) {
          newArray[index].itemName = oEvent.target.value;
          break;
        }
      }
      setTodoList(newArray);
    },
    handleTodoSubmit = (oEvent) => {
      oEvent.preventDefault();
      const newArray = [...todoList],
        sValue = oEvent.target.getElementsByTagName("input")[0].value;
      if (!sValue) {
        return null;
      }
      newArray.push({
        id: uuidv4(),
        isEdit: false,
        isCheck: false,
        itemName: sValue,
        itemOGValue: sValue,
      });
      localStorage.setItem(KEY, JSON.stringify(newArray));
      setTodoList(newArray);
      oEvent.target.getElementsByTagName("input")[0].value = "";
    },
    onSelected = (sId) => {
      setTodoList(
        todoList.map((oElement) => {
          if (oElement.id === sId) {
            oElement.isCheck = !oElement.isCheck;
          }
          return oElement;
        })
      );
    },
    handleClear = () => {
      setTodoList(todoList.filter((oElement) => !oElement.isCheck));
    },
    handleEditCancel = (oEvent, sId) => {
      const newArray = [...todoList];
      for (let index = 0; index < newArray.length; index++) {
        if (newArray[index].id === sId) {
          newArray[index].isEdit = oEvent.target.innerHTML === "Edit";
          if (oEvent.target.innerHTML === "Cancel") {
            newArray[index].itemName = newArray[index].itemOGValue;
          }
          break;
        }
      }
      setTodoList(newArray);
    },
    handleSave = (oEvent, sId) => {
      const newArray = [...todoList];
      for (let index = 0; index < newArray.length; index++) {
        if (newArray[index].id === sId) {
          newArray[index].isEdit = oEvent.target.innerHTML === "Edit";
          newArray[index].itemOGValue = newArray[index].itemName;
          break;
        }
      }
      setTodoList(newArray);
    };

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todoList));
    setTaskCount(todoList.length);
  }, [todoList]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between my-4">
        <div className="font-bold text-xl mb-2 w-full flex-2">
          Todo App({taskCount})
        </div>
        <button
          onClick={handleClear}
          className="flex-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Clear
        </button>
      </div>
      <form onSubmit={handleTodoSubmit}>
        <div className="flex flex-row">
          <input
            maxLength={50}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-4 flex-2"
            type="text"
            placeholder="Add Task"
          />
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex-1"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      <TodoList
        todoList={todoList}
        handleSave={handleSave}
        onSelected={onSelected}
        handleEditCancel={handleEditCancel}
        handleEditInput={handleEditInput}
      />
    </div>
  );
}

export default App;
