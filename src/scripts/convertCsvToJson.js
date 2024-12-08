const fs = require('fs');
const path = require('path');
const csv = require('csv-parse/sync');

// Read the CSV file
const csvContent = fs.readFileSync(path.join(__dirname, '../data/100 cose da fare  - Sheet1.csv'), 'utf-8');
const records = csv.parse(csvContent, {
  columns: true,
  skip_empty_lines: true
});

// Read existing tasks.json
const tasksJsonPath = path.join(__dirname, '../data/tasks.json');
const existingTasks = JSON.parse(fs.readFileSync(tasksJsonPath, 'utf-8'));

// Convert categories
const categoryMap = {
  'Creatività': 'Creatività',
  'Relazioni': 'Relazioni',
  'Avventura': 'Avventura',
  'Natura': 'Natura',
  'Corpo': 'Health',
  'Spirito': 'Personal Development',
  'Conoscenza': 'Personal Development',
  'Crescita personale': 'Personal Development'
};

// Convert CSV records to task format
const newTasks = records.map((record, index) => ({
  id: (existingTasks.tasks.length + index + 1).toString(),
  title: record.COSE,
  description: record.COSE,
  category: categoryMap[record.Categorie] || 'Personal Development',
  points: Math.floor(Math.random() * (100 - 50 + 1)) + 50, // Random points between 50-100
  completed: false,
  createdAt: new Date().toISOString(),
  userId: "user1"
}));

// Combine existing and new tasks
existingTasks.tasks = [...existingTasks.tasks, ...newTasks];

// Write back to tasks.json
fs.writeFileSync(tasksJsonPath, JSON.stringify(existingTasks, null, 2), 'utf-8');

console.log(`Added ${newTasks.length} new tasks to tasks.json`);
