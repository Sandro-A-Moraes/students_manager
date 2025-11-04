import type {Request, Response} from "express";
import { StudentsRepositoryPrisma } from "../../../repositories/students/prisma/students.repository.prisma.js";
import { prisma } from "../../../util/prisma.util.js";
import { StudentsServiceImplementation } from "../../../services/students/implementation/students.service.implementation.js";

export class StudentController {
    private constructor() {}


    public static build(){
        return new StudentController()
    }

    public async createStudent(request: Request, response: Response) {
        const {nome, idade, email} = request.body

        const studentRepository = StudentsRepositoryPrisma.build(prisma)
        const studentService = StudentsServiceImplementation.build(studentRepository)

        const output = await studentService.createStudent(nome, idade, email)

        const data = {
            id: output.id,
            matricula: output.matricula,
            nome: output.nome,
            idade: output.idade,
            email: output.email
        }
        
        response.status(201).json(data).send();
    }

    public async getAllStudents(request: Request, response: Response) {
        const studentRepository = StudentsRepositoryPrisma.build(prisma)
        const studentService = StudentsServiceImplementation.build(studentRepository)
        const output = await studentService.getAllStudents()

        const data = {
            students: output.students
        }
        response.status(200).json(data).send();
    }

    public async getStudentById(request: Request, response: Response) {
        const { id } = request.params;
        
        if (!id) {
            response.status(400).json({ message: "ID is required" });
            return;
        }
        
        const studentRepository = StudentsRepositoryPrisma.build(prisma)
        const studentService = StudentsServiceImplementation.build(studentRepository)
        const output = await studentService.getStudentById(id)
        
        if (!output) {
            response.status(404).json({ message: "Student not found" });
            return;
        }
        
        response.status(200).json(output);
    }

    public async getStudentByMatricula(request: Request, response: Response) {
        const { matricula } = request.params;
        
        if (!matricula) {
            response.status(400).json({ message: "Matricula is required" });
            return;
        }
        
        const studentRepository = StudentsRepositoryPrisma.build(prisma)
        const studentService = StudentsServiceImplementation.build(studentRepository)
        const output = await studentService.getStudentByMatricula(matricula)
        
        if (!output) {
            response.status(404).json({ message: "Student not found" });
            return;
        }
        
        response.status(200).json(output);
    }

    
}