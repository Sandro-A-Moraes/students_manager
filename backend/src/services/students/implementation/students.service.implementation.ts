import type { StudentRepository } from "../../../repositories/students/students.repository.js";
import type { CreateStudentOutputDto, GetAllStudentsOutputDto, GetStudentByIdOutputDto, GetStudentByMatriculaOutputDto, StudentService, UpdateStudentEmailOutputDto } from "../students.service.js";
import { StudentEntity } from "../../../entities/student.js";

export class StudentsServiceImplementation implements StudentService {

    private constructor(readonly repository: StudentRepository) {}

    public static build(repository: StudentRepository){
        return new StudentsServiceImplementation(repository);
    }

    public async createStudent(nome: string, idade: number, email?: string): Promise<CreateStudentOutputDto> {
        // Verificar se já existe estudante com o mesmo email
        if (email) {
            const existingStudents = await this.repository.findAll();
            const emailExists = existingStudents.some(s => s.getEmail() === email);
            if (emailExists) {
                throw new Error(`Student with email ${email} already exists`);
            }
        }
        
        const student = StudentEntity.create(nome, idade, email);
        await this.repository.save(student);
        
        const emailValue = student.getEmail();
        const output: CreateStudentOutputDto = {
            id: student.getId(),
            matricula: student.getMatricula(),
            nome: student.getNome(),
            idade: student.getIdade(),
            ...(emailValue && { email: emailValue })
        };
        
        return output;
    }
    public async getStudentById(id: string): Promise<GetStudentByIdOutputDto | null> {
        const student = await this.repository.findById(id);
        if (!student) return null;
        
        const emailValue = student.getEmail();
        const output: GetStudentByIdOutputDto = {
            id: student.getId(),
            matricula: student.getMatricula(),
            nome: student.getNome(),
            idade: student.getIdade(),
            ...(emailValue && { email: emailValue })
        };
        
        return output;
    }

    public async getStudentByMatricula(matricula: string): Promise<GetStudentByMatriculaOutputDto | null> {
        const student = await this.repository.findByMatricula(matricula);
        if (!student) return null;
        
        const emailValue = student.getEmail();
        const output: GetStudentByMatriculaOutputDto = {
            id: student.getId(),
            matricula: student.getMatricula(),
            nome: student.getNome(),
            idade: student.getIdade(),
            ...(emailValue && { email: emailValue })
        };
        
        return output;
    }

    public async getAllStudents(): Promise<GetAllStudentsOutputDto> {
        const students = await this.repository.findAll();
        
        const output: GetAllStudentsOutputDto = {
            students: students.map(student => {
                const emailValue = student.getEmail();
                return {
                    id: student.getId(),
                    matricula: student.getMatricula(),
                    nome: student.getNome(),
                    idade: student.getIdade(),
                    ...(emailValue && { email: emailValue })
                };
            })
        };
        
        return output;
    }

    public async updateStudentEmail(id: string, email: string): Promise<UpdateStudentEmailOutputDto> {
        const student = await this.repository.findById(id);
        if (!student) {
            return { success: false };
        }
        
        student.setEmail(email);
        await this.repository.update(student);
        
        const output: UpdateStudentEmailOutputDto = { success: true };
        return output;
    }
}