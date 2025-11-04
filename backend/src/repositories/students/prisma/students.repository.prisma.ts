import type { PrismaClient } from "../../../generated/prisma/client.js";
import { StudentEntity } from "../../../entities/student.js";
import type { StudentRepository } from "../students.repository.js";

export class StudentsRepositoryPrisma implements StudentRepository {

    private constructor(readonly prisma: PrismaClient) {}

    public static build(prisma: PrismaClient){
        return new StudentsRepositoryPrisma(prisma)
    }

    public async save(student: StudentEntity): Promise<void> {
        const emailValue = student.getEmail();
        const data = {
            id: student.getId(),
            matricula: student.getMatricula(),
            nome: student.getNome(),
            idade: student.getIdade(),
            ...(emailValue && { email: emailValue })
        }

        await this.prisma.student.create({
            data
        });
    }
    public async findById(id: string): Promise<StudentEntity | null> {
        const student = await this.prisma.student.findUnique({
            where: { id }
        });

        if (!student) {
            return null;
        }
        return StudentEntity.with(
            student.id,
            student.matricula,
            student.nome,
            student.idade,
            student.email || undefined
        );
    }
    public async findByMatricula(matricula: string): Promise<StudentEntity | null> {

        const student = await this.prisma.student.findUnique({
            where: { matricula }
        });

        if (!student) {
            return null;
        }
        return StudentEntity.with(
            student.id,
            student.matricula,
            student.nome,
            student.idade,
            student.email || undefined
        );
    }
    public async findAll(): Promise<StudentEntity[]> {
        const students = await this.prisma.student.findMany();
        const studentsList: StudentEntity[] = students.map((student: any) => {
            return StudentEntity.with(
                student.id,
                student.matricula,
                student.nome,
                student.idade,
                student.email || undefined
            );
        });
        return studentsList;
    }
    public async update(student: StudentEntity): Promise<void> {
        const emailValue = student.getEmail();
        const data = {
            matricula: student.getMatricula(),
            nome: student.getNome(),
            idade: student.getIdade(),
            ...(emailValue && { email: emailValue })
        }

        await this.prisma.student.update({
            where: { id: student.getId() },
            data
        })
    }

}