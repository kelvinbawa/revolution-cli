import chalk from "chalk";
import inquirer, { QuestionCollection, Answers } from "inquirer";
import { countWords, readLocalFile, readRemoteFile } from "./utils/index.js";

const prompt = inquirer.createPromptModule();

export function questionInit() {
	const URL_QUETION: string = `Load file from a URL`;
	const PATH_QUETION: string = `Load file from system`;
	const SAMPLE_QUETION: string = `Count words from same file ${chalk.dim(
		"(input.txt)"
	)}`;

	const questions: QuestionCollection<any> = [
		{
			name: "location",
			type: "rawlist",
			choices: [SAMPLE_QUETION, PATH_QUETION, URL_QUETION],
			message: "Please select file location",
		},
		{
			name: "files",
			when: (answers) => {
				if (answers.location === SAMPLE_QUETION) return false;
				return true;
			},
			message(answers: any) {
				if (answers.location === "Load file from a URL") {
					return `Enter URL: ${chalk.dim(
						"(https://www.w3.org/TR/PNG/iso_8859-1.txt)"
					)}`;
				} else if (answers.location === "Load file from system") {
					return `Enter path: ${chalk.dim("(../path/to/file/file.txt")}`;
				}
				return `Answer`;
			},
			type: "input",
		},
	];

	prompt(questions)
		.then(async (answers: Answers) => {
			if (answers.location === URL_QUETION && answers.files === "") {
				// load default remote file if input is not provided
				const remote = await readRemoteFile();
				let count = countWords(remote);
				console.log(count);
				process.exit(1);
			} else if (answers.location === URL_QUETION && answers.files !== "") {
				// load remote file with input

				// TODO: validate url
				const remote = await readRemoteFile(answers.files);
				let count = countWords(remote);
				console.log(count);
				process.exit(1);
			}

			if (answers.location === PATH_QUETION && answers.files === "") {
				console.log("file can't be empty");
				return false;
			} else if (answers.location === PATH_QUETION && answers.files !== "") {
				let count = countWords(answers.files);
				console.log("Total word count is:", count);
				process.exit(1);
			}

			const sampleFilePath = await readLocalFile("./input.txt");
			let count = countWords(sampleFilePath);
			console.log("Total word count is:", count);
		})
		.catch((error) => {
			if (error.isTtyError) {
				// Prompt couldn't be rendered in the current environment
			} else {
				// Something else went wrong
			}
		});
}
