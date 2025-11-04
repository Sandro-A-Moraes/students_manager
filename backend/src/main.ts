import dotenv from "dotenv";
dotenv.config();

import { ApiExpress } from "./api/express/api.express.js";
import { StudentController } from "./api/express/controllers/student.controller.js";

function main() {
    const api = ApiExpress.build();

    const controller = StudentController.build();

    api.addGetRoute('/students', controller.getAllStudents)
    api.addGetRoute('/students/:id', controller.getStudentById)
    api.addGetRoute('/students/matricula/:matricula', controller.getStudentByMatricula)
    api.addPostRoute('/students/create', controller.createStudent)

    api.start(8000)
}

main();