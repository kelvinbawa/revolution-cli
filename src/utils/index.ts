import axios from "axios";
import * as fs from "fs";
import { createSpinner } from "nanospinner";

export function countWords(text: string): number {
	const words = text.split(/\s+/);
	if (text === "") return 0;
	return words.length;
}

export async function readLocalFile(text: string): Promise<string> {
	const data = fs.readFileSync(text, "utf-8");
	return await data;
}

export async function readRemoteFile(
	text: string = "https://www.w3.org/TR/PNG/iso_8859-1.txt"
): Promise<string> {
	const spinner = createSpinner(`loading ${text}`).start();
	const request = await axios.get(text);
	const result = await request.data;
	spinner.success({ text: `done loading ${text}` });
	return await result.toString();
}
