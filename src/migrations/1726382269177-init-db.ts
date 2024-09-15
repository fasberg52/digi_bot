import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDb1726382269177 implements MigrationInterface {
  name = 'InitDb1726382269177';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sessions" ("id" BIGSERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "userId" bigint NOT NULL, "device" json NOT NULL DEFAULT '[]', "token" text NOT NULL, "expiredTime" date NOT NULL, CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."transactions_status_enum" AS ENUM('VERIFIED', 'CANCELLED', 'PENDING')`,
    );
    await queryRunner.query(
      `CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "refId" integer, "status" "public"."transactions_status_enum" NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "userId" bigint NOT NULL, "subscribeId" bigint NOT NULL, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."subscribe_status_enum" AS ENUM('ACTIVE', 'INACTIVE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "subscribe" ("id" BIGSERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "title" character varying(255) NOT NULL, "description" text, "price" integer NOT NULL, "discount" integer, "start" TIMESTAMP WITH TIME ZONE, "end" TIMESTAMP WITH TIME ZONE, "validityDuration" integer NOT NULL, "status" "public"."subscribe_status_enum" NOT NULL DEFAULT 'ACTIVE', "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_3e91e772184cd3feb30688ef1b8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_subscription" ("id" BIGSERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "userId" bigint NOT NULL, "subscriptionId" bigint NOT NULL, "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_ec4e57f4138e339fb111948a16f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "api_keys" ("id" BIGSERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "apiKey" uuid NOT NULL DEFAULT uuid_generate_v4(), "active" boolean NOT NULL DEFAULT true, "userId" bigint, CONSTRAINT "PK_5c8a79801b44bd27b79228e1dad" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'user')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" BIGSERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying, "password" character varying, "phone" character varying NOT NULL, "telegramId" bigint, "userName" character varying, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_996b8e3632e1454660a2dc850c1" FOREIGN KEY ("subscribeId") REFERENCES "subscribe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_6bb58f2b6e30cb51a6504599f41" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_subscription" ADD CONSTRAINT "FK_a7575d9d46b42a9d7f275be1ec4" FOREIGN KEY ("subscriptionId") REFERENCES "subscribe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_subscription" ADD CONSTRAINT "FK_403d98d1638533c09f9b185929b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "api_keys" ADD CONSTRAINT "FK_6c2e267ae764a9413b863a29342" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "api_keys" DROP CONSTRAINT "FK_6c2e267ae764a9413b863a29342"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_subscription" DROP CONSTRAINT "FK_403d98d1638533c09f9b185929b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_subscription" DROP CONSTRAINT "FK_a7575d9d46b42a9d7f275be1ec4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_6bb58f2b6e30cb51a6504599f41"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_996b8e3632e1454660a2dc850c1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" DROP CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TABLE "api_keys"`);
    await queryRunner.query(`DROP TABLE "user_subscription"`);
    await queryRunner.query(`DROP TABLE "subscribe"`);
    await queryRunner.query(`DROP TYPE "public"."subscribe_status_enum"`);
    await queryRunner.query(`DROP TABLE "transactions"`);
    await queryRunner.query(`DROP TYPE "public"."transactions_status_enum"`);
    await queryRunner.query(`DROP TABLE "sessions"`);
  }
}
