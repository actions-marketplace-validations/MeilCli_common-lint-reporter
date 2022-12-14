import * as core from "@actions/core";
import * as xml from "fast-xml-parser";
import * as he from "he";
import { getOption } from "./option";
import { LintResult } from "../lint-result";
import { Transformer } from "./transformer";
import { JunitTestSuite, JunitTestCase, JunitTestMessage } from "./junit/entity";
import { convertJunitToLintResult } from "./junit/convert";

interface JunitResult {
    testsuites: TestSuites[] | undefined;
}

interface TestSuites {
    testsuite: TestSuite[] | undefined;
}

interface TestSuite {
    package: string;
    name: string;
    testcase: TestCase[] | undefined;
    testsuite: TestSuite[] | undefined;
}

interface TestCase {
    name: string;
    classname: string;
    error: TestMessage[] | string | undefined;
    failure: TestMessage[] | string | undefined;
}

interface TestMessage {
    message: string;
    "#text": string;
}

export class JunitTransformer extends Transformer {
    parse(body: string): LintResult[] {
        const junitResult = new xml.XMLParser({
            isArray: (tagName, jPath, isLeafNode, isAttribute) => isAttribute != true,
            ignoreAttributes: false,
            attributeNamePrefix: "",
            parseAttributeValue: true,
            attributeValueProcessor: (_, value) => he.decode(value),
        }).parse(body) as JunitResult;
        const junitTestSuites: JunitTestSuite[] = [];
        if (junitResult.testsuites != undefined) {
            for (const testSuites of junitResult.testsuites) {
                junitTestSuites.push(...this.parseTestSuites(testSuites.testsuite));
            }
        } else {
            // for cpplint
            const testSuites = junitResult as unknown as TestSuites;
            if (testSuites.testsuite != undefined) {
                junitTestSuites.push(...this.parseTestSuites(testSuites.testsuite));
            }
        }
        return convertJunitToLintResult(junitTestSuites);
    }

    private parseTestSuites(testSuites: TestSuite[] | undefined): JunitTestSuite[] {
        if (testSuites == undefined) {
            return [];
        }
        const result: JunitTestSuite[] = [];
        for (const testSuite of testSuites) {
            result.push({
                name: testSuite.name,
                package: testSuite.package,
                testCases: this.parseTestCases(testSuite.testcase),
                testSuites: this.parseTestSuites(testSuite.testsuite),
            });
        }
        return result;
    }

    private parseTestCases(testCases: TestCase[] | undefined): JunitTestCase[] {
        if (testCases == undefined) {
            return [];
        }
        const result: JunitTestCase[] = [];
        for (const testCase of testCases) {
            result.push({
                name: testCase.name,
                className: testCase.classname,
                failures: this.parseTestMessages(testCase.failure),
                errors: this.parseTestMessages(testCase.error),
            });
        }
        return result;
    }

    private parseTestMessages(testMessages: TestMessage[] | string | undefined): JunitTestMessage[] {
        if (testMessages == undefined) {
            return [];
        }
        if (typeof testMessages == "string") {
            return [{ message: testMessages, body: testMessages }];
        }
        const result: JunitTestMessage[] = [];
        for (const testMessage of testMessages) {
            if (typeof testMessage == "string") {
                result.push({
                    message: testMessage,
                    body: testMessage,
                });
                continue;
            }
            if (testMessage["#text"] == undefined) {
                continue;
            }
            result.push({
                message: testMessage.message,
                body: he.decode(testMessage["#text"].toString()),
            });
        }
        return result;
    }
}

async function run() {
    try {
        const option = getOption();
        const transformer = new JunitTransformer();
        await transformer.transform(option);
    } catch (error) {
        if (error instanceof Error) {
            core.setFailed(error.message);
        }
    }
}

if (process.env.NODE_ENV != "test") {
    run();
}
