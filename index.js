import { inputParser } from "./src/cli/parse-command.js";
import { validateInput } from "./src/cli/validate-command.js";
import { handleCliError } from "./src/shared/app-error.js";
import { dispatch } from "./src/app/dispatch-command.js";
import { executeCommand } from "./src/app/execute-command.js";
import { outcomePrinter } from "./src/shared/printer.js";

const inputRequest = process.argv.slice(2);
async function main() {
        
    try {
        const parsedInput = inputParser(inputRequest);
        const validatedInput = validateInput(parsedInput);
        const dispatched = dispatch(validatedInput);
        const executedCommand = await executeCommand(dispatched)
        outcomePrinter(dispatched.action, executedCommand)
    } catch (error) {
        handleCliError(error);
    }
}
main()
