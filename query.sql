-- Step 1: Add new UUID columns to the Requests table
ALTER TABLE "Requests" 
  ADD COLUMN "newManagerId" UUID;

ALTER TABLE "Requests" 
  ADD COLUMN "newEmployeeId" UUID;

-- Step 2: Fill the new UUID columns with generated UUIDs (or default UUIDs if there's no matching data)
UPDATE "Requests"
SET "newManagerId" = gen_random_uuid(),  -- generates new UUID for the manager
    "newEmployeeId" = gen_random_uuid();  -- generates new UUID for the employee

-- Step 3: Drop the old managerId and employeeId columns
ALTER TABLE "Requests" 
  DROP COLUMN "managerId";

ALTER TABLE "Requests" 
  DROP COLUMN "employeeId";

-- Step 4: Rename the new UUID columns to the original column names
ALTER TABLE "Requests" 
  RENAME COLUMN "newManagerId" TO "managerId";

ALTER TABLE "Requests" 
  RENAME COLUMN "newEmployeeId" TO "employeeId";
