import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('korisnik')
export class Korisnik{

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
    @Column('text')
    korisnicko_ime: string;
    @Column('text')
    sifra: string;
    @Column('text')
    ime: string;
    @Column('text')
    prezime: string;
}