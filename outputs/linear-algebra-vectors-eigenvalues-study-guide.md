# Linear Algebra: Vectors, Matrices, Inverses, and Eigenvalues

Source: class notes supplied in Spanish. Teaching and review are recorded in English.

## Notes validation: corrections first

1. **Covariance matrices contain more than “highly related variables.”** Their diagonal contains variances and their off-diagonal entries contain pairwise covariances. Covariance magnitude depends on units, so correlation is generally easier to use when comparing relationship strength.
2. **PCA is not only for when one variable is needed.** PCA transforms several numerical variables into new variables called principal components and lets us retain fewer components while preserving as much variation as practical. Keeping one component is only one possible choice.
3. **Transpose is correctly described:** rows become columns and columns become rows.
4. **A square matrix correctly means equal numbers of rows and columns.** However, rectangular matrices can also be added and multiplied when their dimensions are compatible.
5. **Not every square matrix has an inverse.** An inverse exists only for an invertible (nonsingular) square matrix. Multiplying `A @ A_inverse` gives the identity matrix, apart from small floating-point error.
6. **A vector is not inherently a one-column matrix.** It is an ordered list with magnitude and, geometrically, direction. In calculations it may be represented as a one-dimensional array, a column vector, or a row vector depending on context.
7. **Vector subtraction is valid.** Division and exponentiation are not standard general vector operations. Programming libraries may offer elementwise division or powers, but those are different from a universal vector-algebra operation.
8. **For solving `Ax = b`, prefer `np.linalg.solve(A, b)` to explicitly calculating `inv(A) @ b`.** It is clearer and generally more numerically stable.

## The missing practical bridge

In data science, a vector usually represents one observation or one set of quantities:

`car = [age, mileage, price]`

A matrix usually represents either:

- a dataset: rows are observations and columns are features; or
- a transformation/system: a rule that takes an input vector and produces an output vector.

Matrix-vector multiplication answers: **What output results when this set of inputs passes through these rules?**

Example with a small business producing two products:

- `x = [number_of_product_A, number_of_product_B]`
- A matrix can hold the labor and material needed per unit.
- Multiplying the resource matrix by `x` gives total resources needed.

The reverse problem is a system of equations: given available resources, how many units can be produced? This is written `Ax = b` and is solved with `np.linalg.solve(A, b)` when a unique solution exists.

## What common vector operations mean

| Operation | Practical meaning |
| --- | --- |
| Addition | Combine changes, forces, movements, portfolios, or feature totals. |
| Subtraction | Calculate the displacement or difference between two observations. |
| Scalar multiplication | Scale every component, such as doubling an order or converting units. |
| Dot product | Weighted score, similarity ingredient, or projection. |
| Norm/length | Distance from the origin or size of a change. |
| Matrix-vector multiplication | Apply a system of linear rules to an input. |

## Why inverses appear

A matrix can represent a reversible transformation. If `A` converts an input `x` into output `b`, then conceptually `A⁻¹` reverses that transformation:

`Ax = b` and therefore `x = A⁻¹b`.

The identity check `A @ A⁻¹ = I` means that applying a transformation and then undoing it returns the original input. In actual numerical work, solve the system directly instead of forming the inverse unless the inverse itself is specifically needed.

## Eigenvectors and eigenvalues: intuition

A matrix transformation usually changes both the length and direction of a vector. An **eigenvector** is a special nonzero direction whose direction does not change under that transformation. Its **eigenvalue** tells how much that direction is stretched, compressed, or reversed:

`Av = λv`

- `v`: eigenvector (special direction)
- `λ`: eigenvalue (scale factor along that direction)

In PCA, eigenvectors of a covariance matrix identify directions of variation in the data, and eigenvalues indicate how much variation lies along those directions.

## Recommended learning order

1. Represent real observations as vectors and datasets as matrices.
2. Understand addition, subtraction, scaling, dot products, and norms.
3. Interpret matrix-vector multiplication as applying rules.
4. Solve a small system `Ax = b` and understand what the solution means.
5. Treat inverse matrices as conceptual undo operations.
6. Learn eigenvectors/eigenvalues as invariant directions and scale factors.
7. Connect eigenvectors/eigenvalues to covariance matrices and PCA.
