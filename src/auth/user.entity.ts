import { Task } from "../tasks/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    // eager = semmelhante ao prefetch related do django
    @OneToMany(_type => Task, task => task.user, { eager: true })
    tasks: Task[];
}