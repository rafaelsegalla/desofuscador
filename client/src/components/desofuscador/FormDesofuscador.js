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
                    <Input type="file" name="arquivo" />

                    <Typography
                        color="primary"
                        variant="h5">
                        Texto
                    </Typography>
                    <TextareaAutosize rows="10" />
                    
                    <Button color="primary" variant="contained">
                        Enviar
                    </Button>

                </FormGroup>
            </form>
        </div>
    )
}

export default FormDesofuscador;