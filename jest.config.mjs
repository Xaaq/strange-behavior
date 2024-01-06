import nextJest from "next/jest.js"

const createJestConfig = nextJest({
    dir: "./",
})

/** @type {import("jest").Config} */
const config = {
    setupFilesAfterEnv: ["./jest.setup.tsx"],
    testEnvironment: "jest-environment-jsdom",
}

export default createJestConfig(config)
