import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Korisnik{

    @PrimaryGeneratedColumn()
    id: number;
    korisnicko_ime: string;
    sifra: string;
    ime: string;
    prezime: string;
    


}