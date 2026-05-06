
export const handleCliError = (error) => {
    console.error("Error:", error.message);
    process.exit(1);
}