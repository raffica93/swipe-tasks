import { parse } from 'csv-parse';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

async function convertCsvToJson() {
  try {
    const csvFilePath = join(__dirname, '../../data/100 cose da fare  - Sheet1.csv');
    const jsonFilePath = join(__dirname, '../../data/tasks.json');

    const csvData = await readFile(csvFilePath, 'utf-8');

    parse(csvData, {
      columns: true,
      skip_empty_lines: true
    }, async (err, records) => {
      if (err) {
        console.error('Error parsing CSV:', err);
        return;
      }

      const tasks = records.map((record: any, index: number) => ({
        id: String(index + 1),
        title: record.Task || '',
        description: record.Description || '',
        category: record.Category || 'Personal',
        createdAt: new Date().toISOString(),
        completed: false
      }));

      const jsonData = {
        tasks: tasks
      };

      await writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2));
      console.log('Conversion completed! JSON file created at:', jsonFilePath);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

convertCsvToJson();
