import { MigrationInterface, QueryRunner, Migration, Table } from "typeorm";

export class UsersTable1639687486649 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "Users",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true
          },
          {
            name: "name",
            type: "varchar"
          },
          {
            name: "email",
            type: "varchar"
          },
          {
            name: "_deleted",
            type: "varchar"
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
