# Data Science Learning Profile

**Language:** English for this learning system. Source material and university instruction may be in Spanish.

## Current course-level self-assessment

| Course | Status |
| --- | --- |
| Curso de Fundamentos de Matemáticas | Confident |
| Curso de Estadística y Probabilidad | Confident |
| Curso de ChatGPT | Confident |
| Curso de Gemini | Confident |
| Curso de Ética y Manejo de Datos para Data Science e Inteligencia Artificial | Confident |
| Curso de Entorno de Trabajo para Ciencia de Datos con Jupyter Notebooks y Anaconda | Needs review |
| Curso de Fundamentos de Python | Confident |
| Curso de Funciones Matemáticas para Data Science e Inteligencia Artificial | Needs review |
| Curso de Vibe Coding para Crear Apps sin Programar con Google AI Studio | Confident |

## Not yet assessed

- Guía para Empezar una Carrera en Data Science e Inteligencia Artificial
- Curso de Ciencia de Datos para Análisis de Negocio

## Previous learning topic

**Course:** Curso de Matemáticas para Data Science: Estadística Descriptiva  
**Topic:** Construcción y Análisis de la Matriz de Covarianza en Python  
**Coaching status:** Practicing — first applied exercise submitted; interpretation corrections in progress

### Current review targets

- Distinguish a scatterplot/pairplot from a numerical correlation matrix.
- Interpret standardized sample covariance separately from correlation.
- Remember that covariance-matrix diagonal entries are variances and are not guaranteed maxima.
- Interpret values near zero as little linear association, not proof of no relationship.
- Check row identifiers directly before naming an outlier.

## Previous learning topic

**Topic:** Álgebra lineal: vectores, matrices, inversas, valores y vectores propios  
**Coaching status:** Needs review — notes validated; practical foundations are being rebuilt before eigenvalues/eigenvectors

### Identified prerequisite gap

- Connect vectors and matrices to real quantities and transformations before studying their operations.
- Understand systems of linear equations before using matrix inverses.
- Distinguish mathematical vector operations from elementwise programming operations.
- Build the geometric meaning of eigenvectors and eigenvalues before applying them to PCA.

## Previous learning topic

**Topic:** PCA: vector projection and dimensionality reduction  
**Source coverage:** Two related classes in one notes file  
**Coaching status:** Practicing — understands PCA combinations, scaling, and explained variance; reviewing centering and `fit()` versus `transform()`

### Current review targets

- Distinguish centering from standardization.
- Understand why transposition is used with `np.cov` and why it was not the earlier exercise error.
- Connect covariance eigenvectors to principal-component directions.
- Interpret eigenvalue ratios as explained-variance percentages.
- Distinguish learning PCA directions with `fit()` from projecting observations with `transform()`.

## Previous course topic

**Course:** Curso de Matemáticas para Data Science  
**Class 1:** Probabilidad en Machine Learning: Fuentes de Incertidumbre y Modelos  
**Coaching status:** Practicing — understands training versus inference and has designed a supervised-learning example for email request interpretation

### Current review targets

- Identify features (`X`) and targets/labels (`y`) in supervised-learning cases.
- Distinguish training from prediction/inference.
- Distinguish adding files for retrieval/context from changing model weights through training.
- Understand where Naive Bayes, maximum likelihood, calibration, and Bayesian optimization fit in a workflow.
- Recognize that classification predictions can be labels and probabilities, while other ML tasks return different outputs.

### Applied example recorded

**Use case:** Assist employees in interpreting client requests received by email.

- Inputs may include authorized email text, metadata, attachments, and extracted fields.
- Outputs should be separated into predicted intent, extracted information, missing information, confidence, and human-review status.
- Training labels must represent verified request intent and required action; “accepted without pushback” and “returned” are supporting signals, not reliable labels by themselves.
- Returned cases need reason codes, such as misunderstanding, missing information, business-rule failure, missing attachment, or later client change.
- Email threads must remain together when splitting training, validation, and test data to prevent leakage.
- Ambiguous, unfamiliar, sensitive, or high-impact predictions should be routed to human review.
- Any workplace implementation requires authorization, confidential-data protection, access controls, and approved infrastructure.

## Previous course topic

**Course:** Curso de Matemáticas para Data Science  
**Class 2:** Estimación de distribuciones de probabilidad en Google Colab  
**Source filename:** Estimacion de distribuciones de probabilidad en google colab.txt  
**Coaching status:** Practicing — notes validated; learning parametric density estimation, KDE, and the difference between density and probability

### Current review targets

- Understand why a fitted density is useful beyond drawing a curve over a histogram.
- Distinguish probability density from probability for a continuous variable.
- Compare parametric estimation with nonparametric kernel density estimation.
- Understand that KDE generally places a kernel around every observation and that bandwidth controls smoothness.
- Use interval probabilities, percentiles, and unusual-value detection as practical applications.

