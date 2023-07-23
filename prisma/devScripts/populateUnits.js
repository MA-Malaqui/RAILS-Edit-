import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createUnits = await prisma.Units.createMany({
    data: [
        { name: "Chemistry Unit" },
        { name: "Biology Unit" },
        { name: "Physics Unit" },
        { name: "Research Unit" },
        { name: "Computer Science Unit" },
        { name: "Math Unit" },
        { name: "Social Science Unit" },
        { name: "Filipino Unit" },
        { name: "English Unit" },
        { name: "PEHM Unit" },
        
    ],
    skipDuplicates: true,
});

console.log(createUnits);
