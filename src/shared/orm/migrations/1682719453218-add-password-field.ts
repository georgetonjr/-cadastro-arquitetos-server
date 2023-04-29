import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordField1682719453218 implements MigrationInterface {
    name = 'AddPasswordField1682719453218'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "architect" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "architect" DROP COLUMN "password"`);
    }

}
