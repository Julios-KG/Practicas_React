import React, { useState, useMemo, useCallback } from 'react';
import { Container, Grid, TextField, Button, Card, CardHeader, CardContent, Typography } from '@mui/material';

export interface IComentario {
    id: number;
    usuario: string;
    contenido: string;
    fecha: string;
}

const BlogDetalle = () => {
    const comentariosArr: IComentario[] = [
        {
            id: 1,
            usuario: 'Usuario 1',
            contenido: 'Comentario 1',
            fecha: '2021-10-01'
        },
        {
            id: 2,
            usuario: 'Usuario 2',
            contenido: 'Comentario 2',
            fecha: '2021-10-02'
        }
    ];
    const [comentarios, setComentarios] = useState<IComentario[]>(comentariosArr);

    const addComentario = useCallback((comentario: IComentario) => {
        setComentarios((comentarios) => [...comentarios, comentario]);
    }, []);

    let ComentariosHtml = useMemo(() => {
        return comentarios.map((comentario) => buildComentario(comentario));
    }, [comentarios]);

    const id = window.location.href.split('/').pop();

    const agregarComentario = () => {
        const comentario = {
            id: comentarios.length + 1,
            usuario: 'Yo mero',
            contenido: comentarioInput,
            fecha: '2021-10-01'
        };

        addComentario(comentario);
        setComentarioInput(''); // Limpiar el campo después de agregar el comentario
    };

    const [comentarioInput, setComentarioInput] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComentarioInput(e.target.value);
    };

    return (
        <Container>
            <Typography variant="h1">Publicación {id}</Typography>
            <Grid container spacing={3}>
                {ComentariosHtml}
            </Grid>
            <Grid container spacing={3} id="formulario">
                <Grid item xs={12} md={6}>
                    <TextField
                        name="comentario"
                        label="Comentario"
                        placeholder="Escribe lo que estás pensando"
                        fullWidth
                        value={comentarioInput}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button variant="contained" color="primary" onClick={agregarComentario}>
                        Comentar
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

const buildComentario = (comentario: IComentario) => {
    const { id, usuario = 'Yo mero', contenido, fecha } = comentario;
    return (
        <Grid item xs={12} key={id}>
            <Card>
                <CardHeader title={usuario} />
                <CardContent>
                    <Typography variant="body1">{contenido}</Typography>
                    <Typography variant="body2">{fecha}</Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default BlogDetalle;
