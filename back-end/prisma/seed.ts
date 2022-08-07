import { PrismaClient } from "@prisma/client";
import { parseCSV } from "./parserCSV";
import { Account } from "../interfaces/account";
import { Category } from "../interfaces/category";
import { Transaction } from "../interfaces/transaction";

const prisma = new PrismaClient();

async function main() {
  const accountsData = await parseCSV<Account>("accounts");
  const categoriesData = await parseCSV<Category>("categories");
  const transactionsData = await parseCSV<Transaction>("transactions");

  await prisma.account.createMany({
    data: accountsData
  });

  await prisma.category.createMany({
    data: categoriesData.map((category) => ({
      ...category,
      color: category.color || null
    }))
  });

  await prisma.transaction.createMany({
    data: transactionsData.map((transaction) => ({
      ...transaction,
      amount: parseFloat(String(transaction.amount)),
      reference: transaction.reference || null,
      date: new Date(transaction.date)
    }))
  });
}

main()
  .catch(async (error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
