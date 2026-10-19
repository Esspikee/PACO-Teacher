# Maximum Likelihood Estimation in Statistical Modeling

**Course:** Curso de Matemáticas para Data Science  
**Class:** Estimación de Máxima Verosimilitud  
**Source file:** `Estimación de Maxima Verosimilitud.txt`

## Notes validation: corrections first

1. A clearer notation is `L(theta; x) = f(x; theta)` rather than `P(X; theta) = L(X; theta)`. The same mathematical model is viewed differently: probability treats `theta` as known and data as variable; likelihood fixes the observed data `x` and compares possible parameter values `theta`.
2. For independent observations, the joint likelihood is the product `L(theta; x) = product_i f(x_i; theta)`. The product requires the independence assumption (or an appropriate factorization for dependent data).
3. We normally write `argmax_theta L(theta; x)` because we want the value of `theta` that maximizes likelihood, not merely the maximum height.
4. Taking logarithms does not change the maximizing parameter because `log` is strictly increasing. It converts products into sums and improves numerical stability.
5. A continuous density value can exceed 1 and is not the probability of an exact observation. Likelihood compares parameter values; it is not itself a probability distribution over parameters unless a separate Bayesian construction is used.

## Plain-language idea

Maximum likelihood estimation (MLE) asks:

> Which parameter value would make the data we actually observed most plausible under the chosen model?

The data is already observed and held fixed. We vary the unknown parameter and score how well each candidate explains the observations.

## Coin example

Suppose a coin is tossed 10 times and produces 8 heads. Let `p` be the unknown probability of heads.

- If `p = 0.1`, eight heads is very implausible.
- If `p = 0.5`, it is possible but not especially well matched.
- If `p = 0.8`, it is well matched to the observed proportion.

For this sample, the maximum-likelihood estimate is:

`p_hat = number of heads / number of tosses = 8 / 10 = 0.8`

This does not prove that the coin's true probability is exactly `0.8`; it is the parameter value that best fits the observed sample under the Bernoulli/binomial model.

## Mapping the formulas to meaning

For observed independent values `x_1, ..., x_n`:

`L(theta; x) = product_i f(x_i; theta)`

Each observation contributes a compatibility score under candidate `theta`. Independence lets us multiply those contributions.

The MLE is:

`theta_hat = argmax_theta L(theta; x)`

Because products of many small values can become extremely small, we use the log-likelihood:

`ell(theta; x) = log L(theta; x) = sum_i log f(x_i; theta)`

Then:

`theta_hat = argmax_theta ell(theta; x)`

The maximizing value remains the same; only the calculation becomes easier and more stable.

## Connection to the previous class

When a normal distribution was fitted using:

```python
mu = sample.mean()
sigma = sample.std(ddof=0)
```

the sample mean and the population-form standard deviation (`ddof=0`) were the maximum-likelihood estimates of `mu` and `sigma` for an independent normal sample.

Thus MLE is the principle that explains why those parameter estimates were chosen.

## Practical uses

- Estimate conversion or failure probabilities.
- Estimate the mean and spread of processing times.
- Fit logistic regression and many other statistical/ML models.
- Compare how compatible candidate parameter values are with observed data.
- Learn model parameters during training by maximizing likelihood or, equivalently, minimizing negative log-likelihood.

## Important limitations

- The estimate depends on the selected model family and assumptions.
- Small or biased samples can produce misleading estimates.
- MLE provides a best-fitting point estimate, not automatic certainty about the parameter.
- Dependent observations cannot be treated as independent without consequences.
- A high likelihood does not prove that the model is appropriate; diagnostics and validation are still necessary.
