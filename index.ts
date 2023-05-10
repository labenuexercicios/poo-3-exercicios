import express, {Request, Response} from 'express'
import cors from 'cors'
import { HeroController } from './HeroController/HeroController'

const app = express()
app.use(cors())
app.use(express.json())
const port = 3003
app.listen(port, ()=>{
    console.log(`servidor rodando na porta ${port}...`);
})
app.get('/eita', async (req: Request, res: Response) =>{
    try {
         res.status(200).send({message: "preula"})
    } catch (error) {
        console.log(error);
        if(req.statusCode === 200){
            res.status(500)
        }
        if(error instanceof  Error){
            res.send(error.message)
        }else{
            res.send("erro inesperado")
        }
    }
})
const heroController = new HeroController

app.get("/hero", heroController.getHero)
app.post("/hero", heroController.createUser)