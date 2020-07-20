import React from 'react';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import MuiAlert from '@material-ui/lab/Alert';
 
export default class LoginForm extends React.Component {
 
    state = {
        user: {
            usuario: '',
            senha: ''
        },
        showMessage: false,
        messageText: 'Erro não mapeado D:',
        messageSeverity: 'error'
    };
 
    handleChange = (event) => {
        const { user } = this.state;
        user[event.target.name] = event.target.value;
        this.setState({ user });

    }
 
    handleSubmit = () => {
        const base_url = process.env.REACT_APP_SERVER_URL;
        fetch(`${base_url}login`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: this.state.user.usuario, password: this.state.user.senha })
        })
        .then(res => {
            let state = this.state;
            if (!res.ok) {
                state.showMessage = true;
                state.messageText = res.statusText;
                state.messageSeverity = 'error';
                this.setState(state);
                throw Error(res.statusText);
            }

            state.showMessage = false;
            this.setState(state);
            return res.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => console.log(error));
    }
 
    render() {
        const { user, showMessage, messageText, messageSeverity } = this.state;
 
        return (
            <ValidatorForm
                onSubmit={this.handleSubmit}
            >
            <Box>
                <TextValidator 
                    name="usuario" 
                    label="Usuário" 
                    value={user.usuario} 
                    autoComplete="off"
                    fullWidth
                    onChange={this.handleChange}
                    validators={['required', 'minStringLength:5']}
                    errorMessages={['Campo obrigatório', 'Usuário incorreto']} 
                />
            </Box>
            <Box mt={3}>
                <TextValidator 
                    name="senha" 
                    label="Senha"
                    type="password" 
                    value={user.senha} 
                    fullWidth
                    onChange={this.handleChange}
                    validators={['required', 'minStringLength:8']}
                    errorMessages={['Campo obrigatório', 'Senha incorreta']} 
                />
            </Box>
            <Box mt={5}>
                <Button 
                    type="submit" 
                    variant="contained" 
                    fullWidth
                    onClick={this.handleSubmit}
                    color="primary">
                    Entrar
                </Button>
            </Box>
            <Box mt={1}>
                <Button 
                    variant="outlined"
                    fullWidth
                    href="/createaccount">
                    Criar uma conta
                </Button>
            </Box>
            {
                showMessage ? (
                <Box mt={3}>
                    <MuiAlert elevation={6} variant="filled" severity={messageSeverity}>
                        {messageText}
                    </MuiAlert>
                </Box>
                ) : ''
            }
        </ValidatorForm>
        );
    }
}