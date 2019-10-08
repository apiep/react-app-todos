import * as React from "react"

type IView = {
	id: string
	text: string
	completed: boolean
}
type IActions = {
	onToggle: () => void
}
type IProps = {
	view: IView
	actions: IActions
}
export const Todo = ({ view, actions }: IProps) => (
	<li>
		<input
			type="checkbox"
			checked={view.completed}
			onChange={actions.onToggle}
		/>
		<span style={view.completed ? { textDecoration: "line-through" } : {}}>
			{view.text}
		</span>
	</li>
)

Todo.initActions = (view: IView, update: (view: IView) => void): IActions => ({
	onToggle: () => update({ ...view, completed: !view.completed })
})
