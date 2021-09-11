export class KorisnikInfo {
    korisnickoIme: string
    ime: string
    prezime: string
    email: string;

    constructor(korisnickoIme:string, ime: string, prezime: string, email: string) {
        this.korisnickoIme = korisnickoIme;
        this.ime = ime;
        this.prezime = prezime;
        this.email = email;
    }
}