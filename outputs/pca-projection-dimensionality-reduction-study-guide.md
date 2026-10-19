# PCA: Vector Projection and Dimensionality Reduction

Source: two related classes recorded in one Spanish notes file. The supplied file ends mid-sentence, so this guide does not infer the missing ending.

## Class 1 — Principal Component Analysis and Vector Projection

### Notes validation

1. The “shadow” intuition is useful, but projection can mean a signed scalar coordinate or a projected vector—not only a positive length.
2. Principal-component directions are not chosen arbitrarily by visual intuition. PCA calculates directions that maximize variance, with each later direction perpendicular to the earlier ones.
3. We do not project vectors “onto the covariance matrix.” We calculate eigenvectors from the covariance matrix and project centered observations onto those eigenvector directions.

### Projection

For vector `a` projected onto nonzero vector `b`:

- Scalar coordinate along `b`: `(a · b) / ||b||`
- Projected vector: `[(a · b) / (b · b)] b`

If `b` is already a unit vector, the scalar coordinate simplifies to `a · b`, and the projected vector is `(a · b)b`.

Simple example: `a = [3, 4]` and `b = [1, 0]`. Projecting `a` onto the horizontal axis gives `[3, 0]`; its signed coordinate on that axis is `3`.

### Connection to PCA

Imagine centered observations as points in a feature space. PCA finds the direction along which their projections are most spread out. That first direction is principal component 1. The next component captures the largest remaining variation while staying perpendicular to the first.

## Class 2 — Dimensionality Reduction with PCA

### Notes validation

1. **`scaled.T` was not the error in the earlier exercise.** A scikit-learn feature matrix has shape `(observations, features)`. By default, `np.cov` expects variables in rows, so transposing gives shape `(features, observations)`. The clearer equivalent is `np.cov(scaled, rowvar=False)`.
2. **PCA needs centered data, but not necessarily standardized data.** Scikit-learn's `PCA` centers features automatically. Standardization additionally divides each feature by its standard deviation and is often useful when feature scales or variances should not dominate the result.
3. **Centering and standardization are different:** centering produces mean `0`; standardization usually produces mean `0` and standard deviation `1`.
4. The Seaborn function is `sns.jointplot`, not `sns.joinplot`.
5. A covariance matrix is symmetric, so `np.linalg.eigh` is preferable to general-purpose `np.linalg.eig`; for ordinary PCA work, scikit-learn's `PCA` is preferable.
6. `variance_explained` must begin as a list: `variance_explained = []`.
7. The percentages `72.96`, `22.85`, `3.66`, and `0.50` describe the share of total variance associated with each principal component. They are not “the values of four vectors.”
8. `pca.fit(scaled)` learns component directions. Inspect them using `pca.components_`; `fit()` does not itself return the transformed two-dimensional observations.
9. `pca.transform(scaled)` projects every observation onto the learned directions. The result has two new coordinates per Iris sample when `n_components=2`; these are new principal-component features, not two selected original features.

### Why the explained-variance code works

For covariance-matrix eigenvalues `λ1, λ2, ..., λp`:

`explained percentage for component i = λi / (λ1 + ... + λp) × 100`

Eigenvalues quantify variance along their corresponding eigenvector directions. Dividing one eigenvalue by their total produces its share of total variance.

With the class results:

- PC1: `72.96%`
- PC2: `22.85%`
- PC3: `3.66%`
- PC4: `0.50%` (rounding may make the total slightly different from 100%)
- PC1 + PC2: `95.81%`

Keeping two components therefore preserves about `95.81%` of measured variation and discards about `4.19%`.

Corrected manual calculation:

```python
eigen_values, eigen_vectors = np.linalg.eigh(covariance_matrix)

# eigh returns ascending eigenvalues, so reverse the order
order = np.argsort(eigen_values)[::-1]
eigen_values = eigen_values[order]
eigen_vectors = eigen_vectors[:, order]

variance_explained = (eigen_values / eigen_values.sum()) * 100
```

Recommended scikit-learn workflow:

```python
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

X = iris[["sepal_length", "sepal_width", "petal_length", "petal_width"]]
scaled = StandardScaler().fit_transform(X)

pca = PCA(n_components=2)
reduced_scaled = pca.fit_transform(scaled)

print(pca.explained_variance_ratio_)
print(pca.explained_variance_ratio_.sum())
print(pca.components_)
```

## When PCA is useful

- Visualize data with many numerical features in two or three dimensions.
- Reduce redundant information among correlated variables.
- Reduce computational cost or multicollinearity before some models.
- Compress data while retaining much of its variation.
- Reveal broad directions of variation.

## Important limitations

- Principal components are combinations of original variables and may be harder to explain.
- PCA captures variance, not necessarily information useful for predicting a target.
- PCA is sensitive to scaling choices and outliers.
- PCA is linear, so it may miss nonlinear structure.
- Fit scaling and PCA only on training data in a predictive workflow to avoid data leakage.
