import { UseInterceptors,NestInterceptor,ExecutionContext,CallHandler, Next } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs";
import { plainToClass} from 'class-transformer'
import { UserDto } from "users/user.dto";

interface ClassConstructor {
    new (...args: any[]): {}
}

export function Serialize(dto:any) {
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto : any){}
    intercept(context:ExecutionContext,handler: CallHandler): Observable<any>{

        //before request is recieved
    return handler.handle().pipe(
        map((data:any)=>{
            //before response is sent
            return plainToClass(this.dto,data,{
                excludeExtraneousValues:true
            })
        })
    )
    }
}