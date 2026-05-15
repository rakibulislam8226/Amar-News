import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';

@Entity('user_news')
export class UserNews {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    userId!: string;

    @Column()
    newsId!: string;

    @Column({
        default: false,
    })
    isRead!: boolean;

    @Column({
        default: false,
    })
    isBookmarked!: boolean;

    @CreateDateColumn()
    createdAt!: Date;
}
