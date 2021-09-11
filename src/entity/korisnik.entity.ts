import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Pesma } from "./pesma.entity";
import { RejtingPesme } from "./rejting_pesme.entity";

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
    @Column('text')
    email: string;
    @OneToMany(type => Pesma, pesma => pesma.korisnik)
    pesme: Pesma[];
    @OneToMany(type => RejtingPesme, rejtingPesme => rejtingPesme.korisnik)
    rejtinzi: RejtingPesme[];
}