/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDb1682796406432 implements MigrationInterface {
  name = 'InitDb1682796406432';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "architect" ("id" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "gender" character varying NOT NULL, "age" integer NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_4522b02e5d1488e4b34da9daf98" UNIQUE ("email"), CONSTRAINT "PK_54557cabef3d97c2c1fb9facccd" PRIMARY KEY ("id"))');
    await queryRunner.query('CREATE TABLE "customer" ("id" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "gender" character varying NOT NULL, "age" integer NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fdb2f3ad8115da4c7718109a6eb" UNIQUE ("email"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))');
    await queryRunner.query('CREATE TABLE "order_service" ("id" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "show" character varying NOT NULL DEFAULT true, "rejectedBy" character varying array NOT NULL DEFAULT \'{}\', "title" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "status" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "architect_id" character varying, "customer_id" character varying, CONSTRAINT "PK_d33d62cc4f08f6bd10dd7a68f65" PRIMARY KEY ("id"))');
    await queryRunner.query('ALTER TABLE "order_service" ADD CONSTRAINT "FK_29c694b2f41a4c6bcaae833e780" FOREIGN KEY ("architect_id") REFERENCES "architect"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "order_service" ADD CONSTRAINT "customer_id" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "order_service" DROP CONSTRAINT "customer_id"');
    await queryRunner.query('ALTER TABLE "order_service" DROP CONSTRAINT "FK_29c694b2f41a4c6bcaae833e780"');
    await queryRunner.query('DROP TABLE "order_service"');
    await queryRunner.query('DROP TABLE "customer"');
    await queryRunner.query('DROP TABLE "architect"');
  }

}
