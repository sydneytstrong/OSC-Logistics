#Benchmark Scoring

### Benchmark Test Cases

Each test case has a single, intentional CWE that is eithe a True Positive or a False Positive. The tools results will be compared to an expected results file to score their results and determine their score.

### Outcomes

These are the 4 results that will measure our tool's accuracy:

- True Positive
  - Tests with real vulnerabilities that were correctly reported as vulnerable by the tool.
- False Negative
  - Tests with real vulnerabilities that were not correctly reported as vulnerable by the tool.
- True Negative
  - Tests with fake vulnerabilities that were correctly not reported as vulnerable by the tool.
- False Positive
  - Tests with fake vulnerabilities that were incorrectly reported as vulnerable by the tool.

### Scoring

The Benchmark Accuracy Score is essentially a Youden Index, which is a standard way of summarizing the accuracy of a set of tests.

`True Positive Rate(TPR) = TP / (TP + FN)`
- Percision or Sensativity

`False Positive Rate(FPR) = FP / (FP + TN)`
- "Specificity"

`Normalized Distance From Guessing Line = TPR - FPR`
- Ranged 0-100

###Interpretation Guide:

This is just a visual to show the guessing line and what different scores mean.

![](https://raw.githubusercontent.com/OWASP/Benchmark/master/src/main/resources/scorecard/content/benchmark_guide.png)

###The Score Card

| Security Category | TP       | FN       | TN       | FP       | Total            | TPR = TP / (TP + FN) | FPR = FP / (FP + TN) | Score = TPR - FPR |
| ----------------- | -------- | -------- | -------- | -------- | ---------------- | -------------------- | -------------------- | ----------------- |
| JS Injection      |          |          |          |          |                  |                      |                      |                   |
| Command Injection |          |          |          |          |                  |                      |                      |                   |
| Etc...            |          |          |          |          |                  |                      |                      |                   |
|                   | Total TP | Total FN | Total TN | Total FP | Total Test Cases | Average TPR          | Average FPR          | Average Score     |

### OWASP's Note on Validity

"To be clear, the Benchmark tests are not exactly like real applications. The tests are derived from coding patterns observed in real applications, but the majority of them are considerably simpler than real applications. That is, most real world applications will be considerably harder to successfully analyze than the OWASP Benchmark Test Suite. Although the tests are based on real code, it is possible that some tests may have coding patterns that don’t occur frequently in real code." (https://owasp.org/www-project-benchmark/)