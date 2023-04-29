import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeIdGenerateMethod1682729390814 implements MigrationInterface {
    name = 'ChangeIdGenerateMethod1682729390814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "architect" DROP CONSTRAINT "PK_54557cabef3d97c2c1fb9facccd"`);
        await queryRunner.query(`ALTER TABLE "architect" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "architect" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "architect" ADD CONSTRAINT "PK_54557cabef3d97c2c1fb9facccd" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "architect" DROP CONSTRAINT "PK_54557cabef3d97c2c1fb9facccd"`);
        await queryRunner.query(`ALTER TABLE "architect" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "architect" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "architect" ADD CONSTRAINT "PK_54557cabef3d97c2c1fb9facccd" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id")`);
    }

}
