import { JunitTransformer } from "../../src/transformer/junit";
import { LintResult } from "../../src/lint-result";
import * as fs from "fs";

test("transformEmpty", async () => {
    const text = fs.readFileSync("data/junit_empty.xml", "utf-8");
    const transformer = new JunitTransformer();
    const result = transformer.parse(text);

    expect(result.length).toBe(0);
});

test("transformEslint", async () => {
    const text = fs.readFileSync("data/junit_eslint.xml", "utf-8");
    const transformer = new JunitTransformer();
    const result = transformer.parse(text);

    expect(result.length).toBe(3);
    expect(result[0]).toMatchObject({
        path: "filepath.txt",
        rule: "@typescript-eslint/no-unused-vars",
        message: "'method' is defined but never used.",
        startLine: 1,
        endLine: undefined,
        startColumn: undefined,
        endColumn: undefined,
        level: "warning",
    } as LintResult);
    expect(result[1]).toMatchObject({
        path: "filepath.txt",
        rule: "prettier/prettier",
        message: "Insert `·`",
        startLine: 1,
        endLine: undefined,
        startColumn: undefined,
        endColumn: undefined,
        level: "warning",
    } as LintResult);
    expect(result[2]).toMatchObject({
        path: "filepath.txt",
        rule: "@typescript-eslint/no-unused-vars",
        message: "'a' is assigned a value but never used.",
        startLine: 2,
        endLine: undefined,
        startColumn: undefined,
        endColumn: undefined,
        level: "warning",
    } as LintResult);
});

test("transformTextlint", async () => {
    const text = fs.readFileSync("data/junit_textlint.xml", "utf-8");
    const transformer = new JunitTransformer();
    const result = transformer.parse(text);

    expect(result.length).toBe(2);
    expect(result[0]).toMatchObject({
        path: "test/filepath.md",
        rule: "no-todo",
        message: "Found TODO: 'ToDo: test message'",
        startLine: 2,
        endLine: undefined,
        startColumn: undefined,
        endColumn: undefined,
        level: "warning",
    } as LintResult);
    expect(result[1]).toMatchObject({
        path: "test/filepath.md",
        rule: "no-todo",
        message: "Found TODO: 'ToDo: write'",
        startLine: 5,
        endLine: undefined,
        startColumn: undefined,
        endColumn: undefined,
        level: "warning",
    } as LintResult);
});

test("transformCpplint", async () => {
    const text = fs.readFileSync("data/junit_cpplint.xml", "utf-8");
    const transformer = new JunitTransformer();
    const result = transformer.parse(text);

    expect(result.length).toBe(3);
    expect(result[0]).toMatchObject({
        path: "data/cpplint/test.cpp",
        rule: "legal/copyright",
        message: `No copyright message found.  You should have a line: "Copyright [year] <Copyright Owner>"`,
        startLine: 1,
        endLine: undefined,
        startColumn: undefined,
        endColumn: undefined,
        level: "failure",
    } as LintResult);
    expect(result[1]).toMatchObject({
        path: "data/cpplint/test.cpp",
        rule: "whitespace/braces",
        message: `Missing space before {`,
        startLine: 1,
        endLine: undefined,
        startColumn: undefined,
        endColumn: undefined,
        level: "failure",
    } as LintResult);
    expect(result[2]).toMatchObject({
        path: "data/cpplint/test.cpp",
        rule: "whitespace/ending_newline",
        message: `Could not find a newline character at the end of the file.`,
        startLine: 3,
        endLine: undefined,
        startColumn: undefined,
        endColumn: undefined,
        level: "failure",
    } as LintResult);
});

test("transformRubocop", async () => {
    const text = fs.readFileSync("data/junit_rubocop.xml", "utf-8");
    const transformer = new JunitTransformer();
    const result = transformer.parse(text);

    expect(result.length).toBe(5);
    expect(result[0]).toMatchObject({
        path: "data/rubocop/test.rb",
        rule: "Layout/EndOfLine",
        message: `Carriage return character missing.`,
        startLine: 2,
        endLine: undefined,
        startColumn: undefined,
        endColumn: undefined,
        level: "warning",
    } as LintResult);
    expect(result[1]).toMatchObject({
        path: "data/rubocop/test.rb",
        rule: "Layout/SpaceAroundOperators",
        message: "Surrounding space missing for operator `=`.",
        startLine: 1,
        endLine: undefined,
        startColumn: undefined,
        endColumn: undefined,
        level: "warning",
    } as LintResult);
    expect(result[2]).toMatchObject({
        path: "data/rubocop/test.rb",
        rule: "Layout/TrailingEmptyLines",
        message: `Final newline missing.`,
        startLine: 2,
        endLine: undefined,
        startColumn: undefined,
        endColumn: undefined,
        level: "warning",
    } as LintResult);
    expect(result[3]).toMatchObject({
        path: "data/rubocop/test.rb",
        rule: "Style/FrozenStringLiteralComment",
        message: `Missing frozen string literal comment.`,
        startLine: 1,
        endLine: undefined,
        startColumn: undefined,
        endColumn: undefined,
        level: "warning",
    } as LintResult);
    expect(result[4]).toMatchObject({
        path: "data/rubocop/test.rb",
        rule: "Style/StringLiterals",
        message: `Prefer single-quoted strings when you don't need string interpolation or special symbols.`,
        startLine: 1,
        endLine: undefined,
        startColumn: undefined,
        endColumn: undefined,
        level: "warning",
    } as LintResult);
});
