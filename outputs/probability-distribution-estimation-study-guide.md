# Estimating Probability Distributions in Google Colab

**Course:** Curso de Matemáticas para Data Science  
**Class:** Estimación de distribuciones de probabilidad  
**Source file:** `Estimacion de distribuciones de probabilidad en google colab.txt`

## Notes validation: corrections first

1. The normal curve is not merely a visual overlay. It is an estimated probability-density model that can be used to calculate interval probabilities, percentiles, thresholds, and how unusual a value is.
2. `dist.pdf(value)` returns **probability density**, not the probability that the variable equals that exact value. For a continuous variable, the probability of one exact value is zero. Probabilities are calculated over intervals using the CDF or by integrating the density.
3. The code is a **parametric estimate** because it assumes a normal distribution and estimates a fixed number of parameters: the mean `mu` and standard deviation `sigma`.
4. A kernel density estimate (KDE) does not normally create only one kernel for each of two source distributions. Conceptually, it places a small kernel—often a Gaussian—around every observation and combines them into one estimated density.
5. KDE can represent bimodal data because the combined kernels may form two peaks. It does not require us to declare beforehand that the distribution has two modes.
6. KDE is not automatically better than a parametric model. Its result depends strongly on the **bandwidth**: too small produces a noisy curve; too large can hide meaningful peaks.
7. `range(30, 70)` produces only integer evaluation points. `numpy.linspace()` creates a smoother curve and should cover the observed range with a small margin.

## What is being estimated?

We observe a sample, but usually care about the larger process or population that generated it. A density estimate describes where future or unobserved values are more or less likely to occur.

The histogram is an empirical summary whose appearance changes with bin choices. A fitted density supplies a continuous approximation that can be queried mathematically.

## Parametric estimation

Parametric estimation starts by assuming a distribution family, such as the normal distribution:

`X ~ Normal(mu, sigma)`

The sample is then used to estimate `mu` and `sigma`. This approach is compact and useful when the assumption is reasonable, but it can be misleading for skewed, heavy-tailed, or multimodal data.

Corrected example:

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import norm

rng = np.random.default_rng(42)
sample = rng.normal(loc=50, scale=5, size=1000)

mu = sample.mean()
sigma = sample.std(ddof=0)
dist = norm(loc=mu, scale=sigma)

x = np.linspace(sample.min() - 2, sample.max() + 2, 400)

plt.hist(sample, bins=30, density=True, alpha=0.5, label="Observed sample")
plt.plot(x, dist.pdf(x), label="Fitted normal density")
plt.legend()
plt.show()
```

`ddof=0` corresponds to the maximum-likelihood estimate of the normal model's standard deviation. Other statistical contexts may use `ddof=1` for a sample-standard-deviation estimate.

## Density versus probability

The height of a density curve at `x` is not a probability. Probability is represented by **area under the curve** across an interval.

For example, the estimated probability that `X` lies between 45 and 55 is:

```python
probability = dist.cdf(55) - dist.cdf(45)
```

The total area under a valid density curve is `1`.

## Nonparametric estimation with KDE

KDE does not assume that all data follows one normal bell. It uses kernels as small smooth contributions around the observations:

`estimated density = average of the kernels centered on the observations`

This makes KDE flexible enough to reveal skewness or multiple peaks.

```python
import seaborn as sns

sns.histplot(sample, bins=30, stat="density", alpha=0.4)
sns.kdeplot(sample, bw_adjust=1)
```

### Bandwidth intuition

- Small bandwidth: highly detailed and possibly noisy.
- Large bandwidth: very smooth and possibly hides separate groups.
- Appropriate bandwidth: reveals stable structure without following random sample noise.

## Why use a fitted distribution or KDE?

- Estimate the probability that a future value falls within a range.
- Define percentiles and operational thresholds.
- Identify values that are unusual under the estimated process.
- Compare distributions across clients, products, periods, or populations.
- Simulate plausible values for analysis.
- Discover multiple subgroups or processes suggested by separate peaks.

## Example business use

Suppose historical request-processing times are observed. A distribution estimate can help answer:

- What fraction of requests should finish within four hours?
- What time marks the slowest 5% of cases?
- Is a twelve-hour request unusually slow?
- Are two peaks evidence of simple and complex request types?

The curve is useful because it converts a collection of past observations into an explicit, testable description of uncertainty.
