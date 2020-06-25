import React from 'react';
import { FormGroup, Typography, Input, Button, TextareaAutosize  }  from '@material-ui/core/';

function FormDesofuscador() {
    return (
        <div>
            <form 
                action="http://localhost:8081/upload" 
                method="POST"
                encType="multipart/form-data">
                <FormGroup>
                    <Typography
                        color="primary"
                        variant="h5">
                        Importar arquivo
                    </Typography>                    
                    <Input type="file" id="arquivo" name="arquivo"/>

                    <Typography
                        color="primary"
                        variant="h5">
                        Texto
                    </Typography>
                    <TextareaAutosize rows="10" name="desofusca_texto" id="desofusca_texto" />
                    
                    <Button color="primary" variant="contained" type="submit">
                        Enviar
                    </Button>

                </FormGroup>
            </form>
        </div>
    )
}

export default FormDesofuscador;