import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { LabelAndChange } from '../../components/LabelAndChange';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';

import washingMachine from '../../assets/washing-machine.png';
import './styles.scss'

import UsuarioAPI from '../../API/usuarioAPI';

export const UsuarioData = new UsuarioAPI();

export function Login() {
  const history = useHistory();

  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [alertFullFields, setAlertFullFields] = useState(false);
  const [incorrectDados, setIncorrectDados] = useState(false);

  async function handleToLogin(event: FormEvent) {
    event.preventDefault();

    if (cpf !== '' && password !== '') {
      
      const loginData = await UsuarioData.getUsuarioByCPF(cpf)

      if (loginData?.senha === password) {
        UsuarioData.LogedUser = loginData
        history.push('/clients');
        // window.location.reload();
      }
      else {
        setIncorrectDados(true)
      }
    }
    else {
      setAlertFullFields(true);
    }
  }

  return(
    <div id="login">
      <aside>
        <div className="banner">
          <strong>Gerência de Lavanderia</strong>
          <p>Segurança, velocidade e praticidade</p>
        </div>
      </aside>

      <main>
        <div className="main-content">
          <img src={washingMachine} alt="logo" />
          <div className="separator" >Realize seu login</div>
          <form onSubmit={handleToLogin}>
            <LabelAndChange
              input 
              name="CPF"
              type="text" 
              onChange={event => setCpf(event.target.value)}
              placeholder="Digite seu cpf..."
            />
            <LabelAndChange
              input 
              name="Senha"
              type="password"
              onChange={event => setPassword(event.target.value)}
              placeholder="Digite sua senha..."
            />
            
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>

      {alertFullFields ? 
        <Modal 
          alert 
          title="Alerta ao realizar login" 
          handleToCancel={() => {setAlertFullFields(false)}}
        >
          Preencha todos os campos!
        </Modal> 
      : false}

      {incorrectDados ? 
        <Modal 
          alert 
          title="Alerta ao realizar login" 
          handleToCancel={() => {setIncorrectDados(false)}}
        >
          Senha ou email incorretos!
        </Modal> 
      : false}
    </div>
  );
}