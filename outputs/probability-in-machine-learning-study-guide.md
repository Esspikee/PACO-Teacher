# Probability in Machine Learning: Uncertainty and Models

**Course:** Curso de Matemáticas para Data Science  
**Class:** First class  
**Source:** Spanish notes; teaching record in English

## Notes validation: corrections first

1. **Labels are not knowledge documents.** In supervised learning, features `X` are the input information and labels/targets `y` are the correct outcomes the model is supposed to learn to predict.
2. **The algorithm does not normally extract variables and then develop itself.** People choose a model family and a representation of the inputs. Training then estimates the model's parameters from examples.
3. **Prediction is not usually continued adjustment.** During ordinary inference, a trained model receives new, unseen input and produces an output without changing its learned parameters. Online learning is a separate setup in which later examples can update the model.
4. **New documents used during prediction do not necessarily enrich the model permanently.** They may only provide temporary context or be retrieved from an external knowledge store.
5. **A prediction is not always a label.** A classifier may output probabilities and a predicted class; regression returns numerical values; other ML tasks can return rankings, generated text, clusters, embeddings, and more.
6. **Naive Bayes, MLE, calibration, and Bayesian optimization are not universal consecutive stages.** They play different roles and may or may not appear in a particular project.

## A clean supervised-learning workflow

1. **Define the problem:** determine the output that should be predicted and how success will be measured.
2. **Collect and label examples:** obtain input features `X` and known targets `y`.
3. **Split the data:** keep separate training, validation, and test data as appropriate.
4. **Choose representation and model:** convert raw inputs into usable features or embeddings and choose a model family.
5. **Train:** adjust model parameters using the training examples to reduce a loss or improve an objective.
6. **Tune and calibrate:** select hyperparameters using validation data and, when reliable probabilities matter, calibrate probability outputs.
7. **Evaluate:** measure performance on unseen test data and inspect errors, uncertainty, fairness, and robustness.
8. **Predict/infer:** use the fixed trained pipeline on new inputs.
9. **Monitor:** detect changes in performance or data distribution and retrain when justified.

## Where the class terms belong

| Term | Role |
| --- | --- |
| Naive Bayes | A probabilistic classification model family using Bayes' theorem and a conditional-independence assumption. |
| Maximum likelihood estimation (MLE) | A method for choosing parameters that make the observed training data as likely as possible under the model. |
| Calibration | Adjusting probability estimates so predicted probabilities match observed frequencies more closely. |
| Bayesian optimization | A strategy for efficiently searching hyperparameter settings; it is not the same as Bayes' theorem or Naive Bayes. |

## Parameters versus hyperparameters

- **Parameters** are learned during training, such as class probabilities and feature likelihoods in Naive Bayes.
- **Hyperparameters** are choices controlling the model or training process, such as smoothing strength. They are selected outside the ordinary parameter-fitting step.

## Sources of uncertainty

- **Data/aleatoric uncertainty:** natural randomness, ambiguity, measurement noise, or overlapping classes that more data may not eliminate.
- **Model/epistemic uncertainty:** insufficient knowledge caused by limited or unrepresentative training data; better data or models may reduce it.
- **Label uncertainty:** inconsistent, subjective, or incorrect target labels.
- **Distribution shift:** new real-world inputs differ from the training population.
- **Estimation uncertainty:** a finite sample produces uncertain estimates of probabilities and parameters.

## Was adding files to an AI assistant “training an ML model”?

Usually, no. Adding files to an assistant commonly creates a knowledge source that the system searches at request time. Relevant passages are retrieved and placed into the model's context so it can answer using them. This is commonly called retrieval-augmented generation (RAG) or knowledge retrieval.

The distinction is:

- **Retrieval/context:** files or instructions change what information is available for the current response; the base model's weights remain unchanged.
- **Training/fine-tuning:** an optimization process changes model parameters/weights based on many examples and an objective.
- **Prompt/instructions:** rules guide behavior without modifying the weights.

The exact implementation depends on the workplace system, but uploading reference files alone should not be assumed to train or fine-tune a model unless the product explicitly says it updates model weights.

## Practical classification example

Suppose a company wants to classify incoming requests as `urgent` or `not urgent`.

- Features `X`: message text, sender type, deadline, affected customer count, and similar inputs.
- Label `y`: the previously verified outcome `urgent` or `not urgent`.
- Training: learn statistical patterns connecting `X` to `y` from historical examples.
- Prediction: apply the trained model to a new request.
- Probability: estimate something like `P(urgent | request information) = 0.82`.
- Decision rule: assign `urgent` if the probability exceeds a chosen threshold.
- Uncertainty: the request may be ambiguous, unlike the training data, or missing important information.

## Applied design discussed: interpreting client email requests

The proposed system should be divided into explicit prediction tasks rather than learning from a simple accepted/returned flag.

### Desired outputs

- Predicted request intent
- Extracted entities such as dates, amounts, identifiers, and affected parties
- Missing required information
- Calibrated confidence or probability
- Recommendation to proceed, clarify, or request human review

### Training record

`X = authorized email text + appropriate metadata + attachment-derived information`

`y = request intent and required action verified by a qualified employee`

An email accepted without client pushback is not guaranteed to be correct. A returned request may reflect misunderstanding, missing information, a business rule, a missing attachment, or a later change by the client. These reasons should be labeled separately.

### Evaluation and safety

- Use representative successful, corrected, returned, ambiguous, and unusual cases.
- Keep complete email threads in the same data split to avoid leakage.
- Evaluate by intent class and test newer or unfamiliar wording.
- Allow the system to abstain when confidence is low or required information is missing.
- Initially assist employees rather than automatically executing requests.
- Use only authorized infrastructure and protect confidential or personal information.
