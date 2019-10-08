import * as React from "react"
import cuid from "cuid"
import { mod, findBy, toggle } from "shades"
import { Todo } from "components/Todo"

export function App() {
	return (
		<div className="App">
			<TodoList />
		</div>
	)
}

type ITodo = {
	id: string
	text: string
	completed: boolean
}
function TodoList() {
	const [nextTodo, setNextTodo] = React.useState<string>("")
	const [todos, setTodos] = React.useState<ITodo[]>([])
	const nextTodoRef = React.useRef<string>("")
	const todosRef = React.useRef<ITodo[]>([])

	type InputHandler = React.ChangeEventHandler<HTMLInputElement>
	const onChangeNextTodo = React.useCallback<InputHandler>(event => {
		setNextTodo(event.target.value)
	}, [])
	const onEnter = React.useCallback<React.KeyboardEventHandler>(event => {
		if (event.keyCode === 13 && nextTodoRef.current.length > 0) {
			const todo = { id: cuid(), text: nextTodoRef.current, completed: false }
			setTodos(todos => [todo, ...todos])
			setNextTodo("")
		}
	}, [])
	const onToggle = React.useCallback<(id: string) => void>(id => {
		const todoIndex = todosRef.current.findIndex(it => it.id === id)
		if (todoIndex !== -1) {
			const trans = mod(findBy.of<ITodo>({ id: id }), "completed")(toggle)
			setTodos(trans as any)
		}
	}, [])

	React.useEffect(() => {
		nextTodoRef.current = nextTodo
	}, [nextTodo])
	React.useEffect(() => {
		todosRef.current = todos
	}, [todos])

	return (
		<div>
			<h2>Todo list</h2>
			<input
				type={"text"}
				value={nextTodo}
				onChange={onChangeNextTodo}
				onKeyDown={onEnter}
			/>
			<ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
				{todos.map(todo => (
					<Todo
						key={todo.id}
						view={todo}
						actions={Todo.initActions(todo, it =>
							setTodos(mod(findBy.of<ITodo>({ id: it.id }))(_ => it) as any)
						)}
					/>
				))}
			</ul>
		</div>
	)
}
