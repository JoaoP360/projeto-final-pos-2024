import ListTodos from '../pages/todos/ListTodos.jsx';
import CreateTodo from '../pages/todos/CreateTodo.jsx';
import UpdateTodo from '../pages/todos/UpdateTodo.jsx';
import DeleteTodo from '../pages/todos/DeleteTodo.jsx';

const todosRoutes = [
    {
        path: 'tarefas/',
        element: <ListTodos />
    },
    {
        path: 'tarefas/cadastrar/',
        element: <CreateTodo />
    },
    {
        path: 'tarefas/atualizar/:id/',
        element: <UpdateTodo />
    },
    {
        path: 'tarefas/deletar/:id/',
        element: <DeleteTodo />
    }
]

export default todosRoutes