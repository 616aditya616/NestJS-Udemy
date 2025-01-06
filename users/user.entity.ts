import {AfterInsert,AfterUpdate,AfterRemove,Entity,Column,PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class user {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;

    @Column()
    password: string;

    @AfterInsert()
    logInsert() {
        console.log("Inserted User with ID",this.id)
    }
    @AfterUpdate()
    logUpdate() {
        console.log('Updated User with ID',this.id)
    }
    @AfterRemove()
    logRemove(){
       console.log('Removed user with ID'),this.id 
    }
}