import ListTodos from "../pages/photos/ListPhotos";
import CreatePhoto from "../pages/photos/CreatePhoto";
import UpdatePhoto from "../pages/photos/UpdatePhoto";
import DeletePhoto from "../pages/photos/DeletePhoto";

const photosRoutes = [
    {
        path: 'fotos/',
        element: <ListTodos />
    },
    {
        path: 'fotos/atualizar/:id/',
        element: <UpdatePhoto />
    },
    {
        path: 'fotos/cadastrar/',
        element: <CreatePhoto />
    },
    {
        path: 'fotos/deletar/:id/',
        element: <DeletePhoto />
    }
]

export default photosRoutes