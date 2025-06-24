-- CreateTable
CREATE TABLE "TripRecommendation" (
    "id" TEXT NOT NULL,
    "appRecommendation" JSONB NOT NULL,
    "historyRecommendation" JSONB NOT NULL,
    "surpriseRecommendation" JSONB NOT NULL,
    "userId" TEXT NOT NULL,
    "nextUpdate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TripRecommendation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TripRecommendation_userId_key" ON "TripRecommendation"("userId");

-- AddForeignKey
ALTER TABLE "TripRecommendation" ADD CONSTRAINT "TripRecommendation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
