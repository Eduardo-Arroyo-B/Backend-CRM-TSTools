CREATE TABLE "services_global" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "precio" DECIMAL(10,2) NOT NULL,
    "tiempoProceso" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "incluye" TEXT[] NOT NULL,
    "compatibilidad" TEXT[] NOT NULL,
    "requisitos" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_global_pkey" PRIMARY KEY ("id")
);
