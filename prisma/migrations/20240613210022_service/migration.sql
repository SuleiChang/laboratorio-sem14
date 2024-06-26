-- CreateTable
CREATE TABLE "Service" (
    "idService" SERIAL NOT NULL,
    "title" VARCHAR(20) NOT NULL,
    "description" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("idService")
);
