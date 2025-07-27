import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from 'bcrypt';


export class Initial1753571127502 implements MigrationInterface {
    name = 'Initial1753571127502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" "public"."user_role_enum" NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "deactivated" boolean NOT NULL DEFAULT false`);

        const password = process.env.DEFAULT_ADMIN_PASSWORD;
        const hashedPassword = await bcrypt.hash(password, 10);
        await queryRunner.query(
            `INSERT INTO "user" (email, password, role, deactivated) VALUES ('admin@admin.com', '${hashedPassword}', 'admin', false)`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deactivated"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    }

}
