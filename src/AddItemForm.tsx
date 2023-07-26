import { ChangeEvent, useState, KeyboardEvent } from "react";
import s from './Todolist.module.css'


type AddItemFormPropsType = {
    addItem: (title: string) => void
    
  
  }
  
  export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {
  
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);
  
  
    //логическая функция-обработчик введенного текста в Input
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setNewTaskTitle(e.currentTarget.value);
    };
  
    //логическая функция обработчик нажатия Enter+Сtrl в Input
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      setError(null);
      if (e.ctrlKey && e.key === "Enter") {
        props.addItem(newTaskTitle);
        setNewTaskTitle("");
      }
    };
  
    //логическая функция-обработчик добавления новой таски в массив
    const addTask = () => {
      if (newTaskTitle.trim() !== '') {// если введеная строка пустая выйти из функции
        props.addItem(newTaskTitle);
        setNewTaskTitle("");
      } else {
        setError('Title is requaired');
      }
  
    };
  
    return (
      <div>
        <input
          value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyDown={onKeyPressHandler}
          className={error ? s.error : ''}
        />{" "}
        {/*начальное значение поле ввода input*/}
        <button onClick={addTask}>+</button>
        {error && <div className={s.errormessage}>{error}</div>}
      </div>
    )
  }
  