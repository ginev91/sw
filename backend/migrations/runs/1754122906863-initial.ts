import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from 'bcrypt';


export class Initial1754122906863 implements MigrationInterface {
    name = 'Initial1754122906863'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', "deactivated" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);

        const password = process.env.DEFAULT_ADMIN_PASSWORD || 'admin123';
        const hashedPassword = await bcrypt.hash(password, 10);
        await queryRunner.query(`
            INSERT INTO "user" (email, password, role, deactivated) 
            VALUES ($1, $2, 'admin', false)
            ON CONFLICT (email) DO NOTHING
        `, ['admin@admin.com', hashedPassword]);

        console.log('Migration completed: User table and admin user created');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    }

}
