import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";


type UserData = {
    email: string,
    name: string,
    cipheredPassword: string
};

@Entity("user")
class User {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    @Index()
    public email: string;

    @Column()
    public name: string;

    @Column({ name: "ciphered_password" })
    public cipheredPassword: string;

    constructor(data?: UserData) {
        this.id = 0;
        this.email = data && data.email || "";
        this.name = data && data.name || "";
        this.cipheredPassword = data && data.cipheredPassword || "";
    }
}


export default User;
