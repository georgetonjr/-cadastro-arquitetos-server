import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueConstrainst1682718979069 implements MigrationInterface {
    name = 'AddUniqueConstrainst1682718979069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "architect" ADD CONSTRAINT "UQ_4522b02e5d1488e4b34da9daf98" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "UQ_fdb2f3ad8115da4c7718109a6eb" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "UQ_fdb2f3ad8115da4c7718109a6eb"`);
        await queryRunner.query(`ALTER TABLE "architect" DROP CONSTRAINT "UQ_4522b02e5d1488e4b34da9daf98"`);
    }

}
