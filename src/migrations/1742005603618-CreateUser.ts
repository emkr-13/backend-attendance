import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1742005603618 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
              "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
              "username" varchar(255) NOT NULL UNIQUE,
              "password" varchar(255) NOT NULL,
              "fullName" varchar(255),
              "position" varchar(255)
            )
          `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
