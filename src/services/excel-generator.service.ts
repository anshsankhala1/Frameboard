import ExcelJS from 'exceljs';
import type { CallSheetInput } from '../types/callsheet';

export class ExcelGeneratorService {
  /**
   * Generate a professional Excel call sheet matching industry format
   */
  static async generateCallSheetExcel(
    input: CallSheetInput,
    analysisData: any
  ): Promise<ExcelJS.Buffer> {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Call Sheet');

    // ===== TOP HEADER SECTION =====
    let currentRow = 1;

    // Row 1: Production Title (left), Type (center), Date (right)
    sheet.mergeCells('A1:C1');
    const titleCell = sheet.getCell('A1');
    titleCell.value = input.productionTitle;
    titleCell.font = { bold: true, size: 11 };
    titleCell.alignment = { horizontal: 'left', vertical: 'middle' };

    sheet.mergeCells('D1:G1');
    const typeCell = sheet.getCell('D1');
    typeCell.value = 'FILM PRODUCTION';
    typeCell.font = { bold: true, size: 11 };
    typeCell.alignment = { horizontal: 'center', vertical: 'middle' };

    sheet.mergeCells('H1:J1');
    const dateCell = sheet.getCell('H1');
    dateCell.value = input.shootDate;
    dateCell.font = { bold: true, size: 11 };
    dateCell.alignment = { horizontal: 'right', vertical: 'middle' };

    currentRow = 2;

    // Row 2-4: Key Contacts Box (left) and Shoot Day/Location Boxes (right)
    sheet.mergeCells('A2:C4');
    const contactsCell = sheet.getCell('A2');
    contactsCell.value = `Director: [Name] [Phone]\nProducer: [Name] [Phone]\n\nNearest Hospital: [Name]\n[Address] [Phone]`;
    contactsCell.font = { size: 9 };
    contactsCell.alignment = { vertical: 'top', wrapText: true };
    contactsCell.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' },
    };

