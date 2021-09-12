import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Korisnik } from "./korisnik.entity";
import { Pesma } from "./pesma.entity";

@Entity('komentar')
export class Komentar{

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
    @Column({type: 'text'})
    tekst_komentara: string;
    @ManyToOne(type => Pesma, pesma => pesma.rejtinzi)
    pesma: Pesma;
    @ManyToOne(type => Korisnik, korisnik => korisnik.rejtinzi)
    korisnik: Korisnik;
    @Column({type: 'timestamp'})
    datum: Date;

}