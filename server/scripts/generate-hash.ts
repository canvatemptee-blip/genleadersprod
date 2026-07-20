import bcrypt from "bcrypt";

async function main() {
    const password = "admin123";

    const hash = await bcrypt.hash(password, 12);

    console.log(hash);
}

main();