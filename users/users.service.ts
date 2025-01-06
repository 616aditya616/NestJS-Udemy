import { Injectable , NotFoundException} from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { user } from "./user.entity";

@Injectable() //done so we dont need to import this manually
export class UsersService {
    constructor(@InjectRepository(user) private repo:Repository<user>){}
    create(email: string , password: string){
        const user = this.repo.create({email,password})
        return this.repo.save(user)
    }
    findOne(id:number){
        return this.repo.findOne(id);
    }

    find(email: string){
        return this.repo.find({email});

    }
    async update(id:number,attrs:Partial<user>){
        const user = await this.findOne(id)
        if(!user){
            throw new NotFoundException('User not found')
        }
        Object.assign(user,attrs)
        return this.repo.save(user)
    }
    async remove(id: number){
        const user = await this.findOne(id)
        if (!user){
            throw new NotFoundException("User not found")
        }
        return this.repo.remove(user)
    }
}