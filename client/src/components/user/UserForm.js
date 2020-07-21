import React from 'react';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import { ValidatorForm, TextValidator} from '../../../node_modules/react-material-ui-form-validator';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import { getToken } from '../../auth';

export default class UserForm extends React.Component {
    state = {
        user: (this.props.userObject ? {
            idusuario: this.props.userObject.idusuario,
            nome_proprio: this.props.userObject.nome_proprio,
            usuario: this.props.userObject.usuario,
            senha: this.props.userObject.senha,
            repetirSenha: this.props.userObject.senha,
        } : {
            nome_proprio: '',
            usuario: '',
            senha: '',
            repetirSenha: '',
        }),
        backButton: this.props.backButton,
        isEdit: this.props.isEdit ? this.props.isEdit : false,
        submitHandlerCallback: this.props.submitHandlerCallback ? this.props.submitHandlerCallback : () => {},
        showResult: false,
        showProgress: false,
        disableConfirmButton: false,
        confirmButtonText: this.props.isEdit ? "Salvar" : "Confirmar"
    };

    componentDidMount() {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.user.senha) {
                return false;
            }
            return true;
        });
    }
 
    componentWillUnmount() {
        ValidatorForm.removeValidationRule('isPasswordMatch');
    }
 
    handleChange = (event) => {
        const { user } = this.state;
        user[event.target.name] = event.target.value;
        this.setState({ user });

    }
 
    handleSubmit = () => {
        const { user } = this.state;
        let token = getToken();
        const axios = require('axios');
        const base_url = process.env.REACT_APP_SERVER_URL;
        let currentState = this.state;
        if(this.props.isEdit) {
            // put logic
            const idUsuario = user.idusuario;
            const put_url = base_url + "user/" + idUsuario;
            axios.put(put_url, user, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                if(res.status === 200) {
                    currentState.showResult = true;
                    currentState.resultSeverity = 'success';
                    currentState.resultMessage = 'As informações foram atualizadas!';
                    this.setState(currentState);
                    this.state.submitHandlerCallback();
                }
            })
            .catch((err) => {
                console.error(err);
                currentState.showResult = true;
                currentState.resultSeverity = 'error';
                currentState.resultMessage = 'Ocorreu um erro ao tentar atualizar!';
                this.setState(currentState);
            });
        } else {
            // post logic
            const post_url = base_url + "user/";
            axios.post(post_url, user, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                if(res.status === 200) {
                    currentState.showResult = true;
                    currentState.resultSeverity = 'success';
                    currentState.resultMessage = 'Usuário criado com sucesso!';
                    currentState.showProgress = true;
                    currentState.disableConfirmButton = true;
                    currentState.confirmButtonText = "Redirecionando...";
                    currentState.backButton = false;
                    this.setState(currentState);
                    this.state.submitHandlerCallback();
                    setTimeout(() => window.location = '/', 3200);
                }
            })
            .catch((err) => {
                console.error(err);
                currentState.showResult = true;
                currentState.resultSeverity = 'error';
                currentState.resultMessage = 'Ocorreu um erro ao tentar cadastrar!';
                this.setState(currentState);
            });

        }
    }
    render() {
        const { user, backButton } = this.state;

        return (
            <ValidatorForm
                onSubmit={this.handleSubmit}
                ref="form"
                noValidate
            >
                 {
                     this.state.showResult ? 
                     <Box mt={2} mb={2}>
                        <Alert variant="outlined" severity={this.state.resultSeverity}>
                            {this.state.resultMessage}
                        </Alert>
                     </Box> : ''
                 }
                 <Box>
                    <TextValidator 
                        name="nome_proprio"
                        label="Nome próprio" 
                        autoComplete="off"
                        fullWidth
                        value={user.nome_proprio} 
                        onChange={this.handleChange}
                        validators={['required']}
                        errorMessages={['Campo obrigatório']}
                    />
                </Box>
                <Box mt={3}>
                    <TextValidator 
                        name="usuario"
                        label="Usuário" 
                        autoComplete="off"
                        fullWidth
                        value={user.usuario} 
                        onChange={this.handleChange} 
                        validators={['required', 'minStringLength:5']}
                        errorMessages={['Campo obrigatório', 'Seu usuário de login deve conter no mínimo 5 caracteres']}
                    />
                </Box>
                <Box mt={3}>
                    <TextValidator
                        type="password"
                        name="senha"
                        label="Senha"
                        fullWidth
                        value={user.senha}
                        onChange={this.handleChange}
                        validators={['required', 'minStringLength:8']}
                        errorMessages={['Campo obrigatório', 'A senha é muito fraca']}
                    />
                </Box>
                <Box mt={3}>
                    <TextValidator
                        type="password"
                        name="repetirSenha"
                        label="Confirmar senha"
                        fullWidth
                        value={user.repetirSenha}
                        onChange={this.handleChange}
                        validators={['required', 'isPasswordMatch']}
                        errorMessages={['Campo obrigatório', 'As senhas não correspondem']}
                    />
                </Box>
                
                <Box mt={5}>
                    <Button 
                        type="submit"
                        disabled={this.state.disableConfirmButton}
                        variant="contained" 
                        color="primary"
                        fullWidth>
                        { this.state.confirmButtonText }
                    </Button>
                </Box>
                {
                    this.state.showProgress ?
                        <LinearProgress /> : ''
                }
                { backButton ? (
                    <Box mt={1}>
                        <Button 
                            variant="outlined" 
                            href="/login"
                            fullWidth>
                            Voltar
                        </Button>
                    </Box>
                ) : '' }
            </ValidatorForm>
        );
    }
}