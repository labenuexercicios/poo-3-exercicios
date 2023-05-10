import { Hero } from "../models/Hero";
import { HeroDB } from "../type";
import { BaseData } from "./BaseData";

export class HeroDatabase extends BaseData{
    public static TABLE_USERS = "hero"

    public async findHero(q: string | undefined){
        let heroDB
        if(q) {
            const result: Hero[] = await BaseData.connection
            (HeroDatabase.TABLE_USERS).where("name", "LIKE", `%${q}%`)
            heroDB = result
        }else{
            const result: Hero[] = await BaseData.connection
            (HeroDatabase.TABLE_USERS)
            heroDB = result
        }
        return heroDB
    }
    public async findHeroById(id: string){
        const [hero]: Hero[] | undefined[] = await BaseData.connection
        (HeroDatabase.TABLE_USERS).where({id})
        return hero
    }
    public async insertHero(newHeroDB: HeroDB){
        await BaseData.connection(HeroDatabase.TABLE_USERS).insert(newHeroDB)
    }
}