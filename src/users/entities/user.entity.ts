import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;


    @Column({default:'user'})
    rol:string;
    // @Column({ type: 'enum', default: Role.USER, enum: Role })
    // role: Role;

    @DeleteDateColumn()
    deletedAt: Date;
}
