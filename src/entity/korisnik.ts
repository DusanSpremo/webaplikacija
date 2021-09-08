import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('korisnik')
export class Korisnik{

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
    @Column()
    korisnicko_ime: string;
    @Column()
    sifra: string;
    @Column()
    ime: string;
    @Column()
    prezime: string;



}