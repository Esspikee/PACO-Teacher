# Construcción y Análisis de la Matriz de Covarianza en Python

Source notes: first class, provided in Spanish. This guide keeps the concepts in English for the learning system.

## Notes validation: corrections to establish first

1. **Covariance is not bounded.** Standardization is not required to calculate covariance, and it does not place values in a fixed range. `StandardScaler` transforms each selected feature to approximately mean 0 and standard deviation 1. Standardization is useful when variables have different units or scales, but it changes the numerical covariance.
2. **The sign of correlation indicates direction, not strength by itself.** A correlation near `+1` is a strong positive linear relationship; one near `-1` is a strong negative linear relationship; one near `0` indicates little or no *linear* relationship. Strength is based on the absolute value: both `+0.9` and `-0.9` are strong.
3. **The diagonal of a covariance matrix contains variances, not “a variable squared.”** `cov(X, X) = var(X)` because the deviations from the mean are multiplied by themselves. These diagonal values are not necessarily the largest values in a covariance matrix, especially when features have different units.
4. **`np.cov` belongs to NumPy, not pandas.** `np.cov(scaled.T)` calculates covariance with NumPy; `DataFrame.cov()` is the pandas alternative.
5. **A covariance heatmap is not automatically a correlation heatmap.** Use `df.cov()` for covariance and `df.corr()` for correlation. If variables are standardized, covariance values become comparable and closely related to correlation, but the exact values can differ because of the variance convention used by the scaling and covariance functions.
6. **Point density does not by itself demonstrate covariance or correlation.** A scatterplot is useful for identifying direction, linear pattern, outliers, and nonlinear relationships. Covariance is also affected by scale, so visual interpretation must consider the axes.
7. **Species is a categorical grouping variable, not inherently an independent variable.** In the Iris dataset, it can be used to color or filter the plot. Whether it is an independent variable depends on the question and model.

## Core concept

Covariance measures whether two numerical variables tend to deviate from their respective means in the same direction or in opposite directions.

For sample observations `(x_i, y_i)`, sample covariance is:

`cov(X, Y) = Σ[(x_i − x̄)(y_i − ȳ)] / (n − 1)`

- Positive covariance: values above (or below) their means tend to occur together.
- Negative covariance: when one tends to be above its mean, the other tends to be below its mean.
- Covariance near zero: no clear *linear* co-movement; a nonlinear relationship can still exist.

Its magnitude depends on the units of both variables. For example, changing a measurement from meters to centimeters changes covariance. Therefore, covariance is most useful for direction, within-scale comparison, and multivariate methods; correlation is usually better for comparing linear-relationship strength across differently scaled features.

## Covariance matrix

For numerical features `X1, X2, ..., Xp`, the covariance matrix contains every pairwise covariance:

`C[i, j] = cov(Xi, Xj)`

Key properties:

- Rows and columns represent the same list of numerical features.
- It is symmetric: `cov(X, Y) = cov(Y, X)`.
- The diagonal is each feature's variance.
- Off-diagonal entries are covariances between different features.

## Python workflow

```python
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler

features = df[["feature_1", "feature_2", "feature_3"]]

# Original-unit covariance matrix
covariance = features.cov()

# Standardize only when comparable scale is needed
scaled = StandardScaler().fit_transform(features)
scaled_df = pd.DataFrame(scaled, columns=features.columns)
standardized_covariance = scaled_df.cov()

# Correlation matrix: use this for scale-free linear association strength
correlation = features.corr()
```

```python
import seaborn as sns
import matplotlib.pyplot as plt

sns.heatmap(covariance, annot=True, cmap="coolwarm", center=0)
plt.title("Covariance matrix")
plt.show()

sns.heatmap(correlation, annot=True, cmap="coolwarm", center=0, vmin=-1, vmax=1)
plt.title("Correlation matrix")
plt.show()
```

## Interpretation checklist

Before drawing a conclusion, ask:

1. Are both variables numeric, and what are their units?
2. Does the sign match the scatterplot’s overall direction?
3. Is the magnitude meaningful given the variables' scales? If not, inspect correlation too.
4. Could outliers or groups (for example, Iris species) be driving the result?
5. Does the relationship look nonlinear, even if covariance/correlation is near zero?
6. Remember: association does not establish causation.

