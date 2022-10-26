module.exports = {
    roots: ['<rootDir>/app'
    ],
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    setupFiles: ['dotenv/config'
    ],
    testRegex: '(/test/).*\\.test.ts$',
    moduleFileExtensions: ['ts', 'js', 'json', 'node'
    ],
    coverageThreshold: {
        global: {
            branches: 85,
            functions: 85,
            lines: 85,
            statements: 85,
        },
    },
    coverageDirectory: 'coverage-unit',
    coveragePathIgnorePatterns: [
        "<rootDir>/app/test/"
    ]
};
