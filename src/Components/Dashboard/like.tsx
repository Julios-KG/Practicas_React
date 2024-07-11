import { Card, CardActions, CardContent, CardMedia, Typography, IconButton, Box } from "@mui/material";
import { useReducer } from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const initialState = { count: 0 };

function reduce(state: { count: number; }, action: { type: string }) {
    switch (action.type) {
        case 'like':
            return { count: state.count + 1 };
        case 'dislike': 
        if (state.count > 0){
            return { count: state.count - 1 };
        }
        return { count: state.count = 0}
        default:
            throw new Error();
    }
}

const Likes = () => {
    const [state, dispatch] = useReducer(reduce, initialState);
    

    return (
        <>
        <Box 
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh'
        }}
        >
            <Card sx={{ maxWidth: 350 }}>
                <CardMedia
                    sx={{ height: 300 }}
                    image="https://lineadecodigo.com/wp-content/uploads/2023/02/hola-mundo-javascript-3.png"
                    title="codigo jvs"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        Mi primer Hola mundo en JVS
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Les comparto mi primer código que hice y me siento feliz.
                    </Typography>
                </CardContent>
                <CardActions>
                <Typography variant="body2" color="text.secondary" sx={{ marginRight: 1 }}>
                        ¿Es un buen contenido?: {state.count}
                    </Typography>
                    <IconButton onClick={() => dispatch({ type: 'like' })}>
                        <ThumbUpIcon/>
                    </IconButton>
                    <IconButton onClick={() => dispatch({ type: 'dislike' })}>
                        <ThumbDownIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Box>
        </>
    );
}

export default Likes;
