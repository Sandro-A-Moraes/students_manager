import type { Api } from "../api.js";
import type { Express, Request, Response } from "express";
import express from "express"
import cors from "cors";
import path from "path";

export class ApiExpress implements Api {
    private routes: { method: string; path: string }[] = [];

    private constructor(readonly app: Express){}

    public static build(){
        const app = express();
        app.use(cors());
        app.use(express.json());
        return new ApiExpress(app);
    }

    public addGetRoute(path: string, handle: (req: Request, res: Response) => Promise<void>): void {
        this.app.get(path, handle);
        this.routes.push({ method: 'GET', path });
    }

    public addPostRoute(path: string, handle: (req: Request, res: Response) => Promise<void>): void {
        this.app.post(path, handle);
        this.routes.push({ method: 'POST', path });
    }

    public async start(port: number): Promise<void> {
        return new Promise((resolve) => {
            this.app.listen(port, () => {
                console.log(`Server is running on port ${port}`);
                this.printRoutes();
                resolve();
            });
        });
    }

    private printRoutes() {
        console.log('\n📍 Available Routes:');
        this.routes.forEach(route => {
            console.log(`   ${route.method.padEnd(6)} http://localhost:8000${route.path}`);
        });
        console.log('');
    }
}