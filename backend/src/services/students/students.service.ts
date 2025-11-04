export type CreateStudentOutputDto = {
    id: string;
    matricula: string;
    nome: string;
    idade: number;
    email?: string;
};

export type GetStudentByIdOutputDto = {
    id: string;
    matricula: string;
    nome: string;
    idade: number;
    email?: string;
};

export type GetStudentByMatriculaOutputDto = {
    id: string;
    matricula: string;
    nome: string;
    idade: number;
    email?: string;
};

export type GetAllStudentsOutputDto = {
    students: {
        id: string;
        matricula: string;
        nome: string;
        idade: number;
        email?: string;
    }[];
};

export type UpdateStudentEmailOutputDto = {
    success: boolean;
};

export interface StudentService {
    createStudent(nome: string, idade: number, email?: string): Promise<CreateStudentOutputDto>;
    getStudentById(id: string): Promise<GetStudentByIdOutputDto | null>;
    getStudentByMatricula(matricula: string): Promise<GetStudentByMatriculaOutputDto | null>;
    getAllStudents(): Promise<GetAllStudentsOutputDto>;
    updateStudentEmail(id: string, email: string): Promise<UpdateStudentEmailOutputDto>;
}