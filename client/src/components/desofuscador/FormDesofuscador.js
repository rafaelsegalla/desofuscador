import React, { useState } from 'react';
import { FormGroup, Typography, Button, TextareaAutosize, Container, Box }  from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
    modal: {
      overflow: 'auto'
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2, 6, 4),
      fontFamily: "monospace",
      width: '50%',
      margin: "auto",
      marginTop: "15px",
      marginBottom: "10px"
    },
    textarea: {
    width: '100%',
    },
}));

function FormDesofuscador() {
    const base_url = process.env.REACT_APP_SERVER_URL;

    const classes = useStyles();
    const [open, setOpen] = useState(0);
    const [filePath, setFilePath] = useState(0);
    const [text, setText] = useState(0);
    const [fileDownload, setFileDownload] = useState(0);
    const [openErrorModal, setOpenErrorModal] = useState(0);
    const [error, setError] = useState(0);
  
    const handleOpen = () => {
        setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
    };
  
    const handleOpenErrorModal = () => {
        setOpenErrorModal(true);
    };
  
    const handleCloseErrorModal = () => {
        setOpenErrorModal(false);
    };

    const handleSubmit = ev => {
        ev.preventDefault();
        const arquivo = document.getElementById('arquivo');
        const desofusca_texto = document.getElementById('desofusca_texto');

        const formData = new FormData();
        formData.append("arquivo", arquivo.files[0]);
        formData.append("desofusca_texto", desofusca_texto.value);

        const url = base_url + 'upload';
        const req = new XMLHttpRequest();

        req.onreadystatechange = () => {
            if (req.readyState == XMLHttpRequest.DONE) {
                if (req.status === 200) {
                    let json = JSON.parse(req.responseText);
                
                    let downloadUrl = '';
                    if (json.filePath !== '') {
                        downloadUrl = `${base_url}download?filePath=${json.filePath}`;
                    }
                    if (json.originalname !== '') {
                        downloadUrl += `&originalName=${json.originalname}`;
                    }
                    setText(json.txt);
                    if (downloadUrl !== '') {
                        setFileDownload(1);
                    } else {
                        setFileDownload(0);
                    }
                    setFilePath(downloadUrl);
                    handleOpen();
                } else {
                    let responseJson = JSON.parse(req.response);
                    setError(responseJson.message);
                    handleOpenErrorModal();
                }
            }
        };

        req.open('POST', url);
        req.send(formData);
    };

    const handleDownload = () => {
        window.open(filePath, '_parent', 'download');
    };

    const handleDesofuscarOutro = () => {
        handleClose();
        document.getElementById('arquivo').value = '';
        document.getElementById('desofusca_texto').value = '';
    }

    return (
        <Box mt={"5%"}>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openErrorModal}
                onClose={handleCloseErrorModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={openErrorModal}>
                    <div className={classes.paper}>
                        <FormGroup>
                            <Typography
                                color="error"
                                variant="h6"
                                align="center">
                                {error}
                            </Typography>
                            <Box mt={"45px"} display="flex" alignItems="center" justifyContent="center">
                                <Button 
                                    color="primary"
                                    variant="contained"
                                    onClick={handleCloseErrorModal}>
                                    Ok
                                </Button>
                            </Box>
                        </FormGroup>
                    </div>
                </Fade>
            </Modal>
             <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className={classes.paper}>
                    <FormGroup>
                        <Typography
                            color="primary"
                            variant="h5"
                            align="center">
                            Resultado
                        </Typography>
                        {
                            fileDownload ? 
                            <Box mt={"45px"} display="flex" alignItems="center" justifyContent="center">
                            <Button 
                                color="primary"
                                variant="contained"
                                onClick={handleDownload}>
                                Baixar o arquivo
                            </Button></Box> : ''
                        }
                        {
                            (text !== '') ?
                            <Box mt={"45px"}>
                                <TextareaAutosize 
                                    rows="10"
                                    className={classes.textarea}
                                    value={text} />
                            </Box> : ''
                        }
                        <Box mt={"45px"}/>
                        <Button 
                            color="default"
                            variant="contained"
                            type="submit"
                            onClick={handleDesofuscarOutro}>
                            Desofuscar outro
                        </Button>
                    </FormGroup>
                </div>
                </Fade>
            </Modal>
            <Container maxWidth="lg">
                <form 
                    method="POST"
                    onSubmit={handleSubmit}
                    encType="multipart/form-data">
                    <FormGroup>
                        <Typography
                            color="primary"
                            variant="h5">
                            Importar arquivo
                        </Typography>                    
                        
                        <input 
                            type="file"
                            id="arquivo"
                            name="arquivo"
                            accept=".txt,.log"/>

                        <Box mt={"45px"}/>

                        <Typography
                            color="primary"
                            variant="h5">
                            Inserir texto
                        </Typography>
                        
                        <TextareaAutosize 
                            rows="10"
                            name="desofusca_texto"
                            id="desofusca_texto" />
                        <Box mt={"45px"}/>
                        <Button 
                            color="primary"
                            variant="contained"
                            type="submit">
                            Desofuscar
                        </Button>

                    </FormGroup>
                </form>
            </Container>
        </Box>
    )
}

export default FormDesofuscador;