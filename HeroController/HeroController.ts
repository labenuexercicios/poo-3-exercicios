import { Request, Response } from "express"
import { HeroDatabase } from "../database/HeroDatabase"
import { Hero } from "../models/Hero"
import { HeroDB } from "../type"



export class HeroController {
    public getHero = async (req: Request, res: Response) => {

        try {
            const q = req.query.q as string | undefined
            const heroDatabase = new HeroDatabase()
            const heroDBexist = await heroDatabase.findHero(q)

            const hero: Hero[] = heroDBexist.map((heroDB) => new Hero(
                heroDB.id,
                heroDB.vida,
                heroDB.forca,
                heroDB.name
            ))
            res.status(200).send(hero)


        } catch (error) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }



    public createUser = async (req: Request, res: Response) => {
        try {
            const { id, vida, forca, name } = req.body
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id'deve ser string")
            }
            if (typeof vida !== "string") {
                throw new Error("'vida' deve ser string")
            }
            if (typeof forca !== "string") {
                throw new Error("'forca' deve ser string")
            }
            if (typeof name !== "string") {
                throw new Error("'name' deve ser string");
            }

            const heroDatabase = new HeroDatabase()
            const heroDBexist = await heroDatabase.findHeroById(id)

            if (heroDBexist) {
                res.status(400)
                throw new Error("'id' já existe")
            }
            const newHero = new Hero(
                id,
                vida,
                forca,
                name
            )
            const newHeroDB: HeroDB = {
                id: newHero.getId(),
                vida: newHero.getVida(),
                forca: newHero.getForca(),
                name: newHero.getname()
            }
            await heroDatabase.insertHero(newHeroDB)
            res.status(201).send(newHero)
        } catch (error) {
            console.log(error);
            if (req.statusCode === 200) {
                res.status(500)
            }
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("erro inesperado")
            }
        }
    }
}