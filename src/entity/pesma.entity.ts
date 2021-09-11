import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Korisnik } from "./korisnik.entity";
import { RejtingPesme } from "./rejting_pesme.entity";

@Entity('pesma')
export class Pesma{

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
    @Column('text')
    naziv_pesme: string;
    @Column('text')
    naziv_izvodjaca: string;
    @Column('text')
    ime_autora: string;
    @Column('text')
    tekst: string;
    @ManyToOne(type => Korisnik, korisnik => korisnik.pesme, {eager : true})
    korisnik: Korisnik;
    @OneToMany(type => RejtingPesme, rejtingPesme => rejtingPesme.pesma)
    rejtinzi: RejtingPesme[];
}