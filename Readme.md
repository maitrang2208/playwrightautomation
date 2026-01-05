run ts code
using: npx tsx test.ts


// change env
WINDOW

$env:NODE_ENV="staging";  npx playwright test ./tests/lessons/env.spec.ts

 hoặc npm run test:dev ./tests/env-demo.spec.ts

mac

NODE_ENV=staging npx playwright test ./tests/env-demo.spec.ts

***Run according to env: npm run test:uat env.spec.ts***

1. Run with tag: npx playwright test testInfo.spec.ts --grep "@smoke"
2. npx playwright test testInfo.spec.ts --grep "@smoke| @regression"

