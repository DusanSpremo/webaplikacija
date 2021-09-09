import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}