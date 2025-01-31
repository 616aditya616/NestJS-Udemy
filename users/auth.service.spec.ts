import { Test } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { AuthService } from "./auth.service";
import { defaultMaxListeners } from "node:events";
import { user } from "./user.entity";
import { CustomRepositoryDoesNotHaveEntityError } from "typeorm";

beforeEach(async()=> {
    const fakeUsersService:Partial<UsersService> = {
        find: () =>Promise.resolve([]),
        create: (email:string,password:string) => Promise.resolve({id:1,email,password} as user)
    }
   
    const module = await Test.createTestingModule({
        providers:[AuthService,
            {
                provide: UsersService,
                useValue: fakeUsersService 
            }
        ]
    }).compile()

    const service = module.get(AuthService)
})

it('can create an instance of auth service',async ()=> {
 
    expect(service).toBeDefined()
})

it('creates a new user with a salted and hashed password'),async ()=>{
    const user = await service.signup('asdf@ASFD.COM','asdf')
    expect(user.password).not.toEqual('asdf');
    const [salt,hash] = user.password.split('.')
    expect(salt).toBeDefined();
    expect(hash).toBeDefined()
}