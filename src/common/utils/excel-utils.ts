import path from 'path';
import ExcelJS from 'exceljs';

interface ExcelRow {
	[key: string]: any;
}

export enum ImpactedEntity {
	Party = 'Party',
	Transaction = 'Transaction',
}

export interface SheetData {
	sheetName: string;
	data: any[];
}

export async function createExcelFromJson(sheetsData: SheetData[], fileType: string, storeFile: boolean): Promise<any> {
	const workbook = new ExcelJS.Workbook();

	sheetsData.forEach(({ sheetName, data }) => {
		const worksheet = workbook.addWorksheet(sheetName);

		if (data.length > 0) {
			const headers = Object.keys(data[0]);
			worksheet.columns = headers.map((key) => ({ header: key, key, width: 20 }));
			const headerRowObj = worksheet.getRow(1);
			headerRowObj.font = { bold: true };
			headerRowObj.commit();
			data.forEach((rowData) => worksheet.addRow(rowData));
		}
	});

	const outputFolder = path.join(__dirname, '../multer');
	const fileName = `${fileType.toLowerCase()}.xlsx`;
	const filePath = path.join(outputFolder, fileName);
	if (storeFile) {
		await workbook.xlsx.writeFile(filePath);
		return filePath;
	} else {
		return (await workbook.xlsx.writeBuffer()) as Buffer;
	}
}

function extractHeaders(row: ExcelJS.Row): Map<number, string> {
	const headers = new Map<number, string>();
	row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
		if (cell.value) {
			headers.set(colNumber, cell.text?.toLowerCase() as string);
		}
	});
	return headers;
}

function getCellAsString(cell: ExcelJS.Cell): string {
	if (cell.type === ExcelJS.ValueType.Hyperlink) {
		if (cell.value && typeof cell.value === 'object' && 'text' in cell.value) {
			if (typeof cell.value.text === 'string') {
				return cell.value.text;
			} else {
				const result = (cell.value.text as unknown as { richText: { text: string }[] }).richText
					?.map((part: ExcelJS.RichText) => part.text.toString())
					.filter((text) => text.trim() !== '')
					.join(', ');
				return result;
			}
		}
	} else if (cell.type === ExcelJS.ValueType.RichText) {
		if (cell.value && typeof cell.value === 'object' && 'richText' in cell.value) {
			const result = cell.value.richText.map((part: ExcelJS.RichText) => part.text.toString()).join('');
			return result;
		}
	} else if (cell.value !== null && cell.value !== undefined) {
		return cell.value.toString();
	}

	return '';
}

// Function to process each row to JSON with all values as strings
function processRowToJson(row: ExcelJS.Row, headers: Map<number, string>): ExcelRow {
	const rowObject: ExcelRow = {};
	row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
		const header = headers.get(colNumber);
		if (header) {
			rowObject[header.toLowerCase()] = getCellAsString(cell);
		}
	});
	return rowObject;
}

export async function readExcel(filePath: string, rowHeader: number = 1): Promise<any[]> {
	const workbook = new ExcelJS.Workbook();
	await workbook.xlsx.readFile(filePath);
	const worksheet = workbook.getWorksheet(1);
	const jsonData: ExcelRow[] = [];
	const headers = extractHeaders(worksheet!.getRow(rowHeader));

	worksheet!.eachRow((row, rowNumber) => {
		if (rowNumber > rowHeader) {
			jsonData.push(processRowToJson(row, headers));
		}
	});

	return jsonData as any;
}

export const buildHeaders = (allHeaders: Set<string>) => {
	const mainHeaders: any = {};
	allHeaders.forEach((header) => {
		const parts = header.split('.');
		const mainHeader = parts[0];
		const subHeader = parts.slice(1).join('.') || mainHeader;

		if (!mainHeaders[mainHeader]) {
			mainHeaders[mainHeader] = new Set();
		}
		mainHeaders[mainHeader].add(subHeader);
	});

	const headerRow1: string[] = [];
	const headerRow2: string[] = [];
	const merges: any[] = [];
	let colIndex = 0;

	for (const mainHeader in mainHeaders) {
		const subHeaders: string[] = Array.from(mainHeaders[mainHeader]);
		if (subHeaders.length > 1) {
			headerRow1.push(mainHeader);
			for (let i = 1; i < subHeaders.length; i++) {
				headerRow1.push('');
			}
			merges.push({
				s: { r: 0, c: colIndex },
				e: { r: 0, c: colIndex + subHeaders.length - 1 },
			});
			colIndex += subHeaders.length;
			headerRow2.push(...subHeaders);
		} else {
			headerRow1.push(mainHeader);
			headerRow2.push('');
			colIndex += 1;
		}
	}

	return { headerRow1, headerRow2, merges };
};
