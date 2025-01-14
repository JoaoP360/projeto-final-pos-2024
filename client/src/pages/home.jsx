import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.css"; 


const Home = () => {
  return (
    <>
      <div className="text-center mb-5">
        <h1>Bem-vindo ao Sistema</h1>
        <p className="lead">
          Aqui você pode gerenciar usuários, tarefas, álbuns e fotos. Escolha uma das opções abaixo para começar.
        </p>
      </div>

      <div className="mb-4 d-flex flex-wrap gap-3 justify-content-center">
        <Link to={"/usuarios/cadastrar/"} className="btn btn-primary btn-custom">
          Cadastrar usuário
        </Link>
        <Link to={"/tarefas/cadastrar/"} className="btn btn-primary btn-custom">
          Cadastrar tarefa
        </Link>
        <Link to={"/albuns/cadastrar/"} className="btn btn-primary btn-custom">
          Cadastrar álbum
        </Link>
        <Link to={"/fotos/cadastrar/"} className="btn btn-primary btn-custom">
          Cadastrar foto
        </Link>
      </div>

      <div className="text-center mt-5">
        <h2>Informações do Sistema</h2>
        <p className="lead">
          O sistema permite gerenciar de forma eficiente o cadastro e controle de usuários, tarefas, álbuns e fotos. 
          Utilize os links acima para navegar e adicionar novos dados ao sistema.
        </p>
      </div>

      <div className="mt-5 text-center">
        <Link to="/tarefas/" className="btn btn-info btn-custom">
          Ver tarefas cadastradas
        </Link>
      </div>
    </>
  );
};

export default Home;
