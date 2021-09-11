import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Korisnik } from "./korisnik.entity";
import { Pesma } from "./pesma.entity";

@Entity('rejting_pesme')
export class RejtingPesme{

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
    @Column({type: 'int'})
    rejting: number;
    @ManyToOne(type => Pesma, pesma => pesma.rejtinzi)
    pesma: Pesma;
    @ManyToOne(type => Korisnik, korisnik => korisnik.rejtinzi)
    korisnik: Korisnik;
}