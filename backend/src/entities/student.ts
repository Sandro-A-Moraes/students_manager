export type StudentProps = {
  id: string;
  matricula: string;
  nome: string;
  idade: number;
  email?: string;
}

export class StudentEntity {
    private constructor(readonly props: StudentProps) {}

    public static create(nome: string, idade: number, email?: string){ 
        return new StudentEntity({
            id: crypto.randomUUID().toString(),
            matricula: `${Math.floor(100000 + Math.random() * 900000)}`,
            nome,
            idade,
            ...(email && { email })
        });
    }

    public static with(id: string, matricula: string, nome: string, idade: number, email?: string){
        return new StudentEntity({
            id,
            matricula,
            nome,
            idade,
            ...(email && { email })
        });
    }

    public getId(){
        return this.props.id;
    }
    public getMatricula(){
        return this.props.matricula;
    }
    public getNome(){
        return this.props.nome;
    }
    public getIdade(){
        return this.props.idade;
    }

    public getEmail(){
        return this.props.email;
    }

    public setEmail(email: string){
        this.props.email = email;
    }
}