## Active course and topic

**Course:** Curso de Matemáticas para Data Science  
**Class 3:** Estimación de Máxima Verosimilitud en modelado estadístico  
**Source filename:** Estimación de Maxima Verosimilitud.txt  
**Coaching status:** Introduced — notes validated; rebuilding likelihood, independence, products, logarithms, and parameter estimation from intuition

### Current review targets

- Distinguish probability of data under known parameters from likelihood of parameters after observing fixed data.
- Interpret the likelihood of an independent sample as a product of individual contributions.
- Understand why maximizing log-likelihood gives the same parameter estimate.
- Connect maximum likelihood estimation to the earlier normal-distribution estimates for `mu` and `sigma`.

## Status meanings

- **Confident:** ready for applied practice and periodic checks.
- **Needs review:** revisit concepts and complete targeted practice before relying on the material in larger projects.
- **Not yet assessed:** completion or confidence level has not been recorded yet.

## Coaching protocol

### Goal

Build practical, durable understanding of each topic: recognize when it is useful, reason through it without tools when appropriate, apply it with Python or data when useful, and communicate a correct interpretation.

### Language

Teaching, exercises, feedback, and this study record are in English. Spanish course notes may be used as source material and will be translated or clarified when needed.

### Before a topic begins

1. You provide notes, a syllabus excerpt, or a topic name.
2. **Notes validation first.** I check the notes for incorrect definitions, formulas, reasoning, misleading generalizations, or outdated claims. Any issue is clarified before it is used as a foundation for the lesson. I distinguish clear errors from points that depend on context or need a source.
3. I extract the concepts, notation, formulas, prerequisites, practical uses, and likely misconceptions.
4. I record a starting level and identify any missing prerequisite that would block progress.
5. I define a small, observable learning objective for the session.

### Standard lesson flow

1. **Real-world use case.** I introduce a concrete decision or question where the topic is useful, using everyday or professional contexts such as finance, health, sales, sports, or environmental data.
2. **Prediction.** Before calculating or coding, you state what you expect to happen and why. This makes intuition visible.
3. **Tool-free reasoning.** For a small example, we reason by hand: identify variables, choose the relevant concept, and explain the thought process or formula.
4. **Guided explanation.** I explain the formal definition, notation, assumptions, interpretation, and limitations. I use questions to guide you to intermediate conclusions rather than immediately giving the final answer.
5. **Checkpoints.** I ask short questions to verify understanding and correct misconceptions early.
6. **Applied implementation.** When appropriate, we use Python with a small, understandable dataset. We move from calculation to code to interpretation.
7. **Independent mini-task.** You complete a focused task. I provide or create an appropriate dataset when needed; standard datasets (such as Iris) or small synthetic datasets (such as used-car listings) may be used.
8. **Feedback and reflection.** You submit your answer, reasoning, calculations, code, charts, or interpretation. I give feedback, identify the next improvement, and ask you to summarize the key takeaway in your own words.
9. **Progress update.** I update the topic status and add any recurring misconception or review target to the learning record.

### Help policy: hint ladder

When you are stuck, I provide support progressively:

1. Rephrase the question or point to the relevant observation.
2. Give a conceptual hint.
3. Show the next reasoning step or a small analogous example.
4. Provide partial code or a formula setup.
5. Walk through a full solution only after you have attempted the task or explicitly request it.

### Exercise progression

For most topics, practice should progress through these levels:

1. Identify the situation where the concept applies.
2. Explain the intuition in plain language.
3. Solve a small example by hand or with minimal calculation.
4. Apply the concept in Python to a small dataset.
5. Interpret results in context, including limits and assumptions.
6. Transfer the idea to a new domain or realistic decision.

### Feedback rubric

Each submitted task is reviewed on:

- **Reasoning:** whether the chosen approach fits the question.
- **Mathematical or statistical correctness:** computations, definitions, and assumptions.
- **Code quality:** clarity, correctness, reproducibility, and appropriate use of Python.
- **Interpretation:** whether conclusions match the data and avoid overclaiming.
- **Next step:** one specific skill or misconception to practice next.

### Retention and review

- Topic statuses: **Introduced**, **Practicing**, **Confident**, **Needs review**.
- I maintain an error log for recurring misconceptions and revisit them in later tasks.
- Periodic mixed review exercises bring back prior topics in new contexts.
- Each completed topic ends with one transfer question: where else could this concept be useful?

### Boundaries

- I will distinguish intuition from a conclusion supported by data.
- I will state important assumptions and when a method should not be used.
- I will prioritize your attempt and reasoning over quickly supplying an answer.
