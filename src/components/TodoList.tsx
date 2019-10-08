import * as React from "react"

type Todo = {
	id: string
	text: string
	completed: boolean
}
type IView = {
	todos: Todo[]
	nextTodo: Todo
}
type IActions = {
	onToggleTodo: (todo: Todo) => void
	onAddTodo: (todo: Todo) => void
	onChangeNextTodoText: (event: React.ChangeEvent<HTMLInputElement>) => void
	onSubmitNextTodo: (event: React.KeyboardEvent<HTMLInputElement>) => void
}
type IProps = {
	view: IView
	actions: IActions
}
export const TodoList = ({ view, actions }: IProps) => (
	<div className="TodoList">
		<h2>Todo List</h2>
		<input
			type="text"
			value={view.nextTodo.text}
			onChange={actions.onChangeNextTodoText}
			onKeyDown={actions.onSubmitNextTodo}
		/>
	</div>
)
