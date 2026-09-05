CREATE TYPE "RoleType" AS ENUM ('SADMIN', 'ADMIN', 'USUARIO');

CREATE TABLE "Role" (
  "id" UUID NOT NULL,
  "nombre" TEXT NOT NULL,
  "tipo" "RoleType" NOT NULL DEFAULT 'USUARIO',
  "permisos" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "tenantId" UUID,
  "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updateAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Role_nombre_tenantId_key" ON "Role"("nombre", "tenantId");
ALTER TABLE "Role" ADD CONSTRAINT "Role_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "User" ADD COLUMN "roleId" UUID;
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

INSERT INTO "Role" ("id", "nombre", "tipo", "permisos", "tenantId", "updateAt")
SELECT gen_random_uuid(), 'Administrador', 'ADMIN', ARRAY[]::TEXT[], "id", CURRENT_TIMESTAMP FROM "Tenant";

UPDATE "User" u SET "roleId" = r."id"
FROM "Role" r WHERE r."tenantId" = u."tenantId" AND r."tipo" = 'ADMIN';

INSERT INTO "Role" ("id", "nombre", "tipo", "permisos", "tenantId", "updateAt")
VALUES (gen_random_uuid(), 'Superadministrador', 'SADMIN', ARRAY[]::TEXT[], NULL, CURRENT_TIMESTAMP);

UPDATE "User" SET "roleId" = (
  SELECT "id" FROM "Role" WHERE "tipo" = 'SADMIN' AND "tenantId" IS NULL LIMIT 1
) WHERE "tenantId" IS NULL;
