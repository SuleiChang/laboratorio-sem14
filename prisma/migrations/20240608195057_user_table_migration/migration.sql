-- CreateTable
CREATE TABLE "Person" (
    "nPerCode" SERIAL NOT NULL,
    "cPerLastname" VARCHAR(50) NOT NULL,
    "cPerName" VARCHAR(50) NOT NULL,
    "cPerAddress" VARCHAR(100) NOT NULL,
    "cPerDateBorn" DATE NOT NULL,
    "nPerYears" SMALLINT NOT NULL,
    "nPerSalary" DECIMAL(6,2) NOT NULL,
    "cPerRnd" VARCHAR(50) NOT NULL,
    "cPerState" VARCHAR(1) NOT NULL,
    "remember_token" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("nPerCode")
);
