const input = await Bun.file("./inputs/day5").text();

interface PageOrderingRule {
  page: number;
  mustBeBefore: number;
}

const lines = input.trim().split("\n");

const orderingRules: PageOrderingRule[] = [];
const updates: number[][] = [];

for (const line of lines) {
  if (line.includes('|')) {
    const [before, after] = line.split('|');

    orderingRules.push({
      page: +before,
      mustBeBefore: +after,
    });
  }
  if (line.includes(',')) {
    const pageNumbers = line.split(',').map(Number);
    updates.push(pageNumbers);
  }
}

console.table(orderingRules);
console.table(updates);

const isUpdateValidMap = new Map<number, boolean>();

for (let i = 0; i < updates.length; i++) {
  const update = updates[i];

  console.log("Checking update", update);

  isUpdateValidMap.set(i, isUpdateValid(update));
}

function isUpdateValid(update: number[]) {
  const releventOrderRules = orderingRules.filter((rule) => update.includes(rule.page) && update.includes(rule.mustBeBefore));

  // console.log("Relevent Rules Are", releventOrderRules);

  for (const rule of releventOrderRules) {
    const indexOfPageInUpdate = update.indexOf(rule.page);
    const indexOfNumberThatMustComeAfter = update.indexOf(rule.mustBeBefore);

    if (indexOfPageInUpdate > indexOfNumberThatMustComeAfter) {
      console.log("Update is not valid because", rule.page, "came after", rule.mustBeBefore);
      return false;
    }
  }

  return true
}

for (const [index, valid] of isUpdateValidMap) {
  const update = updates[index];
  if (!valid) {
    // Yikes, this is savage. Probabay better ways to do this!
    while (!isUpdateValid(update)) {
      const releventOrderRules = orderingRules.filter((rule) => update.includes(rule.page) && update.includes(rule.mustBeBefore));

      for (const rule of releventOrderRules) {
        const indexOfPageInUpdate = update.indexOf(rule.page);
        const indexOfNumberThatMustComeAfter = update.indexOf(rule.mustBeBefore);

        if (indexOfPageInUpdate > indexOfNumberThatMustComeAfter) {
          // If somethign is out of order, just swap it
          let temp = update[indexOfPageInUpdate];
          update[indexOfPageInUpdate] = update[indexOfNumberThatMustComeAfter];
          update[indexOfNumberThatMustComeAfter] = temp;
        }
      }
    }
  }
}

console.table(isUpdateValidMap)
console.table(updates)

let total = 0;

for (const [index, valid] of isUpdateValidMap) {
  if (!valid) {
    total += getMiddleNumber(updates[index]);
  }
}

console.log("Total", total);

function getMiddleNumber(array: number[]) {
  const middeIndex = (array.length - 1) / 2;
  return array[middeIndex];
}
