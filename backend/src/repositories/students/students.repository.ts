import type { StudentEntity } from "../../entities/student.js";

export interface StudentRepository {
    save(student: StudentEntity): Promise<void>;
    findById(id: string): Promise<StudentEntity | null>;
    findByMatricula(matricula: string): Promise<StudentEntity | null>;
    findAll(): Promise<StudentEntity[]>;
    update(student: StudentEntity): Promise<void>;
}