    // Shoot Day Box
    sheet.mergeCells('D2:F3');
    const shootDayCell = sheet.getCell('D2');
    shootDayCell.value = `DAY ${input.shootingDayNumber} of ${input.shootingRange.duration}`;
    shootDayCell.font = { bold: true, size: 14 };
    shootDayCell.alignment = { horizontal: 'center', vertical: 'middle' };
    shootDayCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD3D3D3' } };
    shootDayCell.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' },
    };

    // Location Box
    sheet.mergeCells('H2:J3');
    const locCell = sheet.getCell('H2');
    locCell.value = `LOC: ${input.generalLocation}`;
    locCell.font = { bold: true, size: 12 };
    locCell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    locCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD3D3D3' } };
    locCell.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' },
    };

    currentRow = 4;

    // Emergency note
    const emergNote = sheet.getCell('A4');
    emergNote.value = '*In case of emergency';
    emergNote.font = { size: 8, italic: true };

    currentRow = 5;

    // ===== CALL TIME & NOTE SECTION =====
    sheet.mergeCells('A5:C5');
    const noteCell = sheet.getCell('A5');
    noteCell.value = 'Note 1: Individual call times vary';
    noteCell.font = { bold: true, size: 10 };
    noteCell.alignment = { horizontal: 'center', vertical: 'middle' };
    noteCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFC0CB' } };
    noteCell.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' },
    };

    sheet.mergeCells('D5:F5');
    const callCell = sheet.getCell('D5');
    callCell.value = `CALL ${input.generalCallTime}`;
    callCell.font = { bold: true, size: 14 };
    callCell.alignment = { horizontal: 'center', vertical: 'middle' };
    callCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF00' } };
    callCell.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' },
    };

    sheet.mergeCells('H5:J5');
    const craftyCell = sheet.getCell('H5');
    craftyCell.value = 'MEALS PROVIDED';
    craftyCell.font = { bold: true, size: 11 };
    craftyCell.alignment = { horizontal: 'center', vertical: 'middle' };
    craftyCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFC0CB' } };
    craftyCell.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' },
    };

    currentRow = 7;

    // ===== CAST TABLE =====
    const castHeaders = ['#', 'CAST', 'CHARACTER', 'CALL TIME', 'PICK UP TIME', 'MINOR?', 'SPECIAL INSTRUCTIONS'];
    castHeaders.forEach((header, idx) => {
      const cell = sheet.getCell(currentRow, idx + 1);
      cell.value = header;
      cell.font = { bold: true, size: 10 };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD3D3D3' } };
      cell.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
    currentRow++;

    // Add cast data
    if (analysisData.cast && analysisData.cast.length > 0) {
      analysisData.cast.forEach((castMember: any, index: number) => {
        const row = sheet.getRow(currentRow);
        row.getCell(1).value = index + 1;
        row.getCell(2).value = castMember.suggestedActors || 'TBD';
        row.getCell(3).value = castMember.character || '';
        row.getCell(4).value = castMember.callTime || input.generalCallTime;
        row.getCell(5).value = input.generalCallTime;
        row.getCell(6).value = 'N';
        row.getCell(7).value = castMember.castingType || '';

        for (let i = 1; i <= 7; i++) {
          row.getCell(i).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' },
          };
          row.getCell(i).alignment = { wrapText: true, vertical: 'top' };
        }
        currentRow++;
      });
    }

    currentRow += 2;

    // ===== CREW TABLE =====
    const crewHeaders = ['POSITION', 'NAME', 'CALL TIME', 'PICK UP TIME', 'EVENT', 'TIME', 'WHO', 'ETC'];
    crewHeaders.forEach((header, idx) => {
      const cell = sheet.getCell(currentRow, idx + 1);
      cell.value = header;
      cell.font = { bold: true, size: 10 };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD3D3D3' } };
      cell.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
    currentRow++;

    // Add crew positions by department
    const departments = [
      { position: 'Director', name: '[Name]' },
      { position: 'Producer', name: '[Name]' },
      { position: 'AD', name: '[Name]' },
      { position: 'DP', name: '[Name]' },
      { position: 'AC', name: '[Name]' },
      { position: 'Head PD', name: '[Name]' },
      { position: 'Key Grip', name: '[Name]' },
      { position: 'Gaffer', name: '[Name]' },
      { position: 'Sound Mixer', name: '[Name]' },
      { position: 'Hair + Makeup', name: '[Name]' },
      { position: 'Crafty', name: '[Name]' },
    ];

    departments.forEach((dept) => {
      const row = sheet.getRow(currentRow);
      row.getCell(1).value = dept.position;
      row.getCell(2).value = dept.name;
      row.getCell(3).value = input.generalCallTime;
      row.getCell(4).value = input.generalCallTime;
      row.getCell(5).value = '';
      row.getCell(6).value = '';
      row.getCell(7).value = '';
      row.getCell(8).value = '';

      for (let i = 1; i <= 8; i++) {
        row.getCell(i).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' },
        };
      }
      currentRow++;
    });

    currentRow += 2;

    // ===== SHOOTING SCHEDULE =====
    sheet.mergeCells(`A${currentRow}:J${currentRow}`);
    const schedHeader = sheet.getCell(`A${currentRow}`);
    schedHeader.value = 'SHOOTING SCHEDULE';
    schedHeader.font = { bold: true, size: 12 };
    schedHeader.alignment = { horizontal: 'center', vertical: 'middle' };
    schedHeader.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4472C4' } };
    schedHeader.font = { bold: true, size: 12, color: { argb: 'FFFFFFFF' } };
    currentRow++;

    const scheduleHeaders = [
      'Scene #',
      'Pages',
      'I/E',
      'Location',
      'D/N',
      'Description',
      'Cast',
      'Crew',
      'Equipment',
      'AI Suggested Location',
    ];

    scheduleHeaders.forEach((header, idx) => {
      const cell = sheet.getCell(currentRow, idx + 1);
      cell.value = header;
      cell.font = { bold: true, size: 9 };
      cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9E1F2' } };
      cell.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
    currentRow++;

    // Add scenes
    if (analysisData.scenes && analysisData.scenes.length > 0) {
      analysisData.scenes.forEach((scene: any) => {
        const row = sheet.getRow(currentRow);
        row.getCell(1).value = scene.sceneNumber || '';
        row.getCell(2).value = scene.pages || '';
        row.getCell(3).value = scene.intExt || '';
        row.getCell(4).value = scene.location || '';
        row.getCell(5).value = scene.dayNight || '';
        row.getCell(6).value = scene.description || '';
        row.getCell(7).value = scene.cast || '';
        row.getCell(8).value = scene.crewNeeded || '';
        row.getCell(9).value = scene.equipment || '';
        row.getCell(10).value = scene.suggestedLocation || '';

        for (let i = 1; i <= 10; i++) {
          row.getCell(i).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' },
          };
          row.getCell(i).alignment = { wrapText: true, vertical: 'top' };
        }
        row.height = 30;
        currentRow++;
      });
    }

    currentRow += 2;

    // ===== EQUIPMENT & BUDGET =====
    if (analysisData.equipment && analysisData.equipment.length > 0) {
      sheet.mergeCells(`A${currentRow}:J${currentRow}`);
      const equipHeader = sheet.getCell(`A${currentRow}`);
      equipHeader.value = 'EQUIPMENT & BUDGET BREAKDOWN';
      equipHeader.font = { bold: true, size: 12, color: { argb: 'FFFFFFFF' } };
      equipHeader.alignment = { horizontal: 'center', vertical: 'middle' };
      equipHeader.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF70AD47' } };
      currentRow++;

      const equipHeaders = ['Category', 'Item', 'Qty', 'Reason', 'Cost', 'Priority', 'Rental Company'];
      equipHeaders.forEach((header, idx) => {
        const cell = sheet.getCell(currentRow, idx + 1);
        cell.value = header;
        cell.font = { bold: true, size: 10 };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE2EFDA' } };
        cell.border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
      currentRow++;

      analysisData.equipment.forEach((item: any) => {
        const row = sheet.getRow(currentRow);
        row.getCell(1).value = item.category || '';
        row.getCell(2).value = item.item || '';
        row.getCell(3).value = item.quantity || 1;
        row.getCell(4).value = item.reason || '';
        row.getCell(5).value = item.cost || '';
        row.getCell(6).value = item.priority || '';
        row.getCell(7).value = item.rentalCompany || '';

        for (let i = 1; i <= 7; i++) {
          row.getCell(i).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' },
          };
          row.getCell(i).alignment = { wrapText: true, vertical: 'top' };
        }
        currentRow++;
      });
    }

    currentRow += 2;

    // ===== FILMING LOCATIONS =====
    if (analysisData.locations && analysisData.locations.length > 0) {
      sheet.mergeCells(`A${currentRow}:J${currentRow}`);
      const locHeader = sheet.getCell(`A${currentRow}`);
      locHeader.value = 'AI-SUGGESTED FILMING LOCATIONS';
      locHeader.font = { bold: true, size: 12, color: { argb: 'FFFFFFFF' } };
      locHeader.alignment = { horizontal: 'center', vertical: 'middle' };
      locHeader.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFC000' } };
      currentRow++;

      const locHeaders = ['Scene', 'Venue Name', 'Address', 'Match Reason', 'Distance', 'Permit Cost', 'Contact'];
      locHeaders.forEach((header, idx) => {
        const cell = sheet.getCell(currentRow, idx + 1);
        cell.value = header;
        cell.font = { bold: true, size: 10 };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF2CC' } };
        cell.border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
      currentRow++;

      analysisData.locations.forEach((loc: any) => {
        const row = sheet.getRow(currentRow);
        row.getCell(1).value = loc.sceneLocation || '';
        row.getCell(2).value = loc.venueName || '';
        row.getCell(3).value = loc.address || '';
        row.getCell(4).value = loc.matchReason || '';
        row.getCell(5).value = loc.distance || '';
        row.getCell(6).value = loc.permitCost || '';
        row.getCell(7).value = loc.contact || '';

        for (let i = 1; i <= 7; i++) {
          row.getCell(i).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' },
          };
          row.getCell(i).alignment = { wrapText: true, vertical: 'top' };
        }
        currentRow++;
      });
    }

    // Set column widths
    sheet.columns = [
      { width: 12 },  // # or Position
      { width: 18 },  // Cast/Name
      { width: 15 },  // Character/Call
      { width: 12 },  // Call Time
      { width: 12 },  // Pick Up
      { width: 10 },  // Minor/Event
      { width: 30 },  // Special Instructions/etc
      { width: 12 },  // Additional
      { width: 20 },  // Additional
      { width: 25 },  // AI suggestions
    ];

    // Generate buffer
    return await workbook.xlsx.writeBuffer() as ExcelJS.Buffer;
  }
}
