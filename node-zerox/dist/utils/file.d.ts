import { ExcelSheetContent, Page } from "../types";
export declare const downloadFile: ({ filePath, tempDir, }: {
    filePath: string;
    tempDir: string;
}) => Promise<{
    extension: string;
    localPath: string;
}>;
export declare const convertHeicToJpeg: ({ localPath, tempDir, }: {
    localPath: string;
    tempDir: string;
}) => Promise<string>;
export declare const convertFileToPdf: ({ extension, localPath, tempDir, }: {
    extension: string;
    localPath: string;
    tempDir: string;
}) => Promise<string>;
export declare const convertPdfToImages: ({ imageDensity, imageHeight, pdfPath, pagesToConvertAsImages, tempDir, }: {
    imageDensity: number;
    imageHeight: number;
    pdfPath: string;
    pagesToConvertAsImages: number | number[];
    tempDir: string;
}) => Promise<string[]>;
export declare const convertExcelToHtml: (filePath: string) => Promise<ExcelSheetContent[]>;
export declare const isExcelFile: (filePath: string) => boolean;
export declare const isStructuredDataFile: (filePath: string) => boolean;
export declare const extractPagesFromStructuredDataFile: (filePath: string) => Promise<Page[]>;
