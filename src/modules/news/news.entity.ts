
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';

@Entity('news')
export class News {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column()
    source!: string;

    @Column()
    imageUrl!: string;

    @Column()
    url!: string;

    @Column()
    category!: string;

    @Column()
    country!: string;

    @CreateDateColumn()
    createdAt!: Date;
}
