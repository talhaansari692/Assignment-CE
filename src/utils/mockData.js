const firstNames = ['Alice', 'Bob', 'Carol', 'David', 'Eve', 'Frank', 'Grace', 'Henry', 'Iris', 'Jack',
  'Karen', 'Leo', 'Mia', 'Noah', 'Olivia', 'Paul', 'Quinn', 'Rachel', 'Sam', 'Tina',
  'Uma', 'Victor', 'Wendy', 'Xander', 'Yara', 'Zoe', 'Aaron', 'Beth', 'Chris', 'Diana'];

const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Wilson', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin',
  'Thompson', 'Moore', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Green', 'Baker'];

const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Design',
  'Operations', 'Legal', 'Support', 'Product'];

const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'company.com', 'work.io', 'corp.net'];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateMockData(count = 10000) {
  const data = [];
  for (let i = 1; i <= count; i++) {
    const first = pick(firstNames);
    const last = pick(lastNames);
    data.push({
      id: i,
      name: `${first} ${last}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}${i}@${pick(domains)}`,
      department: pick(departments),
      salary: Math.floor(Math.random() * 170000) + 30000,
    });
  }
  return data;
}
