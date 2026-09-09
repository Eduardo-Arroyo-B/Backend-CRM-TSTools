ALTER TABLE "Orders" ADD COLUMN "folio" INTEGER;

-- Conserva el orden histórico y numera cada compañía desde 1.
WITH numbered_orders AS (
  SELECT
    "id",
    ROW_NUMBER() OVER (
      PARTITION BY "tenantId"
      ORDER BY "createAt" ASC, "id" ASC
    )::INTEGER AS "tenantFolio"
  FROM "Orders"
  WHERE "tenantId" IS NOT NULL
)
UPDATE "Orders" AS orders
SET "folio" = numbered_orders."tenantFolio"
FROM numbered_orders
WHERE orders."id" = numbered_orders."id";

CREATE UNIQUE INDEX "Orders_tenantId_folio_key"
ON "Orders"("tenantId", "folio");

CREATE TABLE "TenantOrderCounter" (
  "tenantId" UUID NOT NULL,
  "nextValue" INTEGER NOT NULL DEFAULT 1,
  CONSTRAINT "TenantOrderCounter_pkey" PRIMARY KEY ("tenantId")
);

ALTER TABLE "TenantOrderCounter"
ADD CONSTRAINT "TenantOrderCounter_tenantId_fkey"
FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

-- El próximo folio continúa después del mayor folio histórico de cada tenant.
INSERT INTO "TenantOrderCounter" ("tenantId", "nextValue")
SELECT tenant."id", COALESCE(MAX(orders."folio"), 0) + 1
FROM "Tenant" AS tenant
LEFT JOIN "Orders" AS orders ON orders."tenantId" = tenant."id"
GROUP BY tenant."id";
