import { useEffect, useState , useRef } from "react";
import "./style.css";
import Lixo from "../../assets/lixeirar.png";
import api from "../../services/api";

function Home() {
  const [users, setUsers] = useState([])

  const nameInput = useRef()
  const ageInput = useRef()
  const emailInput = useRef()

  async function getUsers (){

     const usersFromApi = await api.get ('/usuarios')
     setUsers (usersFromApi.data)
  }
  async function createUsers (){

     await api.post ('/usuarios',{
        name: nameInput.current.value,
        age: ageInput.current.value,
        email: emailInput.current.value
     })

      getUsers()
     
  }

  async function deleteUsers (id){

    await api.delete (`/usuarios/${id}`)

    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, []);

  return (
    <div className="conteiner">
      <form>
        <h1>Cadastro de Usuário</h1>
        <input placeholder="Nome" type="text" name="Nome" ref={nameInput} />
        <input placeholder="Idade" type="number" name="idade" ref={ageInput} />
        <input placeholder="Email" type="email" name="email" ref={emailInput} />
        <button type="button" onClick={createUsers}>Cadastrar</button>
      </form>
      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>Nome: <span>{user.name}</span> </p>
            <p>Idade: <span>{user.age}</span> </p>
            <p>Email: <span>{user.email}</span>  </p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Lixo} alt="Lixeira" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
