import ListAlbuns from "../pages/albuns/ListAlbuns";
import CreateAlbum from "../pages/albuns/CreateAlbum";
import UpdateAlbum from "../pages/albuns/UpdateAlbum";
import DeleteAlbum from "../pages/albuns/DeleteAlbum";
import DetailAlbum from "../pages/albuns/DetailAlbum";

const albunsRoutes = [
    {
        path: 'albuns/',
        element: <ListAlbuns />
    },
    {
        path: 'album/:id/fotos/',
        element: <DetailAlbum />
    },
    {
        path: 'albuns/cadastrar/',
        element: <CreateAlbum />
    },
    {
        path: 'albuns/atualizar/:id/',
        element: <UpdateAlbum />
    },
    {
        path: 'albuns/deletar/:id/',
        element: <DeleteAlbum />
    }
]

export default albunsRoutes;