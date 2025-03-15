import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAttendance1742005616039 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        CREATE TABLE "attendance" (
          "id" SERIAL PRIMARY KEY, -- Menggunakan SERIAL untuk auto-increment
          "location" varchar(255) NOT NULL,
          "ipAddress" varchar(255) NOT NULL,
          "photo" text NOT NULL,
          "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP,
          "userId" uuid REFERENCES "user"("id") ON DELETE CASCADE
        )
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "attendance"`);
    }

}
